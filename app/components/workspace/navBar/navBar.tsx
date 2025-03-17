import { HiMiniUser } from "react-icons/hi2";
export default function NavBar() {
  return (
    <div className="ml-4 my-4 bg-white rounded-2xl flex-column px-2 py-4 shadow-lg">
      <div className="rounded-full border-[2px] border-green-500">
        <HiMiniUser className="w-10 h-10 text-green-500 " />
      </div>
    </div>
  );
}
