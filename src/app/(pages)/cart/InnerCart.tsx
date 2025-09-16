"use client";
import { Button } from "@/components";
import { formatPrice } from "@/helpers/currency";
import { servicesApi } from "@/services";
import { AddToCartResponse } from "@/types";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function InnerCart({
  response,
}: {
  response: AddToCartResponse;
}) {
  const [checkingOut, setCheckingOut] = useState(false);

  async function checkout() {
    setCheckingOut(true);
    const data = await servicesApi.checkout(response.cartId);
    setCheckingOut(false);

    location.href = data.session.url;
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          Shopping Cart
        </h1>
        {response.numOfCartItems > 0 && (
          <p className="text-muted-foreground">
            {response.numOfCartItems} item
            {response.numOfCartItems !== 1 ? "s" : ""} in your cart
          </p>
        )}
      </div>
      {response.numOfCartItems > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {response.data.products.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 p-4 border rounded-lg"
                >
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      fill
                      className="object-cover rounded-md"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold line-clamp-2">
                      <Link
                        href={`/products/${item.product.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        {item.product.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.product.brand?.name}
                    </p>
                    <p className="font-semibold text-primary mt-2">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.count}</span>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart */}
            <div className="mt-6">
              <Button variant="outline">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({response.numOfCartItems} items)</span>
                  <span>{formatPrice(response.data.totalCartPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between font-semibold text-lg mb-6">
                <span>Total</span>
                <span>{formatPrice(response.data.totalCartPrice)}</span>
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
