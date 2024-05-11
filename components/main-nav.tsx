"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  isOpen,
  setIsOpen,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/`,
      label: "Home",
      active: pathname === `/`,
    },
    {
      href: `/create`,
      label: "Create",
      active: pathname === `/create`,
    },
    {
      href: `/profile`,
      label: "Profile",
      active: pathname === `/profile`,
    },
    {
      href: `/login`,
      label: "Login",
      active: pathname === `/login`,
    },
  ];

  return (
    <nav className={cn("flex items-center lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "transition-colors hover:text-primary",
            "text-black dark:text-white",
            `${route.label == 'Login' && '!text-gray-500 cursor-not-allowed pointer-events-none'} ${route.label == 'Profile' && '!text-gray-500 cursor-not-allowed pointer-events-none'}`,
            className
          )}
          onClick={() => {
            if (setIsOpen) {
              setIsOpen(!isOpen);
            }
          }}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
