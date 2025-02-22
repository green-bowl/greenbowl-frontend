"use client";

import imagePath from "@/constants/imagePath";
import route from "@/constants/route";
import { useHeaderStore } from "@/store/headerStore";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const noneHeaderRoutes: string[] = [
  route.myFridge.addIngredient,
  route.diet.root,
  route.diet.test,
];

const MainHeader = () => {
  const { headerType, setHeaderType } = useHeaderStore();
  const path = usePathname() as string;
  const isNoneHeader = noneHeaderRoutes.includes(path);

  useEffect(() => {
    setHeaderType(isNoneHeader ? "none" : "show");
  }, [isNoneHeader, setHeaderType]);

  return (
    <>
      {headerType === "show" && (
        <header className=" h-[3.375rem] w-full max-w-[37.5rem] flex items-center justify-between fixed z-30 bg-foundation-quarternary">
          <Link href={"/myFridge"}>
            <Image
              className=" hover:cursor-pointer"
              src={imagePath.logo.src}
              alt={imagePath.logo.alt}
              height={12}
              width={118}
            />
          </Link>
          <Image
            className=" hover:cursor-pointer"
            src={imagePath.profile.src}
            alt={imagePath.profile.alt}
            height={32}
            width={32}
          />
        </header>
      )}
    </>
  );
};

export default MainHeader;
