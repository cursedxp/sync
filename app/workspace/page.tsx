"use client";

import { signOut, useSession } from "next-auth/react";
import Button from "@/app/components/common/Button/button";
import { useRouter } from "next/navigation";

export default function Workspace() {
  const session = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/auth/login");
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="rounded-lg border bg-card p-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to your workspace</h1>
        <p className="text-muted-foreground">
          You are logged in as {session?.data?.user?.email}
        </p>
        <Button onClick={handleLogout} className="max-w-48">
          Logout
        </Button>
      </div>
    </main>
  );
}
