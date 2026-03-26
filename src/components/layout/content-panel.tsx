export function ContentPanel({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 overflow-y-auto rounded-xl bg-white min-w-0">
      {children}
    </main>
  );
}
