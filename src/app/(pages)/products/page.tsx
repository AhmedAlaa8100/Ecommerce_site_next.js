"use client";

import { useState, useEffect, useCallback } from "react";
import { Product } from "@/interfaces";
import { ProductCard } from "@/components/products/ProductCard";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Search, Filter, Grid, List } from "lucide-react";
import { ProductsResponse, WishlistResponse } from "@/types";
import { cn } from "@/lib/utils";
import { apiService } from "@/services";
import { set } from "zod";
import toast from "react-hot-toast";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [wishlist, setWishlist] = useState<WishlistResponse>();
  const [wishIds, setWishIds] = useState<Set<string>>(new Set());

  const handleAddProductToWishlist = useCallback(
    async (
      productId: string,
      isWishlisted: boolean,
      setIsWishlisted: (value: boolean) => void,
      setWishlistLoading: (value: boolean) => void
    ) => {
      if (isWishlisted) {
        setWishlistLoading(true);
        const data = await apiService.removeProductFromWishlist(
          productId ?? ""
        );
        setIsWishlisted(false);
        setWishlistLoading(false);
        setWishIds((prev) => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
        toast(data.message, {
          icon: "💔",
          position: "top-center",
        });
      } else {
        setWishlistLoading(true);
        const data = await apiService.addProductToWishlist(productId ?? "");
        setWishlistLoading(false);
        if (data.status === "success") {
          toast(data.message, {
            icon: "❤️",
            position: "top-center",
          });
          setIsWishlisted(true);
          setWishIds((prev) => {
            const next = new Set(prev);
            next.add(productId);
            return next;
          });
        } else {
          toast.error(data.message || "Failed to add product to wishlist", {
            position: "top-center",
          });
        }
      }
    },
    []
  );

  async function getLoggedWishlist() {
    const wishlist = await apiService.getLoggedUserWishlist();
    console.log("🚀 ~ getLoggedWishlist ~ wishlist:", wishlist);
    setWishlist(wishlist);
    setWishIds(new Set((wishlist?.data ?? []).map((p: Product) => p._id)));
  }

  const checkIsWishlisted = useCallback(
    (setIsWishlisted: (value: boolean) => void, productId: string) => {
      const isInWishlist = wishIds.has(productId);
      setIsWishlisted(isInWishlist ?? false);
    },
    [wishIds]
  );

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

      <div className="flex items-center mb-10 justify-end p-2">
        <div className="flex items-center border rounded-md">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="rounded-r-none"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="rounded-l-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div
        className={cn(
          "grid gap-6",
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : "grid-cols-1"
        )}
      >
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            viewMode={viewMode}
            handleAddProductToWishlist={handleAddProductToWishlist}
            checkIsWishlisted={checkIsWishlisted}
          />
        ))}
      </div>
    </div>
  );
}
