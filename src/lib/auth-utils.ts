import { auth } from "@/lib/auth";
import { SITE } from "@/lib/constants";

export async function getSession() {
  return auth();
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await auth();
  return !!session?.user;
}

export async function isOwner(): Promise<boolean> {
  const session = await auth();
  const email = session?.user?.email;
  return !!email && SITE.ownerEmails.includes(email);
}
