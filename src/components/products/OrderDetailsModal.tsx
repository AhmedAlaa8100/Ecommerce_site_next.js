"use client";
import { OrderResponse } from "@/interfaces/order";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/helpers/currency";
import { X, Calendar, MapPin, CreditCard, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface OrderDetailsModalProps {
  order: OrderResponse | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailsModal({
  order,
  isOpen,
  onClose,
}: OrderDetailsModalProps) {
  // Handle escape key and click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.classList.contains("modal-overlay")) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !order) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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

  return (
    <div className="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">Order #{order.id}</h2>
            <p className="text-muted-foreground">Order Details</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Status */}
          <div className="flex items-center justify-between">
            <div
              className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                order.isPaid,
                order.isDelivered
              )}`}
            >
              {getStatusText(order.isPaid, order.isDelivered)}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Ordered on {formatDate(order.createdAt)}</span>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Order Items</h3>
            <div className="space-y-4">
              {(order.cartItems || []).map((item) => (
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
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">
                      <Link
                        href={`/products/${item.product._id}`}
                        className="hover:underline"
                      >
                        {item.product.title}
                      </Link>
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.product.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Brand: {item.product.brand?.name || "N/A"}</span>
                      <span>
                        Category: {item.product.category?.name || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">
                      {formatPrice(item.price)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Qty: {item.count}
                    </div>
                    <div className="text-sm font-medium text-primary">
                      Total: {formatPrice(item.price * item.count)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
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
                <span className="font-medium">
                  {formatPrice(order.taxPrice)}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">
                  {formatPrice(order.totalOrderPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">Address</div>
                  <div className="text-sm text-muted-foreground">
                    {order.shippingAddress?.details || "N/A"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {order.shippingAddress?.city || "N/A"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">Contact</div>
                  <div className="text-sm text-muted-foreground">
                    {order.shippingAddress?.phone || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Payment Method</div>
                <div className="text-sm text-muted-foreground capitalize">
                  {order.paymentMethodType}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
