import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/common/StatCard"
import { StatusBadge } from "@/components/common/StatusBadge"
import { DdayBadge } from "@/components/common/DdayBadge"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Globe,
  ShieldCheck,
  Server,
  AlertTriangle,
  Activity,
  Clock,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

// Mock data
const uptimeData = [
  { time: "00:00", uptime: 100, responseTime: 120 },
  { time: "04:00", uptime: 100, responseTime: 115 },
  { time: "08:00", uptime: 99.9, responseTime: 145 },
  { time: "12:00", uptime: 100, responseTime: 130 },
  { time: "16:00", uptime: 100, responseTime: 125 },
  { time: "20:00", uptime: 99.8, responseTime: 140 },
  { time: "24:00", uptime: 100, responseTime: 118 },
]

const recentIncidents = [
  { id: 1, title: "API 응답 지연", severity: "high", status: "investigating", time: "10분 전" },
  { id: 2, title: "SSL 인증서 갱신 완료", severity: "low", status: "resolved", time: "2시간 전" },
  { id: 3, title: "DNS 레코드 변경", severity: "medium", status: "closed", time: "1일 전" },
]

const expiringItems = [
  { type: "SSL", name: "example.com", expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) },
  { type: "Domain", name: "mysite.kr", expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) },
  { type: "SSL", name: "api.example.com", expiresAt: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000) },
]

const healthStatus = [
  { name: "API Gateway", status: "healthy", uptime: 99.99 },
  { name: "Database", status: "healthy", uptime: 99.95 },
  { name: "Cache Server", status: "degraded", uptime: 98.5 },
  { name: "CDN", status: "healthy", uptime: 100 },
  { name: "Auth Service", status: "healthy", uptime: 99.9 },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="전체 도메인"
          value={24}
          description="활성 도메인 22개"
          icon={Globe}
          variant="primary"
          trend={{ value: 4.5, isPositive: true }}
        />
        <StatCard
          title="SSL 인증서"
          value={18}
          description="만료 임박 3개"
          icon={ShieldCheck}
          variant="success"
        />
        <StatCard
          title="API 가동률"
          value="99.9%"
          description="지난 30일 평균"
          icon={Server}
          variant="success"
          trend={{ value: 0.2, isPositive: true }}
        />
        <StatCard
          title="활성 인시던트"
          value={1}
          description="조사 중 1건"
          icon={AlertTriangle}
          variant="warning"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Uptime Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              시스템 가동률
            </CardTitle>
            <CardDescription>지난 24시간 가동률 추이</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={uptimeData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-xs" />
                  <YAxis domain={[99, 100]} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="uptime"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary) / 0.2)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Response Time Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              API 응답 시간
            </CardTitle>
            <CardDescription>지난 24시간 평균 응답 시간 (ms)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={uptimeData}>
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
                    dataKey="responseTime"
                    stroke="hsl(142 76% 36%)"
                    strokeWidth={2}
                    dot={{ fill: "hsl(142 76% 36%)", strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Health Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>서비스 상태</CardTitle>
              <CardDescription>실시간 헬스 체크 현황</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              전체보기 <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthStatus.map((service) => (
                <div key={service.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {service.status === "healthy" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : service.status === "degraded" ? (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm font-medium">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{service.uptime}%</span>
                    <StatusBadge status={service.status as "healthy" | "degraded" | "unhealthy"} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expiring Items */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>만료 예정 항목</CardTitle>
              <CardDescription>30일 이내 만료 예정</CardDescription>
            </div>
            <Badge variant="warning">{expiringItems.length}건</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expiringItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      {item.type === "SSL" ? (
                        <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Globe className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.type} 인증서</p>
                    </div>
                  </div>
                  <DdayBadge date={item.expiresAt} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Incidents */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>최근 인시던트</CardTitle>
              <CardDescription>최근 발생한 이슈</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              전체보기 <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIncidents.map((incident) => (
                <div key={incident.id} className="flex items-start gap-3 rounded-lg border p-3">
                  <div
                    className={`mt-0.5 h-2 w-2 rounded-full ${
                      incident.severity === "high"
                        ? "bg-red-500"
                        : incident.severity === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{incident.title}</p>
                      <StatusBadge status={incident.status as "open" | "investigating" | "resolved" | "closed"} />
                    </div>
                    <p className="text-xs text-muted-foreground">{incident.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deployment Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            배포 체크리스트 진행률
          </CardTitle>
          <CardDescription>Production 환경 배포 준비 상태</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">전체 진행률</span>
              <span className="text-sm text-muted-foreground">75%</span>
            </div>
            <Progress value={75} className="h-2" />
            <div className="grid grid-cols-4 gap-4 pt-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-xs text-muted-foreground">완료</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">3</div>
                <div className="text-xs text-muted-foreground">진행중</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">1</div>
                <div className="text-xs text-muted-foreground">대기</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">16</div>
                <div className="text-xs text-muted-foreground">전체</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
