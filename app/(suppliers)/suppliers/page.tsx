import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { SupplierList } from "@/lib/services/supplier.service";
import TableWrapper from "./components/table-wrapper";

async function Page() {
  const res = await SupplierList();
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
      <TableWrapper data={res.data ? res.data : []} />
    </div>
  );
}

export default Page;
