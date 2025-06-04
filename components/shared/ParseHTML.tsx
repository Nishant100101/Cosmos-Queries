"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";

import Prism from "prismjs";
import parse from "html-react-parser";

import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-aspnet";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-solidity";
import "prismjs/components/prism-json";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-r";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-go";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-mongodb";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

interface Props {
  data: string;
}

const ParseHTML = ({ data }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="flex flex-col space-y-3">
        <div className="space-y-2">
          <Skeleton className="background-light800_dark300 h-6 w-full  rounded" />
          <Skeleton className="background-light800_dark300 h-6 w-full  rounded" />
        </div>
        <div className="space-y-2">
          <Skeleton className="background-light800_dark300 h-6 w-full  rounded" />
          <Skeleton className="background-light800_dark300 h-[125px] w-full rounded" />
          <Skeleton className="background-light800_dark300 h-6 w-full  rounded" />
          <Skeleton className="background-light800_dark300 h-6 w-full  rounded" />
        </div>
      </div>
    );

  return <div className={"markdown w-full min-w-full"}>{parse(data)}</div>;
};

export default ParseHTML;
