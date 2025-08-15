export interface MessageReceivedTemplateData {
  threadName: string;
  threadLink: string;
  senderName?: string;
  messageContent: string;
  messageType?: string; // Add message type
  fileName?: string; // Add file name
}

export function getMessageReceivedEmailHTML(
  data: MessageReceivedTemplateData
): string {
  const {
    threadName,
    threadLink,
    senderName,
    messageContent,
    messageType,
    fileName,
  } = data;
  // Check if this is a file message
  const isFileMessage = messageType === "FILE" && fileName;

  // Create different content displays based on message type
  let contentDisplay;
  let mainMessage;

  if (isFileMessage) {
    mainMessage = `You have received a new file in <strong>${threadName}</strong>`;
    contentDisplay = `
      <div style="border-radius: 8px;">
        <table style="width: 100%;">
          <tr>
            <td style="vertical-align: top;">
              <p style="font-size: 16px; font-weight: bold;">
                📎 File shared: ${fileName}
              </p>
            </td>
          </tr>
        </table>
      </div>
    `;
  } else {
    mainMessage = `You have unread messages for <strong>${threadName}</strong>`;
    contentDisplay = `
      <div style="padding: 16px; margin: 16px 0; border-radius: 4px;">
        <p style="font-size: 16px; margin: 0; font-style: italic; color: #333;">
          ${messageContent}
        </p>
      </div>
    `;
  }

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); padding: 32px; text-align: center;">
        <img src="https://app.intune.bio/logos/1.png" alt="Intune Logo" style="width: 150px; margin-bottom: 20px;" />
        
        <p style="font-size: 16px; margin-bottom: 24px;">
          ${mainMessage}
        </p>

        ${
          senderName
            ? `<p style="font-size: 16px; font-weight: bold; margin: 8px 0;">From: ${senderName}</p>`
            : ""
        }

        ${contentDisplay}

        <div style="margin: 24px 0;">
          <a href="${threadLink}" style="display: inline-block; padding: 12px 24px; background-color: #1515D9; color: #ffffff; border-radius: 8px; text-decoration: none; font-weight: bold;">
            ${isFileMessage ? "View File" : "Reply"}
          </a>
        </div>

        <p style="font-size: 12px; color: #888; margin-top: 32px;">
          2265 E Foothill Blvd, Pasadena CA, USA 91107<br />
          © Intune Bio, Inc.
        </p>
      </div>
    </div>
  `;
}

export function getMessageReceivedEmailSubject(
  data: MessageReceivedTemplateData
): string {
  const { threadName, messageType, fileName } = data;

  // Different subject lines for file vs text messages
  if (messageType === "FILE" && fileName) {
    return `New file shared in ${threadName}: ${fileName}`;
  }

  return `New message in ${threadName}`;
}
