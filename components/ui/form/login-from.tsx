"use client";

import { Button } from "../button";
import InputField from "../input-field";

export default function LoginForm() {
  return (
    <form action="">
      <div className="grid gap-4">
        <InputField name="email" type="email" label="Email" required />
        <InputField name="password" type="password" label="Password" required />
        <Button
          className="uppercase w-full lg:col-span-2"
          type="submit"
          variant="success"
        >
          Log in
        </Button>
      </div>
    </form>
  );
}
