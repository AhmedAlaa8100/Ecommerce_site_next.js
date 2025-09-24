import { AddToCartResponse, ProductsResponse, SingleProductResponse } from "@/types";
import { getSession } from "next-auth/react";
import { CartResponse } from "@/interfaces";
import { WishlistResponse } from "@/types";

class servicesApi {
    #baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL!;

    async #getHeaders() {
        let token = "";

        // Client-side: use getSession from next-auth/react
        if (typeof window !== "undefined") {
            try {
                const session = await getSession();
                token = session?.token ?? "";
                console.log("🚀 ~ ServicesApi ~ Client-side session:", session);
            } catch {
                console.log("Client-side session not available");
            }
        } else {
            // Server-side: try to get token from cookies using next-auth/jwt
            try {
                const { cookies } = await import("next/headers");
                const { getToken } = await import("next-auth/jwt");

                const cookieStore = await cookies();

                // Create a minimal request object for getToken
                const req = {
                    headers: {
                        cookie: cookieStore.toString()
                    },
                    cookies: Object.fromEntries(
                        cookieStore.getAll().map((c: { name: string; value: string }) => [c.name, c.value])
                    )
                };

                const decodedToken = await getToken({
                    req: req as Parameters<typeof getToken>[0]['req'],
                    secret: process.env.AUTH_SECRET
                });

                token = decodedToken?.token as string ?? "";
                console.log("🚀 ~ ServicesApi ~ Server-side token:", token);
            } catch (error) {
                console.log("Server-side session error:", error);
            }
        }

        return {
            "content-type": "application/json",
            token: token
        }
    }

    async getAllProducts(): Promise<ProductsResponse> {
        return await fetch(
            this.#baseUrl + "api/v1/products"
        ).then((res) => res.json());
    }

        async addProductToCart(productId: string): Promise<AddToCartResponse> {
        return await fetch(this.#baseUrl + "api/v1/cart", {
            method: 'POST',
            body: JSON.stringify({
                productId
            }),
            headers: await this.#getHeaders()
        }).then(res => res.json())
    }

    async getProductDetails(productId: string): Promise<SingleProductResponse> {
        return await fetch(
            this.#baseUrl + "api/v1/products/" + productId
        ).then((res) => res.json());
    }

    async addProductToWishlist(productId: string): Promise<any> {
        return await fetch(this.#baseUrl + "api/v1/wishlist", {
            method: 'POST',
            body: JSON.stringify({
                productId
            }),
            headers: await this.#getHeaders()
        }).then(res => res.json())
    }

    async removeProductFromWishlist(productId: string): Promise<any> {
        return await fetch(this.#baseUrl + "api/v1/wishlist/" + productId, {
            method: 'delete',
            headers: await this.#getHeaders()
        }).then(res => res.json())
    }


    async getLoggedUserWishlist(): Promise<WishlistResponse> {
        return await fetch(this.#baseUrl + "api/v1/wishlist", {
            headers: await this.#getHeaders()
        }).then(res => res.json())
    }

    async getLoggedUserCart(): Promise<CartResponse> {
        return await fetch(this.#baseUrl + "api/v1/cart", {
            headers: await this.#getHeaders()
        }).then(res => res.json())
    }

    async removeSpecificCartItem(productId: string): Promise<any> {
        return await fetch(this.#baseUrl + "api/v1/cart/" + productId, {
            headers: await this.#getHeaders(),
            method: 'delete'
        }).then(res => res.json())
    }

    async clearCart(): Promise<any> {
        return await fetch(this.#baseUrl + "api/v1/cart", {
            headers: await this.#getHeaders(),
            method: 'delete'
        }).then(res => res.json())
    }

    async updateCartProductCount(productId: string, count: number): Promise<any> {
        return await fetch(this.#baseUrl + "api/v1/cart/" + productId, {
            method: 'put',
            body: JSON.stringify({
                count
            }),
            headers: await this.#getHeaders()
        }).then(res => res.json())
    }

    async checkout(cartId: string) {
        const headers = await this.#getHeaders()
        return await fetch(this.#baseUrl + "api/v1/orders/checkout-session/" + cartId + "?url=http://localhost:3000", {
            method: 'post',
            body: JSON.stringify({
                "shippingAddress": {
                    "details": "details",
                    "phone": "01010700999",
                    "city": "Cairo"
                }
            }),
            headers
        }).then(res => res.json())
    }

    async signIn(email: string, password: string) {
        const headers = await this.#getHeaders()
        return await fetch(this.#baseUrl + "api/v1/auth/signin", {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers
        }).then(res => res.json())
    }

}

export const apiService = new servicesApi()



