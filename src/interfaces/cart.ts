import { Brand } from "./brand";
import { Category, Subcategory } from "./category";

interface Product {
    subcategory: Subcategory[];
    _id: string;
    title: string;
    quantity: number;
    imageCover: string;
    category: Category;
    brand: Brand;
    ratingsAverage: number;
    id: string;
}

export interface CartProduct {
    count: number;
    _id: string;
    product: Product;
    price: number;
}

export interface CartData {
    _id: string;
    cartOwner: string;
    products: CartProduct[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalCartPrice: number;
}