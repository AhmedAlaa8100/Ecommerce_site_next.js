import React from "react";
import { Button } from "../ui";
import { Loader2, ShoppingCart } from "lucide-react";

interface AddToCartBtnProps {
  handleAddProductToCart: () => void;
  addToCartLoading: boolean;
}

export function AddToCartBtn({
  handleAddProductToCart,
  addToCartLoading,
}: AddToCartBtnProps) {
    
  return (
    <Button
      size="lg"
      className="flex-1 w-full"
      onClick={handleAddProductToCart}
      disabled={addToCartLoading}
    >
      {addToCartLoading && <Loader2 className="animate-spin" />}
      <ShoppingCart className="h-5 w-5 mr-2" />
      Add to Cart
    </Button>
  );
}