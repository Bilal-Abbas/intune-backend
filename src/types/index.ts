export interface EmailJob {
  id: string;
  to: string;
  userId: string;
  organizationId?: string;
  referenceId?: string;
  context: EmailContext;
  subject: string;
  html: string;
  priority?: number;
  delay?: number;
  attempts?: number;
}

// New interface for template-based email jobs
export interface TemplateEmailJob {
  id: string;
  to: string;
  userId: string;
  organizationId?: string;
  referenceId?: string;
  context: EmailContext;
  templateData: Record<string, any>;
  priority?: number;
  delay?: number;
  attempts?: number;
}

export enum EmailContext {
  MESSAGE_RECEIVED = "message_received",
  PROPOSAL_RECEIVED = "proposal_received",
  SITE_RECRUITED = "site_recruited",
  INVITATION_SENT = "invitation_sent",
  FILE_UPLOADED = "file_uploaded",
  SIGNUP_CONFIRMATION = "signup_confirmation",
  STUDY_CREATED = "study_created",
  SITE_CREATED = "site_created",
  PROPOSAL_STATUS_UPDATED = "proposal_status_updated",
  STUDY_PUBLISHED = "study_published",
}

export interface EmailJobResult {
  success: boolean;
  jobId: string;
  message?: string;
  error?: string;
}

export interface QueueStatus {
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  delayed: number;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  organizationId?: string;
  accountType: 'company' | 'facility';
}

export interface EmailTemplate {
  name: string;
  subject: string;
  html: string;
}

export interface EmailNotification {
  id: string;
  userId: string;
  organizationId?: string;
  referenceId?: string;
  toEmail: string;
  context: EmailContext;
  status: 'pending' | 'sent' | 'failed';
  errorMessage?: string;
  sentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}