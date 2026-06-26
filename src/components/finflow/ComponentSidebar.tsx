import { useState } from "react";
import { ChevronDown, GripVertical } from "lucide-react";
import { CATEGORIES, type Category, type ComponentDef } from "@/lib/finflow-components";

const DOT_CLASS: Record<string, string> = {
  agent: "bg-[var(--agent)]",
  loader: "bg-[var(--loader)]",
  tool: "bg-[var(--tool)]",
  output: "bg-[var(--output)]",
  "input-node": "bg-[var(--input-node)]",
  broker: "bg-[var(--broker)]",
  market: "bg-[var(--market)]",
};

const ICON_CLASS: Record<string, string> = {
  agent: "text-[var(--agent)]",
  loader: "text-[var(--loader)]",
  tool: "text-[var(--tool)]",
  output: "text-[var(--output)]",
  "input-node": "text-[var(--input-node)]",
  broker: "text-[var(--broker)]",
  market: "text-[var(--market)]",
};

const ITEM_BG: Record<string, string> = {
  agent: "hover:bg-[color-mix(in_oklab,var(--agent)_14%,var(--card))] bg-[color-mix(in_oklab,var(--agent)_8%,var(--card))]",
  loader: "hover:bg-[color-mix(in_oklab,var(--loader)_14%,var(--card))] bg-[color-mix(in_oklab,var(--loader)_8%,var(--card))]",
  tool: "hover:bg-[color-mix(in_oklab,var(--tool)_14%,var(--card))] bg-[color-mix(in_oklab,var(--tool)_8%,var(--card))]",
  output: "hover:bg-[color-mix(in_oklab,var(--output)_14%,var(--card))] bg-[color-mix(in_oklab,var(--output)_8%,var(--card))]",
  "input-node": "hover:bg-[color-mix(in_oklab,var(--input-node)_14%,var(--card))] bg-[color-mix(in_oklab,var(--input-node)_8%,var(--card))]",
  broker: "hover:bg-[color-mix(in_oklab,var(--broker)_14%,var(--card))] bg-[color-mix(in_oklab,var(--broker)_8%,var(--card))]",
  market: "hover:bg-[color-mix(in_oklab,var(--market)_14%,var(--card))] bg-[color-mix(in_oklab,var(--market)_8%,var(--card))]",
};

function DraggableItem({ item, tokenClass }: { item: ComponentDef; tokenClass: string }) {
  const Icon = item.icon;
  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("application/finflow-component", item.id);
    e.dataTransfer.effectAllowed = "move";
  };
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={`group flex cursor-grab items-center gap-2 rounded-md border border-border/60 px-2 py-2 transition-colors active:cursor-grabbing ${ITEM_BG[tokenClass]}`}
    >
      <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/60" />
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-background/40">
        <Icon className={`h-4 w-4 ${ICON_CLASS[tokenClass]}`} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-foreground">{item.label}</div>
        <div className="truncate text-xs text-muted-foreground">{item.description}</div>
      </div>
    </div>
  );
}

function CategorySection({ cat }: { cat: Category }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-sidebar-border/60 px-3 py-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 py-1 text-left"
      >
        <div className="flex items-center gap-2">
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "" : "-rotate-90"}`}
          />
          <span className={`h-2 w-2 rounded-full ${DOT_CLASS[cat.tokenClass]}`} />
          <span className="text-sm font-semibold text-foreground">{cat.label}</span>
        </div>
        <span className="text-xs text-muted-foreground">{cat.items.length}</span>
      </button>
      {open && (
        <div className="mt-2 flex flex-col gap-1.5">
          {cat.items.map((it) => (
            <DraggableItem key={it.id} item={it} tokenClass={cat.tokenClass} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ComponentSidebar() {
  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="border-b border-sidebar-border px-4 py-4">
        <h2 className="text-base font-semibold text-foreground">Components</h2>
        <p className="text-xs text-muted-foreground">Drag &amp; drop to canvas</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {CATEGORIES.map((cat) => (
          <CategorySection key={cat.key} cat={cat} />
        ))}
      </div>
    </aside>
  );
}
