import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Layout } from "@/components/layout"
import {
  Dashboard,
  Domains,
  DnsRecords,
  SslCertificates,
  ApiEndpoints,
  MobileStatus,
  AuthPolicy,
  HealthCheck,
  DeploymentChecklist,
  IncidentLogs,
  Settings,
} from "@/pages"

function App() {
  return (
    <BrowserRouter basename="/admin-dashboard">
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="domains" element={<Domains />} />
            <Route path="dns" element={<DnsRecords />} />
            <Route path="ssl" element={<SslCertificates />} />
            <Route path="api-endpoints" element={<ApiEndpoints />} />
            <Route path="mobile" element={<MobileStatus />} />
            <Route path="auth-policy" element={<AuthPolicy />} />
            <Route path="health" element={<HealthCheck />} />
            <Route path="deployment" element={<DeploymentChecklist />} />
            <Route path="incidents" element={<IncidentLogs />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  )
}

export default App
