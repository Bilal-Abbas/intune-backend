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
import {
  InvitationSentTemplateData,
  getInvitationSentEmailHTML,
  getInvitationSentEmailSubject,
} from "../templates/invitation_sent";
import {
  SiteArchivedTemplateData,
  getSiteArchivedEmailHTML,
  getSiteArchivedEmailSubject,
} from "../templates/site_archived";
import {
  SiteMatchedTemplateData,
  getSiteMatchedEmailHTML,
  getSiteMatchedEmailSubject,
} from "../templates/site_matched";
import {
  FeasibilityConfirmedTemplateData,
  getFeasibilityConfirmedEmailHTML,
  getFeasibilityConfirmedEmailSubject,
} from "../templates/feasibility_confirmed";
import {
  SiteShortlistedTemplateData,
  getSiteShortlistedEmailHTML,
  getSiteShortlistedEmailSubject,
} from "../templates/site_shortlisted";
import {
  SiteSelectedTemplateData,
  getSiteSelectedEmailHTML,
  getSiteSelectedEmailSubject,
} from "../templates/site_selected";
import {
  SiteArchivedBySponsorTemplateData,
  getSiteArchivedBySponsorEmailHTML,
  getSiteArchivedBySponsorEmailSubject,
} from "../templates/site_archived_by_sponsor";
import {
  SponsorMessageToSiteTemplateData,
  getSponsorMessageToSiteEmailHTML,
  getSponsorMessageToSiteEmailSubject,
} from "../templates/sponsor_message_to_site";
import {
  SiteMessageToSponsorTemplateData,
  getSiteMessageToSponsorEmailHTML,
  getSiteMessageToSponsorEmailSubject,
} from "../templates/site_message_to_sponsor";

export type TemplateData =
  | MessageReceivedTemplateData
  | StudyPublishedTemplateData
  | SiteCreatedTemplateData
  | ProposalReceivedTemplateData
  | InvitationSentTemplateData
  | SiteArchivedTemplateData
  | SiteMatchedTemplateData
  | FeasibilityConfirmedTemplateData
  | SiteShortlistedTemplateData
  | SiteSelectedTemplateData
  | SiteArchivedBySponsorTemplateData
  | SponsorMessageToSiteTemplateData
  | SiteMessageToSponsorTemplateData;

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

      case EmailContext.INVITATION_SENT_BY_SPONSOR:
        return this.renderInvitationSent(data as InvitationSentTemplateData);

      case EmailContext.SITE_ARCHIVED_BY_SITE:
        return this.renderSiteArchived(data as SiteArchivedTemplateData);

      case EmailContext.SITE_MATCHED_BY_SPONSOR:
        return this.renderSiteMatched(data as SiteMatchedTemplateData);

      case EmailContext.FEASIBILITY_CONFIRMED_BY_SPONSOR:
        return this.renderFeasibilityConfirmed(data as FeasibilityConfirmedTemplateData);

      case EmailContext.SITE_SHORTLISTED_BY_SPONSOR:
        return this.renderSiteShortlisted(data as SiteShortlistedTemplateData);

      case EmailContext.SITE_SELECTED_BY_SPONSOR:
        return this.renderSiteSelected(data as SiteSelectedTemplateData);

      case EmailContext.SITE_ARCHIVED_BY_SPONSOR:
        return this.renderSiteArchivedBySponsor(data as SiteArchivedBySponsorTemplateData);

      case EmailContext.SPONSOR_MESSAGE_TO_SITE:
        return this.renderSponsorMessageToSite(data as SponsorMessageToSiteTemplateData);

      case EmailContext.SITE_MESSAGE_TO_SPONSOR:
        return this.renderSiteMessageToSponsor(data as SiteMessageToSponsorTemplateData);

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

  private static renderInvitationSent(
    data: InvitationSentTemplateData
  ): RenderedEmail {
    return {
      subject: getInvitationSentEmailSubject(data),
      html: getInvitationSentEmailHTML(data),
    };
  }

  private static renderSiteArchived(
    data: SiteArchivedTemplateData
  ): RenderedEmail {
    return {
      subject: getSiteArchivedEmailSubject(data),
      html: getSiteArchivedEmailHTML(data),
    };
  }

  private static renderSiteMatched(
    data: SiteMatchedTemplateData
  ): RenderedEmail {
    return {
      subject: getSiteMatchedEmailSubject(data),
      html: getSiteMatchedEmailHTML(data),
    };
  }

  private static renderFeasibilityConfirmed(
    data: FeasibilityConfirmedTemplateData
  ): RenderedEmail {
    return {
      subject: getFeasibilityConfirmedEmailSubject(data),
      html: getFeasibilityConfirmedEmailHTML(data),
    };
  }

  private static renderSiteShortlisted(
    data: SiteShortlistedTemplateData
  ): RenderedEmail {
    return {
      subject: getSiteShortlistedEmailSubject(data),
      html: getSiteShortlistedEmailHTML(data),
    };
  }

  private static renderSiteSelected(
    data: SiteSelectedTemplateData
  ): RenderedEmail {
    return {
      subject: getSiteSelectedEmailSubject(data),
      html: getSiteSelectedEmailHTML(data),
    };
  }

  private static renderSiteArchivedBySponsor(
    data: SiteArchivedBySponsorTemplateData
  ): RenderedEmail {
    return {
      subject: getSiteArchivedBySponsorEmailSubject(data),
      html: getSiteArchivedBySponsorEmailHTML(data),
    };
  }

  private static renderSponsorMessageToSite(
    data: SponsorMessageToSiteTemplateData
  ): RenderedEmail {
    return {
      subject: getSponsorMessageToSiteEmailSubject(data),
      html: getSponsorMessageToSiteEmailHTML(data),
    };
  }

  private static renderSiteMessageToSponsor(
    data: SiteMessageToSponsorTemplateData
  ): RenderedEmail {
    return {
      subject: getSiteMessageToSponsorEmailSubject(data),
      html: getSiteMessageToSponsorEmailHTML(data),
    };
  }
}
