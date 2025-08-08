import { EmailContext } from "../types";
import { 
  getMessageReceivedEmailHTML, 
  getMessageReceivedEmailSubject,
  MessageReceivedTemplateData 
} from "../templates/message_received";
import { 
  getStudyPublishedEmailHTML, 
  getStudyPublishedEmailSubject,
  StudyPublishedTemplateData 
} from "../templates/study_published";

export interface TemplateData {
  [key: string]: any;
}

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
      
      default:
        throw new Error(`No template found for context: ${context}`);
    }
  }

  private static renderMessageReceived(data: MessageReceivedTemplateData): RenderedEmail {
    return {
      subject: getMessageReceivedEmailSubject(data),
      html: getMessageReceivedEmailHTML(data)
    };
  }

  private static renderStudyPublished(data: StudyPublishedTemplateData): RenderedEmail {
    return {
      subject: getStudyPublishedEmailSubject(data),
      html: getStudyPublishedEmailHTML(data)
    };
  }
} 