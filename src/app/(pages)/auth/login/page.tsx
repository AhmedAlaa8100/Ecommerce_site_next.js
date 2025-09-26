"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const router = useRouter();
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackUrl") || "/products";
  const successMessage = searchParams.get("message");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "ahmed8100@gmail.com",
      password: "pass123",
    },
  });

  async function onSubmit(values: any) {
    setSigningIn(true);
    setError("");

    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.ok) {
        router.push(callbackURL);
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during sign in. Please try again.");
      console.error("Sign in error:", error);
    } finally {
      setSigningIn(false);
    }
  }
  return (
    <div className="">
      <div className="mx-auto max-w-2xl my-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Please sign in to your account
          </p>
        </div>

        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your-email@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={signingIn} type="submit" className="w-full">
              {signingIn && <Loader2 className="animate-spin mr-2" />}
              Sign In
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
