"use client";

import { File, Plus, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Button, buttonVariants } from "../button";
import { DialogClose, DialogFooter } from "../dialog";
import { UploadDocument } from "@/lib/services/supplier.service";
import Loader from "../loader";
import { cn } from "@/lib/utils";

export default function UploadForm({
  onSuccess,
  supplierId,
}: {
  supplierId: number;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleSave = useCallback(async (supplierId: number, files: File[]) => {
    setLoading(true);
    const body = new FormData();
    files.forEach((file, i) => body.append(`pdf-${i}`, file));

    console.log("body =>", body);

    const res = await UploadDocument(supplierId, body);
    console.log("res =>", res);
    if (res.success) {
      onSuccess();
    }
    setLoading(false);
  }, []);
  return (
    <>
      {loading && <Loader />}
      {files.length > 0 ? (
        <div className="grid gap-2">
          {files.map((file, i) => (
            <div
              key={i}
              className="py-2 px-3 flex items-center justify-between border"
            >
              <div className="flex items-center gap-4">
                <i className="text-gray-400">
                  <File size={24} />
                </i>
                <div className="grid gap-1">
                  <span className="text-sm">{file?.name}</span>
                  <span className="text-xs text-gray-400">
                    {((file?.size || 0) / 1024).toFixed(2)} kb
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                className="!px-2"
                onClick={() => setFiles((p) => p.splice(i, 1))}
              >
                <Trash2 size={18} color="red" />
              </Button>
            </div>
          ))}
          <label
            htmlFor="upload"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full !gap-1"
            )}
          >
            <Plus size={20} />
            Add more
          </label>
        </div>
      ) : (
        <div className="w-full h-full">
          <label
            htmlFor="upload"
            className="rounded-md border w-full h-full flex flex-col justify-center items-center bg-gray-100 text-gray-300 py-10 cursor-pointer"
          >
            <Plus size={60} strokeWidth={1.5} />
            <span className="text-xl lg:text-2xl text-gray-400">Upload</span>
          </label>
        </div>
      )}
      <input
        id="upload"
        type="file"
        accept="application/pdf"
        hidden
        className="hidden"
        onChange={(e) =>
          setFiles((p) => {
            if (e.target.files && e.target.files[0])
              return [...p, e.target.files[0]];
            else return p;
          })
        }
      />
      <DialogFooter className="gap-4">
        <DialogClose className={buttonVariants({ variant: "outline" })}>
          Cancel
        </DialogClose>
        <Button
          variant={"success"}
          onClick={() => handleSave(supplierId, files)}
        >
          Save
        </Button>
      </DialogFooter>
    </>
  );
}
