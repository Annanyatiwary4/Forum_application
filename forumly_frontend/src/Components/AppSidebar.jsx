"use client";
import React, { useState,useEffect } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

import { useNavigate } from "react-router-dom";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";


export function AppSidebar({ children }) {

  const navigate=useNavigate();

  const [username, setUsername] = useState("");

  // Fetch logged-in username from localStorage (or wherever you store it)
  useEffect(() => {
    const user = localStorage.getItem("username"); // must match your login storage
    if (user) setUsername(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");    // remove JWT token
    localStorage.removeItem("username"); // remove stored username
    navigate("/login");                // redirect to login page
  };

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-amber-200" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-amber-200" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-amber-200" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-amber-200" />
      ),
      onClick: handleLogout,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex h-screen w-full flex-col md:flex-row",
        "border border-amber-200/40 bg-slate-950 text-amber-200"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} className="bg-slate-950">
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  onClick={link.onClick} //handle logout
                  className="hover:bg-gray-400   hover:text-slate-950 transition-colors"
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: username || "User", //display username
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 shrink-0 rounded-full border border-amber-200/40"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <main className="flex-1 overflow-y-auto bg-slate-950">{children}</main>
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-amber-200"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-slate-950 border border-amber-200" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-amber-200"
      >
        FORUMLY
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-amber-200"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-slate-950 border border-amber-200" />
    </a>
  );
};