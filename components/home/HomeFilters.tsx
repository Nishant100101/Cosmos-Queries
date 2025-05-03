"use client";

import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";

const HomeFilters = () => {
  const active = "newest";
  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item, idx) => (
        <Button
          key={idx}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow ${
            active === item.value
              ? "text-dark100_light900 bg-primary-100 text-light-900 hover:bg-primary-100 dark:bg-primary-100 dark:text-light-900 dark:hover:bg-dark-100"
              : "bg-light-800 text-primary-100 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          }`}
          //   onClickCapture={() => handleTypeClick(item.value)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
