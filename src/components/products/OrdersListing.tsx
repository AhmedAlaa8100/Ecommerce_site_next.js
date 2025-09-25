"use client";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { OrderCard } from "./OrderCard";
import { Package } from "lucide-react";
import { OrderResponse } from "@/interfaces/order";

export default function OrdersListing({ orders }: { orders: OrderResponse[] }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Package className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No orders yet
        </h3>
        <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
        <Button asChild>
          <a href="/products">Start Shopping</a>
        </Button>
      </div>
    );
  }

  return (
    <>
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

      {/* Orders Grid */}
      <div
        className={cn(
          "grid gap-6",
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        )}
      >
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} viewMode={viewMode} />
        ))}
      </div>
    </>
  );
}
