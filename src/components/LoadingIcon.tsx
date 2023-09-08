'use client';

// import { useRouter } from 'next/router';
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef  } from 'react'
import { useDispatch } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner'

import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { setLoadingIcon } from "@/app/store/nextSlice";
import { useNavigationEvent } from "@/hooks/useNavigationChange";

const LoadingIcon = () => {
  const dispatch = useDispatch();
  const [isLoadingParam, setIsLoadingParam] = useState(false);

  const { isLoading } = useSelector((state:StateProps) => state.next);

  useNavigationEvent(() => dispatch(setLoadingIcon(false)));

  useEffect(() => {
    setIsLoadingParam(isLoading);
  }, [isLoading]);

  // const pathname = usePathname(); // Get current route

  // // Save pathname on component mount into a REF
  // const savedPathNameRef = useRef(pathname);

  // useEffect(() => {
  //   // If REF has been changed, do the stuff
  //   if (savedPathNameRef.current !== pathname) {
  //     dispatch(setLoadingIcon(false));
  //     // Update REF
  //     savedPathNameRef.current = pathname;
  //   }
  // }, [pathname]);

  return (
    <div className="text-left fixed z-[9999] top-1 right-1">
      {isLoadingParam && <RotatingLines
          strokeColor="white"
          strokeWidth="5"
          animationDuration="0.75"
          width="30"
          visible={true}
        />
      }
    </div>
  )
}

export default LoadingIcon