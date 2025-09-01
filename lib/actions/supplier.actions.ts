import { z } from "zod";

type AddUpdateSupplier = {
  errors?: {
    uniqueId?: string[];
    name?: string[];
    contactPerson?: string[];
    phone?: string[];
    email?: string[];
    address?: string[];
    category?: string[];
  };
  message?: string;
};

const addUpdateSupplierSchema = z.object({
  uniqueId: z.string(),
  name: z.string(),
  contactPerson: z.string(),
  phone: z.coerce.number(),
  email: z.email(),
  address: z.string(),
  category: z.string(),
  gst: z.string().optional(),
  paymentTerms: z.string().optional(),
  creditLimit: z.string().optional(),
  bankDetails: z.string().optional(),
});

export async function addUpdateSupplier(
  mode: "add" | "update",
  id: number,
  prevState: AddUpdateSupplier | undefined,
  formData: FormData
) {
  const form = addUpdateSupplierSchema.safeParse({
    uniqueId: formData.get("uniqueId"),
    name: formData.get("name"),
    contactPerson: formData.get("contactPerson"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    address: formData.get("address"),
    category: formData.get("category"),
    gst: formData.get("gst"),
    paymentTerms: formData.get("paymentTerms"),
    creditLimit: formData.get("creditLimit"),
    bankDetails: formData.get("bankDetails"),
  });

  if (!form.success) {
    return {
      errors: z.flattenError(form.error).fieldErrors,
      message: "form invalidate",
    };
  }
}
