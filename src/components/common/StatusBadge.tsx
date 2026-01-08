import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type StatusType =
  | "active" | "inactive" | "pending" | "error"
  | "healthy" | "degraded" | "unhealthy"
  | "valid" | "expiring" | "expired" | "revoked"
  | "published" | "review" | "draft" | "rejected"
  | "connected" | "disconnected"
  | "open" | "investigating" | "resolved" | "closed"
  | "deprecated" | "maintenance"

const statusConfig: Record<StatusType, { label: string; variant: "success" | "warning" | "error" | "info" | "secondary" | "default" }> = {
  // General
  active: { label: "활성", variant: "success" },
  inactive: { label: "비활성", variant: "secondary" },
  pending: { label: "대기중", variant: "warning" },
  error: { label: "오류", variant: "error" },

  // Health
  healthy: { label: "정상", variant: "success" },
  degraded: { label: "저하", variant: "warning" },
  unhealthy: { label: "비정상", variant: "error" },

  // SSL/Certificate
  valid: { label: "유효", variant: "success" },
  expiring: { label: "만료임박", variant: "warning" },
  expired: { label: "만료됨", variant: "error" },
  revoked: { label: "폐기됨", variant: "error" },

  // Mobile App
  published: { label: "출시됨", variant: "success" },
  review: { label: "심사중", variant: "info" },
  draft: { label: "초안", variant: "secondary" },
  rejected: { label: "거절됨", variant: "error" },

  // Integration
  connected: { label: "연결됨", variant: "success" },
  disconnected: { label: "연결해제", variant: "secondary" },

  // Incident
  open: { label: "열림", variant: "error" },
  investigating: { label: "조사중", variant: "warning" },
  resolved: { label: "해결됨", variant: "success" },
  closed: { label: "종료", variant: "secondary" },

  // API Status
  deprecated: { label: "지원종료", variant: "warning" },
  maintenance: { label: "점검중", variant: "info" },
}

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge
      variant={config.variant}
      className={cn("font-medium", className)}
    >
      <span className={cn(
        "mr-1.5 h-1.5 w-1.5 rounded-full",
        config.variant === "success" && "bg-green-500",
        config.variant === "warning" && "bg-yellow-500",
        config.variant === "error" && "bg-red-500",
        config.variant === "info" && "bg-blue-500",
        config.variant === "secondary" && "bg-gray-400",
      )} />
      {config.label}
    </Badge>
  )
}
