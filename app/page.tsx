import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-col w-screen h-screen">
      <h1>Home</h1>
      <Link href="/auth/register">Register</Link>
    </div>
  );
}
