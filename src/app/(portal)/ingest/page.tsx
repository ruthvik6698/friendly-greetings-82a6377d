"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Globe,
  FileText,
  Phone,
  MessageSquare,
  Database,
  Search,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  MoreHorizontal,
  Circle,
  Settings,
  RotateCcw,
  Paperclip,
  Smile,
  Image,
  Mic,
  Bot,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { WebsiteSyncPanel } from "@/components/ingest/website-sync-panel";

const addSourceTypes = [
  { label: "Website", icon: Globe, href: "/ingest/websites", panel: "website" as const },
  { label: "Documents", icon: FileText, href: "/ingest/documents" },
  { label: "Call Recordings", icon: Phone, href: "/ingest/calls" },
  { label: "WhatsApp Chats", icon: MessageSquare, href: "/ingest/whatsapp" },
];

const contentSources = [
  {
    id: "1",
    title: "Website Pages",
    icon: Globe,
    status: "live" as const,
    statusText: "0 Live",
    aiAgent: "—",
  },
  {
    id: "2",
    title: "Uploaded Documents",
    icon: FileText,
    status: "live" as const,
    statusText: "0 Live",
    aiAgent: "—",
  },
  {
    id: "3",
    title: "Call Recordings",
    icon: Phone,
    status: "inactive" as const,
    statusText: "Not configured",
    aiAgent: "—",
  },
  {
    id: "4",
    title: "WhatsApp Conversations",
    icon: MessageSquare,
    status: "inactive" as const,
    statusText: "Not configured",
    aiAgent: "—",
  },
];

export default function IngestPage() {
  const [previewTab, setPreviewTab] = useState<"customer" | "event">("customer");
  const [websitePanelOpen, setWebsitePanelOpen] = useState(false);

  return (
    <>
      {/* Main content panel */}
      <div className="flex-1 overflow-auto rounded-xl bg-white min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div className="flex items-center gap-2.5">
            <Database className="h-[18px] w-[18px] text-muted-foreground" />
            <h1 className="text-[17px] font-semibold">Knowledge Sources</h1>
          </div>
        </div>

        <div className="px-6 py-6">
          {/* Search & Filters */}
          <div className="mb-7 flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9 h-10 text-[14px]" />
            </div>
            <Button variant="outline" size="sm" className="h-10 gap-1.5 px-4 text-[13px]">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Add content */}
          <div className="mb-8">
            <p className="mb-3.5 text-[14px] font-semibold">Add content</p>
            <div className="grid grid-cols-4 gap-3">
              {addSourceTypes.map((source) => {
                const cardContent = (
                  <Card className="h-full rounded-xl transition-colors hover:bg-muted/40 cursor-pointer border-border/60">
                    <CardContent className="px-5 py-5">
                      <source.icon className="mb-4 h-[22px] w-[22px] text-foreground/70" />
                      <p className="text-[14px] font-medium">{source.label}</p>
                    </CardContent>
                  </Card>
                );

                if ("panel" in source && source.panel === "website") {
                  return (
                    <div key={source.label} onClick={() => setWebsitePanelOpen(true)}>
                      {cardContent}
                    </div>
                  );
                }

                return (
                  <Link key={source.label} href={source.href}>
                    {cardContent}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Content sources table */}
          <div>
            <p className="mb-3.5 text-[14px] font-semibold">Content sources</p>
            <div className="rounded-xl border border-border/60">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_180px_120px_48px] items-center gap-4 border-b border-border/60 px-5 py-3">
                <button className="group flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-[#e87537] transition-colors">
                  Title
                  <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <span className="text-[13px] font-medium text-muted-foreground">Status</span>
                <span className="text-[13px] font-medium text-muted-foreground">AI Agent</span>
                <span />
              </div>

              {/* Table rows */}
              {contentSources.map((source) => (
                <div
                  key={source.id}
                  className="grid grid-cols-[1fr_180px_120px_48px] items-center gap-4 border-b last:border-b-0 px-5 py-3.5 hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <source.icon className="h-[18px] w-[18px] text-muted-foreground shrink-0" />
                    <span className="text-[14px]">{source.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {source.status === "live" ? (
                      <Circle className="h-2.5 w-2.5 fill-emerald-500 text-emerald-500" />
                    ) : (
                      <Circle className="h-2.5 w-2.5 fill-gray-300 text-gray-300" />
                    )}
                    <span className="text-[14px] text-muted-foreground">{source.statusText}</span>
                  </div>
                  <span className="text-[14px] text-muted-foreground">{source.aiAgent}</span>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors">
                    <MoreHorizontal className="h-[18px] w-[18px] text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview panel */}
      <div className="flex w-[380px] shrink-0 flex-col rounded-xl bg-white">
        {/* Preview header */}
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="text-[20px] font-semibold tracking-tight">Preview</h2>
          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors">
              <Settings className="h-[18px] w-[18px] text-muted-foreground" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors">
              <RotateCcw className="h-[18px] w-[18px] text-muted-foreground" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors">
              <X className="h-[18px] w-[18px] text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Testing as */}
        <div className="flex items-center gap-3 border-t border-border/40 px-6 py-3.5">
          <span className="text-[13px] text-muted-foreground">Testing as</span>
          <Button variant="outline" size="sm" className="h-8 text-[13px] gap-1.5 rounded-lg font-medium">
            <Bot className="h-3.5 w-3.5" />
            Preview user
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-border/40 px-2">
          <button
            onClick={() => setPreviewTab("customer")}
            className={`px-4 py-3.5 text-[14px] font-medium transition-colors ${
              previewTab === "customer"
                ? "border-b-[2.5px] border-[#e87537] text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Customer view
          </button>
          <button
            onClick={() => setPreviewTab("event")}
            className={`px-4 py-3.5 text-[14px] font-medium transition-colors ${
              previewTab === "event"
                ? "border-b-[2.5px] border-[#e87537] text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Event log
          </button>
        </div>

        {/* Preview content */}
        <div className="flex flex-1 flex-col items-center justify-center px-10 text-center border-t border-border/40">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-muted/60">
            <Bot className="h-7 w-7 text-muted-foreground/70" />
          </div>
          <p className="text-[14px] leading-[1.6] text-muted-foreground">
            Ask your agent a question your customers might ask, to preview its response.
          </p>
        </div>

        {/* Input */}
        <div className="border-t border-border/40 px-5 py-5">
          <div className="rounded-xl border border-border/60 px-4 py-3.5">
            <Input
              placeholder="Ask a question..."
              className="border-0 p-0 h-auto text-[14px] shadow-none focus-visible:ring-0"
            />
            <div className="mt-3 flex items-center gap-1">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors">
                <Paperclip className="h-[18px] w-[18px] text-muted-foreground/60" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors">
                <Smile className="h-[18px] w-[18px] text-muted-foreground/60" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors">
                <Image className="h-[18px] w-[18px] text-muted-foreground/60" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors">
                <Mic className="h-[18px] w-[18px] text-muted-foreground/60" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Website sync slide panel */}
      <WebsiteSyncPanel open={websitePanelOpen} onClose={() => setWebsitePanelOpen(false)} />
    </>
  );
}
