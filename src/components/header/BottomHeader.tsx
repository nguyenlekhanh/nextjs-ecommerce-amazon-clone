'use client';

import { removeUser } from "@/app/store/nextSlice";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { LuMenu } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

const BottomHeader = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: StateProps) => state.next);
  const [userInfoState, setUserInfoState] = useState<UserInfoProps[]>();

  useEffect(() => {
    //we need to do that because nextjs will jell client/server for getting data from react redux
    //Error: async/await is not yet supported in Client Components, only Server Components.
    setUserInfoState(userInfo);
  }, [userInfo]);

  const handleSignOut = () => {
    signOut();
    dispatch(removeUser());
  };

  return (
    <div className="w-full h-10 bg-amazon_light text-sm text-white px-4 flex items-center">
      <p className="flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        <LuMenu className="text-xl" /> All
      </p>
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Todays Deals
      </p>
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Customer Service
      </p>
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Registry
      </p>
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Gift Cards
      </p>
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Sell
      </p>
      {userInfoState && (
        <button
          onClick={handleSignOut}
          className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-red-600 hover:text-red-400 text-amazon_yellow cursor-pointer duration-300"
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default BottomHeader;
