"use client";

import { useActionState, useEffect } from "react";
import { Button } from "../button";
import InputField from "../input-field";
import { signup } from "@/lib/actions/auth.action";
import Link from "next/link";
import Loader from "../loader";
import { redirect } from "next/navigation";

export default function SignupForm() {
  const [state, formAction, loading] = useActionState(signup, undefined);

  useEffect(() => {
    if (state && "success" in state && state.success) {
      redirect("/login");
    }
  }, [state]);
  return (
    <form action={formAction}>
      {loading && <Loader />}
      <div className="grid gap-4">
        <InputField
          name="name"
          label="Name"
          placeholder="Enter Name"
          required
          errors={
            (state && "errors" in state && state?.errors?.name) || undefined
          }
        />
        <InputField
          name="email"
          type="email"
          label="Email"
          placeholder="Enter Email"
          required
          errors={
            (state && "errors" in state && state?.errors?.email) || undefined
          }
        />
        <InputField
          name="password"
          type="password"
          label="Password"
          placeholder="Enter Password"
          required
          errors={
            (state && "errors" in state && state?.errors?.password) || undefined
          }
        />
        <InputField
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Enter Confirm Password"
          required
          errors={
            (state && "errors" in state && state?.errors?.confirmPassword) ||
            undefined
          }
        />
        {state && "success" in state && !state.success && state.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <Button className="uppercase w-full" type="submit" variant="success">
          Log in
        </Button>
      </div>
      <p className="text-sm text-center mt-4">
        Already have an account{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </form>
  );
}
