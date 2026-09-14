import { Zap, ShieldCheck, Cpu, Activity } from "lucide-react"
import type { TestLog, FeatureCardItem, MetricItem } from "./types"

export const TEST_LOGS: TestLog[] = [
  { name: "Auth Service :: Verify JWT Signature & Refresh", duration: "18ms", status: "passed" },
  { name: "Checkout API :: Process Payment Intent & Capture", duration: "42ms", status: "passed" },
  { name: "Data Sync :: Distributed Postgres CDC Ingestion", duration: "31ms", status: "passed" },
  { name: "Telemetry :: WebSocket Real-Time Event Stream", duration: "14ms", status: "passed" },
]

export const FEATURE_CARDS: FeatureCardItem[] = [
  {
    icon: Zap,
    title: "Autonomous Execution",
    description: "Trigger thousands of end-to-end tests concurrently with sub-second cold starts.",
  },
  {
    icon: ShieldCheck,
    title: "Flaky Test Shield",
    description: "Intelligent regression detection isolates nondeterministic failures automatically.",
  },
  {
    icon: Cpu,
    title: "Zero-Config CI/CD",
    description: "Seamlessly integrates with GitHub Actions, GitLab CI, and custom Docker runners.",
  },
  {
    icon: Activity,
    title: "Deep Telemetry",
    description: "Inspect stack traces, network payloads, and execution flamegraphs in real time.",
  },
]

export const METRICS: MetricItem[] = [
  { value: "10M+", label: "Tests run daily" },
  { value: "< 80ms", label: "Average pipeline latency" },
  { value: "99.9%", label: "Flakiness detection accuracy" },
  { value: "4.8x", label: "Faster release cycles" },
]
