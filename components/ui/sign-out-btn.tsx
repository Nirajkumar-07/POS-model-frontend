"use client";

import { signOut } from "@/auth";
import { Button } from "./button";
import { LogOut } from "lucide-react";
import { useState } from "react";
import Loader from "./loader";
import { SignOut } from "@/lib/actions/auth.action";

export default function SignOutBtn() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading && <Loader />}
      <form
        action={async () => {
          setLoading(true);
          await SignOut();
        }}
      >
        <Button variant="ghost" type="submit">
          <LogOut size={18} />
          Sign Out
        </Button>
      </form>
    </>
  );
}
