import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/common/StatusBadge"
import {
  Smartphone,
  Apple,
  Star,
  Download,
  TrendingUp,
  Bell,
  BarChart3,
  CreditCard,
  Shield,
  Cloud,
  RefreshCw,
  ExternalLink,
} from "lucide-react"
import type { MobileApp, MobileIntegration } from "@/types"

// Mock data
const mockApps: MobileApp[] = [
  {
    id: "1",
    platform: "ios",
    version: "2.5.0",
    buildNumber: "250",
    status: "published",
    downloadCount: 125000,
    rating: 4.8,
    lastUpdated: "2024-01-10",
    minOsVersion: "iOS 14.0",
  },
  {
    id: "2",
    platform: "android",
    version: "2.5.0",
    buildNumber: "250",
    status: "published",
    downloadCount: 280000,
    rating: 4.6,
    lastUpdated: "2024-01-10",
    minOsVersion: "Android 8.0",
  },
]

const mockIntegrations: MobileIntegration[] = [
  {
    id: "1",
    name: "Firebase Cloud Messaging",
    type: "push",
    status: "connected",
    provider: "Firebase",
    lastSync: new Date().toISOString(),
    config: {},
  },
  {
    id: "2",
    name: "Google Analytics",
    type: "analytics",
    status: "connected",
    provider: "Google",
    lastSync: new Date().toISOString(),
    config: {},
  },
  {
    id: "3",
    name: "Stripe Payments",
    type: "payment",
    status: "connected",
    provider: "Stripe",
    lastSync: new Date().toISOString(),
    config: {},
  },
  {
    id: "4",
    name: "Firebase Auth",
    type: "auth",
    status: "connected",
    provider: "Firebase",
    lastSync: new Date().toISOString(),
    config: {},
  },
  {
    id: "5",
    name: "AWS S3",
    type: "storage",
    status: "disconnected",
    provider: "AWS",
    lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    config: {},
  },
]

const integrationIcons: Record<string, React.ReactNode> = {
  push: <Bell className="h-5 w-5" />,
  analytics: <BarChart3 className="h-5 w-5" />,
  payment: <CreditCard className="h-5 w-5" />,
  auth: <Shield className="h-5 w-5" />,
  storage: <Cloud className="h-5 w-5" />,
}

export default function MobileStatus() {
  const totalDownloads = mockApps.reduce((acc, app) => acc + app.downloadCount, 0)
  const avgRating = (mockApps.reduce((acc, app) => acc + app.rating, 0) / mockApps.length).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">모바일 현황</h2>
          <p className="text-muted-foreground">모바일 앱 상태와 연동 서비스를 관리합니다.</p>
        </div>
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          동기화
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>총 다운로드</CardDescription>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalDownloads / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> 지난달 대비
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>평균 평점</CardDescription>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold">{avgRating}</span>
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>활성 사용자 (DAU)</CardDescription>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.3%</span> 지난주 대비
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>연동 서비스</CardDescription>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockIntegrations.filter(i => i.status === "connected").length}/{mockIntegrations.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* App Status */}
      <div className="grid gap-6 md:grid-cols-2">
        {mockApps.map((app) => (
          <Card key={app.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-xl p-2.5 ${
                    app.platform === "ios" ? "bg-gray-900" : "bg-green-600"
                  }`}>
                    {app.platform === "ios" ? (
                      <Apple className="h-6 w-6 text-white" />
                    ) : (
                      <Smartphone className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {app.platform === "ios" ? "iOS App" : "Android App"}
                    </CardTitle>
                    <CardDescription>버전 {app.version} (빌드 {app.buildNumber})</CardDescription>
                  </div>
                </div>
                <StatusBadge status={app.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">다운로드</p>
                  <p className="text-xl font-bold">{(app.downloadCount / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">평점</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold">{app.rating}</span>
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">최소 요구 버전</p>
                <Badge variant="outline">{app.minOsVersion}</Badge>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  마지막 업데이트: {app.lastUpdated}
                </p>
                <Button variant="ghost" size="sm">
                  스토어 보기 <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>연동 서비스</CardTitle>
          <CardDescription>모바일 앱에 연동된 외부 서비스를 관리합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockIntegrations.map((integration) => (
              <div
                key={integration.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${
                    integration.status === "connected"
                      ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}>
                    {integrationIcons[integration.type]}
                  </div>
                  <div>
                    <p className="font-medium">{integration.name}</p>
                    <p className="text-xs text-muted-foreground">{integration.provider}</p>
                  </div>
                </div>
                <StatusBadge status={integration.status} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
