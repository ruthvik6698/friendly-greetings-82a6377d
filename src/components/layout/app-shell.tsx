"use client";

import { Sidebar } from "./sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#f0eeeb] p-2 gap-2">
      <Sidebar />
      {children}
    </div>
  );
}
