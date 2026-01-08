// Domain types
export interface Domain {
  id: string
  domain: string
  registrar: string
  expirationDate: string
  autoRenew: boolean
  status: 'active' | 'expiring' | 'expired' | 'pending'
  dnsProvider: string
  sslStatus: 'valid' | 'expiring' | 'expired' | 'none'
  sslExpirationDate?: string
  createdAt: string
  updatedAt: string
}

// DNS Record types
export type DnsRecordType = 'A' | 'AAAA' | 'CNAME' | 'MX' | 'TXT' | 'NS' | 'SRV' | 'CAA'

export interface DnsRecord {
  id: string
  domainId: string
  type: DnsRecordType
  name: string
  value: string
  ttl: number
  priority?: number
  status: 'active' | 'pending' | 'error'
  createdAt: string
  updatedAt: string
}

// SSL Certificate types
export interface SslCertificate {
  id: string
  domainId: string
  domain: string
  issuer: string
  validFrom: string
  validTo: string
  status: 'valid' | 'expiring' | 'expired' | 'revoked'
  autoRenew: boolean
  type: 'DV' | 'OV' | 'EV' | 'Wildcard'
  createdAt: string
}

// API Endpoint types
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface ApiEndpoint {
  id: string
  name: string
  path: string
  method: HttpMethod
  description: string
  status: 'active' | 'deprecated' | 'maintenance'
  responseTime: number
  uptime: number
  lastChecked: string
  authRequired: boolean
  rateLimit?: number
  version: string
}

// Mobile Status types
export interface MobileApp {
  id: string
  platform: 'ios' | 'android'
  version: string
  buildNumber: string
  status: 'published' | 'review' | 'draft' | 'rejected'
  downloadCount: number
  rating: number
  lastUpdated: string
  minOsVersion: string
}

export interface MobileIntegration {
  id: string
  name: string
  type: 'push' | 'analytics' | 'payment' | 'auth' | 'storage'
  status: 'connected' | 'disconnected' | 'error'
  provider: string
  lastSync: string
  config: Record<string, unknown>
}

// Auth Policy types
export interface AuthPolicy {
  id: string
  name: string
  type: 'oauth' | 'jwt' | 'api_key' | 'basic'
  enabled: boolean
  description: string
  settings: {
    tokenExpiry?: number
    refreshTokenExpiry?: number
    allowedOrigins?: string[]
    requiredScopes?: string[]
    mfaRequired?: boolean
    ipWhitelist?: string[]
  }
  createdAt: string
  updatedAt: string
}

// Health Check types
export interface HealthCheck {
  id: string
  name: string
  url: string
  method: HttpMethod
  interval: number
  timeout: number
  status: 'healthy' | 'degraded' | 'unhealthy'
  lastCheck: string
  uptime: number
  responseTime: number
  alerts: boolean
}

export interface HealthMetric {
  timestamp: string
  responseTime: number
  status: 'success' | 'failure'
}

// Deployment Checklist types
export interface ChecklistItem {
  id: string
  category: string
  title: string
  description: string
  completed: boolean
  required: boolean
  completedBy?: string
  completedAt?: string
}

export interface DeploymentChecklist {
  id: string
  name: string
  environment: 'development' | 'staging' | 'production'
  items: ChecklistItem[]
  progress: number
  createdAt: string
  updatedAt: string
}

// Incident Log types
export type IncidentSeverity = 'critical' | 'high' | 'medium' | 'low'
export type IncidentStatus = 'open' | 'investigating' | 'resolved' | 'closed'

export interface Incident {
  id: string
  title: string
  description: string
  severity: IncidentSeverity
  status: IncidentStatus
  affectedServices: string[]
  assignee?: string
  createdAt: string
  updatedAt: string
  resolvedAt?: string
  timeline: IncidentTimelineEntry[]
}

export interface IncidentTimelineEntry {
  id: string
  timestamp: string
  message: string
  author: string
  type: 'update' | 'status_change' | 'resolution'
}

// Dashboard Stats types
export interface DashboardStats {
  totalDomains: number
  activeSslCerts: number
  expiringSslCerts: number
  apiUptime: number
  activeIncidents: number
  healthyServices: number
  totalServices: number
}

// Settings types
export interface NotificationSettings {
  emailAlerts: boolean
  slackAlerts: boolean
  webhookUrl?: string
  alertThresholds: {
    sslExpiryDays: number
    domainExpiryDays: number
    uptimeThreshold: number
    responseTimeThreshold: number
  }
}

export interface GeneralSettings {
  timezone: string
  language: string
  dateFormat: string
  theme: 'light' | 'dark' | 'system'
}
