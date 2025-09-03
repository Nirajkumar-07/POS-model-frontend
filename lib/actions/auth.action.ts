"use server";

import { signIn, signOut } from "@/auth";
import { z } from "zod";
import { Signup } from "../services/auth.service";
import handleErrors from "./common.action";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type Signup = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: any;
};

const signupSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  confirmPassword: z.string(),
});

export async function signup(
  prevState: Signup | undefined,
  formData: FormData
) {
  console.log("formData.get(name) =>", formData.get("name"));
  const form = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  console.log("form =>", form);

  if (!form.success) {
    return {
      errors: z.flattenError(form.error).fieldErrors,
      message: "form invalidate",
    };
  }

  const body = {
    name: form.data.name,
    email: form.data.email,
    password: form.data.password,
    confirmPassword: form.data.confirmPassword,
  };
  console.log("body =>", body);

  const res = await Signup(body);
  console.log("res =>", res);
  return res;
}

type Login = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: any;
};

const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export async function login(prevState: Login | undefined, formData: FormData) {
  const form = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!form.success) {
    return {
      errors: z.flattenError(form.error).fieldErrors,
      message: "form invalidate",
    };
  }

  try {
    const body = {
      email: form.data.email,
      password: form.data.password,
    };
    const signin = await signIn("credentials", { ...body, redirect: false });
    revalidatePath("/suppliers");
    return {
      success: true,
      message: "successfull...",
    };
  } catch (error) {
    console.log("login err =>", error);
    const errorMessage = await handleErrors(error);
    return {
      success: false,
      message: errorMessage || "logged in error",
    };
  }
}

export async function SignOut() {
  await signOut({ redirectTo: "/login" });
}
