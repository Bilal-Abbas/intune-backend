export interface MessageReceivedTemplateData {
  threadName: string;
  threadLink: string;
  senderName?: string;
  messageContent: string;
}

export function getMessageReceivedEmailHTML(data: MessageReceivedTemplateData): string {
  const { threadName, threadLink, senderName, messageContent } = data;
  
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); padding: 32px; text-align: center;">
        <img src="https://app.intune.bio/logos/1.png" alt="Intune Logo" style="width: 150px; margin-bottom: 20px;" />
        
        <p style="font-size: 16px; margin-bottom: 24px;">
          You have unread messages for <strong>${threadName}</strong>
        </p>

        ${
          senderName
            ? `<p style="font-size: 16px; font-weight: bold; margin: 8px 0;">From: ${senderName}</p>`
            : ""
        }

        <p style="font-size: 16px; margin: 8px 0 24px;">
          ${messageContent}
        </p>

        <a href="${threadLink}" style="display: inline-block; padding: 12px 24px; background-color: #1515D9; color: #ffffff; border-radius: 8px; text-decoration: none; font-weight: bold;">
          Reply
        </a>

        <p style="font-size: 12px; color: #888; margin-top: 32px;">
          2265 E Foothill Blvd, Pasadena CA, USA 91107<br />
          © Intune Bio, Inc.
        </p>
      </div>
    </div>
  `;
}

export function getMessageReceivedEmailSubject(data: MessageReceivedTemplateData): string {
  return `New message in ${data.threadName}`;
} 