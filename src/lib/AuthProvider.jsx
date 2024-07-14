"use client";
import { useAuthStore } from "../store/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthWrapper({children} ) {
  const router = useRouter();
  const auth = useAuthStore((state) => state.auth);

  useEffect(() => {
    if (auth.isAuth){
        router.push("/")
    }else{
        router.push("/auth/signin")
    };
  }, [auth, router]);

  return <>{children}</>;
}

