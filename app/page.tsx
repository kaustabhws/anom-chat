import Posts from "@/components/posts";
import Image from "next/image";

export default function Home() {
  return (
    <div className="pt-16 min-h-screen max-[640px]:pt-10">
      <div className='lg:w-4/6 md:w-5/6 pt-28 px-4 mx-auto max-[240px]:px-1'>
        <Posts />
      </div>
    </div>
  );
}
