import type { User } from "@clerk/nextjs/server";

export function isAdminUser(user: User | null | undefined) {
  return user?.publicMetadata.role === "admin";
}
