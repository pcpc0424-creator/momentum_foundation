import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  AlertTriangle,
  Plus,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react"
import type { Incident, IncidentSeverity } from "@/types"
import { formatDateTime } from "@/lib/utils"

// Mock data
const mockIncidents: Incident[] = [
  {
    id: "INC-001",
    title: "API Gateway 응답 지연",
    description: "프로덕션 API 게이트웨이에서 평균 응답 시간이 500ms 이상으로 증가",
    severity: "high",
    status: "investigating",
    affectedServices: ["API Gateway", "User Service", "Order Service"],
    assignee: "김개발",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    timeline: [
      { id: "1", timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), message: "인시던트 생성됨", author: "시스템", type: "update" },
      { id: "2", timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(), message: "조사 시작", author: "김개발", type: "status_change" },
      { id: "3", timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), message: "DB 커넥션 풀 이슈로 추정됨", author: "김개발", type: "update" },
    ],
  },
  {
    id: "INC-002",
    title: "SSL 인증서 만료 경고",
    description: "example.com SSL 인증서가 7일 내 만료 예정",
    severity: "medium",
    status: "open",
    affectedServices: ["CDN", "Web Server"],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    timeline: [
      { id: "1", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), message: "SSL 만료 경고 감지", author: "시스템", type: "update" },
    ],
  },
  {
    id: "INC-003",
    title: "결제 서비스 장애",
    description: "결제 게이트웨이 연결 실패로 인한 결제 처리 불가",
    severity: "critical",
    status: "resolved",
    affectedServices: ["Payment Gateway", "Order Service"],
    assignee: "박운영",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
    resolvedAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
    timeline: [
      { id: "1", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), message: "결제 실패 알림 다수 발생", author: "시스템", type: "update" },
      { id: "2", timestamp: new Date(Date.now() - 23.5 * 60 * 60 * 1000).toISOString(), message: "긴급 대응 시작", author: "박운영", type: "status_change" },
      { id: "3", timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(), message: "PG사 측 네트워크 이슈 확인", author: "박운영", type: "update" },
      { id: "4", timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(), message: "PG사 복구 완료, 정상화 확인", author: "박운영", type: "resolution" },
    ],
  },
  {
    id: "INC-004",
    title: "로그인 서비스 간헐적 실패",
    description: "일부 사용자 로그인 시도 실패 보고",
    severity: "low",
    status: "closed",
    affectedServices: ["Auth Service"],
    assignee: "이보안",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 46 * 60 * 60 * 1000).toISOString(),
    resolvedAt: new Date(Date.now() - 46 * 60 * 60 * 1000).toISOString(),
    timeline: [
      { id: "1", timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), message: "사용자 문의 접수", author: "시스템", type: "update" },
      { id: "2", timestamp: new Date(Date.now() - 47 * 60 * 60 * 1000).toISOString(), message: "캐시 동기화 이슈 확인", author: "이보안", type: "update" },
      { id: "3", timestamp: new Date(Date.now() - 46 * 60 * 60 * 1000).toISOString(), message: "캐시 초기화로 해결", author: "이보안", type: "resolution" },
    ],
  },
]

const severityConfig: Record<IncidentSeverity, { label: string; color: string; icon: React.ReactNode }> = {
  critical: { label: "심각", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", icon: <XCircle className="h-4 w-4" /> },
  high: { label: "높음", color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400", icon: <AlertTriangle className="h-4 w-4" /> },
  medium: { label: "중간", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400", icon: <AlertCircle className="h-4 w-4" /> },
  low: { label: "낮음", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", icon: <AlertCircle className="h-4 w-4" /> },
}

const columns: ColumnDef<Incident>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <code className="rounded bg-muted px-2 py-1 text-xs font-mono">
        {row.getValue("id")}
      </code>
    ),
  },
  {
    accessorKey: "severity",
    header: "심각도",
    cell: ({ row }) => {
      const severity = row.getValue("severity") as IncidentSeverity
      const config = severityConfig[severity]
      return (
        <Badge className={config.color} variant="outline">
          {config.icon}
          <span className="ml-1">{config.label}</span>
        </Badge>
      )
    },
  },
  {
    accessorKey: "title",
    header: "제목",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.getValue("title")}</p>
        <p className="text-xs text-muted-foreground truncate max-w-xs">
          {row.original.description}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "affectedServices",
    header: "영향 서비스",
    cell: ({ row }) => {
      const services = row.getValue("affectedServices") as string[]
      return (
        <div className="flex flex-wrap gap-1">
          {services.slice(0, 2).map((service, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {service}
            </Badge>
          ))}
          {services.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{services.length - 2}
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "assignee",
    header: "담당자",
    cell: ({ row }) => {
      const assignee = row.getValue("assignee") as string | undefined
      return assignee ? (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span>{assignee}</span>
        </div>
      ) : (
        <span className="text-muted-foreground">미배정</span>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "발생 시간",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{formatDateTime(row.getValue("createdAt"))}</span>
      </div>
    ),
  },
]

export default function IncidentLogs() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const openIncidents = mockIncidents.filter(i => i.status === "open" || i.status === "investigating").length
  const criticalIncidents = mockIncidents.filter(i => i.severity === "critical" && i.status !== "closed").length

  const filteredIncidents = statusFilter === "all"
    ? mockIncidents
    : mockIncidents.filter(i => i.status === statusFilter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">인시던트 로그</h2>
          <p className="text-muted-foreground">발생한 인시던트를 추적하고 관리합니다.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              인시던트 생성
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>새 인시던트 생성</DialogTitle>
              <DialogDescription>
                새로운 인시던트를 기록합니다.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>제목</Label>
                <Input placeholder="인시던트 제목" />
              </div>
              <div className="grid gap-2">
                <Label>설명</Label>
                <Input placeholder="상세 설명" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>심각도</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">심각</SelectItem>
                      <SelectItem value="high">높음</SelectItem>
                      <SelectItem value="medium">중간</SelectItem>
                      <SelectItem value="low">낮음</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>담당자</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kim">김개발</SelectItem>
                      <SelectItem value="park">박운영</SelectItem>
                      <SelectItem value="lee">이보안</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>영향 서비스</Label>
                <Input placeholder="쉼표로 구분 (예: API Gateway, Auth Service)" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>생성</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-900/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>진행 중 인시던트</CardDescription>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{openIncidents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>심각 인시던트</CardDescription>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalIncidents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>이번 달 해결</CardDescription>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockIncidents.filter(i => i.status === "resolved" || i.status === "closed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>평균 해결 시간</CardDescription>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5시간</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList>
          <TabsTrigger value="all">전체 ({mockIncidents.length})</TabsTrigger>
          <TabsTrigger value="open">열림 ({mockIncidents.filter(i => i.status === "open").length})</TabsTrigger>
          <TabsTrigger value="investigating">조사중 ({mockIncidents.filter(i => i.status === "investigating").length})</TabsTrigger>
          <TabsTrigger value="resolved">해결됨 ({mockIncidents.filter(i => i.status === "resolved").length})</TabsTrigger>
          <TabsTrigger value="closed">종료 ({mockIncidents.filter(i => i.status === "closed").length})</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Incidents Table */}
      <Card>
        <CardHeader>
          <CardTitle>인시던트 목록</CardTitle>
          <CardDescription>발생한 모든 인시던트를 확인합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredIncidents}
            searchKey="title"
            searchPlaceholder="인시던트 검색..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
