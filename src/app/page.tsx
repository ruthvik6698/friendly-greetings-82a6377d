"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Database,
  Settings2,
  FlaskConical,
  Rocket,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Bot,
  Globe,
  FileText,
  Phone,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { ContentPanel } from "@/components/layout/content-panel";

const steps = [
  {
    title: "Add Knowledge Sources",
    description: "Import websites, documents, call recordings, or WhatsApp conversations to train your agent.",
    href: "/ingest",
    icon: Database,
    completed: false,
  },
  {
    title: "Configure Intents & Flows",
    description: "Define what your agent can handle and build conversation flows with actions.",
    href: "/configure",
    icon: Settings2,
    completed: false,
  },
  {
    title: "Test Your Agent",
    description: "Preview your agent in a WhatsApp-style simulator before going live.",
    href: "/test",
    icon: FlaskConical,
    completed: false,
  },
  {
    title: "Deploy to WhatsApp",
    description: "Connect your WhatsApp Business account and deploy your agent.",
    href: "/deploy",
    icon: Rocket,
    completed: false,
  },
  {
    title: "Monitor & Optimize",
    description: "Track performance, review conversations, and improve your agent over time.",
    href: "/analyze",
    icon: BarChart3,
    completed: false,
  },
];

const sourceTypes = [
  { label: "Website", icon: Globe, description: "Crawl and index your website pages", href: "/ingest/websites" },
  { label: "Documents", icon: FileText, description: "Upload PDFs, docs, and spreadsheets", href: "/ingest/documents" },
  { label: "Call Recordings", icon: Phone, description: "Import and transcribe call recordings", href: "/ingest/calls" },
  { label: "WhatsApp Chats", icon: MessageSquare, description: "Import existing WhatsApp conversations", href: "/ingest/whatsapp" },
];

export default function GetStartedPage() {
  const completedSteps = steps.filter((s) => s.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <ContentPanel>
    <div className="mx-auto max-w-4xl px-8 py-10">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="font-serif text-[40px] leading-[1.15] tracking-[-0.03em]">Build your AI WhatsApp Agent</h1>
        <p className="mt-2 text-[15px] text-muted-foreground">
          Create intelligent agents from your business data in minutes.
        </p>
      </div>

      {/* Progress */}
      <Card className="mb-8">
        <CardContent className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Setup Progress</span>
            </div>
            <Badge variant="secondary">
              {completedSteps} of {steps.length} complete
            </Badge>
          </div>
          <Progress value={progress} className="mb-4 h-2" />
          <div className="space-y-1">
            {steps.map((step, i) => (
              <Link
                key={step.title}
                href={step.href}
                className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted"
              >
                <div className="flex h-6 w-6 items-center justify-center">
                  {step.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-muted-foreground/30">
                      <span className="text-xs font-medium text-muted-foreground">{i + 1}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick add sources */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Quick Add Knowledge Source</h2>
        <Link href="/ingest" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          View all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {sourceTypes.map((source) => (
          <Link key={source.label} href={source.href}>
            <Card className="h-full transition-shadow hover:shadow-md cursor-pointer">
              <CardContent className="p-4">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <source.icon className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm font-semibold">{source.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{source.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
    </ContentPanel>
  );
}
