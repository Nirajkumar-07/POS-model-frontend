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
import { useActionState, useEffect, useRef } from "react";
import { addUpdateSupplier } from "@/lib/actions/supplier.actions";
import { redirect } from "next/navigation";
import Loader from "../loader";

interface SupplierFormProps {
  mode: "add" | "update";
  data?: Supplier;
  id?: number;
}

export default function SupplierForm({ mode, data, id }: SupplierFormProps) {
  const addUpdateSupplierWithBind = addUpdateSupplier.bind(null, mode, id!);
  const uniqueId = useRef(data?.uniqueId || `SUP${Date.now()}`);
  const [state, formAction, loading] = useActionState(
    addUpdateSupplierWithBind,
    undefined
  );

  useEffect(() => {
    if (state && "success" in state && state.success) {
      redirect("/suppliers");
    }
  }, [state]);
  return (
    <>
      {loading && <Loader />}
      <form action={formAction}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <InputField
            label="UniqueID"
            name="uniqueId"
            readOnly
            boxClassName="lg:col-span-2"
            value={uniqueId.current}
            className="bg-gray-300 pointer-events-none"
            required
          />
          <InputField
            label="Name"
            name="name"
            defaultValue={data?.name}
            placeholder="Enter Name"
            required
          />
          <InputField
            label="Contact Person"
            name="contactPerson"
            defaultValue={data?.contactPerson}
            placeholder="Enter Contact Person"
            required
          />
          <InputField
            label="Phone"
            name="phone"
            placeholder="Enter Phone"
            defaultValue={data?.phone}
            required
          />
          <InputField
            label="Email"
            name="email"
            placeholder="Enter Email"
            defaultValue={data?.email}
            type="email"
            required
          />
          <InputField
            label="Address"
            name="address"
            placeholder="Enter Address"
            boxClassName="lg:col-span-2"
            multiline
            rows={3}
            defaultValue={data?.address}
            required
          />
          <div>
            <Label htmlFor="category" className="mb-2 !gap-1">
              Category
              <sup className="text-red-500">*</sup>
            </Label>
            <Select name="category" defaultValue={data?.category}>
              <SelectTrigger className="w-full capitalize" id="category">
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
          <InputField
            label="GST"
            name="gst"
            placeholder="Enter GST Number"
            defaultValue={data?.gstNumber}
          />
          <InputField
            label="Payment Terms"
            placeholder="Enter Payment Terms"
            name="paymentTerms"
            defaultValue={data?.paymentTerms}
          />
          <InputField
            label="Credit limit"
            name="creditLimit"
            placeholder="Enter Credit Limit"
            defaultValue={data?.creditLimit}
          />
          <InputField
            label="Bank Details"
            name="bankDetails"
            placeholder="Enter Bank Details"
            boxClassName="lg:col-span-2"
            multiline
            rows={3}
            defaultValue={data?.bankDetails}
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
