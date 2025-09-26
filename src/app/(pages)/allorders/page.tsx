import { OrdersListing } from "@/components";
import { apiService } from "@/services";

export default async function AllOrders() {
  async function verifyTokenResponse() {
    try {
      const verifyTokenResponse = await apiService.verifytoken();
      return verifyTokenResponse;
    } catch (error) {
      console.error("Error verifying token:", error);
      return null;
    }
  }

  const tokenResponse = await verifyTokenResponse();

  async function getUserOrders() {
    try {
      if (!tokenResponse?.decoded?.id) {
        return { data: [] };
      }
      const orders = await apiService.getAllUserOrders(
        tokenResponse.decoded.id
      );
      return orders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return { data: [] };
    }
  }

  const orders = await getUserOrders();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Last Orders</h1>
        <p className="text-muted-foreground">Your recent orders</p>
        <OrdersListing orders={orders.data || []} />
      </div>
    </div>
  );
}
