import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background, BackgroundVariant, Controls, MiniMap,
  addEdge, useEdgesState, useNodesState,
  type Connection, type Edge, type Node, type ReactFlowInstance, type NodeTypes,
  MarkerType,
} from "reactflow";
import { FinFlowNode } from "./FinFlowNode";
import { COMPONENT_INDEX } from "@/lib/finflow-components";

const nodeTypes: NodeTypes = { finflow: FinFlowNode };

let idCounter = 1;
const nextId = () => `n_${idCounter++}`;

type Props = {
  onStatsChange: (stats: { nodes: number; edges: number }) => void;
  resetSignal: number;
};

export function FlowCanvas({ onStatsChange, resetSignal }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [rf, setRf] = useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // reset
  useState(() => 0);
  if (resetSignal === -1) { /* noop */ }

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      setEdges((eds) => {
        const next = addEdge(
          { ...params, animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
          eds
        );
        onStatsChange({ nodes: nodes.length, edges: next.length });
        return next;
      });
    },
    [nodes.length, onStatsChange, setEdges]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const componentId = e.dataTransfer.getData("application/finflow-component");
      if (!componentId || !rf || !wrapperRef.current) return;
      const def = COMPONENT_INDEX[componentId];
      if (!def) return;
      const position = rf.screenToFlowPosition({ x: e.clientX, y: e.clientY });
      const newNode: Node = {
        id: nextId(),
        type: "finflow",
        position,
        data: { componentId },
      };
      setNodes((ns) => {
        const next = ns.concat(newNode);
        onStatsChange({ nodes: next.length, edges: edges.length });
        return next;
      });
    },
    [rf, setNodes, edges.length, onStatsChange]
  );

  // reset on signal change
  const lastReset = useRef(resetSignal);
  if (lastReset.current !== resetSignal) {
    lastReset.current = resetSignal;
    setNodes([]);
    setEdges([]);
    onStatsChange({ nodes: 0, edges: 0 });
  }

  return (
    <div ref={wrapperRef} className="h-full w-full" onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(c) => {
          onNodesChange(c);
          // updating count after change is handled by react-flow internally; sync via timeout
          queueMicrotask(() => onStatsChange({ nodes: nodes.length, edges: edges.length }));
        }}
        onEdgesChange={(c) => {
          onEdgesChange(c);
          queueMicrotask(() => onStatsChange({ nodes: nodes.length, edges: edges.length }));
        }}
        onConnect={onConnect}
        onInit={setRf}
        nodeTypes={nodeTypes}
        fitView
        defaultEdgeOptions={{ animated: true, markerEnd: { type: MarkerType.ArrowClosed } }}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="oklch(0.35 0.03 240)" />
        <Controls className="!shadow-lg" />
        <MiniMap
          pannable
          zoomable
          maskColor="oklch(0.16 0.03 240 / 0.7)"
          style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }}
          nodeColor={() => "var(--primary)"}
        />
      </ReactFlow>
    </div>
  );
}
