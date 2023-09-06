"use client";

import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";
import ErrorContainer from "./ErrorContainer";

interface Props {
  children: ReactNode;
}

const CheckAuth = ({ children }: Props) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <ErrorContainer />
  }

  return <>{children}</>;
};

export default CheckAuth;
