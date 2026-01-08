import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StatusBadge } from "@/components/common/StatusBadge"
import {
  Plus,
  Play,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Activity,
  Bell,
} from "lucide-react"
import type { HealthCheck } from "@/types"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

// Mock data
const mockHealthChecks: HealthCheck[] = [
  {
    id: "1",
    name: "API Gateway",
    url: "https://api.example.com/health",
    method: "GET",
    interval: 60,
    timeout: 5000,
    status: "healthy",
    lastCheck: new Date().toISOString(),
    uptime: 99.99,
    responseTime: 45,
    alerts: true,
  },
  {
    id: "2",
    name: "Database",
    url: "https://db.example.com/ping",
    method: "GET",
    interval: 30,
    timeout: 3000,
    status: "healthy",
    lastCheck: new Date().toISOString(),
    uptime: 99.95,
    responseTime: 12,
    alerts: true,
  },
  {
    id: "3",
    name: "Cache Server",
    url: "https://cache.example.com/health",
    method: "GET",
    interval: 60,
    timeout: 5000,
    status: "degraded",
    lastCheck: new Date().toISOString(),
    uptime: 98.5,
    responseTime: 150,
    alerts: true,
  },
  {
    id: "4",
    name: "CDN",
    url: "https://cdn.example.com/check",
    method: "GET",
    interval: 120,
    timeout: 10000,
    status: "healthy",
    lastCheck: new Date().toISOString(),
    uptime: 100,
    responseTime: 25,
    alerts: false,
  },
  {
    id: "5",
    name: "Auth Service",
    url: "https://auth.example.com/health",
    method: "GET",
    interval: 60,
    timeout: 5000,
    status: "healthy",
    lastCheck: new Date().toISOString(),
    uptime: 99.9,
    responseTime: 68,
    alerts: true,
  },
  {
    id: "6",
    name: "Payment Gateway",
    url: "https://payment.example.com/status",
    method: "GET",
    interval: 30,
    timeout: 5000,
    status: "unhealthy",
    lastCheck: new Date().toISOString(),
    uptime: 95.2,
    responseTime: 0,
    alerts: true,
  },
]

const responseTimeHistory = [
  { time: "00:00", api: 45, db: 12, cache: 80, auth: 65 },
  { time: "04:00", api: 42, db: 10, cache: 95, auth: 58 },
  { time: "08:00", api: 58, db: 15, cache: 120, auth: 72 },
  { time: "12:00", api: 65, db: 18, cache: 150, auth: 85 },
  { time: "16:00", api: 52, db: 14, cache: 135, auth: 70 },
  { time: "20:00", api: 48, db: 11, cache: 110, auth: 62 },
  { time: "24:00", api: 45, db: 12, cache: 95, auth: 68 },
]

export default function HealthCheck() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const healthyCount = mockHealthChecks.filter(h => h.status === "healthy").length
  const degradedCount = mockHealthChecks.filter(h => h.status === "degraded").length
  const unhealthyCount = mockHealthChecks.filter(h => h.status === "unhealthy").length
  const avgUptime = (
    mockHealthChecks.reduce((acc, h) => acc + h.uptime, 0) / mockHealthChecks.length
  ).toFixed(2)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "unhealthy":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">헬스 체크</h2>
          <p className="text-muted-foreground">서비스 상태를 실시간으로 모니터링합니다.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            전체 체크
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                체크 추가
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>새 헬스 체크 추가</DialogTitle>
                <DialogDescription>
                  모니터링할 서비스 정보를 입력하세요.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>서비스 이름</Label>
                  <Input placeholder="API Gateway" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label>메소드</Label>
                    <Select defaultValue="GET">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 grid gap-2">
                    <Label>URL</Label>
                    <Input placeholder="https://api.example.com/health" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>체크 주기</Label>
                    <Select defaultValue="60">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30초</SelectItem>
                        <SelectItem value="60">1분</SelectItem>
                        <SelectItem value="300">5분</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>타임아웃 (ms)</Label>
                    <Input type="number" defaultValue="5000" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label>알림 활성화</Label>
                  <Switch defaultChecked />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  취소
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>추가</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>정상</CardDescription>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{healthyCount}</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-900/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>저하</CardDescription>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{degradedCount}</div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-900/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>장애</CardDescription>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{unhealthyCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>평균 가동률</CardDescription>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgUptime}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Response Time Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            응답 시간 추이
          </CardTitle>
          <CardDescription>지난 24시간 서비스별 응답 시간 (ms)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTimeHistory}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="time" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="api" stroke="#3b82f6" strokeWidth={2} name="API" />
                <Line type="monotone" dataKey="db" stroke="#10b981" strokeWidth={2} name="DB" />
                <Line type="monotone" dataKey="cache" stroke="#f59e0b" strokeWidth={2} name="Cache" />
                <Line type="monotone" dataKey="auth" stroke="#8b5cf6" strokeWidth={2} name="Auth" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Service List */}
      <Card>
        <CardHeader>
          <CardTitle>서비스 목록</CardTitle>
          <CardDescription>모니터링 중인 모든 서비스의 상태입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockHealthChecks.map((check) => (
              <div
                key={check.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  {getStatusIcon(check.status)}
                  <div>
                    <p className="font-medium">{check.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{check.url}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-medium">{check.responseTime}ms</p>
                    <p className="text-xs text-muted-foreground">응답 시간</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{check.uptime}%</p>
                    <p className="text-xs text-muted-foreground">가동률</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {check.alerts && <Bell className="h-4 w-4 text-muted-foreground" />}
                    <StatusBadge status={check.status} />
                  </div>
                  <Button variant="ghost" size="icon">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
