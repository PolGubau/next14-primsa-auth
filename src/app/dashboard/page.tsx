"use client";
import { signOut } from "next-auth/react";
export default function DashboardPage() {
  const handleLogout = async () => {
    signOut();
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl text-slate-400 font-bold">Dashboard</h1>
      <button
        onClick={handleLogout}
        className=" rounded-lg text-lg px-4 py-2 focus:outline-none  transition-all text-white
        bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
      >
        Logout
      </button>
    </main>
  );
}
