import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  Search,
  Terminal,
  RefreshCw,
  Moon,
  Sun,
  User,
  LogOut,
  Settings,
} from "lucide-react"

const pageTitles: Record<string, string> = {
  "/": "대시보드",
  "/domains": "도메인 관리",
  "/dns": "DNS 레코드",
  "/ssl": "SSL 인증서",
  "/api-endpoints": "API 엔드포인트",
  "/mobile": "모바일 현황",
  "/auth-policy": "인증 정책",
  "/health": "헬스 체크",
  "/deployment": "배포 체크리스트",
  "/incidents": "인시던트 로그",
  "/settings": "설정",
}

interface HeaderProps {
  onRefresh?: () => void
}

export function Header({ onRefresh }: HeaderProps) {
  const location = useLocation()
  const [isDark, setIsDark] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const [notifications] = useState([
    { id: 1, title: "SSL 인증서 만료 임박", type: "warning" },
    { id: 2, title: "도메인 갱신 필요", type: "warning" },
    { id: 3, title: "API 응답 지연 감지", type: "error" },
  ])

  const currentPage = pageTitles[location.pathname] || "페이지"

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-6">
      {/* Page Title */}
      <div className="flex-1">
        <h1 className="text-xl font-semibold">{currentPage}</h1>
      </div>

      {/* Search */}
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="검색..."
          className="pl-9 h-9"
        />
      </div>

      {/* Environment Selector */}
      <Select defaultValue="production">
        <SelectTrigger className="w-32 h-9">
          <SelectValue placeholder="환경" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="production">Production</SelectItem>
          <SelectItem value="staging">Staging</SelectItem>
          <SelectItem value="development">Development</SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="h-6" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Refresh */}
        <Button variant="ghost" size="icon" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>

        {/* Terminal */}
        <Dialog open={showTerminal} onOpenChange={setShowTerminal}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Terminal className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>SSH 터미널</DialogTitle>
              <DialogDescription>
                서버에 직접 연결하여 명령을 실행합니다.
              </DialogDescription>
            </DialogHeader>
            <div className="h-96 rounded-lg bg-gray-900 p-4 font-mono text-sm text-green-400">
              <div>$ ssh admin@server.example.com</div>
              <div className="mt-2 text-gray-500">
                터미널 연결을 위해 xterm.js를 통합하세요.
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Notifications */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
                  {notifications.length}
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>알림</DialogTitle>
              <DialogDescription>최근 알림 목록입니다.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  <Badge
                    variant={notification.type === "error" ? "destructive" : "warning"}
                  >
                    {notification.type === "error" ? "오류" : "경고"}
                  </Badge>
                  <span className="text-sm">{notification.title}</span>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* User Menu */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <User className="h-4 w-4" />
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>계정</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">관리자</p>
                  <p className="text-sm text-muted-foreground">admin@example.com</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  설정
                </Button>
                <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  로그아웃
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}
