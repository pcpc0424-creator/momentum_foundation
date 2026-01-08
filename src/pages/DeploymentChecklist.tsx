import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  CheckSquare,
  Plus,
  Rocket,
  AlertCircle,
  CheckCircle2,
  Clock,
  User,
} from "lucide-react"
import type { DeploymentChecklist, ChecklistItem } from "@/types"

// Mock data
const mockChecklists: DeploymentChecklist[] = [
  {
    id: "1",
    name: "Production 배포",
    environment: "production",
    progress: 75,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    items: [
      { id: "1", category: "코드 검토", title: "PR 머지 완료", description: "모든 PR이 메인 브랜치에 머지됨", completed: true, required: true, completedBy: "김개발", completedAt: "2024-01-15 10:00" },
      { id: "2", category: "코드 검토", title: "코드 리뷰 승인", description: "최소 2명의 리뷰어 승인", completed: true, required: true, completedBy: "박리뷰", completedAt: "2024-01-15 11:00" },
      { id: "3", category: "테스트", title: "유닛 테스트 통과", description: "모든 유닛 테스트 100% 통과", completed: true, required: true, completedBy: "자동화", completedAt: "2024-01-15 11:30" },
      { id: "4", category: "테스트", title: "통합 테스트 통과", description: "E2E 테스트 모두 통과", completed: true, required: true, completedBy: "자동화", completedAt: "2024-01-15 12:00" },
      { id: "5", category: "테스트", title: "성능 테스트 완료", description: "부하 테스트 결과 확인", completed: false, required: true },
      { id: "6", category: "인프라", title: "데이터베이스 마이그레이션", description: "스키마 변경사항 적용", completed: true, required: true, completedBy: "이인프라", completedAt: "2024-01-15 13:00" },
      { id: "7", category: "인프라", title: "환경 변수 설정", description: "프로덕션 환경 변수 확인", completed: true, required: true, completedBy: "이인프라", completedAt: "2024-01-15 13:30" },
      { id: "8", category: "인프라", title: "SSL 인증서 확인", description: "인증서 유효성 검증", completed: true, required: true, completedBy: "자동화", completedAt: "2024-01-15 14:00" },
      { id: "9", category: "문서화", title: "릴리즈 노트 작성", description: "변경사항 문서화", completed: false, required: true },
      { id: "10", category: "문서화", title: "API 문서 업데이트", description: "API 변경사항 반영", completed: false, required: false },
      { id: "11", category: "알림", title: "팀 공지", description: "배포 일정 공유", completed: true, required: false, completedBy: "김PM", completedAt: "2024-01-15 09:00" },
      { id: "12", category: "알림", title: "고객 공지", description: "서비스 점검 안내", completed: false, required: false },
    ],
  },
]

const categoryIcons: Record<string, React.ReactNode> = {
  "코드 검토": "👨‍💻",
  "테스트": "🧪",
  "인프라": "🏗️",
  "문서화": "📝",
  "알림": "📢",
}

export default function DeploymentChecklist() {
  const [selectedChecklist] = useState(mockChecklists[0])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const categorizedItems = selectedChecklist.items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, ChecklistItem[]>)

  const completedCount = selectedChecklist.items.filter(i => i.completed).length
  const requiredCount = selectedChecklist.items.filter(i => i.required).length
  const completedRequiredCount = selectedChecklist.items.filter(i => i.required && i.completed).length
  const progress = Math.round((completedCount / selectedChecklist.items.length) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">배포 체크리스트</h2>
          <p className="text-muted-foreground">배포 전 확인해야 할 항목들을 관리합니다.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                항목 추가
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>새 체크리스트 항목 추가</DialogTitle>
                <DialogDescription>
                  배포 전 확인할 항목을 추가합니다.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>카테고리</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="코드 검토">코드 검토</SelectItem>
                      <SelectItem value="테스트">테스트</SelectItem>
                      <SelectItem value="인프라">인프라</SelectItem>
                      <SelectItem value="문서화">문서화</SelectItem>
                      <SelectItem value="알림">알림</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>제목</Label>
                  <Input placeholder="항목 제목" />
                </div>
                <div className="grid gap-2">
                  <Label>설명</Label>
                  <Input placeholder="상세 설명" />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="required" />
                  <Label htmlFor="required">필수 항목</Label>
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
          <Button disabled={completedRequiredCount < requiredCount}>
            <Rocket className="mr-2 h-4 w-4" />
            배포 시작
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-primary" />
                {selectedChecklist.name}
              </CardTitle>
              <CardDescription>
                {selectedChecklist.environment === "production" ? "프로덕션" :
                 selectedChecklist.environment === "staging" ? "스테이징" : "개발"} 환경
              </CardDescription>
            </div>
            <Badge variant={progress === 100 ? "success" : progress >= 75 ? "warning" : "secondary"}>
              {progress}% 완료
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={progress} className="h-3" />
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
              <div className="text-xs text-muted-foreground">완료</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {selectedChecklist.items.length - completedCount}
              </div>
              <div className="text-xs text-muted-foreground">미완료</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{requiredCount}</div>
              <div className="text-xs text-muted-foreground">필수 항목</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{selectedChecklist.items.length}</div>
              <div className="text-xs text-muted-foreground">전체 항목</div>
            </div>
          </div>
          {completedRequiredCount < requiredCount && (
            <div className="flex items-center gap-2 rounded-lg bg-yellow-50 p-3 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">
                필수 항목 {requiredCount - completedRequiredCount}개가 미완료 상태입니다.
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Checklist Items */}
      <Card>
        <CardHeader>
          <CardTitle>체크리스트 항목</CardTitle>
          <CardDescription>카테고리별 체크리스트 항목입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={Object.keys(categorizedItems)} className="space-y-2">
            {Object.entries(categorizedItems).map(([category, items]) => {
              const categoryCompleted = items.filter(i => i.completed).length
              return (
                <AccordionItem key={category} value={category} className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{categoryIcons[category]}</span>
                      <span className="font-medium">{category}</span>
                      <Badge variant="outline" className="ml-2">
                        {categoryCompleted}/{items.length}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${
                            item.completed ? "bg-green-50/50 border-green-200 dark:bg-green-900/10 dark:border-green-800" : ""
                          }`}
                        >
                          <Checkbox
                            checked={item.completed}
                            className="mt-0.5"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${item.completed ? "line-through text-muted-foreground" : ""}`}>
                                {item.title}
                              </span>
                              {item.required && (
                                <Badge variant="destructive" className="text-[10px] px-1 py-0">필수</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            {item.completed && item.completedBy && (
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {item.completedBy}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {item.completedAt}
                                </span>
                              </div>
                            )}
                          </div>
                          {item.completed && (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
