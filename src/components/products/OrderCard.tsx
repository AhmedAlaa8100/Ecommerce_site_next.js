"use client";
import Image from "next/image";
import Link from "next/link";
import { OrderResponse } from "@/interfaces/order";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/helpers/currency";
import {
  Calendar,
  Package,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { OrderDetailsModal } from "./OrderDetailsModal";

interface OrderCardProps {
  order: OrderResponse;
  viewMode?: "grid" | "list";
}

export function OrderCard({ order, viewMode = "grid" }: OrderCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Safe modal handlers
  const handleOpenModal = () => {
    try {
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error opening modal:", error);
    }
  };

  const handleCloseModal = () => {
    try {
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error closing modal:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (isPaid: boolean, isDelivered: boolean) => {
    if (isDelivered) return "text-green-600 bg-green-50";
    if (isPaid) return "text-blue-600 bg-blue-50";
    return "text-yellow-600 bg-yellow-50";
  };

  const getStatusText = (isPaid: boolean, isDelivered: boolean) => {
    if (isDelivered) return "Delivered";
    if (isPaid) return "Paid";
    return "Pending";
  };

  if (viewMode === "list") {
    return (
      <>
        <div className="flex gap-4 p-6 border rounded-lg hover:shadow-md transition-shadow bg-white">
          {/* Order Image - Show first product */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={
                order.cartItems?.[0]?.product?.imageCover ||
                "/placeholder-product.jpg"
              }
              alt={order.cartItems?.[0]?.product?.title || "Order item"}
              fill
              className="object-cover rounded-md"
              sizes="96px"
            />
            {(order.cartItems?.length || 0) > 1 && (
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                +{order.cartItems.length - 1}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Order #{order.id}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {order.cartItems?.length || 0} item
                  {(order.cartItems?.length || 0) !== 1 ? "s" : ""}
                </p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  order.isPaid,
                  order.isDelivered
                )}`}
              >
                {getStatusText(order.isPaid, order.isDelivered)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Ordered on {formatDate(order.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{order.shippingAddress?.city || "N/A"}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(order.totalOrderPrice)}
                </span>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CreditCard className="h-4 w-4" />
                    {order.paymentMethodType}
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="h-4 w-4" />
                    Shipping: {formatPrice(order.shippingPrice)}
                  </span>
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={handleOpenModal}>
                View Details
              </Button>
            </div>
          </div>
        </div>
        <OrderDetailsModal
          order={order}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </>
    );
  }

  return (
    <>
      <div className="group relative bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Order Header */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">Order #{order.id}</h3>
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                order.isPaid,
                order.isDelivered
              )}`}
            >
              {getStatusText(order.isPaid, order.isDelivered)}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(order.createdAt)}</span>
          </div>
        </div>

        {/* Order Items Preview */}
        <div className="p-4">
          <div className="flex gap-3 mb-4">
            {(order.cartItems || []).slice(0, 3).map((item, index) => (
              <div key={item._id} className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
                  fill
                  className="object-cover rounded-md"
                  sizes="64px"
                />
                {index === 2 && (order.cartItems?.length || 0) > 3 && (
                  <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      +{order.cartItems.length - 3}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Items ({order.cartItems?.length || 0})
              </span>
              <span className="font-medium">
                {formatPrice(
                  (order.cartItems || []).reduce(
                    (sum, item) => sum + item.price * item.count,
                    0
                  )
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">
                {formatPrice(order.shippingPrice)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span className="font-medium">{formatPrice(order.taxPrice)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-lg font-bold text-primary">
                {formatPrice(order.totalOrderPrice)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{order.shippingAddress?.city || "N/A"}</span>
            </div>
            <div className="flex items-center gap-1">
              <CreditCard className="h-4 w-4" />
              <span className="capitalize">{order.paymentMethodType}</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleOpenModal}
          >
            View Details
          </Button>
        </div>
      </div>
      <OrderDetailsModal
        order={order}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
