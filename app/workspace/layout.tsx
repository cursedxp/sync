import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NavBar from "../components/workspace/navBar/navBar";
export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }
  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <NavBar />
      <div className="flex-1 ">{children}</div>
    </div>
  );
}
