import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/layout/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

function RootComponent() {
  return (
    <ConvexClientProvider>
      <TooltipProvider>
        <div className="flex h-screen bg-[#f0eeeb] p-2 gap-2">
          <Sidebar />
          <Outlet />
        </div>
      </TooltipProvider>
    </ConvexClientProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    meta: [
      { title: "Partner Portal - AI Agent Builder" },
      { name: "description", content: "Build AI-powered WhatsApp agents from your business data" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  notFoundComponent: () => (
    <main className="flex-1 overflow-y-auto rounded-xl bg-white min-w-0 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">404 — Page Not Found</h1>
        <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
      </div>
    </main>
  ),
});
