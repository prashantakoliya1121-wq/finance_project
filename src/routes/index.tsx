import { useState } from "react";
import { Save, Download, RotateCcw, Play } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { ReactFlowProvider } from "reactflow";
import { ComponentSidebar } from "@/components/finflow/ComponentSidebar";
import { FlowCanvas } from "@/components/finflow/FlowCanvas";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FinFlow — Visual Pipeline Builder" },
      { name: "description", content: "Drag-and-drop builder for financial AI pipelines, brokers, and market data." },
      { property: "og:title", content: "FinFlow — Visual Pipeline Builder" },
      { property: "og:description", content: "Drag-and-drop builder for financial AI pipelines, brokers, and market data." },
    ],
  }),
  component: FinFlowPage,
});

function FinFlowPage() {
  const [stats, setStats] = useState({ nodes: 0, edges: 0 });
  const [resetSignal, setResetSignal] = useState(0);

  return (
    <div className="flex h-screen w-screen flex-col bg-background text-foreground">
      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card/60 px-4 backdrop-blur">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <span className="text-sm font-bold">F</span>
            </div>
            <h1 className="text-base font-semibold tracking-tight">FinFlow</h1>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{stats.nodes} nodes</span>
            <span className="h-3 w-px bg-border" />
            <span>{stats.edges} connections</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ToolbarButton onClick={() => toast.success("Pipeline saved")} icon={<Save className="h-4 w-4" />}>
            Save
          </ToolbarButton>
          <ToolbarButton onClick={() => toast.success("Exported")} icon={<Download className="h-4 w-4" />}>
            Export
          </ToolbarButton>
          <ToolbarButton
            onClick={() => { setResetSignal((s) => s + 1); toast("Canvas reset"); }}
            icon={<RotateCcw className="h-4 w-4" />}
          >
            Reset
          </ToolbarButton>
          <button
            type="button"
            onClick={() => toast.success("Running pipeline…")}
            className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <Play className="h-4 w-4 fill-current" />
            Run Pipeline
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex min-h-0 flex-1">
        <ComponentSidebar />
        <main className="relative min-w-0 flex-1">
          <ReactFlowProvider>
            <FlowCanvas onStatsChange={setStats} resetSignal={resetSignal} />
          </ReactFlowProvider>
        </main>
      </div>

      <Toaster />
    </div>
  );
}

function ToolbarButton({
  onClick, icon, children,
}: { onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
    >
      {icon}
      {children}
    </button>
  );
}
