"use client";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/redux/slices/productsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingBag, ArrowRight, Sparkles, Zap } from "lucide-react";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient and patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-accent/5 rounded-full blur-2xl animate-pulse-glow" />
        <div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium hover-lift">
              <Sparkles className="w-4 h-4 animate-pulse" />
              New Collection Available
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Welcome to TechMart
            </h1>

            {/* Subtitle */}
            <p className="mb-30 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the latest technology, fashion, and lifestyle products.
              Quality guaranteed with fast shipping and excellent customer
              service.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="lg"
                className="text-lg px-8 py-6 h-auto group hover-lift hover-glow"
              >
                <Link href={"/products"} className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Shop Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 h-auto group hover-lift hover-glow"
              >
                <Link href={"/categories"} className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Browse Categories
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
