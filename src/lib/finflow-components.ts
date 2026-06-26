import {
  TrendingUp, ShieldAlert, Search, PieChart, Bot,
  FileText, Table2, Globe, Monitor,
  Calculator, AlignLeft, BarChart3, Shuffle,
  FileBarChart, BarChart, Bell,
  MessageSquare,
  Briefcase, Building2, LineChart, Layers, Sprout, Coins, Network, Zap,
  Landmark, Building, Activity, TrendingDown, Wheat, Bitcoin,
  type LucideIcon,
} from "lucide-react";

export type CategoryKey = "agents" | "loaders" | "tools" | "outputs" | "inputs" | "brokers" | "markets";

export type ComponentDef = {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  category: CategoryKey;
};

export type Category = {
  key: CategoryKey;
  label: string;
  tokenClass: string; // semantic color token class suffix, e.g. "agent"
  items: ComponentDef[];
};

export const CATEGORIES: Category[] = [
  {
    key: "agents",
    label: "Agents",
    tokenClass: "agent",
    items: [
      { id: "agent-financial", label: "Financial Analyst", description: "Analyzes financial data and trends", icon: TrendingUp, category: "agents" },
      { id: "agent-risk", label: "Risk Assessor", description: "Evaluates financial risk factors", icon: ShieldAlert, category: "agents" },
      { id: "agent-market", label: "Market Researcher", description: "Researches market conditions", icon: Search, category: "agents" },
      { id: "agent-portfolio", label: "Portfolio Manager", description: "Manages portfolio allocations", icon: PieChart, category: "agents" },
      { id: "agent-custom", label: "Custom Agent", description: "Configurable AI agent", icon: Bot, category: "agents" },
    ],
  },
  {
    key: "loaders",
    label: "Document Loaders",
    tokenClass: "loader",
    items: [
      { id: "loader-pdf", label: "PDF Loader", description: "Load and parse PDF documents", icon: FileText, category: "loaders" },
      { id: "loader-csv", label: "CSV Loader", description: "Load CSV/Excel data files", icon: Table2, category: "loaders" },
      { id: "loader-api", label: "API Loader", description: "Fetch data from REST APIs", icon: Globe, category: "loaders" },
      { id: "loader-web", label: "Web Scraper", description: "Scrape financial websites", icon: Monitor, category: "loaders" },
    ],
  },
  {
    key: "tools",
    label: "Tools",
    tokenClass: "tool",
    items: [
      { id: "tool-calc", label: "Calculator", description: "Financial calculations", icon: Calculator, category: "tools" },
      { id: "tool-sum", label: "Summarizer", description: "Summarize long documents", icon: AlignLeft, category: "tools" },
      { id: "tool-sent", label: "Sentiment Analyzer", description: "Analyze market sentiment", icon: BarChart3, category: "tools" },
      { id: "tool-trans", label: "Data Transformer", description: "Transform and clean data", icon: Shuffle, category: "tools" },
    ],
  },
  {
    key: "outputs",
    label: "Outputs",
    tokenClass: "output",
    items: [
      { id: "out-report", label: "Report Output", description: "Generate final report", icon: FileBarChart, category: "outputs" },
      { id: "out-chart", label: "Chart Output", description: "Visualize results as charts", icon: BarChart, category: "outputs" },
      { id: "out-alert", label: "Alert Output", description: "Send alerts/notifications", icon: Bell, category: "outputs" },
    ],
  },
  {
    key: "inputs",
    label: "Inputs",
    tokenClass: "input-node",
    items: [
      { id: "in-user", label: "User Input", description: "Accept user queries", icon: MessageSquare, category: "inputs" },
    ],
  },
  {
    key: "brokers",
    label: "Brokers",
    tokenClass: "broker",
    items: [
      { id: "br-zerodha", label: "Zerodha (Kite)", description: "Trade via Zerodha Kite Connect API", icon: Briefcase, category: "brokers" },
      { id: "br-angel", label: "Angel One", description: "Trade via Angel One Smart API", icon: Building2, category: "brokers" },
      { id: "br-upstox", label: "Upstox", description: "Trade via Upstox API", icon: LineChart, category: "brokers" },
      { id: "br-iifl", label: "IIFL Securities", description: "Trade via IIFL Markets API", icon: Layers, category: "brokers" },
      { id: "br-groww", label: "Groww", description: "Trade via Groww platform", icon: Sprout, category: "brokers" },
      { id: "br-5paisa", label: "5Paisa", description: "Trade via 5Paisa Connect API", icon: Coins, category: "brokers" },
      { id: "br-ibkr", label: "Interactive Brokers", description: "Trade via IBKR TWS API", icon: Network, category: "brokers" },
      { id: "br-alpaca", label: "Alpaca", description: "Trade via Alpaca Markets API", icon: Zap, category: "brokers" },
    ],
  },
  {
    key: "markets",
    label: "Markets",
    tokenClass: "market",
    items: [
      { id: "mk-nse", label: "NSE India", description: "National Stock Exchange of India", icon: Landmark, category: "markets" },
      { id: "mk-bse", label: "BSE India", description: "Bombay Stock Exchange", icon: Building, category: "markets" },
      { id: "mk-nyse", label: "NYSE", description: "New York Stock Exchange", icon: Activity, category: "markets" },
      { id: "mk-nasdaq", label: "NASDAQ", description: "NASDAQ Stock Market", icon: TrendingDown, category: "markets" },
      { id: "mk-mcx", label: "MCX India", description: "Multi Commodity Exchange", icon: Wheat, category: "markets" },
      { id: "mk-crypto", label: "Crypto Markets", description: "Cryptocurrency exchanges", icon: Bitcoin, category: "markets" },
    ],
  },
];

export const COMPONENT_INDEX: Record<string, ComponentDef & { tokenClass: string }> =
  Object.fromEntries(
    CATEGORIES.flatMap((cat) =>
      cat.items.map((it) => [it.id, { ...it, tokenClass: cat.tokenClass }])
    )
  );
