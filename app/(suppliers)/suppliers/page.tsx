import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useColumn } from "./components/columns";

export default function Page() {
  return (
    <div className="w-full max-h-screen grid gap-6 py-4">
      <div className="w-full flex items-center justify-between">
        <h3 className="font-semibold text-xl lg:text-2xl">Suppliers</h3>
        <Link href="/suppliers/add">
          <Button>
            <Plus size={18} /> Add
          </Button>
        </Link>
      </div>
      <DataTable useColumn={useColumn} data={[]} />
    </div>
  );
}
