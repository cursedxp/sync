export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-xl w-full">{children}</div>
    </div>
  );
}
