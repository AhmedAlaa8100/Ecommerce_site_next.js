"use client";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";
import { handleAddProductToWishlist } from "@/helpers/wishlist";
import { checkIsWishlisted } from "@/helpers/wishlist";
import { Product } from "@/interfaces";

export default function ProductsListing({
  products,
  setWishIds,
  wishIds,
  removeFromWishlistDisplay,
}: {
  products: Product[];
  setWishIds: (
    wishIds: Set<string> | ((prev: Set<string>) => Set<string>)
  ) => void;
  wishIds: Set<string>;
  removeFromWishlistDisplay?: (productId: string) => void;
}) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  return (
    <>
      <div className="hidden md:flex items-center mb-10 justify-end p-2">
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
            handleAddProductToWishlist={(
              productId,
              isWishlisted,
              setIsWishlisted,
              setWishlistLoading
            ) =>
              handleAddProductToWishlist(
                setWishIds,
                setIsWishlisted,
                setWishlistLoading,
                productId,
                isWishlisted,
                removeFromWishlistDisplay
              )
            }
            checkIsWishlisted={(setIsWishlisted, productId) =>
              checkIsWishlisted(setIsWishlisted, productId, wishIds)
            }
          />
        ))}
      </div>
    </>
  );
}
