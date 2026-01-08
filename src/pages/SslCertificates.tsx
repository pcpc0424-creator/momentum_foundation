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
import { DdayBadge } from "@/components/common/DdayBadge"
import {
  Plus,
  RefreshCw,
  Download,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Lock,
  Unlock,
  Eye,
} from "lucide-react"
import type { SslCertificate } from "@/types"
import { formatDate } from "@/lib/utils"

// Mock data
const mockCertificates: SslCertificate[] = [
  {
    id: "1",
    domainId: "1",
    domain: "example.com",
    issuer: "Let's Encrypt",
    validFrom: "2024-01-01",
    validTo: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    status: "valid",
    autoRenew: true,
    type: "DV",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    domainId: "2",
    domain: "*.example.com",
    issuer: "Let's Encrypt",
    validFrom: "2024-01-01",
    validTo: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    status: "valid",
    autoRenew: true,
    type: "Wildcard",
    createdAt: "2024-01-01",
  },
  {
    id: "3",
    domainId: "3",
    domain: "mysite.kr",
    issuer: "DigiCert",
    validFrom: "2023-06-01",
    validTo: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expiring",
    autoRenew: false,
    type: "OV",
    createdAt: "2023-06-01",
  },
  {
    id: "4",
    domainId: "4",
    domain: "api.example.com",
    issuer: "Let's Encrypt",
    validFrom: "2024-01-15",
    validTo: new Date(Date.now() + 85 * 24 * 60 * 60 * 1000).toISOString(),
    status: "valid",
    autoRenew: true,
    type: "DV",
    createdAt: "2024-01-15",
  },
  {
    id: "5",
    domainId: "5",
    domain: "old.example.com",
    issuer: "Let's Encrypt",
    validFrom: "2023-01-01",
    validTo: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    autoRenew: false,
    type: "DV",
    createdAt: "2023-01-01",
  },
]

const columns: ColumnDef<SslCertificate>[] = [
  {
    accessorKey: "domain",
    header: "도메인",
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <div className="flex items-center gap-2">
          {status === "valid" ? (
            <ShieldCheck className="h-4 w-4 text-green-500" />
          ) : status === "expiring" ? (
            <ShieldAlert className="h-4 w-4 text-yellow-500" />
          ) : (
            <ShieldX className="h-4 w-4 text-red-500" />
          )}
          <span className="font-medium">{row.getValue("domain")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "type",
    header: "타입",
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("type")}</Badge>
    ),
  },
  {
    accessorKey: "issuer",
    header: "발급기관",
  },
  {
    accessorKey: "validFrom",
    header: "발급일",
    cell: ({ row }) => formatDate(row.getValue("validFrom")),
  },
  {
    accessorKey: "validTo",
    header: "만료일",
    cell: ({ row }) => <DdayBadge date={row.getValue("validTo")} />,
  },
  {
    accessorKey: "autoRenew",
    header: "자동 갱신",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.getValue("autoRenew") ? (
          <Lock className="h-4 w-4 text-green-500" />
        ) : (
          <Unlock className="h-4 w-4 text-muted-foreground" />
        )}
        <Switch checked={row.getValue("autoRenew")} disabled />
      </div>
    ),
  },
  {
    id: "actions",
    cell: () => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]

export default function SslCertificates() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const validCerts = mockCertificates.filter(c => c.status === "valid").length
  const expiringCerts = mockCertificates.filter(c => c.status === "expiring").length
  const expiredCerts = mockCertificates.filter(c => c.status === "expired").length
  const totalCerts = mockCertificates.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">SSL 인증서</h2>
          <p className="text-muted-foreground">SSL/TLS 인증서를 관리하고 갱신합니다.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            전체 갱신
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                인증서 추가
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>새 SSL 인증서 발급</DialogTitle>
                <DialogDescription>
                  새 SSL 인증서를 발급받습니다.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>도메인</Label>
                  <Input placeholder="example.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>인증서 타입</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DV">DV (Domain Validated)</SelectItem>
                        <SelectItem value="OV">OV (Organization Validated)</SelectItem>
                        <SelectItem value="EV">EV (Extended Validation)</SelectItem>
                        <SelectItem value="Wildcard">Wildcard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>발급기관</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="letsencrypt">Let's Encrypt</SelectItem>
                        <SelectItem value="digicert">DigiCert</SelectItem>
                        <SelectItem value="comodo">Comodo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label>자동 갱신</Label>
                  <Switch defaultChecked />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  취소
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>발급</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>전체 인증서</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCerts}</div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/10">
          <CardHeader className="pb-2">
            <CardDescription>유효한 인증서</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{validCerts}</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-900/10">
          <CardHeader className="pb-2">
            <CardDescription>만료 임박</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{expiringCerts}</div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-900/10">
          <CardHeader className="pb-2">
            <CardDescription>만료됨</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{expiredCerts}</div>
          </CardContent>
        </Card>
      </div>

      {/* Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle>인증서 상태 개요</CardTitle>
          <CardDescription>전체 인증서의 상태를 한눈에 확인합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex h-4 overflow-hidden rounded-full bg-muted">
              <div
                className="bg-green-500 transition-all"
                style={{ width: `${(validCerts / totalCerts) * 100}%` }}
              />
              <div
                className="bg-yellow-500 transition-all"
                style={{ width: `${(expiringCerts / totalCerts) * 100}%` }}
              />
              <div
                className="bg-red-500 transition-all"
                style={{ width: `${(expiredCerts / totalCerts) * 100}%` }}
              />
            </div>
            <div className="flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span>유효 ({validCerts})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <span>만료 임박 ({expiringCerts})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span>만료됨 ({expiredCerts})</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>인증서 목록</CardTitle>
          <CardDescription>등록된 모든 SSL 인증서를 확인하고 관리합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={mockCertificates}
            searchKey="domain"
            searchPlaceholder="도메인 검색..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
