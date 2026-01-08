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
import { Plus, Pencil, Trash2, Copy, Check, Server } from "lucide-react"
import type { DnsRecord, DnsRecordType } from "@/types"

// Mock data
const mockDnsRecords: DnsRecord[] = [
  { id: "1", domainId: "1", type: "A", name: "@", value: "192.168.1.1", ttl: 3600, status: "active", createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "2", domainId: "1", type: "A", name: "www", value: "192.168.1.1", ttl: 3600, status: "active", createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "3", domainId: "1", type: "CNAME", name: "api", value: "api.example.com", ttl: 3600, status: "active", createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "4", domainId: "1", type: "MX", name: "@", value: "mail.example.com", ttl: 3600, priority: 10, status: "active", createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "5", domainId: "1", type: "TXT", name: "@", value: "v=spf1 include:_spf.google.com ~all", ttl: 3600, status: "active", createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "6", domainId: "1", type: "AAAA", name: "@", value: "2001:0db8:85a3:0000:0000:8a2e:0370:7334", ttl: 3600, status: "active", createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "7", domainId: "1", type: "NS", name: "@", value: "ns1.cloudflare.com", ttl: 86400, status: "active", createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "8", domainId: "1", type: "CAA", name: "@", value: '0 issue "letsencrypt.org"', ttl: 3600, status: "active", createdAt: "2024-01-01", updatedAt: "2024-01-01" },
]

const recordTypes: DnsRecordType[] = ["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SRV", "CAA"]

const recordTypeColors: Record<DnsRecordType, string> = {
  A: "bg-blue-100 text-blue-800",
  AAAA: "bg-purple-100 text-purple-800",
  CNAME: "bg-green-100 text-green-800",
  MX: "bg-yellow-100 text-yellow-800",
  TXT: "bg-gray-100 text-gray-800",
  NS: "bg-orange-100 text-orange-800",
  SRV: "bg-pink-100 text-pink-800",
  CAA: "bg-red-100 text-red-800",
}

const columns: ColumnDef<DnsRecord>[] = [
  {
    accessorKey: "type",
    header: "타입",
    cell: ({ row }) => {
      const type = row.getValue("type") as DnsRecordType
      return (
        <Badge className={recordTypeColors[type]} variant="outline">
          {type}
        </Badge>
      )
    },
  },
  {
    accessorKey: "name",
    header: "이름",
    cell: ({ row }) => (
      <code className="rounded bg-muted px-2 py-1 text-sm">
        {row.getValue("name")}
      </code>
    ),
  },
  {
    accessorKey: "value",
    header: "값",
    cell: ({ row }) => {
      const [copied, setCopied] = useState(false)
      const value = row.getValue("value") as string

      const handleCopy = () => {
        navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }

      return (
        <div className="flex items-center gap-2 max-w-md">
          <code className="truncate rounded bg-muted px-2 py-1 text-sm">
            {value}
          </code>
          <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={handleCopy}>
            {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
          </Button>
        </div>
      )
    },
  },
  {
    accessorKey: "ttl",
    header: "TTL",
    cell: ({ row }) => {
      const ttl = row.getValue("ttl") as number
      const formatted = ttl >= 3600 ? `${ttl / 3600}h` : `${ttl}s`
      return <span className="text-muted-foreground">{formatted}</span>
    },
  },
  {
    accessorKey: "priority",
    header: "우선순위",
    cell: ({ row }) => {
      const priority = row.original.priority
      return priority ? <span>{priority}</span> : <span className="text-muted-foreground">-</span>
    },
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    id: "actions",
    cell: () => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]

export default function DnsRecords() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string>("all")

  const filteredRecords = selectedType === "all"
    ? mockDnsRecords
    : mockDnsRecords.filter(r => r.type === selectedType)

  const recordCounts = recordTypes.reduce((acc, type) => {
    acc[type] = mockDnsRecords.filter(r => r.type === type).length
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">DNS 레코드</h2>
          <p className="text-muted-foreground">도메인의 DNS 레코드를 관리합니다.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              레코드 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>새 DNS 레코드 추가</DialogTitle>
              <DialogDescription>
                DNS 레코드 정보를 입력하세요.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>도메인</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="도메인 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="example.com">example.com</SelectItem>
                    <SelectItem value="mysite.kr">mysite.kr</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>타입</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {recordTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>TTL</Label>
                  <Select defaultValue="3600">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="300">5분</SelectItem>
                      <SelectItem value="3600">1시간</SelectItem>
                      <SelectItem value="86400">1일</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>이름</Label>
                <Input placeholder="@ 또는 서브도메인" />
              </div>
              <div className="grid gap-2">
                <Label>값</Label>
                <Input placeholder="IP 주소 또는 도메인" />
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

      {/* Domain Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            도메인 선택
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select defaultValue="example.com">
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="example.com">example.com</SelectItem>
              <SelectItem value="mysite.kr">mysite.kr</SelectItem>
              <SelectItem value="api.example.com">api.example.com</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Record Type Filter */}
      <Tabs value={selectedType} onValueChange={setSelectedType}>
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="all">
            전체 ({mockDnsRecords.length})
          </TabsTrigger>
          {recordTypes.map(type => (
            <TabsTrigger key={type} value={type}>
              {type} ({recordCounts[type] || 0})
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>레코드 목록</CardTitle>
          <CardDescription>현재 도메인에 설정된 DNS 레코드입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredRecords}
            searchKey="name"
            searchPlaceholder="레코드 검색..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
