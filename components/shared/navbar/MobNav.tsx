"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathname = usePathname();

  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-xl text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </>
  );
};

const MobNav = () => {
  return (
    <Sheet>
      {/* Hamburger */}
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="background-light900_dark200 no-scrollbar flex flex-col border-none"
      >
        <Link href="/" className="flex items-center gap-1 py-3">
          <Image
            src="/assets/images/site-logo.svg"
            alt="Cosmos Queries"
            width={40}
            height={40}
          />
          <p className="h3-bold text-dark100_light900 font-spaceGrotesk">
            Cosmos
            <span className="text-primary-500">Queries</span>
          </p>
        </Link>

        <div className="flex h-full flex-col justify-between overflow-y-auto border-none py-1">
          <section className="flex flex-col gap-6 pb-1">
            <NavContent />
          </section>

          <SignedOut>
            <div className="flex flex-col gap-3 align-bottom">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="btn-secondary min-h-[41px] w-full rounded-xl px-4 py-3 text-base font-bold shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className="light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-xl border px-4 py-3 text-base font-bold shadow-none">
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobNav;
