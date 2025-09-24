"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/interfaces";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { apiService } from "@/services";
import { CategoriesResponse } from "@/types";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchCategories() {
    try {
      setLoading(true);
      setError(null);
      const response: CategoriesResponse = await apiService.getAllCategories();
      setCategories(response.data ?? []);
    } catch (err) {
      setError("Failed to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading && categories.length === 0) {
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
          <button
            onClick={fetchCategories}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Categories</h1>
        <p className="text-muted-foreground">
          Browse our product categories and discover more
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="group block bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="relative aspect-square overflow-hidden bg-muted/30">
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 12vw"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No Image
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium text-center line-clamp-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
