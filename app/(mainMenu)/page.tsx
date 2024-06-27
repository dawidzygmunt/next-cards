"use client";

import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MainMenu = () => {
  return (
    <>
      <BackgroundGradientAnimation />
      <div className="absolute inset-0 items-center justify-center text-white font-bold px-4 text-3xl text-center md:text-4xl lg:text-7xl flex flex-col">
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 mb-20">
          Prawda chodzi boso
        </p>
        <div className="flex flex-col text-2xl gap-2">
          <Link href="/newGame">
            <Button className="w-[300px] py-6">Nowa gra</Button>
          </Link>

          <Link href="/main">
            <Button className="w-[300px] py-6">Kontynuj</Button>
          </Link>

          <Link href="/admin/dashboard">
            <Button className="w-[300px] py-6">Ustawienia</Button>
          </Link>

          <Link href="/credits">
            <Button className="w-[300px] py-6 ">Credits</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MainMenu;
