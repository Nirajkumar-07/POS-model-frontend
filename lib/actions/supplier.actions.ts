"use server";

import { z } from "zod";
import {
  SendMail,
  SupplierAdd,
  SupplierUpdate,
  UpdateReview,
} from "../services/supplier.service";

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
  message?: any;
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

  console.log("form => ", form);

  if (!form.success) {
    return {
      errors: z.flattenError(form.error).fieldErrors,
    };
  }

  const body = {
    uniqueId: form.data.uniqueId,
    name: form.data.name,
    contactPerson: form.data.contactPerson,
    phone: form.data.phone,
    email: form.data.email,
    address: form.data.address,
    category: form.data.category,
    gst: form.data.gst,
    paymentTerms: form.data.paymentTerms,
    creditLimit: form.data.creditLimit,
    bankDetails: form.data.bankDetails,
  };
  console.log("body => ", body);

  if (mode == "add") {
    const res = await SupplierAdd(body);
    return res;
  } else if (mode == "update") {
    const res = await SupplierUpdate(id, body);
    console.log("res => ", res);
    return res;
  }
}

// SEND MAIL
type SendMail = {
  errors?: {
    subject?: string[];
    text?: string[];
  };
  message?: any;
};

const sendMailSchema = z.object({
  subject: z.string(),
  text: z.string(),
});

export async function sendMail(
  supplierId: number,
  prevState: SendMail | undefined,
  formData: FormData
) {
  const form = sendMailSchema.safeParse({
    subject: formData.get("subject"),
    text: formData.get("text"),
  });

  if (!form.success) {
    return {
      errors: z.flattenError(form.error).fieldErrors,
      message: "form invalidate",
    };
  }

  const body = {
    subject: form.data.subject,
    text: form.data.text,
  };

  const res = await SendMail(supplierId, body);
  console.log("res =>", res);
  return res;
}

// UPDATE REVIEW
type UpdateReview = {
  errors?: {
    rating?: string[];
    review?: string[];
  };
  message?: any;
};

const updateReviewSchema = z.object({
  rating: z.coerce.number(),
  review: z.string(),
});

export async function updateReview(
  supplierId: number,
  prevState: UpdateReview | undefined,
  formData: FormData
) {
  const form = updateReviewSchema.safeParse({
    rating: formData.get("rating"),
    review: formData.get("review"),
  });

  console.log("form =>", form);
  if (!form.success) {
    return {
      errors: z.flattenError(form.error).fieldErrors,
      message: "form invalidate",
    };
  }

  const body = {
    rating: form.data.rating,
    review: form.data.review,
  };

  const res = await UpdateReview(supplierId, body);
  console.log("res =>", res);
  return res;
}
