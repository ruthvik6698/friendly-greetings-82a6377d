"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Upload,
  Trash2,
  CheckCircle2,
  Loader2,
  Users,
  Brain,
} from "lucide-react";
import { ContentPanel } from "@/components/layout/content-panel";

const mockChats = [
  { id: "1", name: "Customer Support Group", messageCount: 1248, status: "completed" as const, intentsFound: 8, uploadedAt: "1 day ago" },
  { id: "2", name: "Sales Inquiries", messageCount: 456, status: "processing" as const, intentsFound: 0, uploadedAt: "30 minutes ago" },
];

export default function WhatsAppPage() {
  return (
    <ContentPanel>
    <div className="mx-auto max-w-4xl px-8 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <MessageSquare className="h-5 w-5 text-emerald-600" />
          <h1 className="font-serif text-[28px] leading-[1.2] tracking-[-0.03em]">WhatsApp Conversations</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Import exported WhatsApp chats to learn from real customer interactions.
        </p>
      </div>

      <Card className="mb-6 border-2 border-dashed cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors">
        <CardContent className="p-8 text-center">
          <MessageSquare className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <p className="text-sm font-medium">Upload WhatsApp chat export</p>
          <p className="mt-1 text-xs text-muted-foreground">Export chats from WhatsApp and upload the .txt or .zip file</p>
          <Button className="mt-4" variant="outline" size="sm">
            <Upload className="h-3.5 w-3.5 mr-1" /> Upload Chat Export
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {mockChats.map((chat) => (
          <Card key={chat.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                  <MessageSquare className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{chat.name}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {chat.messageCount} messages</span>
                    {chat.intentsFound > 0 && (
                      <span className="flex items-center gap-1"><Brain className="h-3 w-3" /> {chat.intentsFound} intents detected</span>
                    )}
                    <span>Uploaded {chat.uploadedAt}</span>
                  </div>
                </div>
                <Badge className={chat.status === "completed" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-amber-100 text-amber-700 hover:bg-amber-100"}>
                  {chat.status === "completed" ? (
                    <><CheckCircle2 className="h-3 w-3 mr-1" /> Analyzed</>
                  ) : (
                    <><Loader2 className="h-3 w-3 mr-1 animate-spin" /> Processing</>
                  )}
                </Badge>
                <Button size="icon" variant="ghost"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </ContentPanel>
  );
}
