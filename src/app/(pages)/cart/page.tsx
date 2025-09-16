import { servicesApi } from "@/services";
import React from "react";
import InnerCart from "./InnerCart";

export default async function Cart() {
  async function fetchCartProducts() {
    return await servicesApi.getCartProducts();
  }

  const response = await fetchCartProducts();
  console.log("🚀 ~ Cart ~ response:", response)

  return (
    <div className="container mx-auto px-4 py-8">
      <InnerCart response={response} />
    </div>
  );
}
