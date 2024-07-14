"use client";

import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { Button } from "./Button";

function Navbar() {
  const storeSignout = useAuthStore((state) => state.signOut);
  return (
    <div className="navbar bg-base-100 flex flex-row   justify-between items-center sticky top-0 z-50 w-full">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          {" "}
          <img
            src="https://www.skillsbuildcsrbox.in/assets/img/skillbuildlogo.png"
            className="w-64 p-4  "
            id="IBMLogo"
            alt=""
          />
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <div>
              <button
                className={`transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300  py-2 px-5 bg-blue-800 text-white rounded-lg `}
                onClick={() => storeSignout()}
              >
                Signout
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
