import { apiService } from "@/services/api";
import InnerProfile from "./innerProfile";
import { getServerSession } from "next-auth";
import NextAuth from "next-auth";

export default async function Profile() {
  async function getLoggedWishlist() {
    const wishlist = await apiService.getLoggedUserWishlist();
    return wishlist;
  }
  const wishlist = await getLoggedWishlist();

  const session = await getServerSession();

  return (
    <div className="container mx-auto px-4 py-8">
      <InnerProfile wishlist={wishlist} session={session} />
    </div>
  );
}
