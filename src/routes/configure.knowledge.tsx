import { createFileRoute } from "@tanstack/react-router";
import { ContentPanel } from "@/components/layout/content-panel";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/configure/knowledge")({
  component: KnowledgePage,
});

function KnowledgePage() {
  return (
    <ContentPanel>
      <div className="mx-auto max-w-4xl px-8 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="h-5 w-5 text-amber-600" />
            <h1 className="font-serif text-[28px] leading-[1.2] tracking-[-0.03em]">Knowledge Base</h1>
          </div>
          <p className="text-sm text-muted-foreground">Review and manage the extracted knowledge your agent uses to answer questions.</p>
        </div>
      </div>
    </ContentPanel>
  );
}
