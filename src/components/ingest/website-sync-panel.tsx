"use client";

import { useState } from "react";
import { SlidePanel } from "@/components/ui/slide-panel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Globe,
  CornerDownRight,
  CheckCircle2,
  Loader2,
  Trash2,
  ExternalLink,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = ["Connect", "Pages", "Target", "Review"] as const;
type Tab = (typeof tabs)[number];

interface CrawledPage {
  url: string;
  path: string;
  status: "completed" | "crawling" | "pending";
  pages: number;
}

const mockCrawledPages: CrawledPage[] = [
  { url: "https://example.com", path: "/help", status: "completed", pages: 24 },
];

const mockSubPages = [
  { path: "/help/faq", label: "app.com/help/faq" },
  { path: "/help/account", label: "app.com/help/account" },
  { path: "/help/billing", label: "app.com/help/billing" },
];

interface WebsiteSyncPanelProps {
  open: boolean;
  onClose: () => void;
}

export function WebsiteSyncPanel({ open, onClose }: WebsiteSyncPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Connect");
  const [websiteUrl, setWebsiteUrl] = useState("");

  return (
    <SlidePanel open={open} onClose={onClose} title="Sync website" learnMoreHref="#">
      {/* Tabs */}
      <div className="flex border-b border-border/60 px-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-3 text-[14px] font-medium transition-colors",
              activeTab === tab
                ? "border-b-[2.5px] border-[#e87537] text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 flex flex-col">
        {activeTab === "Connect" && (
          <div className="flex-1 flex flex-col p-6">
            {/* Browser mockup */}
            <div className="rounded-xl border border-border/60 overflow-hidden mb-8">
              {/* Browser chrome */}
              <div className="bg-gradient-to-b from-gray-100 to-gray-50 px-4 py-3 flex items-center gap-3 border-b border-border/40">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                  <div className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                  <div className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                </div>
                <div className="flex-1 flex items-center gap-2 bg-white rounded-lg px-3 py-1.5 border border-border/40">
                  <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-[13px] text-foreground">app.com/help</span>
                </div>
              </div>

              {/* Page tree */}
              <div className="bg-white p-4 space-y-1">
                {mockSubPages.map((page) => (
                  <div key={page.path} className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted/30 transition-colors">
                    <CornerDownRight className="h-4 w-4 text-muted-foreground/50" />
                    <span className="text-[14px] text-muted-foreground">{page.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main website link */}
            <div className="space-y-2">
              <h3 className="text-[14px] font-semibold">Main website link</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                The top-level URL to your Help Center or docs. This page and all the sub-pages will be synced.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-2 flex-1 rounded-lg border border-border/60 px-3 py-2.5">
                  <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="flex-1 text-[14px] outline-none bg-transparent"
                    placeholder="https://app.com/help"
                  />
                </div>
              </div>
            </div>

            {/* Spacer + Next button */}
            <div className="mt-auto pt-6 flex justify-end">
              <Button
                onClick={() => setActiveTab("Pages")}
                className="px-6 text-[14px]"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {activeTab === "Pages" && (
          <div className="flex-1 flex flex-col p-6">
            <div className="mb-6">
              <h3 className="text-[14px] font-semibold mb-2">Discovered pages</h3>
              <p className="text-[13px] text-muted-foreground">
                We found these pages on your website. Select which ones to include.
              </p>
            </div>

            <div className="space-y-2">
              {["/help", "/help/faq", "/help/account", "/help/billing", "/help/contact"].map(
                (page) => (
                  <label
                    key={page}
                    className="flex items-center gap-3 rounded-lg border border-border/60 px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-[#e87537]" />
                    <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-[14px]">app.com{page}</span>
                  </label>
                )
              )}
            </div>

            <div className="mt-auto pt-6 flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("Connect")} className="text-[14px]">
                Back
              </Button>
              <Button onClick={() => setActiveTab("Target")} className="px-6 text-[14px]">
                Next
              </Button>
            </div>
          </div>
        )}

        {activeTab === "Target" && (
          <div className="flex-1 flex flex-col p-6">
            <div className="mb-6">
              <h3 className="text-[14px] font-semibold mb-2">Target audience</h3>
              <p className="text-[13px] text-muted-foreground">
                Choose who can access this content through your agent.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { label: "Everyone", description: "All users can access this content" },
                { label: "Logged-in users only", description: "Only authenticated users" },
                { label: "Specific segments", description: "Target specific user groups" },
              ].map((option) => (
                <label
                  key={option.label}
                  className="flex items-start gap-3 rounded-lg border border-border/60 px-4 py-3.5 hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <input
                    type="radio"
                    name="target"
                    defaultChecked={option.label === "Everyone"}
                    className="mt-0.5 h-4 w-4 accent-[#e87537]"
                  />
                  <div>
                    <p className="text-[14px] font-medium">{option.label}</p>
                    <p className="text-[13px] text-muted-foreground">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-auto pt-6 flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("Pages")} className="text-[14px]">
                Back
              </Button>
              <Button onClick={() => setActiveTab("Review")} className="px-6 text-[14px]">
                Next
              </Button>
            </div>
          </div>
        )}

        {activeTab === "Review" && (
          <div className="flex-1 flex flex-col p-6">
            <div className="mb-6">
              <h3 className="text-[14px] font-semibold mb-2">Review & sync</h3>
              <p className="text-[13px] text-muted-foreground">
                Review your configuration before syncing.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-border/60 p-4">
                <p className="text-[13px] text-muted-foreground mb-1">Website URL</p>
                <p className="text-[14px] font-medium">{websiteUrl}</p>
              </div>
              <div className="rounded-lg border border-border/60 p-4">
                <p className="text-[13px] text-muted-foreground mb-1">Pages to sync</p>
                <p className="text-[14px] font-medium">5 pages selected</p>
              </div>
              <div className="rounded-lg border border-border/60 p-4">
                <p className="text-[13px] text-muted-foreground mb-1">Target audience</p>
                <p className="text-[14px] font-medium">Everyone</p>
              </div>
            </div>

            <div className="mt-auto pt-6 flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("Target")} className="text-[14px]">
                Back
              </Button>
              <Button onClick={onClose} className="px-6 text-[14px]">
                Start sync
              </Button>
            </div>
          </div>
        )}
      </div>
    </SlidePanel>
  );
}
