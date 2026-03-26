"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Database,
  Settings2,
  FlaskConical,
  Rocket,
  BarChart3,
  Globe,
  FileText,
  Phone,
  MessageSquare,
  Brain,
  GitBranch,
  Tags,
  BookOpen,
  ChevronRight,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  children?: { label: string; href: string; icon: React.ElementType }[];
}

const navItems: NavItem[] = [
  {
    label: "Get started",
    href: "/",
    icon: Sparkles,
  },
  {
    label: "Ingest",
    href: "/ingest",
    icon: Database,
    children: [
      { label: "Knowledge Sources", href: "/ingest", icon: BookOpen },
      { label: "Websites", href: "/ingest/websites", icon: Globe },
      { label: "Documents", href: "/ingest/documents", icon: FileText },
      { label: "Call Recordings", href: "/ingest/calls", icon: Phone },
      { label: "WhatsApp Chats", href: "/ingest/whatsapp", icon: MessageSquare },
    ],
  },
  {
    label: "Configure",
    href: "/configure",
    icon: Settings2,
    children: [
      { label: "Intents", href: "/configure/intents", icon: Brain },
      { label: "Flows", href: "/configure/flows", icon: GitBranch },
      { label: "Knowledge Base", href: "/configure/knowledge", icon: BookOpen },
      { label: "Tags", href: "/configure/tags", icon: Tags },
    ],
  },
  {
    label: "Test",
    href: "/test",
    icon: FlaskConical,
  },
  {
    label: "Deploy",
    href: "/deploy",
    icon: Rocket,
  },
  {
    label: "Analyze",
    href: "/analyze",
    icon: BarChart3,
  },
];

const bottomItems: NavItem[] = [
  {
    label: "Bot Settings",
    href: "/settings",
    icon: Workflow,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(["Ingest", "Configure"]);

  const toggleSection = (label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="flex h-full w-[240px] shrink-0 flex-col rounded-xl bg-white">
      {/* Brand */}
      <div className="px-5 pt-5 pb-4">
        <p className="text-[15px] font-semibold tracking-tight">Partner Portal</p>
        <p className="text-[12px] text-muted-foreground mt-0.5">AI Agent Builder</p>
      </div>

      {/* Main nav */}
      <ScrollArea className="flex-1">
        <nav className="px-3 pt-1 pb-3">
          <ul className="space-y-0.5">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleSection(item.label)}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-lg px-3 py-[7px] text-[13px] font-medium transition-colors hover:bg-accent",
                        isActive(item.href) && "text-foreground"
                      )}
                    >
                      <item.icon className="h-[16px] w-[16px] shrink-0 text-muted-foreground" />
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronRight
                        className={cn(
                          "h-3.5 w-3.5 text-muted-foreground/60 transition-transform duration-150",
                          expandedSections.includes(item.label) && "rotate-90"
                        )}
                      />
                    </button>
                    {expandedSections.includes(item.label) && (
                      <ul className="mt-0.5 space-y-0.5">
                        {item.children.map((child) => {
                          const childActive =
                            child.href === item.href
                              ? pathname === item.href
                              : isActive(child.href);
                          return (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={cn(
                                  "flex items-center gap-2.5 rounded-lg py-[6px] pl-8 pr-3 text-[13px] transition-colors hover:bg-accent",
                                  childActive
                                    ? "bg-accent font-medium text-foreground"
                                    : "text-muted-foreground"
                                )}
                              >
                                <child.icon className="h-[15px] w-[15px] shrink-0" />
                                <span>{child.label}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-[7px] text-[13px] font-medium transition-colors hover:bg-accent",
                      isActive(item.href) ? "bg-accent text-foreground" : "text-muted-foreground"
                    )}
                  >
                    <item.icon className="h-[16px] w-[16px] shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>

      {/* Bottom nav */}
      <div className="border-t border-border/40 px-3 py-3">
        <ul className="space-y-0.5">
          {bottomItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-[7px] text-[13px] font-medium transition-colors hover:bg-accent",
                  isActive(item.href) ? "bg-accent text-foreground" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-[16px] w-[16px] shrink-0" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
