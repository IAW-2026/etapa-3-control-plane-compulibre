import type { User } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export function isAdminUser(user: User | null | undefined) {
  return user?.publicMetadata.role === "admin";
}

export async function requireAdminUser() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  if (!isAdminUser(user)) {
    redirect("/");
  }

  return user;
}
