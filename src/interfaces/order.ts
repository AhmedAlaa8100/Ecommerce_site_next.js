import { Brand } from "./brand";
import { Category, Subcategory } from "./category";
import { Product } from "./product";

export interface OrderResponse {
    shippingAddress: ShippingAddress;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: "cash" | "card" | string;
    isPaid: boolean;
    isDelivered: boolean;
    _id: string;
    user: OrderUser;
    cartItems: OrderCartItem[];
    createdAt: string;
    updatedAt: string;
    id: number;
    __v: number;
  }
  
  export interface ShippingAddress {
    details: string;
    phone: string;
    city: string;
  }
  
  export interface OrderUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
  }
  
  export interface OrderCartItem {
    count: number;
    product: OrderProduct;
    price: number;
    _id: string;
  }

  export interface OrderProduct extends Product {
    subcategory: Subcategory[];
    category: Category;
    brand: Brand;
    ratingsQuantity: number;
  }