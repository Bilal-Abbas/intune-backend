export interface SiteMessageToSponsorTemplateData {
  siteName: string;
  studyTitle: string;
  sponsorContactName: string;
  siteMessage: string;
  currentSiteStatus: string;
  hasDocument: boolean;
}

export function getSiteMessageToSponsorEmailHTML(
  data: SiteMessageToSponsorTemplateData
): string {
  const {
    siteName,
    studyTitle,
    sponsorContactName,
    siteMessage,
    currentSiteStatus,
    hasDocument,
  } = data;

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); padding: 32px; text-align: center;">
        <img src="https://app.intune.bio/logos/1.png" alt="Intune Logo" style="width: 150px; margin-bottom: 20px;" />
        
        <h2 style="font-size: 24px; color: #1515D9; margin-bottom: 16px;">
          New Message Received
        </h2>
        
        <p style="font-size: 16px; margin-bottom: 24px;">
          <strong>${sponsorContactName}</strong>,
        </p>

        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          You've received a new message from <strong>${siteName}</strong> regarding your study, <strong>${studyTitle}</strong>, on the Intune platform.
        </p>

        <div style="background-color: #f8f9fa; padding: 16px; margin: 24px 0; border-radius: 8px; border-left: 4px solid #1515D9;">
          <p style="font-size: 14px; color: #666; margin: 0; font-style: italic; text-align: left;">
            <strong>Message from Site:</strong><br />
            "${siteMessage}"
          </p>
        </div>

        ${
          hasDocument
            ? `<p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
                If the site uploaded any documents, you'll find them in the Documents section of your study dashboard.
              </p>`
            : ""
        }

        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          Current status for this site is: <strong>${currentSiteStatus}</strong>
        </p>

        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          To view or respond, please log in to your account:
        </p>

        <a href="https://intune.bio" style="display: inline-block; padding: 12px 24px; background-color: #1515D9; color: #ffffff; border-radius: 8px; text-decoration: none; font-weight: bold; margin-bottom: 16px;">
          Log in to Intune
        </a>

        <p style="font-size: 14px; color: #666; margin-top: 24px;">
          If you need assistance, feel free to contact us at 
          <a href="mailto:customercare@intune.bio" style="color: #1515D9;">customercare@intune.bio</a>.
        </p>

        <p style="font-size: 14px; color: #666; margin-top: 16px;">
          Best regards,<br />
          The Intune Team
        </p>

        <p style="font-size: 12px; color: #888; margin-top: 32px;">
          2265 E Foothill Blvd, Pasadena CA, USA 91107<br />
          © Intune Bio, Inc.
        </p>
      </div>
    </div>
  `;
}

export function getSiteMessageToSponsorEmailSubject(
  data: SiteMessageToSponsorTemplateData
): string {
  return `New Message from ${data.siteName} on Intune Regarding ${data.studyTitle}`;
}
