import { EmailContext } from "../types";
import {
  MessageReceivedTemplateData,
  getMessageReceivedEmailHTML,
  getMessageReceivedEmailSubject,
} from "../templates/message_received";
import {
  StudyPublishedTemplateData,
  getStudyPublishedEmailHTML,
  getStudyPublishedEmailSubject,
} from "../templates/study_published";
import {
  SiteCreatedTemplateData,
  getSiteCreatedEmailHTML,
  getSiteCreatedEmailSubject,
} from "../templates/site_created";
import {
  ProposalReceivedTemplateData,
  getProposalReceivedEmailHTML,
  getProposalReceivedEmailSubject,
} from "../templates/proposal_received";

export type TemplateData =
  | MessageReceivedTemplateData
  | StudyPublishedTemplateData
  | SiteCreatedTemplateData
  | ProposalReceivedTemplateData;

export interface RenderedEmail {
  subject: string;
  html: string;
}

export class TemplateService {
  static renderEmail(context: EmailContext, data: TemplateData): RenderedEmail {
    switch (context) {
      case EmailContext.MESSAGE_RECEIVED:
        return this.renderMessageReceived(data as MessageReceivedTemplateData);

      case EmailContext.STUDY_PUBLISHED:
        return this.renderStudyPublished(data as StudyPublishedTemplateData);

      case EmailContext.SITE_CREATED:
        return this.renderSiteCreated(data as SiteCreatedTemplateData);

      case EmailContext.PROPOSAL_RECEIVED:
        return this.renderProposalReceived(
          data as ProposalReceivedTemplateData
        );

      default:
        throw new Error(`No template found for context: ${context}`);
    }
  }

  private static renderMessageReceived(
    data: MessageReceivedTemplateData
  ): RenderedEmail {
    return {
      subject: getMessageReceivedEmailSubject(data),
      html: getMessageReceivedEmailHTML(data),
    };
  }

  private static renderStudyPublished(
    data: StudyPublishedTemplateData
  ): RenderedEmail {
    return {
      subject: getStudyPublishedEmailSubject(data),
      html: getStudyPublishedEmailHTML(data),
    };
  }

  private static renderSiteCreated(
    data: SiteCreatedTemplateData
  ): RenderedEmail {
    return {
      subject: getSiteCreatedEmailSubject(data),
      html: getSiteCreatedEmailHTML(data),
    };
  }

  private static renderProposalReceived(
    data: ProposalReceivedTemplateData
  ): RenderedEmail {
    return {
      subject: getProposalReceivedEmailSubject(data),
      html: getProposalReceivedEmailHTML(data),
    };
  }
}
