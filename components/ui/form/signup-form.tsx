"use client";

import { Button } from "../button";
import InputField from "../input-field";

export default function SignupForm() {
  return (
    <form action="">
      <div className="grid gap-4">
        <InputField name="name" label="Name" required />
        <InputField name="email" type="email" label="Email" required />
        <InputField name="password" type="password" label="Password" required />
        <InputField
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          required
        />
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
