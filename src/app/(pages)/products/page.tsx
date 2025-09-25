"use client";

import { useState, useEffect } from "react";
import { Product } from "@/interfaces";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { ProductsResponse, WishlistResponse } from "@/types";
import { apiService } from "@/services";
import ProductsListing from "@/components/products/ProductsListing";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<WishlistResponse>();
  const [wishIds, setWishIds] = useState<Set<string>>(new Set());

  async function getLoggedWishlist() {
    const wishlist = await apiService.getLoggedUserWishlist();
    console.log("🚀 ~ getLoggedWishlist ~ wishlist:", wishlist);
    setWishlist(wishlist);
    setWishIds(new Set((wishlist?.data ?? []).map((p: Product) => p._id)));
  }

  async function fetchProducts() {
    setLoading(true);
    const response: ProductsResponse = await apiService.getAllProducts();
    console.log("🚀 ~ fetchProducts ~ response:", response);
    setProducts(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
    getLoggedWishlist();
  }, []);

  if (loading && products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <p className="text-muted-foreground">
          Discover amazing products from our collection
        </p>
      </div>
      <ProductsListing
        products={products}
        setWishIds={setWishIds}
        wishIds={wishIds}
      />
    </div>
  );
}
