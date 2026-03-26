"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, CheckCircle2, AlertTriangle, Eye, Shield, Globe, FileText, Phone, MessageSquare } from "lucide-react";
import { ContentPanel } from "@/components/layout/content-panel";
import { useState } from "react";

interface KnowledgeItem {
  id: string; title: string; content: string;
  source: "website" | "document" | "call" | "whatsapp";
  sensitive: boolean; approved: boolean; tags: string[];
}

const mockItems: KnowledgeItem[] = [
  { id: "1", title: "Business Hours", content: "Our office is open Monday to Friday, 9 AM to 6 PM IST.", source: "website", sensitive: false, approved: true, tags: ["hours", "general"] },
  { id: "2", title: "Pricing - Enterprise Plan", content: "Enterprise plan starts at $499/month with custom features.", source: "document", sensitive: true, approved: false, tags: ["pricing", "enterprise"] },
  { id: "3", title: "Return Policy", content: "30-day return policy for all products. Refunds in 5-7 business days.", source: "website", sensitive: false, approved: true, tags: ["returns", "policy"] },
  { id: "4", title: "Customer Complaint Resolution", content: "When a customer escalates, transfer to human agent.", source: "call", sensitive: true, approved: false, tags: ["escalation", "complaints"] },
  { id: "5", title: "Product Setup Steps", content: "1. Download the app  2. Create account  3. Enter license key.", source: "whatsapp", sensitive: false, approved: true, tags: ["setup", "product"] },
];

const sourceIcons = { website: Globe, document: FileText, call: Phone, whatsapp: MessageSquare };

export default function KnowledgePage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.content.toLowerCase().includes(search.toLowerCase());
    if (filter === "sensitive") return matchesSearch && item.sensitive;
    if (filter === "approved") return matchesSearch && item.approved;
    if (filter === "pending") return matchesSearch && !item.approved;
    return matchesSearch;
  });

  return (
    <ContentPanel>
    <div className="mx-auto max-w-4xl px-8 py-10">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="h-5 w-5 text-amber-600" />
            <h1 className="font-serif text-[28px] leading-[1.2] tracking-[-0.03em]">Knowledge Base</h1>
          </div>
          <p className="text-sm text-muted-foreground">Review extracted knowledge. Approve or flag sensitive items.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">{mockItems.filter((i) => i.approved).length} Approved</Badge>
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">{mockItems.filter((i) => !i.approved).length} Pending</Badge>
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">{mockItems.filter((i) => i.sensitive).length} Sensitive</Badge>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <Input placeholder="Search knowledge base..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="sensitive">Sensitive</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-3">
        {filtered.map((item) => {
          const SourceIcon = sourceIcons[item.source];
          return (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 shrink-0">
                    <BookOpen className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold">{item.title}</p>
                      {item.sensitive && <Badge className="bg-red-100 text-red-700 hover:bg-red-100"><Shield className="h-3 w-3 mr-1" /> Sensitive</Badge>}
                      {item.approved ? (
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100"><CheckCircle2 className="h-3 w-3 mr-1" /> Approved</Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100"><AlertTriangle className="h-3 w-3 mr-1" /> Pending</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.content}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline"><SourceIcon className="h-3 w-3 mr-1" /> {item.source}</Badge>
                      {item.tags.map((tag) => (
                        <span key={tag} className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {!item.approved && (
                      <Button size="sm" variant="ghost" className="text-emerald-600">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Approve
                      </Button>
                    )}
                    <Button size="icon" variant="ghost"><Eye className="h-4 w-4" /></Button>
                  </div>
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
