import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BookOpen,
  Settings2,
  FlaskConical,
  Rocket,
  BarChart3,
  ChevronRight,
  ArrowRight,
  Globe,
  FileText,
  Phone,
  MessageSquare,
  Check,
} from "lucide-react";
import { ContentPanel } from "@/components/layout/content-panel";
import { AnimateHeight } from "@/components/ui/animate-height";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: GetStartedPage,
});

interface Step {
  id: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  icon: React.ElementType;
  preview: React.ReactNode;
}

const steps: Step[] = [
  {
    id: "train",
    title: "Train your agent with your content",
    description:
      "Bring in everything your agent needs to know — websites, documents, call recordings, and past WhatsApp chats. The more high-quality context you provide, the smarter your agent becomes.",
    cta: { label: "Add content", href: "/train" },
    icon: BookOpen,
    preview: <TrainPreview />,
  },
  {
    id: "guidance",
    title: "Tell your agent how to behave",
    description:
      "Set the tone, personality, and guardrails for your agent. Define what it should say, what it should avoid, and how it should escalate to a human.",
    cta: { label: "Add guidance", href: "/train/guidance" },
    icon: BookOpen,
    preview: <GuidancePreview />,
  },
  {
    id: "configure",
    title: "Configure intents and flows",
    description:
      "Map out the conversations your customers have most often — bookings, refunds, order status — and design the flows that guide them to an answer.",
    cta: { label: "Set up intents", href: "/configure/intents" },
    icon: Settings2,
    preview: <ConfigurePreview />,
  },
  {
    id: "test",
    title: "Test your agent in a simulator",
    description:
      "Chat with your agent before your customers do. Catch gaps in knowledge, tune responses, and make sure hand-offs work cleanly.",
    cta: { label: "Open simulator", href: "/test" },
    icon: FlaskConical,
    preview: <TestPreview />,
  },
  {
    id: "deploy",
    title: "Deploy to WhatsApp",
    description:
      "Connect your WhatsApp Business number and go live. Your agent will start answering customers 24/7 as soon as you hit deploy.",
    cta: { label: "Deploy agent", href: "/deploy" },
    icon: Rocket,
    preview: <DeployPreview />,
  },
];

