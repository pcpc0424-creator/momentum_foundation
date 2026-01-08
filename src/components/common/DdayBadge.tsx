import { cn } from "@/lib/utils"
import { getDaysUntil, getDdayText } from "@/lib/utils"

interface DdayBadgeProps {
  date: Date | string
  warningDays?: number
  criticalDays?: number
  className?: string
}

export function DdayBadge({
  date,
  warningDays = 30,
  criticalDays = 7,
  className,
}: DdayBadgeProps) {
  const days = getDaysUntil(date)
  const text = getDdayText(days)

  const getVariant = () => {
    if (days <= 0) return "critical"
    if (days <= criticalDays) return "critical"
    if (days <= warningDays) return "warning"
    return "normal"
  }

  const variant = getVariant()

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-bold",
        variant === "critical" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        variant === "warning" && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        variant === "normal" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        className
      )}
    >
      {text}
    </span>
  )
}
