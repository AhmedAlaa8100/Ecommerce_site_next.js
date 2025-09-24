import { apiService } from "@/services";
import React from "react";
import { CartContainer } from "./InnerCart";


export default async function Cart() {
  async function fetchCartProducts() {
    return await apiService.getLoggedUserCart();
  }

  const response = await fetchCartProducts();
  console.log("🚀 ~ Cart ~ response:", response)

  return (
    <div className="container mx-auto px-4 py-8">
      <CartContainer cartData={response} />
    </div>
  );
}
