import { Handle, Position, type NodeProps } from "reactflow";
import { COMPONENT_INDEX } from "@/lib/finflow-components";

type Data = { componentId: string };

const TOKEN_STYLES: Record<string, { border: string; bg: string; iconBg: string; icon: string }> = {
  agent: {
    border: "border-[color-mix(in_oklab,var(--agent)_55%,transparent)]",
    bg: "bg-[color-mix(in_oklab,var(--agent)_12%,var(--card))]",
    iconBg: "bg-[color-mix(in_oklab,var(--agent)_22%,transparent)]",
    icon: "text-[var(--agent)]",
  },
  loader: {
    border: "border-[color-mix(in_oklab,var(--loader)_55%,transparent)]",
    bg: "bg-[color-mix(in_oklab,var(--loader)_12%,var(--card))]",
    iconBg: "bg-[color-mix(in_oklab,var(--loader)_22%,transparent)]",
    icon: "text-[var(--loader)]",
  },
  tool: {
    border: "border-[color-mix(in_oklab,var(--tool)_55%,transparent)]",
    bg: "bg-[color-mix(in_oklab,var(--tool)_12%,var(--card))]",
    iconBg: "bg-[color-mix(in_oklab,var(--tool)_22%,transparent)]",
    icon: "text-[var(--tool)]",
  },
  output: {
    border: "border-[color-mix(in_oklab,var(--output)_55%,transparent)]",
    bg: "bg-[color-mix(in_oklab,var(--output)_12%,var(--card))]",
    iconBg: "bg-[color-mix(in_oklab,var(--output)_22%,transparent)]",
    icon: "text-[var(--output)]",
  },
  "input-node": {
    border: "border-[color-mix(in_oklab,var(--input-node)_55%,transparent)]",
    bg: "bg-[color-mix(in_oklab,var(--input-node)_12%,var(--card))]",
    iconBg: "bg-[color-mix(in_oklab,var(--input-node)_22%,transparent)]",
    icon: "text-[var(--input-node)]",
  },
  broker: {
    border: "border-[color-mix(in_oklab,var(--broker)_55%,transparent)]",
    bg: "bg-[color-mix(in_oklab,var(--broker)_12%,var(--card))]",
    iconBg: "bg-[color-mix(in_oklab,var(--broker)_22%,transparent)]",
    icon: "text-[var(--broker)]",
  },
  market: {
    border: "border-[color-mix(in_oklab,var(--market)_55%,transparent)]",
    bg: "bg-[color-mix(in_oklab,var(--market)_12%,var(--card))]",
    iconBg: "bg-[color-mix(in_oklab,var(--market)_22%,transparent)]",
    icon: "text-[var(--market)]",
  },
};

export function FinFlowNode({ data, selected }: NodeProps<Data>) {
  const def = COMPONENT_INDEX[data.componentId];
  if (!def) return null;
  const Icon = def.icon;
  const s = TOKEN_STYLES[def.tokenClass];
  const isInput = def.category === "inputs";
  const isOutput = def.category === "outputs";

  return (
    <div
      className={`min-w-[200px] rounded-lg border-2 ${s.border} ${s.bg} shadow-lg transition-all ${
        selected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
      }`}
    >
      {!isInput && <Handle type="target" position={Position.Left} />}
      <div className="flex items-center gap-3 p-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-md ${s.iconBg}`}>
          <Icon className={`h-5 w-5 ${s.icon}`} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-foreground">{def.label}</div>
          <div className="truncate text-xs text-muted-foreground">{def.description}</div>
        </div>
      </div>
      {!isOutput && <Handle type="source" position={Position.Right} />}
    </div>
  );
}