function GetStartedPage() {
  const [expanded, setExpanded] = useState<string>("train");
  const [completed] = useState<Set<string>>(new Set());

  const completedCount = completed.size;
  const totalSteps = steps.length;

  return (
    <ContentPanel>
      <div className="mx-auto w-full max-w-[960px] px-10 pt-14 pb-20">
        <h1 className="font-heading text-[40px] leading-[1.1] tracking-[-0.01em] text-foreground">
          Get started with your AI Agent
        </h1>

        <div className="mt-10">
          <div className="mb-4 flex items-center gap-2 text-[15px]">
            <ProgressRing completed={completedCount} total={totalSteps} />
            <span className="font-semibold text-foreground">Get set up</span>
            <span className="text-muted-foreground/60">•</span>
            <span className="text-muted-foreground">
              {completedCount} / {totalSteps} steps
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/80 bg-white">
            {steps.map((step, index) => {
              const isExpanded = expanded === step.id;
              const isComplete = completed.has(step.id);
              const isLast = index === steps.length - 1;

              return (
                <div
                  key={step.id}
                  className={cn(
                    "transition-colors",
                    !isLast && "border-b border-border/70"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setExpanded(isExpanded ? "" : step.id)}
                    className={cn(
                      "flex w-full items-center gap-3 px-6 py-4 text-left transition-colors",
                      !isExpanded && "hover:bg-accent/40"
                    )}
                  >
                    <StepIndicator complete={isComplete} />
                    <span
                      className={cn(
                        "flex-1 text-[15px]",
                        isExpanded
                          ? "font-semibold text-foreground"
                          : "font-medium text-foreground"
                      )}
                    >
                      {step.title}
                    </span>
                    {!isExpanded && (
                      <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
                    )}
                  </button>

                  <AnimateHeight expanded={isExpanded}>
                    <div className="grid grid-cols-[1fr_360px] gap-8 px-6 pb-6 pt-0 pl-[60px]">
                      <div className="flex flex-col items-start">
                        <p className="text-[14px] leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                        <Link
                          to={step.cta.href}
                          className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-colors hover:bg-foreground/90"
                        >
                          {step.cta.label}
                        </Link>
                      </div>
                      <div className="relative flex items-center justify-center">
                        <div className="relative h-[200px] w-full overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-[#f7f2ee] to-[#efe8e2]">
                          {step.preview}
                        </div>
                      </div>
                    </div>
                  </AnimateHeight>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-[15px] font-semibold text-foreground">Go further</h2>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <GoFurtherCard
              href="/analyze"
              accent="from-[#eaddff] to-[#c8b6f4]"
              icon={<BarChart3 className="h-5 w-5 text-[#5b3dbb]" />}
              title="Analyze performance"
              description="See how your agent is resolving conversations and where it needs more training."
            />
            <GoFurtherCard
              href="/configure/knowledge"
              accent="from-[#fde1d0] to-[#f7b58a]"
              icon={<BookOpen className="h-5 w-5 text-[#b54a0c]" />}
              title="Curate your Knowledge Base"
              description="Review everything your agent has learned and prune what's out of date."
            />
            <GoFurtherCard
              href="/configure/flows"
              accent="from-[#d4efe0] to-[#9cd6b5]"
              icon={<Settings2 className="h-5 w-5 text-[#0a6b3a]" />}
              title="Build advanced flows"
              description="Design multi-step conversations that handle complex customer journeys."
            />
          </div>
        </div>
      </div>
    </ContentPanel>
  );
}

function ProgressRing({ completed, total }: { completed: number; total: number }) {
  const size = 20;
  const stroke = 2;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = total === 0 ? 0 : completed / total;
  const offset = circumference * (1 - progress);

  return (
    <svg width={size} height={size} className="shrink-0" aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-border" />
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={stroke} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`} className="text-[#e87537] transition-[stroke-dashoffset] duration-500" />
    </svg>
  );
}

function StepIndicator({ complete }: { complete: boolean }) {
  if (complete) {
    return (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e87537] text-background">
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
    );
  }
  return <span className="h-5 w-5 shrink-0 rounded-full border-[1.5px] border-border bg-white" />;
}

function GoFurtherCard({ href, accent, icon, title, description }: { href: string; accent: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <Link
      to={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-white transition-all hover:border-border hover:shadow-sm"
    >
      <div className={cn("flex h-[120px] items-end justify-start bg-gradient-to-br p-4", accent)}>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 shadow-sm">{icon}</div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="text-[14px] font-semibold text-foreground">{title}</h3>
        <p className="text-[13px] leading-relaxed text-muted-foreground">{description}</p>
        <div className="mt-2 flex items-center gap-1 text-[13px] font-medium text-foreground/70 transition-colors group-hover:text-[#e87537]">
          Open
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

function TrainPreview() {
  const sources = [
    { icon: Globe, label: "Website", count: 24 },
    { icon: FileText, label: "Documents", count: 8 },
    { icon: Phone, label: "Call recordings", count: 3 },
    { icon: MessageSquare, label: "WhatsApp", count: 156 },
  ];
  return (
    <div className="flex h-full w-full flex-col gap-2 p-4">
      {sources.map((s) => (
        <div key={s.label} className="flex items-center gap-2 rounded-lg bg-white/90 px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <s.icon className="h-3.5 w-3.5 text-[#b54a0c]" />
          <span className="flex-1 text-[11px] font-medium text-foreground">{s.label}</span>
          <span className="text-[10px] text-muted-foreground">{s.count}</span>
        </div>
      ))}
    </div>
  );
}

function GuidancePreview() {
  return (
    <div className="flex h-full w-full flex-col gap-2 p-4">
      <div className="rounded-lg bg-white/90 px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Tone</p>
        <p className="mt-1 text-[11px] text-foreground">Friendly, concise, helpful</p>
      </div>
      <div className="rounded-lg bg-white/90 px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Persona</p>
        <p className="mt-1 text-[11px] text-foreground">Assistant for a travel brand</p>
      </div>
      <div className="rounded-lg bg-white/90 px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Escalate when</p>
        <p className="mt-1 text-[11px] text-foreground">Refund &gt; ₹5,000 or complaint</p>
      </div>
    </div>
  );
}

function ConfigurePreview() {
  const intents = [
    { label: "Check booking status", count: 412 },
    { label: "Request refund", count: 188 },
    { label: "Change reservation", count: 94 },
    { label: "Ask about policy", count: 52 },
  ];
  return (
    <div className="flex h-full w-full flex-col gap-1.5 p-4">
      {intents.map((i) => (
        <div key={i.label} className="flex items-center gap-2 rounded-lg bg-white/90 px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e87537]" />
          <span className="flex-1 text-[11px] text-foreground">{i.label}</span>
          <span className="text-[10px] text-muted-foreground">{i.count}</span>
        </div>
      ))}
    </div>
  );
}

function TestPreview() {
  return (
    <div className="flex h-full w-full flex-col justify-end gap-2 p-4">
      <div className="mr-auto max-w-[70%] rounded-2xl rounded-bl-sm bg-white/90 px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <p className="text-[11px] text-foreground">Hi! I&apos;d like to change my booking for next Tuesday.</p>
      </div>
      <div className="ml-auto max-w-[75%] rounded-2xl rounded-br-sm bg-foreground px-3 py-2">
        <p className="text-[11px] text-background">Sure — could you share the booking reference so I can look it up?</p>
      </div>
      <div className="mr-auto flex items-center gap-1 px-1">
        <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0ms]" />
        <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
        <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
      </div>
    </div>
  );
}

function DeployPreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <MessageSquare className="h-7 w-7 text-[#25D366]" />
      </div>
      <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#25D366]" />
        <span className="text-[10px] font-medium text-foreground">+91 98765 43210</span>
      </div>
      <p className="text-[10px] text-muted-foreground">Ready to deploy</p>
    </div>
  );
}
