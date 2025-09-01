import Header from "@/components/ui/header";
import React from "react";

export default function SupplierLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <div className="px-2 lg:px-4">{children}</div>
    </>
  );
}
