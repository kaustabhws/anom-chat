import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MainNav } from "./main-nav";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { AnonLogo } from "./ui/logo";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="md:hidden">
          <button className="relative group">
            <div className="relative flex items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all ring-0 ring-gray-400 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md max-[340px]:w-[40px] max-[340px]:h-[40px]">
              <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 group-focus:-rotate-[45deg] origin-center">
                <div
                  className={`dark:bg-white bg-black h-[2px] w-1/2 rounded transform transition-all duration-300 group-focus:-rotate-90 group-focus:h-[1px] origin-right delay-75 group-focus:-translate-y-[1px]`}
                ></div>
                <div className={`dark:bg-white bg-black h-[1px] rounded`}></div>
                <div
                  className={`dark:bg-white bg-black h-[2px] w-1/2 rounded self-end transform transition-all duration-300 group-focus:-rotate-90 group-focus:h-[1px] origin-left delay-75 group-focus:translate-y-[1px]`}
                ></div>
              </div>
            </div>
          </button>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="px-10">
        <SheetHeader className="flex justify-center flex-row">
          <AnonLogo />
          <h1 className="text-sm font-bold">AnomChat</h1>
        </SheetHeader>
        <div className="mt-10 flex justify-center">
          <MainNav
            className="flex-col gap-5 space-x-0 text-lg items-start"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
