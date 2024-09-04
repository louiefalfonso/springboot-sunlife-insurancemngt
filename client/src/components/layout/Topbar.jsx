import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const Topbar = ({ toggleSidebarCollapse }) => {

    const API_BASE_URL = import.meta.env.VITE_BASE_URI_AUTH;

    const handleLogout = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You are not logged in.");
          return;
        }
        const response = await axios.post(`${API_BASE_URL}/logout`, {
          token,
        });
        localStorage.removeItem("token");
        toast.success("Logout successful!");
        window.location.href = "/login";
      } catch (error) {
        toast.error("Error logging out.");
      }
    };

   return (
     <>
       <div className="bg-white dark:bg-darklight dark:border-darkborder flex gap-4 lg:z-10 items-center justify-between px-4 h-[60px] border-b border-black/10 detached-topbar relative">
         <div className="flex items-center flex-1 gap-2 sm:gap-4">
           <button
             type="button"
             className="text-black dark:text-white/80"
             onClick={toggleSidebarCollapse}
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24"
               className="w-6 h-6"
             >
               <path
                 d="M3 4H21V6H3V4ZM3 11H15V13H3V11ZM3 18H21V20H3V18Z"
                 fill="currentColor"
               ></path>
             </svg>
           </button>
           <form className="flex-1 hidden min-[420px]:block">
             <div className="relative max-w-[180px] md:max-w-[350px]">
               <input
                 type="text"
                 id="search"
                 className="border-black/10 dark:text-white/80 dark:placeholder:text-white/30 dark:border-darkborder dark:bg-dark dark:focus:border-white/30 focus:border-black/30 placeholder:text-black/50 border text-black text-sm rounded block w-full ltr:pl-3 rtl:pr-3 ltr:pr-7 rtl:pl-7 h-10 bg-[#f9fbfd] focus:ring-0 focus:outline-0"
                 placeholder="Search..."
                 required
               />
             </div>
           </form>
         </div>
         <div className="flex items-center gap-4">
           <Link
             onClick={handleLogout}
             className="flex items-center gap-2 text-yellow-500 dark:text-white"
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24"
               className="w-4 h-4"
             >
               <path
                 d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"
                 fill="currentColor"
               ></path>
             </svg>
             Sign Out
           </Link>
         </div>
       </div>
     </>
   );
};

export default Topbar;
