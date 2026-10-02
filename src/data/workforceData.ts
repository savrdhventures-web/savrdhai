import {
  PhoneCall,
  Headphones,
  BrainCircuit,
  Bot,
  Workflow,
  MessageCircleMore,
  Database,
  ShieldCheck,
  BarChart3,
  DollarSign,
  FileCheck,
  Clock,
  Sparkles,
  Zap,
  Layers,
  Send,
  UserCheck,
  TrendingUp,
} from 'lucide-react';

export interface Agent {
  id: string;
  name: string;
  role: string;
  category: 'sales' | 'operations' | 'support';
  channels: string[];
  description: string;
  stat: string;
  statLabel: string;
  capabilities: string[];
  activeWorkflow: string;
  confidence: number;
}

export const AGENTS_DATA: Agent[] = [
  {
    id: 'sav-sales',
    name: 'SAV-Sales',
    role: 'Sales & Telecalling Executive',
    category: 'sales',
    channels: ['Voice', 'WhatsApp', 'SMS', 'Email'],
    description: 'Autonomous lead qualification, dynamic intent scoring, conversational discovery, and instant booking into sales calendars.',
    stat: '42 leads',
    statLabel: 'Queued today',
    capabilities: ['Inbound caller triage', 'Sentiment analysis', 'Meeting scheduling', 'CRM auto-update'],
    activeWorkflow: 'High-intent lead qualification sequence',
    confidence: 99.4,
  },
  {
    id: 'sav-bde',
    name: 'SAV-BDE',
    role: 'Business Development Executive',
    category: 'sales',
    channels: ['Voice', 'WhatsApp', 'Email', 'LinkedIn'],
    description: 'Proactive account mapping, multi-touch cold engagement, personalized pitch generation, and discovery pipeline tracking.',
    stat: '18 accounts',
    statLabel: 'Active outreach',
    capabilities: ['Account dossier research', 'Personalized email copy', 'Multi-touch cadence', 'Lead enrichment'],
    activeWorkflow: 'Mid-market SaaS outreach cadence',
    confidence: 97.8,
  },
  {
    id: 'sav-sales-manager',
    name: 'SAV-Sales Manager',
    role: 'Sales Workforce Orchestrator',
    category: 'sales',
    channels: ['Voice', 'WhatsApp', 'SMS', 'Email'],
    description: 'Real-time pipeline oversight, agent workload balancing, conversation quality audits, and automated deal escalation.',
    stat: '14 deals',
    statLabel: 'Under inspection',
    capabilities: ['Rep performance audit', 'Escalation routing', 'Revenue forecasting', 'Objection database review'],
    activeWorkflow: 'End-of-day pipeline reconciliation',
    confidence: 98.9,
  },
  {
    id: 'sav-support',
    name: 'SAV-Support',
    role: 'Customer Support Executive',
    category: 'support',
    channels: ['WhatsApp', 'Voice', 'SMS', 'Email'],
    description: 'Instant first-response resolution across technical and transactional questions, grounding every answer in live company docs.',
    stat: '24×7 live',
    statLabel: 'Zero backlog',
    capabilities: ['Knowledge graph lookup', 'Context preservation', 'Ticket auto-categorization', 'Human escalation bridge'],
    activeWorkflow: 'Real-time WhatsApp billing resolution',
    confidence: 99.1,
  },
  {
    id: 'sav-followup',
    name: 'SAV-Followup',
    role: 'Customer Follow-up Executive',
    category: 'support',
    channels: ['Voice', 'WhatsApp', 'SMS', 'Email'],
    description: 'Timely re-engagement on dormant proposals, payment reminders, missed callback retries, and post-service NPS check-ins.',
    stat: '128 touches',
    statLabel: 'Completed today',
    capabilities: ['Scheduled retry loop', 'Optimal time-to-contact', 'Payment link dispatch', 'Feedback capture'],
    activeWorkflow: 'Pending quotation 48-hour follow-up',
    confidence: 98.2,
  },
  {
    id: 'sav-finance',
    name: 'SAV-Finance',
    role: 'Finance & Invoicing Manager',
    category: 'operations',
    channels: ['WhatsApp', 'SMS', 'Email'],
    description: 'Invoice generation, payment reconciliation, vendor verification, budget threshold alerts, and compliance sanity checks.',
    stat: '$420K processed',
    statLabel: 'Monthly volume',
    capabilities: ['Invoice OCR extraction', 'Ledger matching', 'Payment dispute triage', 'Tax calculation audit'],
    activeWorkflow: 'Automated invoice payment reconciliation',
    confidence: 99.7,
  },
  {
    id: 'sav-credit',
    name: 'SAV-Credit',
    role: 'Credit & Risk Executive',
    category: 'operations',
    channels: ['WhatsApp', 'SMS', 'Email'],
    description: 'Underwriting verification, risk exposure calculation, customer financial health checks, and fraud flag detection.',
    stat: '99.8%',
    statLabel: 'Audit compliance',
    capabilities: ['Credit score enrichment', 'Risk threshold gate', 'KYC compliance check', 'Limit recommendation'],
    activeWorkflow: 'Instant merchant onboarding assessment',
    confidence: 99.5,
  },
  {
    id: 'sav-document',
    name: 'SAV-Document',
    role: 'Documentation Executive',
    category: 'operations',
    channels: ['WhatsApp', 'SMS', 'Email'],
    description: 'High-speed document parsing, contract clause extraction, missing document nudges, and secure archival into cloud storage.',
    stat: '1,420 docs',
    statLabel: 'Processed weekly',
    capabilities: ['Structured table parsing', 'Signature verification', 'Missing page alerts', 'PII redaction'],
    activeWorkflow: 'Vendor agreement contract extraction',
    confidence: 99.2,
  },
];

