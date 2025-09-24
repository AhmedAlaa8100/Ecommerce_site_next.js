import { servicesApi } from "@/services";
import { NextResponse } from "next/server";





export async function GET() {

    const response = await servicesApi.getAllProducts()


    return NextResponse.json(response)
}