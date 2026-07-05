import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const getAuthSession = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.user?.accessToken;
  const userId = session?.user?.id;

  const headers: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  return { headers, userId };
};
