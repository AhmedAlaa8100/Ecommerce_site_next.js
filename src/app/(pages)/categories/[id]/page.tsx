"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Product, Category } from "@/interfaces";
import { ProductCard } from "@/components/products";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { apiService } from "@/services";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import {
  ProductsResponse,
  SingleCategoryResponse,
  WishlistResponse,
} from "@/types";
import toast from "react-hot-toast";

export default function CategoryDetailsPage() {
  const params = useParams<{ id: string }>();
  const categoryId = params?.id;

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [wishIds, setWishIds] = useState<Set<string>>(new Set());

  const filteredProducts = useMemo(
    () => products.filter((p) => p.category?._id === categoryId),
    [products, categoryId]
  );

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
        toast(data.message, { icon: "💔", position: "top-center" });
      } else {
        setWishlistLoading(true);
        const data = await apiService.addProductToWishlist(productId ?? "");
        setWishlistLoading(false);
        if (data.status === "success") {
          toast(data.message, { icon: "❤️", position: "top-center" });
          setIsWishlisted(true);
          setWishIds((prev) => new Set(prev).add(productId));
        } else {
          toast.error(data.message || "Failed to add product to wishlist", {
            position: "top-center",
          });
        }
      }
    },
    []
  );

  const checkIsWishlisted = useCallback(
    (setIsWishlisted: (value: boolean) => void, productId: string) => {
      setIsWishlisted(wishIds.has(productId));
    },
    [wishIds]
  );

  async function fetchData() {
    try {
      setLoading(true);
      setError(null);
      const [catRes, productsRes, wishlistRes] = await Promise.all([
        apiService.getSpecificCategory(
          String(categoryId)
        ) as Promise<SingleCategoryResponse>,
        apiService.getAllProducts() as Promise<ProductsResponse>,
        apiService.getLoggedUserWishlist() as Promise<WishlistResponse>,
      ]);
      setCategory(catRes?.data ?? null);
      setProducts(productsRes?.data ?? []);
      setWishIds(new Set((wishlistRes?.data ?? []).map((p: Product) => p._id)));
    } catch (err) {
      setError("Failed to load category details. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!categoryId) return;
    fetchData();
  }, [categoryId]);

  if (loading && !category) {
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
          <Button onClick={fetchData}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        {category?.image ? (
          <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted/30 border">
            <Image
              src={category.image}
              alt={category?.name ?? "Category"}
              fill
              sizes="64px"
              className="object-contain p-2"
            />
          </div>
        ) : null}
        <div>
          <h1 className="text-3xl font-bold mb-1">
            {category?.name ?? "Category"}
          </h1>
          <p className="text-muted-foreground">
            Browse products in {category?.name}
          </p>
        </div>
      </div>

      {/* View toggle */}
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
        className={
          viewMode === "grid"
            ? "grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : "grid gap-6 grid-cols-1"
        }
      >
        {filteredProducts.map((product) => (
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
