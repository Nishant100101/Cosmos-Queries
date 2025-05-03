"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { /* usePathname, useRouter, */ useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

// route,
const LocalSearchbar = ({
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: Props) => {
  // const router = useRouter();
  // const pathName = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");
  const [Search, setSearch] = useState(query || "");

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value={Search}
        onChange={(e) => setSearch(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchbar;
