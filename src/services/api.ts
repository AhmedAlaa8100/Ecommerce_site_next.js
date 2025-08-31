import { AddToCartResponse, ProductsResponse, SingleProductResponse } from "@/types";

class ServicesApi {


    #baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL ?? "";


    #getHeaders() {
        return {
            "content-type": "application/json",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YWYxMjJmZmUxZDBkYWEzOGQxNDhmZCIsIm5hbWUiOiJNb2hhbWVkIEFiZCBFbCBNb2F0eSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU2MzAzOTQzLCJleHAiOjE3NjQwNzk5NDN9.NckDzfKxU4EVmLKHg2GYR2lklfuKhAgEBKSr_b7VJ_U"
        }
    }

    async getAllProducts(): Promise<ProductsResponse> {
        return await fetch(
            this.#baseUrl + "api/v1/products"
        ).then((res) => res.json());
    }

    async getProductDetails(productId: string): Promise<SingleProductResponse> {
        return await fetch(
            this.#baseUrl + "api/v1/products/" + productId
        ).then((res) => res.json());
    }

    async addProductToCart(productId: string) {
        return await fetch(this.#baseUrl + "api/v1/cart", {
            method: 'post',
            body: JSON.stringify({
                productId
            }),
            headers: this.#getHeaders()
        })
    }


    async getCartProducts(): Promise<AddToCartResponse> {
        return await fetch(this.#baseUrl + "api/v1/cart", {
            headers: this.#getHeaders()
        }).then(res => res.json())
    }

}

export const servicesApi = new ServicesApi()

