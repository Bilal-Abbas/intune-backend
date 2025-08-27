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
  SITE_RECRUITED_BY_SPONSOR = "site_recruited_by_sponsor",
  FILE_UPLOADED = "file_uploaded",
  SIGNUP_CONFIRMATION = "signup_confirmation",
  STUDY_CREATED = "study_created",
  SITE_CREATED = "site_created",
  PROPOSAL_STATUS_UPDATED = "proposal_status_updated",
  STUDY_PUBLISHED = "study_published",
  SITE_ARCHIVED_BY_SITE = "site_archived_by_site",
  SITE_MATCHED_BY_SPONSOR = "site_matched_by_sponsor",
  INVITATION_SENT_BY_SPONSOR = "invitation_sent_by_sponsor",
  FEASIBILITY_CONFIRMED_BY_SPONSOR = "feasibility_confirmed_by_sponsor",
  SITE_SHORTLISTED_BY_SPONSOR = "site_shortlisted_by_sponsor",
  SITE_SELECTED_BY_SPONSOR = "site_selected_by_sponsor",
  SITE_ARCHIVED_BY_SPONSOR = "site_archived_by_sponsor",
  SPONSOR_MESSAGE_TO_SITE = "sponsor_message_to_site",
  SITE_MESSAGE_TO_SPONSOR = "site_message_to_sponsor",
  SPONSOR_WELCOME = "sponsor_welcome",
  SITE_WELCOME = "site_welcome",
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