export const CHANNELS_LIST = [
  'WhatsApp',
  'Voice AI',
  'Email',
  'SMS',
  'Savrdh CRM',
  'Supabase',
  'Webhooks',
  'REST API',
  'Slack',
  'Zendesk',
];

export const FEATURES_DATA = [
  {
    icon: Bot,
    title: 'Autonomous AI Agents',
    description: 'Deploy specialized, role-bound AI executives for telecalling, customer care, finance audits, and sales operations with clear boundaries.',
    metrics: '8 Specialized Roles',
  },
  {
    icon: Workflow,
    title: 'Governed Workflow Orchestration',
    description: 'Turn business rules and cross-departmental operations into event-driven automations with automatic fallback and escalation gates.',
    metrics: 'Sub-50ms Routing',
  },
  {
    icon: MessageCircleMore,
    title: 'Unified Omnichannel Fabric',
    description: 'A single conversational state engine synchronizing WhatsApp, telephony, SMS, email, and live website chat without losing context.',
    metrics: '5 Real-time Channels',
  },
  {
    icon: Database,
    title: 'Dynamic Knowledge & Memory',
    description: 'Ground every agent in verified enterprise knowledge bases, CRM histories, and real-time ledger records with zero hallucinations.',
    metrics: 'Vector Search & Graph',
  },
  {
    icon: ShieldCheck,
    title: 'Human-in-the-Loop Governance',
    description: 'Financial transactions, sensitive escalations, and edge cases halt at human approval gates with full audit trails and one-click authorization.',
    metrics: '100% Traceable Logs',
  },
  {
    icon: BarChart3,
    title: 'Real-time Workforce Telemetry',
    description: 'Monitor agent conversational throughput, lead velocity, resolution rates, and queue bottlenecks in a live glass cockpit.',
    metrics: 'Live Latency & Stats',
  },
];

export const WORKFLOW_SCENARIOS = [
  {
    id: 'lead-triage',
    title: 'Inbound Lead Qualification',
    trigger: 'Webhook: New Lead Received from Web Landing',
    description: 'SAV-Sales qualifies incoming lead via WhatsApp, scores intent, and syncs CRM opportunity.',
    nodes: [
      { id: '1', name: 'User Lead Submission', type: 'trigger', status: 'completed' },
      { id: '2', name: 'SAV Brain Orchestrator', type: 'ai', status: 'active' },
      { id: '3', name: 'SAV-Sales WhatsApp Contact', type: 'channel', status: 'pending' },
      { id: '4', name: 'Akbs CRM Opportunity Created', type: 'integration', status: 'pending' },
    ],
    outcome: 'Lead qualified in 42 seconds with WhatsApp meeting booked.',
  },
  {
    id: 'support-escalation',
    title: 'Customer Escalation & Approval Gate',
    trigger: 'Inbound WhatsApp: Complex Refund Request',
    description: 'SAV-Support identifies refund threshold > $500, prepares dossier, and requests human manager approval.',
    nodes: [
      { id: '1', name: 'Customer Query', type: 'trigger', status: 'completed' },
      { id: '2', name: 'SAV-Support Analysis', type: 'ai', status: 'active' },
      { id: '3', name: 'Human Approval Gate', type: 'governance', status: 'pending' },
      { id: '4', name: 'SAV-Finance Ledger Update', type: 'integration', status: 'pending' },
    ],
    outcome: 'Safety gate halted action for Manager 1-click confirmation.',
  },
  {
    id: 'voice-campaign',
    title: 'Autonomous Voice AI Telecalling',
    trigger: 'Cron Schedule: 42 Dormant Accounts Follow-up',
    description: 'SAV-Sales launches low-latency voice calls with human-like cadence, logging call transcripts and sentiment.',
    nodes: [
      { id: '1', name: 'Campaign Trigger', type: 'trigger', status: 'completed' },
      { id: '2', name: 'Voice Stream Orchestrator', type: 'ai', status: 'active' },
      { id: '3', name: 'Live Telephony Bridge', type: 'channel', status: 'pending' },
      { id: '4', name: 'Transcript & Sentiment Scored', type: 'integration', status: 'pending' },
    ],
    outcome: '18 live conversations completed with 8 booked demos.',
  },
];

export const COMMAND_PRESETS = [
  {
    label: 'Lead Follow-up',
    prompt: "Start following up with today's 42 pending leads on WhatsApp",
    agent: 'SAV-Sales',
    channel: 'WhatsApp',
    actions: '86 actions planned',
    approval: 'Autonomous (Approved Policy)',
  },
  {
    label: 'Support Triage',
    prompt: 'Auto-resolve routine billing inquiries and summarize escalations',
    agent: 'SAV-Support',
    channel: 'WhatsApp & Email',
    actions: '24 tickets resolved',
    approval: 'Autonomous',
  },
  {
    label: 'Finance Audit',
    prompt: 'Verify vendor tax documents and reconcile pending invoice ledger',
    agent: 'SAV-Finance',
    channel: 'Savrdh CRM',
    actions: '14 invoices reconciled',
    approval: 'Human Gate for >$10K',
  },
  {
    label: 'Voice Telecalling',
    prompt: 'Launch interactive voice follow-up for quotation re-engagement',
    agent: 'SAV-BDE',
    channel: 'Voice AI Telephony',
    actions: '32 calls scheduled',
    approval: 'Autonomous (Working Hours)',
  },
];
