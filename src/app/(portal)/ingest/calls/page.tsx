"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Upload,
  Play,
  Trash2,
  CheckCircle2,
  Loader2,
  Clock,
  Brain,
} from "lucide-react";
import { ContentPanel } from "@/components/layout/content-panel";

const mockCalls = [
  { id: "1", name: "Customer Support Call #1042", duration: "12:34", status: "completed" as const, intentsFound: 3, uploadedAt: "3 hours ago" },
  { id: "2", name: "Sales Inquiry - John D.", duration: "8:15", status: "analyzing" as const, intentsFound: 0, uploadedAt: "20 minutes ago" },
];

const statusConfig = {
  transcribing: { label: "Transcribing", className: "bg-amber-100 text-amber-700", icon: Loader2, animate: true },
  analyzing: { label: "Analyzing intents", className: "bg-amber-100 text-amber-700", icon: Brain, animate: true },
  completed: { label: "Completed", className: "bg-emerald-100 text-emerald-700", icon: CheckCircle2, animate: false },
};

export default function CallRecordingsPage() {
  return (
    <ContentPanel>
    <div className="mx-auto max-w-4xl px-8 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Phone className="h-5 w-5 text-green-600" />
          <h1 className="font-serif text-[28px] leading-[1.2] tracking-[-0.03em]">Call Recordings</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Upload call recordings to automatically extract customer intents and conversation patterns.
        </p>
      </div>

      <Card className="mb-6 border-2 border-dashed cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors">
        <CardContent className="p-8 text-center">
          <Phone className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <p className="text-sm font-medium">Upload call recordings</p>
          <p className="mt-1 text-xs text-muted-foreground">Supports MP3, WAV, M4A, OGG (max 200MB per file)</p>
          <Button className="mt-4" variant="outline" size="sm">
            <Upload className="h-3.5 w-3.5 mr-1" /> Browse Files
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {mockCalls.map((call) => {
          const status = statusConfig[call.status];
          const StatusIcon = status.icon;
          return (
            <Card key={call.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                    <Play className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{call.name}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {call.duration}</span>
                      {call.intentsFound > 0 && (
                        <span className="flex items-center gap-1"><Brain className="h-3 w-3" /> {call.intentsFound} intents detected</span>
                      )}
                      <span>Uploaded {call.uploadedAt}</span>
                    </div>
                  </div>
                  <Badge className={`${status.className} hover:${status.className}`}>
                    <StatusIcon className={`h-3 w-3 mr-1 ${status.animate ? "animate-spin" : ""}`} /> {status.label}
                  </Badge>
                  <Button size="icon" variant="ghost"><Trash2 className="h-4 w-4" /></Button>
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
