"use client";

import { supplierCategory } from "@/lib/data";
import InputField from "../input-field";
import { Label } from "../label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Supplier } from "@/lib/models/supplier.model";
import { Button } from "../button";
import { useActionState } from "react";
import { addUpdateSupplier } from "@/lib/actions/supplier.actions";

interface SupplierFormProps {
  mode: "add" | "update";
  data?: Supplier;
  id?: number;
}

export default function SupplierForm({ mode, data, id }: SupplierFormProps) {
  const addUpdateSupplierWithBind = addUpdateSupplier.bind(null, mode, id!);
  const [state, formAction] = useActionState(
    addUpdateSupplierWithBind,
    undefined
  );
  return (
    <>
      <form action={formAction}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <InputField
            label="UniqueID"
            name="uniqueId"
            readOnly
            disabled
            boxClassName="lg:col-span-2"
            className="bg-gray-300"
            required
          />
          <InputField label="Name" name="name" required />
          <InputField label="Contact Person" name="contactPerson" required />
          <InputField label="Phone" name="phone" required />
          <InputField label="Email" name="email" type="email" required />
          <InputField
            label="Address"
            name="address"
            boxClassName="lg:col-span-2"
            multiline
            rows={3}
            required
          />
          <div>
            <Label htmlFor="category" className="mb-2 !gap-1">
              Category
              <sup className="text-red-500">*</sup>
            </Label>
            <Select name="category">
              <SelectTrigger className="w-full" id="category">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {supplierCategory.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="capitalize"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <InputField label="GST" name="gst" />
          <InputField label="Payment Terms" name="paymentTerms" />
          <InputField label="Credit limit" name="creditLimit" />
          <InputField
            label="Bank Details"
            name="bankDetails"
            boxClassName="lg:col-span-2"
            multiline
            rows={3}
          />
          <Button
            className="uppercase w-full lg:col-span-2"
            type="submit"
            variant="success"
          >
            {mode}
          </Button>
        </div>
      </form>
    </>
  );
}
