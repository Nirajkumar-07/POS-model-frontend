"use client";

import ActionButon from "@/components/ui/Action-buttons";
import { Button, buttonVariants } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SendMailForm from "@/components/ui/form/send-mail-form";
import UpdateReviewForm from "@/components/ui/form/update-review-form";
import UploadForm from "@/components/ui/form/upload-form";
import Loader from "@/components/ui/loader";
import Ratings from "@/components/ui/ratings";
import { Supplier } from "@/lib/models/supplier.model";
import { SupplierDelete } from "@/lib/services/supplier.service";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function TableWrapper({ data }: { data: Supplier[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState<{
    supplierId: number | null;
    type: string | null;
  }>();

  const handleSuccess = useCallback(() => {
    setDialog({ supplierId: null, type: null });
    router.refresh();
  }, []);

  const handleDelete = useCallback(async (supplierId: number) => {
    setLoading(true);
    const res = await SupplierDelete(supplierId);
    if (res.success) handleSuccess();
    setLoading(false);
  }, []);

  const useColumn = useCallback((): ColumnDef<Supplier>[] => {
    const onSelect = ({
      supplierId,
      type,
    }: {
      supplierId: number;
      type: string;
    }) => {
      setDialog({ supplierId, type });
    };
    return [
      {
        accessorKey: "uniqueId",
        header: "Name",
        cell: ({ row }) => (
          <div className="grid">
            <span className="text-sm">{row.original.name}</span>
            <span className="text-xs text-gray-400">
              {row.original.uniqueId}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <span className="capitalize whitespace-nowrap">
            {row.original.category}
          </span>
        ),
      },
      {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => <Ratings value={row.original.rating} fixed />,
      },
      {
        accessorKey: "name",
        header: "",
        cell: ({ row }) => (
          <ActionButon
            supplierId={row.original.supplierId}
            onSelect={onSelect}
          />
        ),
      },
    ];
  }, []);
  return (
    <>
      {loading && <Loader />}
      {/* Delete Dialog */}
      <div className="hidden">
        <Dialog
          open={dialog?.type === "delete"}
          onOpenChange={(e) => {
            if (!e) setDialog({ supplierId: null, type: null });
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete?</DialogTitle>
              <DialogDescription>
                Are you want to delete this supplier
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-4 items-center justify-end">
              <DialogClose className={buttonVariants({ variant: "outline" })}>
                Cancel
              </DialogClose>
              <Button
                variant={"destructive"}
                onClick={() => handleDelete(dialog?.supplierId!)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* upload dialog */}
      <div className="hidden">
        <Dialog
          open={dialog?.type === "upload"}
          onOpenChange={(e) => {
            if (!e) setDialog({ supplierId: null, type: null });
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription className="grid gap-1">
                Upload document
                <span className="text-red-500">only pdf is allowed</span>
              </DialogDescription>
            </DialogHeader>
            <UploadForm
              supplierId={dialog?.supplierId!}
              onSuccess={handleSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* send mail dialog */}
      <div className="hidden">
        <Dialog
          open={dialog?.type === "mail"}
          onOpenChange={(e) => {
            if (!e) setDialog({ supplierId: null, type: null });
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Mail</DialogTitle>
              <DialogDescription>Send email to supplier</DialogDescription>
            </DialogHeader>
            <SendMailForm
              supplierId={dialog?.supplierId!}
              onSuccess={handleSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* update review dialog */}
      <div className="hidden">
        <Dialog
          open={dialog?.type === "review"}
          onOpenChange={(e) => {
            if (!e) setDialog({ supplierId: null, type: null });
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Review</DialogTitle>
              <DialogDescription>
                Select ratings and write reviw for supplier
              </DialogDescription>
            </DialogHeader>
            <UpdateReviewForm
              supplierId={dialog?.supplierId!}
              onSuccess={handleSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable column={useColumn} data={data} />
    </>
  );
}
