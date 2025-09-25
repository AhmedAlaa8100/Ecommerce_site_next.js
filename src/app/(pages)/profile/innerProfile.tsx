"use client";
import ProductsListing from "@/components/products/ProductsListing";
import { Button } from "@/components/ui/button";
import { WishlistResponse } from "@/types";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Calendar,
  ArrowRight,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { Session } from "next-auth";

export default function innerProfile({
  wishlist,
  session,
}: {
  wishlist: WishlistResponse;
  session: Session | null;
}) {
  const [innerWishlist, setInnerWishlist] =
    useState<WishlistResponse>(wishlist);
  const [wishIds, setWishIds] = useState<Set<string>>(
    new Set(wishlist.data.map((item) => item._id))
  );

  const removeFromWishlistDisplay = (productId: string) => {
    setInnerWishlist((prev) => ({
      ...prev,
      data: prev.data.filter((product) => product._id !== productId),
    }));
  };

  useEffect(() => {
    setInnerWishlist(wishlist);
    setWishIds(new Set(wishlist.data.map((item) => item._id)));
  }, [wishlist]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* User Profile Section */}
      <div className="mb-12">
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {session?.user?.name || "User"}
              </h1>
              <p className="text-muted-foreground">
                Welcome back to your profile
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">
                {session?.user?.email || "user@example.com"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Role:</span>
              <span className="font-medium capitalize">
                {session?.user?.role || "user"}
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button asChild>
              <Link href="/allorders" className="flex items-center gap-2">
                View All Orders
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Wishlist Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
        <p className="text-muted-foreground mb-6">Your wishlisted items</p>

        {innerWishlist.data.length === 0 ? (
          <div className="bg-white border rounded-lg p-12 shadow-sm">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <Heart className="h-12 w-12 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-500 mb-8 max-w-md">
                Start adding items to your wishlist by browsing our products.
                You can save items you love for later!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex items-center gap-2">
                  <Link href="/products">
                    <ShoppingBag className="h-4 w-4" />
                    Start Shopping
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/categories">Browse Categories</Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <ProductsListing
            products={innerWishlist.data}
            setWishIds={setWishIds}
            wishIds={wishIds}
            removeFromWishlistDisplay={removeFromWishlistDisplay}
          />
        )}
      </div>
    </div>
  );
}
