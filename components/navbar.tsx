"use client";

import { useState } from "react";
import { MainNav } from "./main-nav";
import { ModeToggle } from "./toggle-mode";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { AnonLogo } from "./ui/logo";
import MobileNav from "./mobile-nav";
import Link from "next/link";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 90) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="border-b fixed w-full backdrop-blur-md"
    >
      <div className="flex h-16 items-center justify-between px-4 max-[272px]:px-1 lg:w-4/6 md:w-4/5 mx-auto">
        <div className="hidden max-[480px]:block">
          <MobileNav />
        </div>
        <Link href="/">
          <div className="flex items-center justify-center">
            <AnonLogo />
            <h1 className="text-sm font-bold">AnomChat</h1>
          </div>
        </Link>
        <div className="block max-[480px]:hidden">
          <MainNav className="mx-6 space-x-4 text-sm font-medium" />
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
