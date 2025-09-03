"use client";

import { useActionState, useEffect } from "react";
import { Button } from "../button";
import InputField from "../input-field";
import { login } from "@/lib/actions/auth.action";
import Link from "next/link";
import { redirect } from "next/navigation";
import Loader from "../loader";

export default function LoginForm() {
  const [state, formAction, loading] = useActionState(login, undefined);

  useEffect(() => {
    if (state && state.success) {
      redirect("/suppliers");
    }
  }, [state]);
  return (
    <form action={formAction}>
      {loading && <Loader />}
      <div className="grid gap-4">
        <InputField
          name="email"
          type="email"
          label="Email"
          placeholder="Enter Email"
          required
          errors={
            (state && "errors" in state && state.errors?.email) || undefined
          }
        />
        <InputField
          name="password"
          type="password"
          label="Password"
          placeholder="Enter Password"
          required
          errors={
            (state && "errors" in state && state.errors?.password) || undefined
          }
        />
        {state && "success" in state && !state.success && state.message && (
          <p className="text-sm text-red-500">
            {JSON.stringify(state.message)}
          </p>
        )}
        <Button className="uppercase w-full" type="submit" variant="success">
          Log in
        </Button>
      </div>
      <p className="text-sm text-center mt-4">
        Don&apos;t have an account{" "}
        <Link href="/signup" className="text-blue-500 hover:underline">
          Signup here
        </Link>
        .
      </p>
    </form>
  );
}
