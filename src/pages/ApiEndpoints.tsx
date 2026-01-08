import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
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
import { DataTable } from "@/components/common/DataTable"
import { StatusBadge } from "@/components/common/StatusBadge"
import {
  Plus,
  Play,
  RefreshCw,
  Activity,
  Clock,
  Shield,
  Zap,
} from "lucide-react"
import type { ApiEndpoint, HttpMethod } from "@/types"
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
const mockEndpoints: ApiEndpoint[] = [
  {
    id: "1",
    name: "사용자 조회",
    path: "/api/v1/users",
    method: "GET",
    description: "사용자 목록을 조회합니다",
    status: "active",
    responseTime: 45,
    uptime: 99.99,
    lastChecked: new Date().toISOString(),
    authRequired: true,
    rateLimit: 100,
    version: "v1",
  },
  {
    id: "2",
    name: "사용자 생성",
    path: "/api/v1/users",
    method: "POST",
    description: "새 사용자를 생성합니다",
    status: "active",
    responseTime: 120,
    uptime: 99.95,
    lastChecked: new Date().toISOString(),
    authRequired: true,
    rateLimit: 50,
    version: "v1",
  },
  {
    id: "3",
    name: "상품 목록",
    path: "/api/v1/products",
    method: "GET",
    description: "상품 목록을 조회합니다",
    status: "active",
    responseTime: 85,
    uptime: 99.98,
    lastChecked: new Date().toISOString(),
    authRequired: false,
    rateLimit: 200,
    version: "v1",
  },
  {
    id: "4",
    name: "주문 생성",
    path: "/api/v1/orders",
    method: "POST",
    description: "새 주문을 생성합니다",
    status: "active",
    responseTime: 200,
    uptime: 99.9,
    lastChecked: new Date().toISOString(),
    authRequired: true,
    rateLimit: 30,
    version: "v1",
  },
  {
    id: "5",
    name: "레거시 사용자",
    path: "/api/users",
    method: "GET",
    description: "구버전 사용자 API (deprecated)",
    status: "deprecated",
    responseTime: 150,
    uptime: 98.5,
    lastChecked: new Date().toISOString(),
    authRequired: true,
    version: "legacy",
  },
  {
    id: "6",
    name: "결제 처리",
    path: "/api/v1/payments",
    method: "POST",
    description: "결제를 처리합니다 (점검 중)",
    status: "maintenance",
    responseTime: 0,
    uptime: 95,
    lastChecked: new Date().toISOString(),
    authRequired: true,
    rateLimit: 10,
    version: "v1",
  },
]

const responseTimeData = [
  { time: "00:00", value: 45 },
  { time: "04:00", value: 42 },
  { time: "08:00", value: 68 },
  { time: "12:00", value: 95 },
  { time: "16:00", value: 78 },
  { time: "20:00", value: 52 },
  { time: "24:00", value: 48 },
]

const methodColors: Record<HttpMethod, string> = {
  GET: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  POST: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  PUT: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  PATCH: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  DELETE: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
}

const columns: ColumnDef<ApiEndpoint>[] = [
  {
    accessorKey: "method",
    header: "메소드",
    cell: ({ row }) => {
      const method = row.getValue("method") as HttpMethod
      return (
        <Badge className={methodColors[method]} variant="outline">
          {method}
        </Badge>
      )
    },
  },
  {
    accessorKey: "path",
    header: "경로",
    cell: ({ row }) => (
      <code className="rounded bg-muted px-2 py-1 text-sm font-mono">
        {row.getValue("path")}
      </code>
    ),
  },
  {
    accessorKey: "name",
    header: "이름",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.getValue("name")}</p>
        <p className="text-xs text-muted-foreground">{row.original.description}</p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "responseTime",
    header: "응답 시간",
    cell: ({ row }) => {
      const time = row.getValue("responseTime") as number
      return (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className={time > 100 ? "text-yellow-600" : "text-green-600"}>
            {time}ms
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "uptime",
    header: "가동률",
    cell: ({ row }) => {
      const uptime = row.getValue("uptime") as number
      return (
        <span className={uptime >= 99.9 ? "text-green-600" : uptime >= 99 ? "text-yellow-600" : "text-red-600"}>
          {uptime}%
        </span>
      )
    },
  },
  {
    accessorKey: "authRequired",
    header: "인증",
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.getValue("authRequired") ? (
          <Shield className="h-4 w-4 text-green-500" />
        ) : (
          <span className="text-muted-foreground">-</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "rateLimit",
    header: "Rate Limit",
    cell: ({ row }) => {
      const limit = row.original.rateLimit
      return limit ? (
        <span className="text-sm">{limit}/min</span>
      ) : (
        <span className="text-muted-foreground">-</span>
      )
    },
  },
  {
    id: "actions",
    cell: () => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Play className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Activity className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]

export default function ApiEndpoints() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const activeEndpoints = mockEndpoints.filter(e => e.status === "active").length
  const avgResponseTime = Math.round(
    mockEndpoints.filter(e => e.status === "active").reduce((acc, e) => acc + e.responseTime, 0) /
    activeEndpoints
  )
  const avgUptime = (
    mockEndpoints.filter(e => e.status === "active").reduce((acc, e) => acc + e.uptime, 0) /
    activeEndpoints
  ).toFixed(2)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">API 엔드포인트</h2>
          <p className="text-muted-foreground">API 엔드포인트를 관리하고 모니터링합니다.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            새로고침
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                엔드포인트 추가
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>새 API 엔드포인트 추가</DialogTitle>
                <DialogDescription>
                  모니터링할 API 엔드포인트 정보를 입력하세요.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>이름</Label>
                  <Input placeholder="사용자 조회" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label>메소드</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="PATCH">PATCH</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 grid gap-2">
                    <Label>경로</Label>
                    <Input placeholder="/api/v1/users" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>설명</Label>
                  <Input placeholder="API 엔드포인트 설명" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label>인증 필요</Label>
                    <Switch />
                  </div>
                  <div className="grid gap-2">
                    <Label>Rate Limit</Label>
                    <Input type="number" placeholder="100" />
                  </div>
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

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>전체 엔드포인트</CardDescription>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockEndpoints.length}</div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>활성 엔드포인트</CardDescription>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeEndpoints}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>평균 응답 시간</CardDescription>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgResponseTime}ms</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>평균 가동률</CardDescription>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{avgUptime}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Response Time Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            API 응답 시간 추이
          </CardTitle>
          <CardDescription>지난 24시간 평균 응답 시간 (ms)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTimeData}>
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
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>엔드포인트 목록</CardTitle>
          <CardDescription>등록된 모든 API 엔드포인트를 확인하고 관리합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={mockEndpoints}
            searchKey="path"
            searchPlaceholder="경로 검색..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
