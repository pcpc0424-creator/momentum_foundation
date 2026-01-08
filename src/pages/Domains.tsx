import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
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
import { DataTable } from "@/components/common/DataTable"
import { StatusBadge } from "@/components/common/StatusBadge"
import { DdayBadge } from "@/components/common/DdayBadge"
import { Plus, ExternalLink, Pencil, Trash2, RefreshCw, Globe, ShieldCheck } from "lucide-react"
import type { Domain } from "@/types"

// Mock data
const mockDomains: Domain[] = [
  {
    id: "1",
    domain: "example.com",
    registrar: "Gabia",
    expirationDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    autoRenew: true,
    status: "active",
    dnsProvider: "Cloudflare",
    sslStatus: "valid",
    sslExpirationDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: "2023-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    domain: "mysite.kr",
    registrar: "Whois",
    expirationDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    autoRenew: false,
    status: "expiring",
    dnsProvider: "AWS Route53",
    sslStatus: "expiring",
    sslExpirationDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: "2022-06-20",
    updatedAt: "2024-01-10",
  },
  {
    id: "3",
    domain: "api.example.com",
    registrar: "Gabia",
    expirationDate: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000).toISOString(),
    autoRenew: true,
    status: "active",
    dnsProvider: "Cloudflare",
    sslStatus: "valid",
    sslExpirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: "2023-03-10",
    updatedAt: "2024-01-12",
  },
  {
    id: "4",
    domain: "old-domain.net",
    registrar: "GoDaddy",
    expirationDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    autoRenew: false,
    status: "expired",
    dnsProvider: "GoDaddy DNS",
    sslStatus: "expired",
    sslExpirationDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: "2021-01-01",
    updatedAt: "2023-12-01",
  },
  {
    id: "5",
    domain: "staging.example.com",
    registrar: "Gabia",
    expirationDate: new Date(Date.now() + 250 * 24 * 60 * 60 * 1000).toISOString(),
    autoRenew: true,
    status: "active",
    dnsProvider: "Cloudflare",
    sslStatus: "valid",
    sslExpirationDate: new Date(Date.now() + 85 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: "2023-05-15",
    updatedAt: "2024-01-14",
  },
]

const columns: ColumnDef<Domain>[] = [
  {
    accessorKey: "domain",
    header: "도메인",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{row.getValue("domain")}</span>
        <a href={`https://${row.getValue("domain")}`} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-3 w-3 text-muted-foreground hover:text-foreground" />
        </a>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "registrar",
    header: "등록기관",
  },
  {
    accessorKey: "expirationDate",
    header: "도메인 만료",
    cell: ({ row }) => <DdayBadge date={row.getValue("expirationDate")} />,
  },
  {
    accessorKey: "dnsProvider",
    header: "DNS 제공자",
  },
  {
    accessorKey: "sslStatus",
    header: "SSL 상태",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <ShieldCheck className={`h-4 w-4 ${
          row.getValue("sslStatus") === "valid" ? "text-green-500" :
          row.getValue("sslStatus") === "expiring" ? "text-yellow-500" : "text-red-500"
        }`} />
        <StatusBadge status={row.getValue("sslStatus")} />
      </div>
    ),
  },
  {
    accessorKey: "autoRenew",
    header: "자동 갱신",
    cell: ({ row }) => (
      <Switch checked={row.getValue("autoRenew")} disabled />
    ),
  },
  {
    id: "actions",
    cell: () => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]

export default function Domains() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">도메인 관리</h2>
          <p className="text-muted-foreground">등록된 도메인을 관리하고 모니터링합니다.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              도메인 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>새 도메인 추가</DialogTitle>
              <DialogDescription>
                관리할 도메인 정보를 입력하세요.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="domain">도메인</Label>
                <Input id="domain" placeholder="example.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="registrar">등록기관</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gabia">Gabia</SelectItem>
                      <SelectItem value="whois">Whois</SelectItem>
                      <SelectItem value="godaddy">GoDaddy</SelectItem>
                      <SelectItem value="namecheap">Namecheap</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dns">DNS 제공자</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cloudflare">Cloudflare</SelectItem>
                      <SelectItem value="route53">AWS Route53</SelectItem>
                      <SelectItem value="godaddy">GoDaddy DNS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expiration">만료일</Label>
                <Input id="expiration" type="date" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-renew">자동 갱신</Label>
                <Switch id="auto-renew" />
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
          <CardHeader className="pb-2">
            <CardDescription>전체 도메인</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDomains.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>활성 도메인</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockDomains.filter(d => d.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>만료 임박</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {mockDomains.filter(d => d.status === "expiring").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>만료됨</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockDomains.filter(d => d.status === "expired").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>도메인 목록</CardTitle>
          <CardDescription>등록된 모든 도메인을 확인하고 관리합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={mockDomains}
            searchKey="domain"
            searchPlaceholder="도메인 검색..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
