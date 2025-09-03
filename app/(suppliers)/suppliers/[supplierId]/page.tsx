import SupplierForm from "@/components/ui/form/supplier-form";
import { GetSupplier } from "@/lib/services/supplier.service";

export default async function Page({
  params,
}: {
  params: { supplierId: number };
}) {
  const { supplierId } = await params;
  const res = await GetSupplier(supplierId);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="w-full md:w-3/4 xl:w-1/2 max-w-[46rem] bg-white rounded-md border shadow px-2 md:px-4 py-4">
        <h3 className="font-bold text-2xl lg:text-3xl mb-4 w-full text-center">
          Update Supplier
        </h3>
        <SupplierForm
          mode="update"
          data={res.data || undefined}
          id={supplierId}
        />
      </div>
    </div>
  );
}
