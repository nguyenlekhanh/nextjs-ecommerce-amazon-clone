'use client';

import React, { useEffect, useState } from "react";
import logo from "@/images/logo.png";
import cartIcon from "@/images/cartIcon.png";
import Image from "next/image";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlineSearch } from "react-icons/hi";
import { BiCaretDown } from "react-icons/bi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addUser, removeUser } from "@/app/store/nextSlice";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {productData, favoriteData, userInfo} = useSelector((state:StateProps) => state.next);
  const [productDataState, setProductDataState] = useState<ProductProps>();
  const [favoriteDataState, setFavoriteDataState] = useState<ProductProps>();

  const { data: session } = useSession();

  useEffect(() => {
    // Error: Text content does not match server-rendered HTML.
    // Warning: Text content did not match. Server: "0" Client: "4"
    // See more info here: https://nextjs.org/docs/messages/react-hydration-error
    // because we use localstorage from store in Header.tsx so we need to use this way or use useEffect inside Header.tsx
    setProductDataState(productData);
    setFavoriteDataState(favoriteData);
  }, [productData, favoriteData]);

  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        })
      );
    } else {
      dispatch(
        removeUser()
      );
    }
  }, [session]);

  const signInHandler = () => {
    router.push('/login');
  };

  return (
    <div suppressHydrationWarning={true} className="w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50">
      <div className="h-full w-full mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4">
        {/* logo */}
        <Link href="/"
          className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]"
        >
          <Image className="w-28 object-cover mt-1" src={logo} alt="logo" />
        </Link>
        {/* deliver */}
        <div
          className="px-2 border border-transparent hover:border-white 
              cursor-pointer duration-300 flex items-center justify-center h-[70%]
              hidden xl:inline-flex gap-1  
            "
        >
          <SlLocationPin />
          <div className="text-xs">
            <p>Deliver to</p>
            <p className="text-white font-bold uppercase">USA</p>
          </div>
        </div>
        {/* searchbar */}
        <div
          className="flex-1 h-10 hidden md:inline-flex items-center 
                      justify-between relative
                    "
        >
          <input
            type="text"
            placeholder="Search "
            className="w-full h-full rounded-md px-2 placeholder:text-sm text-base
                     text-black border-[3px] border-transparent outline-none
                     forcus-visible:border-amazon_yellow
                  "
          />
          <span
            className="w-12 h-full bg-amazon_yellow text-black text-2xl
                        flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md
            "
          >
            <HiOutlineSearch />
          </span>
        </div>
        {/* signin */}
        {userInfo ? (
          <div className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] gap-1">
            <img
              src={userInfo.image}
              alt="userImage"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-xs text-gray-100 flex flex-col justify-between">
              <p className="text-white font-bold">{userInfo.name}</p>
              <p>{userInfo.email}</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => signIn()}
            className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"
          >
            <p>Hello, sign in</p>
            <p className="text-white font-bold flex items-center">
              Account & Lists{" "}
              <span>
                <BiCaretDown />
              </span>
            </p>
          </div>
        )}
        {/* favorite */}
        <div
          onClick={() => router.push('/favorite')}
          className="text-gray-100 flex flex-col justify-center px-2
              border border-transparent hover:border-white cursor-pointer duration-300
              h-[70%] relative"
        >
          <p>Marked</p>
          <p className="text-white font-bold">& Favorite</p>
          <span 
            className="absolute right-2 top-2 w-4 h-4 border-[1px] border-gray-400 flex items-center justify-center text-xs text-amazon_yellow">
             {favoriteDataState ? favoriteDataState.length : 0}
          </span>
        </div>

        {/* car */}
        <Link className="
              flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300
              h-[70%] relative"
          href="/cart"
        >
          <Image src={cartIcon} alt="cart" 
            className="w-auto object-cover h-8"
          />
          <p className="text-xs text-white font-bold mt-3">Cart</p>
          <span 
            className="absolute text-amazon_yellow text-sm top-2 left-[29px] font-semibold"
          >
            {productData ? productData.length : 0}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
