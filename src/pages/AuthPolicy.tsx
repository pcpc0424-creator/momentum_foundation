import { useState } from "react"
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
import { Separator } from "@/components/ui/separator"
import {
  KeyRound,
  Shield,
  Plus,
  Pencil,
  Trash2,
  Globe,
  Users,
  Lock,
} from "lucide-react"
import type { AuthPolicy } from "@/types"

// Mock data
const mockPolicies: AuthPolicy[] = [
  {
    id: "1",
    name: "OAuth 2.0",
    type: "oauth",
    enabled: true,
    description: "Google, Apple 소셜 로그인",
    settings: {
      tokenExpiry: 3600,
      refreshTokenExpiry: 604800,
      allowedOrigins: ["https://example.com", "https://app.example.com"],
      requiredScopes: ["openid", "profile", "email"],
      mfaRequired: false,
    },
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "JWT 인증",
    type: "jwt",
    enabled: true,
    description: "API 액세스를 위한 JWT 토큰",
    settings: {
      tokenExpiry: 3600,
      refreshTokenExpiry: 2592000,
      mfaRequired: true,
    },
    createdAt: "2024-01-01",
    updatedAt: "2024-01-10",
  },
  {
    id: "3",
    name: "API Key",
    type: "api_key",
    enabled: true,
    description: "외부 서비스 연동용 API 키",
    settings: {
      ipWhitelist: ["192.168.1.0/24", "10.0.0.0/8"],
    },
    createdAt: "2024-01-01",
    updatedAt: "2024-01-05",
  },
  {
    id: "4",
    name: "Basic Auth",
    type: "basic",
    enabled: false,
    description: "레거시 시스템 호환용 (비활성화됨)",
    settings: {},
    createdAt: "2023-01-01",
    updatedAt: "2024-01-01",
  },
]

const policyTypeIcons: Record<string, React.ReactNode> = {
  oauth: <Globe className="h-5 w-5" />,
  jwt: <KeyRound className="h-5 w-5" />,
  api_key: <Lock className="h-5 w-5" />,
  basic: <Users className="h-5 w-5" />,
}

const policyTypeLabels: Record<string, string> = {
  oauth: "OAuth 2.0",
  jwt: "JWT",
  api_key: "API Key",
  basic: "Basic Auth",
}

export default function AuthPolicy() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const activePolicies = mockPolicies.filter(p => p.enabled).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">인증 정책</h2>
          <p className="text-muted-foreground">API 및 애플리케이션 인증 정책을 관리합니다.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              정책 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>새 인증 정책 추가</DialogTitle>
              <DialogDescription>
                새로운 인증 정책을 생성합니다.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>정책 이름</Label>
                <Input placeholder="새 인증 정책" />
              </div>
              <div className="grid gap-2">
                <Label>인증 타입</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oauth">OAuth 2.0</SelectItem>
                    <SelectItem value="jwt">JWT</SelectItem>
                    <SelectItem value="api_key">API Key</SelectItem>
                    <SelectItem value="basic">Basic Auth</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>설명</Label>
                <Input placeholder="정책 설명" />
              </div>
              <div className="flex items-center justify-between">
                <Label>활성화</Label>
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

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>전체 정책</CardDescription>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPolicies.length}</div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>활성 정책</CardDescription>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activePolicies}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>MFA 적용</CardDescription>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPolicies.filter(p => p.settings.mfaRequired).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>IP 화이트리스트</CardDescription>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPolicies.filter(p => p.settings.ipWhitelist?.length).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Policy Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {mockPolicies.map((policy) => (
          <Card key={policy.id} className={!policy.enabled ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${
                    policy.enabled
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {policyTypeIcons[policy.type]}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{policy.name}</CardTitle>
                    <CardDescription>{policy.description}</CardDescription>
                  </div>
                </div>
                <Switch checked={policy.enabled} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{policyTypeLabels[policy.type]}</Badge>
                {policy.settings.mfaRequired && (
                  <Badge variant="secondary">MFA 필수</Badge>
                )}
              </div>

              {policy.settings.tokenExpiry && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">토큰 만료</p>
                    <p className="font-medium">{policy.settings.tokenExpiry / 3600}시간</p>
                  </div>
                  {policy.settings.refreshTokenExpiry && (
                    <div>
                      <p className="text-muted-foreground">리프레시 토큰</p>
                      <p className="font-medium">{policy.settings.refreshTokenExpiry / 86400}일</p>
                    </div>
                  )}
                </div>
              )}

              {policy.settings.allowedOrigins && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">허용 도메인</p>
                  <div className="flex flex-wrap gap-1">
                    {policy.settings.allowedOrigins.map((origin, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {origin}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {policy.settings.ipWhitelist && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">IP 화이트리스트</p>
                  <div className="flex flex-wrap gap-1">
                    {policy.settings.ipWhitelist.map((ip, i) => (
                      <Badge key={i} variant="outline" className="text-xs font-mono">
                        {ip}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  마지막 수정: {policy.updatedAt}
                </p>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
