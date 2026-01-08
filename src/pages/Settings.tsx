import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Settings as SettingsIcon,
  Bell,
  Globe,
  Moon,
  Sun,
  Slack,
  Mail,
  Webhook,
  Save,
  RefreshCw,
} from "lucide-react"

export default function Settings() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light")
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [slackAlerts, setSlackAlerts] = useState(true)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">설정</h2>
        <p className="text-muted-foreground">시스템 설정을 관리합니다.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">일반</TabsTrigger>
          <TabsTrigger value="notifications">알림</TabsTrigger>
          <TabsTrigger value="thresholds">임계값</TabsTrigger>
          <TabsTrigger value="integrations">연동</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                일반 설정
              </CardTitle>
              <CardDescription>기본적인 시스템 설정을 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>시간대</Label>
                  <Select defaultValue="asia-seoul">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia-seoul">Asia/Seoul (KST)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="america-la">America/Los_Angeles (PST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>언어</Label>
                  <Select defaultValue="ko">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ko">한국어</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>날짜 형식</Label>
                <Select defaultValue="yyyy-mm-dd">
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                    <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>테마</Label>
                <div className="flex gap-4">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    onClick={() => setTheme("light")}
                    className="flex items-center gap-2"
                  >
                    <Sun className="h-4 w-4" />
                    라이트
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    onClick={() => setTheme("dark")}
                    className="flex items-center gap-2"
                  >
                    <Moon className="h-4 w-4" />
                    다크
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    onClick={() => setTheme("system")}
                    className="flex items-center gap-2"
                  >
                    <SettingsIcon className="h-4 w-4" />
                    시스템
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                알림 설정
              </CardTitle>
              <CardDescription>알림 수신 방법을 설정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">이메일 알림</p>
                    <p className="text-sm text-muted-foreground">중요 알림을 이메일로 받습니다</p>
                  </div>
                </div>
                <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
              </div>

              {emailAlerts && (
                <div className="ml-8 space-y-2">
                  <Label>수신 이메일</Label>
                  <Input defaultValue="admin@example.com" />
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Slack className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Slack 알림</p>
                    <p className="text-sm text-muted-foreground">Slack 채널로 알림을 받습니다</p>
                  </div>
                </div>
                <Switch checked={slackAlerts} onCheckedChange={setSlackAlerts} />
              </div>

              {slackAlerts && (
                <div className="ml-8 space-y-2">
                  <Label>Slack Webhook URL</Label>
                  <Input placeholder="https://hooks.slack.com/services/..." />
                </div>
              )}

              <Separator />

              <div className="space-y-4">
                <Label>알림 받을 이벤트</Label>
                <div className="space-y-3">
                  {[
                    { id: "ssl", label: "SSL 인증서 만료 알림", checked: true },
                    { id: "domain", label: "도메인 만료 알림", checked: true },
                    { id: "incident", label: "인시던트 발생 알림", checked: true },
                    { id: "health", label: "헬스 체크 실패 알림", checked: true },
                    { id: "deploy", label: "배포 완료 알림", checked: false },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
                      <Switch id={item.id} defaultChecked={item.checked} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Threshold Settings */}
        <TabsContent value="thresholds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>임계값 설정</CardTitle>
              <CardDescription>알림 및 경고 발생 기준을 설정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>SSL 인증서 만료 경고 (일)</Label>
                  <Input type="number" defaultValue="30" />
                  <p className="text-xs text-muted-foreground">
                    만료일까지 남은 일수가 이 값 이하면 경고
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>도메인 만료 경고 (일)</Label>
                  <Input type="number" defaultValue="60" />
                  <p className="text-xs text-muted-foreground">
                    만료일까지 남은 일수가 이 값 이하면 경고
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>가동률 경고 임계값 (%)</Label>
                  <Input type="number" defaultValue="99.5" />
                  <p className="text-xs text-muted-foreground">
                    가동률이 이 값 이하면 경고
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>응답 시간 경고 (ms)</Label>
                  <Input type="number" defaultValue="500" />
                  <p className="text-xs text-muted-foreground">
                    응답 시간이 이 값 이상이면 경고
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integration Settings */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5" />
                Webhook 연동
              </CardTitle>
              <CardDescription>외부 서비스와 연동할 Webhook을 설정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <Input placeholder="https://your-service.com/webhook" />
              </div>
              <div className="space-y-2">
                <Label>Secret Key</Label>
                <Input type="password" placeholder="********" />
              </div>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                테스트 요청
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API 키 관리</CardTitle>
              <CardDescription>외부 연동을 위한 API 키를 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Production API Key</p>
                  <p className="text-sm text-muted-foreground">sk_live_••••••••••••••••</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">복사</Button>
                  <Button variant="outline" size="sm">재생성</Button>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Test API Key</p>
                  <p className="text-sm text-muted-foreground">sk_test_••••••••••••••••</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">복사</Button>
                  <Button variant="outline" size="sm">재생성</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button>
          <Save className="mr-2 h-4 w-4" />
          설정 저장
        </Button>
      </div>
    </div>
  )
}
