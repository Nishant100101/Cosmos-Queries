import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import GlobalSearch from "../search/GlobalSearch";
import MobNav from "./MobNav";
import Theme from "./Theme";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow shadow-gray-200 dark:shadow dark:shadow-black sm:px-12">
      <Link href="/" className="flex select-none items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          alt="Cosmos Queries"
          width={40}
          height={40}
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Cosmos
          <span className="text-primary-500">Queries</span>
        </p>
      </Link>

      {/* GlobalSearch */}
      <GlobalSearch />

      <div className="flex-between gap-5">
        <Theme />
        <SignedIn>
          <UserButton
            appearance={{
              elements: { avatarBox: "h-10 w-10" },
              variables: { colorPrimary: "#ff7000" },
            }}
          />
        </SignedIn>
        <MobNav />
      </div>
    </nav>
  );
};

export default Navbar;
