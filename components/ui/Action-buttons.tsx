"use client";

import {
  EllipsisVertical,
  Pencil,
  Send,
  Star,
  Trash2,
  Upload,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button, buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function ActionButon({
  supplierId,
  onSelect,
}: {
  supplierId: number;
  onSelect: (any: any) => void;
}) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "default" }),
          "!p-1"
        )}
      >
        <EllipsisVertical size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Button
            variant={"ghost"}
            onClick={() => router.push(`/suppliers/${supplierId}`)}
          >
            <Pencil size={18} />
            Edit
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant={"ghost"}
            className="!gap-1"
            onClick={() => onSelect({ supplierId: supplierId, type: "delete" })}
          >
            <Trash2 size={18} />
            Delete
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant={"ghost"}
            className="!gap-1"
            onClick={() => onSelect({ supplierId: supplierId, type: "upload" })}
          >
            <Upload size={18} />
            Document
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant={"ghost"}
            className="!gap-1"
            onClick={() => onSelect({ supplierId: supplierId, type: "mail" })}
          >
            <Send size={18} />
            Mail
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant={"ghost"}
            className="!gap-1"
            onClick={() => onSelect({ supplierId: supplierId, type: "review" })}
          >
            <Star size={18} />
            Review
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
