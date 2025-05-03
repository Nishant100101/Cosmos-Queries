"use client";

import { sidebarLinks } from "@/constants";
import { SignedOut, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const LeftSidebar = () => {
  const pathName = usePathname();

  const { userId } = useAuth();
  return (
    <section className="background-light900_dark200 custom-scrollbar light-border sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((items) => {
          const isActive =
            (pathName.includes(items.route) && items.route.length > 1) ||
            pathName === items.route;

          if (items.route === "/profile") {
            if (userId) {
              items.route = `${items.route}/${userId}`;
            } else {
              return null;
            }
          }
          return (
            <Link
              key={items.label}
              className={`
                ${isActive ? "primary-gradient rounded-xl text-light-900" : "text-dark300_light900"}
                flex items-center justify-start gap-4 bg-transparent p-4`}
              href={items.route}
            >
              <Image
                src={items.imgURL}
                width={20}
                height={20}
                alt={items.label}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p
                className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden`}
              >
                {items.label}
              </p>
            </Link>
          );
        })}
      </div>

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="btn-secondary min-h-10 w-full rounded-xl px-4 py-3 text-base font-bold shadow-none">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="text-primary-500 transition-all duration-300 ease-linear dark:text-[#6c5ba2] max-lg:hidden">
                Log In
              </span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="btn-tertiary text-dark400_light900 light-border-2 min-h-10 w-full rounded-xl px-4 py-3 text-base font-bold shadow-none">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Sign Up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
