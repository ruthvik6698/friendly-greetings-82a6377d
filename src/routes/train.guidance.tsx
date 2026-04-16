import { createFileRoute } from "@tanstack/react-router";
import { ContentPanel } from "@/components/layout/content-panel";
import { Compass } from "lucide-react";

export const Route = createFileRoute("/train/guidance")({
  component: GuidancePage,
});

function GuidancePage() {
  return (
    <ContentPanel>
      <div className="mx-auto max-w-4xl px-8 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Compass className="h-5 w-5 text-primary" />
            <h1 className="font-serif text-[28px] leading-[1.2] tracking-[-0.03em]">Guidance</h1>
          </div>
          <p className="text-sm text-muted-foreground">Set the tone, personality, and guardrails for your agent.</p>
        </div>
      </div>
    </ContentPanel>
  );
}
