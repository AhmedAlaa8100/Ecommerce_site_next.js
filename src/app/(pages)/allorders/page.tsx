import { OrdersListing } from "@/components";
import { apiService } from "@/services";

export default async function AllOrders() {
  async function verifyTokenResponse() {
    const verifyTokenResponse = await apiService.verifytoken();
    return verifyTokenResponse;
  }

  const tokenResponse = await verifyTokenResponse();

  async function getUserOrders() {
    try {
      // const orders = await apiService.getAllUserOrders(
      //   tokenResponse.decoded.id
      // );
      const orders = await apiService.getAllUserOrders(
        "6407cf6f515bdcf347c09f17"
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
