"use client";

import { Button, buttonVariants } from "../button";
import { DialogClose, DialogFooter } from "../dialog";
import InputField from "../input-field";
import { sendMail } from "@/lib/actions/supplier.actions";
import { useActionState, useEffect } from "react";
import Loader from "../loader";

export default function SendMailForm({
  onSuccess,
  supplierId,
}: {
  supplierId: number;
  onSuccess: () => void;
}) {
  const sendMailWithBind = sendMail.bind(null, supplierId);
  const [state, formAction, loading] = useActionState(
    sendMailWithBind,
    undefined
  );

  useEffect(() => {
    if (state && "success" in state && state.success) {
      onSuccess();
    }
  }, [state]);
  return (
    <>
      {loading && <Loader />}
      <form action={formAction} className="w-full" id="send-mail-form">
        <div className="grid gap-4 w-full">
          <InputField
            name="subject"
            placeholder="Subject"
            required
            errors={
              (state && "errors" in state && state.errors.subject) || undefined
            }
          />
          <InputField
            name="text"
            placeholder="Compose Mail"
            rows={5}
            multiline
            errors={
              (state && "errors" in state && state.errors.text) || undefined
            }
            required
          />
        </div>
      </form>
      <DialogFooter className="gap-4">
        <DialogClose className={buttonVariants({ variant: "outline" })}>
          Cancel
        </DialogClose>
        <Button variant={"success"} type="submit" form="send-mail-form">
          Save
        </Button>
      </DialogFooter>
    </>
  );
}
