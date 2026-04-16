import { createFileRoute } from "@tanstack/react-router";
import { ContentPanel } from "@/components/layout/content-panel";
import { Database } from "lucide-react";

export const Route = createFileRoute("/train")({
  component: TrainPage,
});

function TrainPage() {
  return (
    <ContentPanel>
      <div className="mx-auto max-w-4xl px-8 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Database className="h-5 w-5 text-primary" />
            <h1 className="font-serif text-[28px] leading-[1.2] tracking-[-0.03em]">Knowledge Sources</h1>
          </div>
          <p className="text-sm text-muted-foreground">Import content from websites, documents, calls, and WhatsApp chats to train your AI agent.</p>
        </div>
        <div className="rounded-xl border border-dashed border-border/60 py-14 px-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted/60">
            <Database className="h-6 w-6 text-muted-foreground/60" />
          </div>
          <p className="text-[15px] font-semibold text-foreground/80">No content sources yet</p>
          <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
            Add your first content source to start training your AI agent.
          </p>
        </div>
      </div>
    </ContentPanel>
  );
}
