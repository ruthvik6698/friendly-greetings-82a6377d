"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Globe,
  Plus,
  ExternalLink,
  Loader2,
  CheckCircle2,
  Clock,
  Trash2,
} from "lucide-react";
import { ContentPanel } from "@/components/layout/content-panel";
import { useState } from "react";

interface WebSource {
  id: string;
  url: string;
  status: "crawling" | "completed" | "pending";
  pages: number;
  addedAt: string;
}

const mockSources: WebSource[] = [
  { id: "1", url: "https://example.com", status: "completed", pages: 24, addedAt: "2 hours ago" },
  { id: "2", url: "https://docs.example.com", status: "crawling", pages: 8, addedAt: "10 minutes ago" },
];

const statusConfig = {
  completed: { label: "Completed", className: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  crawling: { label: "Crawling...", className: "bg-amber-100 text-amber-700", icon: Loader2 },
  pending: { label: "Pending", className: "bg-gray-100 text-gray-700", icon: Clock },
};

export default function WebsitesPage() {
  const [url, setUrl] = useState("");

  return (
    <ContentPanel>
    <div className="mx-auto max-w-4xl px-8 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Globe className="h-5 w-5 text-blue-600" />
          <h1 className="font-serif text-[28px] leading-[1.2] tracking-[-0.03em]">Website Sources</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Add website URLs to crawl. We&apos;ll extract and index all content for your agent.
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Input
              placeholder="Enter website URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={() => setUrl("")}>
              <Plus className="h-4 w-4 mr-1" />
              Add & Crawl
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            We&apos;ll crawl all pages on this domain and extract text content. Sitemaps are automatically detected.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {mockSources.map((source) => {
          const status = statusConfig[source.status];
          const StatusIcon = status.icon;
          return (
            <Card key={source.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Globe className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{source.url}</p>
                      <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {source.pages} pages indexed &middot; Added {source.addedAt}
                    </p>
                  </div>
                  <Badge className={`${status.className} hover:${status.className}`}>
                    <StatusIcon className={`h-3 w-3 mr-1 ${source.status === "crawling" ? "animate-spin" : ""}`} />
                    {status.label}
                  </Badge>
                  <Button size="icon" variant="ghost">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
    </ContentPanel>
  );
}
