"use server";

import axios from "axios";
import { API } from "../api";
import handleErrors from "../actions/common.action";
import { auth } from "@/auth";

export async function SupplierList() {
  const session: any = await auth();
  const token = session?.sessionToken;
  try {
    const res = await axios.get(API.Supplier_Get_List, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      data: res.data.data,
      message: "successfull...",
    };
  } catch (error) {
    const errorMessage = await handleErrors(error);
    return {
      success: false,
      data: null,
      message: errorMessage,
    };
  }
}

export async function GetSupplier(supplierId: number) {
  const session: any = await auth();
  const token = session?.sessionToken;
  try {
    const res = await axios.get(API.Supplier_Get + String(supplierId), {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      data: res.data.data,
      message: "successfull...",
    };
  } catch (error) {
    console.log("err =>", error);
    const errorMessage = await handleErrors(error);
    return {
      success: false,
      data: null,
      message: JSON.stringify(error),
    };
  }
}

export async function SupplierAdd(body: any) {
  const session: any = await auth();
  const token = session?.sessionToken;
  try {
    const res = await axios.post(API.Supplier_Add, JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      data: res.data.data,
      message: "successfull...",
    };
  } catch (error) {
    const errorMessage = await handleErrors(error);
    return {
      success: false,
      data: null,
      message: errorMessage,
    };
  }
}

export async function SupplierUpdate(supplierId: number, body: any) {
  const session: any = await auth();
  const token = session?.sessionToken;
  try {
    const res = await axios.post(
      API.Supplier_Update + String(supplierId),
      JSON.stringify(body),
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      data: res.data.data,
      message: "successfull...",
    };
  } catch (error) {
    const errorMessage = await handleErrors(error);
    return {
      success: false,
      data: null,
      message: errorMessage,
    };
  }
}

export async function SupplierDelete(supplierId: number) {
  const session: any = await auth();
  const token = session?.sessionToken;
  try {
    const res = await axios.delete(API.Supplier_Delete + String(supplierId), {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      message: "successfull...",
    };
  } catch (error) {
    const errorMessage = await handleErrors(error);
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function UploadDocument(supplierId: number, body: FormData) {
  const session: any = await auth();
  const token = session?.sessionToken;
  try {
    const res = await axios.post(
      API.Supplier_Add_Document + String(supplierId),
      body,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "successfull...",
    };
  } catch (error) {
    const errorMessage = await handleErrors(error);
    return {
      success: false,
      message: errorMessage,
    };
  }
}
export async function SendMail(supplierId: number, body: any) {
  const session: any = await auth();
  const token = session?.sessionToken;
  try {
    const res = await axios.post(
      API.Supplier_Send_Msg + String(supplierId),
      JSON.stringify(body),
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      message: "successfull...",
    };
  } catch (error) {
    const errorMessage = await handleErrors(error);
    return {
      success: false,
      message: errorMessage,
    };
  }
}
export async function UpdateReview(supplierId: number, body: any) {
  const session: any = await auth();
  const token = session?.sessionToken;
  try {
    const res = await axios.post(
      API.Supplier_Update_Review + String(supplierId),
      JSON.stringify(body),
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      message: "successfull...",
    };
  } catch (error) {
    const errorMessage = await handleErrors(error);
    return {
      success: false,
      message: errorMessage,
    };
  }
}
