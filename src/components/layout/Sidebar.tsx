import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  LayoutDashboard,
  Globe,
  Network,
  ShieldCheck,
  Webhook,
  Smartphone,
  KeyRound,
  HeartPulse,
  CheckSquare,
  AlertTriangle,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  badge?: string
  badgeVariant?: "default" | "destructive" | "warning"
}

const mainNavItems: NavItem[] = [
  {
    title: "대시보드",
    href: "/",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "도메인 관리",
    href: "/domains",
    icon: <Globe className="h-5 w-5" />,
  },
  {
    title: "DNS 레코드",
    href: "/dns",
    icon: <Network className="h-5 w-5" />,
  },
  {
    title: "SSL 인증서",
    href: "/ssl",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "API 엔드포인트",
    href: "/api-endpoints",
    icon: <Webhook className="h-5 w-5" />,
  },
]

const integrationNavItems: NavItem[] = [
  {
    title: "모바일 현황",
    href: "/mobile",
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    title: "인증 정책",
    href: "/auth-policy",
    icon: <KeyRound className="h-5 w-5" />,
  },
]

const operationsNavItems: NavItem[] = [
  {
    title: "헬스 체크",
    href: "/health",
    icon: <HeartPulse className="h-5 w-5" />,
  },
  {
    title: "배포 체크리스트",
    href: "/deployment",
    icon: <CheckSquare className="h-5 w-5" />,
  },
  {
    title: "인시던트 로그",
    href: "/incidents",
    icon: <AlertTriangle className="h-5 w-5" />,
  },
]

const systemNavItems: NavItem[] = [
  {
    title: "설정",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {

  const NavSection = ({
    title,
    items,
  }: {
    title: string
    items: NavItem[]
  }) => (
    <div className="py-2">
      {!isCollapsed && (
        <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
      )}
      <nav className="space-y-1 px-2">
        {items.map((item) => (
          <TooltipProvider key={item.href} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground",
                      isCollapsed && "justify-center px-2"
                    )
                  }
                >
                  {item.icon}
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "ml-auto rounded-full px-2 py-0.5 text-xs font-medium",
                            item.badgeVariant === "destructive"
                              ? "bg-destructive/10 text-destructive"
                              : item.badgeVariant === "warning"
                              ? "bg-warning/10 text-warning"
                              : "bg-primary/10 text-primary"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" className="flex items-center gap-4">
                  {item.title}
                  {item.badge && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        item.badgeVariant === "destructive"
                          ? "bg-destructive/10 text-destructive"
                          : item.badgeVariant === "warning"
                          ? "bg-warning/10 text-warning"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>
    </div>
  )

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col border-r bg-sidebar transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <img src="/admin-dashboard/images/logo.png" alt="Logo" className="h-8 w-auto" />
            <span className="font-bold text-lg">Admin</span>
          </div>
        )}
        {isCollapsed && <img src="/admin-dashboard/images/logo.png" alt="Logo" className="h-6 w-auto mx-auto" />}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-2">
        <NavSection title="메인" items={mainNavItems} />
        <Separator className="my-2" />
        <NavSection title="연동" items={integrationNavItems} />
        <Separator className="my-2" />
        <NavSection title="운영" items={operationsNavItems} />
        <Separator className="my-2" />
        <NavSection title="시스템" items={systemNavItems} />
      </ScrollArea>

      {/* Collapse Button */}
      <div className="border-t p-2">
        <Button
          variant="ghost"
          size="icon"
          className="w-full"
          onClick={onToggle}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
