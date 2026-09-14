import type { LucideIcon } from "lucide-react"

export interface TestLog {
  name: string
  duration: string
  status: "passed" | "failed" | "running"
}

export interface FeatureCardItem {
  icon: LucideIcon
  title: string
  description: string
}

export interface MetricItem {
  value: string
  label: string
}
