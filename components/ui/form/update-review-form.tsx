"use client";

import { updateReview } from "@/lib/actions/supplier.actions";
import { Button, buttonVariants } from "../button";
import { DialogClose, DialogFooter } from "../dialog";
import InputField from "../input-field";
import { useActionState, useEffect } from "react";
import Ratings from "../ratings";
import Loader from "../loader";

export default function UpdateReviewForm({
  onSuccess,
  supplierId,
}: {
  supplierId: number;
  onSuccess: () => void;
}) {
  const updateReviewWithBind = updateReview.bind(null, supplierId);
  const [state, formAction, loading] = useActionState(
    updateReviewWithBind,
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
      <form action={formAction} className="w-full" id="update-review-form">
        <div className="grid gap-4 w-full">
          <Ratings
            name="rating"
            defaultValue={1}
            size={28}
            boxClassName="justify-between"
          />
          <InputField
            name="review"
            placeholder="Enter Review"
            rows={3}
            multiline
            errors={
              (state && "errors" in state && state.errors.review) || undefined
            }
            required
          />
        </div>
      </form>
      <DialogFooter className="gap-4">
        <DialogClose className={buttonVariants({ variant: "outline" })}>
          Cancel
        </DialogClose>
        <Button variant={"success"} type="submit" form="update-review-form">
          Save
        </Button>
      </DialogFooter>
    </>
  );
}
