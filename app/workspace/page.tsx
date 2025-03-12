import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutButton from "@/app/workspace/LogoutButton";

export default async function Workspace() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="rounded-lg border bg-card p-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to your workspace</h1>
        <p className="text-muted-foreground">
          You are logged in as {session.user.email}
        </p>
        <LogoutButton />
      </div>
    </main>
  );
}
