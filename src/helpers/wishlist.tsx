"use client";
import { apiService } from "@/services";
import { toast } from "react-hot-toast";

export const handleAddProductToWishlist = async (
  setWishIds: (
    value: Set<string> | ((prev: Set<string>) => Set<string>)
  ) => void,
  setIsWishlisted: (value: boolean) => void,
  setWishlistLoading: (value: boolean) => void,
  productId: string,
  isWishlisted: boolean,
  removeFromWishlistDisplay?: (productId: string) => void
) => {
  if (isWishlisted) {
    setWishlistLoading(true);
    const data = await apiService.removeProductFromWishlist(productId);
    setIsWishlisted(false);
    setWishlistLoading(false);
    setWishIds((prev: Set<string>) => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
    // Remove from wishlist display if callback is provided
    removeFromWishlistDisplay?.(productId);
    toast(data.message, {
      icon: "💔",
      position: "top-center",
    });
  } else {
    setWishlistLoading(true);
    const data = await apiService.addProductToWishlist(productId);
    setWishlistLoading(false);
    if (data.status === "success") {
      toast(data.message, {
        icon: "❤️",
        position: "top-center",
      });
      setIsWishlisted(true);
      setWishIds((prev: Set<string>) => {
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
};

export const checkIsWishlisted = (
  setIsWishlisted: (value: boolean) => void,
  productId: string,
  wishIds: Set<string>
) => {
  const isInWishlist = wishIds.has(productId);
  setIsWishlisted(isInWishlist ?? false);
};
