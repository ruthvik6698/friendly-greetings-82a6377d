"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Upload,
  File,
  Trash2,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { ContentPanel } from "@/components/layout/content-panel";

const mockDocs = [
  { id: "1", name: "Product FAQ.pdf", size: "2.4 MB", type: "PDF", status: "completed" as const, uploadedAt: "1 hour ago" },
  { id: "2", name: "Pricing Guide 2024.docx", size: "890 KB", type: "DOCX", status: "processing" as const, uploadedAt: "5 minutes ago" },
];

export default function DocumentsPage() {
  return (
    <ContentPanel>
    <div className="mx-auto max-w-4xl px-8 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="h-5 w-5 text-amber-600" />
          <h1 className="font-serif text-[28px] leading-[1.2] tracking-[-0.03em]">Document Sources</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Upload PDFs, Word docs, and spreadsheets. Content will be extracted and indexed.
        </p>
      </div>

      <Card className="mb-6 border-2 border-dashed cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors">
        <CardContent className="p-8 text-center">
          <Upload className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <p className="text-sm font-medium">Drop files here or click to upload</p>
          <p className="mt-1 text-xs text-muted-foreground">Supports PDF, DOCX, TXT, CSV, XLSX (max 50MB per file)</p>
          <Button className="mt-4" variant="outline" size="sm">
            <Upload className="h-3.5 w-3.5 mr-1" /> Browse Files
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {mockDocs.map((doc) => (
          <Card key={doc.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                  <File className="h-4 w-4 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{doc.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {doc.type} &middot; {doc.size} &middot; Uploaded {doc.uploadedAt}
                  </p>
                </div>
                <Badge className={doc.status === "completed" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-amber-100 text-amber-700 hover:bg-amber-100"}>
                  {doc.status === "completed" ? (
                    <><CheckCircle2 className="h-3 w-3 mr-1" /> Indexed</>
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
