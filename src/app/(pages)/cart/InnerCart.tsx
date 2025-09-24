"use client";
import { Button, CartProduct } from "@/components";
import { formatPrice } from "@/helpers/currency";
import { CartProduct as CartProductI, CartResponse } from "@/interfaces";
import { AppDispatch, RootState } from "@/redux/store";
import { apiService } from "@/services/api";
import { AddToCartResponse } from "@/types";
import { Separator } from "@radix-ui/react-separator";
import { Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

interface CartContainerProps {
  cartData: CartResponse;
}

export function CartContainer({ cartData }: CartContainerProps) {
  const [innerCartData, setInnerCartData] = useState<CartResponse>(cartData);
  const [isClearingCart, setIsClearingCart] = useState<boolean>(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const { cartCount } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  async function checkout() {
    setCheckingOut(true);
    const data = await apiService.checkout(cartData.cartId);
    setCheckingOut(false);
    location.href = data.session.url;
  }
  async function handleRemoveCartItem(
    productId: string,
    setIsRemovingItem: (newState: boolean) => void
  ) {
    setIsRemovingItem(true);
    const response = await apiService.removeSpecificCartItem(productId);
    setIsRemovingItem(false);
    if (response.status == "success") {
      toast.success("Product removed successfully", {
        position: "top-right",
      });
      const newCartData: CartResponse = await apiService.getLoggedUserCart();
      setInnerCartData(newCartData);
      dispatch({
        type: "cart/updateCartCount",
        payload: newCartData.numOfCartItems,
      });
    } else {
      toast.error(response.message, {
        position: "top-right",
      });
    }
  }

  async function handleClearCart() {
    setIsClearingCart(true);
    const response = await apiService.clearCart();
    setIsClearingCart(false);
    if (response.message == "success") {
      toast.success("Cart Cleared successfully", {
        position: "top-right",
      });
      const newCartData: CartResponse = await apiService.getLoggedUserCart();
      setInnerCartData(newCartData);
      dispatch({ type: "cart/updateCartCount", payload: 0 });
    } else {
      toast.error(response.message, {
        position: "top-right",
      });
    }
  }

  async function handleUpdateCartProductCount(
    productId: string,
    count: number
  ) {
    const response = await apiService.updateCartProductCount(productId, count);
    if (response.status == "success") {
      const newCartData: CartResponse = await apiService.getLoggedUserCart();
      setInnerCartData(newCartData);
      dispatch({
        type: "cart/updateCartCount",
        payload: newCartData.numOfCartItems,
      });
    }
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        {innerCartData.numOfCartItems > 0 && (
          <p className="text-muted-foreground">
            {innerCartData.numOfCartItems} item
            {innerCartData.numOfCartItems !== 1 ? "s" : ""} in your cart
          </p>
        )}
      </div>

      {innerCartData.numOfCartItems > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {innerCartData.data.products.map((item) => (
                <CartProduct
                  key={item._id}
                  item={item}
                  onRemoveItem={handleRemoveCartItem}
                  onUpdateItemCount={handleUpdateCartProductCount}
                />
              ))}
            </div>

            {/* Clear Cart */}
            <div className="mt-6">
              <Button
                disabled={isClearingCart}
                onClick={handleClearCart}
                variant="outline"
              >
                {isClearingCart ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartData.numOfCartItems} items)</span>
                  <span>{formatPrice(cartData.data.totalCartPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between font-semibold text-lg mb-6">
                <span>Total</span>
                <span>{formatPrice(cartData.data.totalCartPrice)}</span>
              </div>

              <Button
                disabled={checkingOut}
                onClick={checkout}
                className="w-full"
                size="lg"
              >
                {checkingOut && <Loader2 className="animate-spin" />}
                Proceed to Checkout
              </Button>

              <Button variant="outline" className="w-full mt-2" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-gray-700 text-xl font-bold">
            No Products in your cart
          </h2>
          <Button variant="outline" className=" mt-2" asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </>
  );
}
