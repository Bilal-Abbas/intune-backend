export interface SiteArchivedTemplateData {
  siteName: string;
  studyTitle: string;
  sponsorContactName: string;
  siteMessage: string;
  studyLink: string;
}

export function getSiteArchivedEmailHTML(
  data: SiteArchivedTemplateData
): string {
  const {
    siteName,
    studyTitle,
    sponsorContactName,
    siteMessage,
    studyLink,
  } = data;

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); padding: 32px; text-align: center;">
        <img src="https://app.intune.bio/logos/1.png" alt="Intune Logo" style="width: 150px; margin-bottom: 20px;" />
        
        <h2 style="font-size: 24px; color: #1515D9; margin-bottom: 16px;">
          Site Archived Study
        </h2>
        
        <p style="font-size: 16px; margin-bottom: 24px;">
          <strong>${sponsorContactName}</strong>,
        </p>

        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          We're writing to let you know that <strong>${siteName}</strong> has moved itself to Archive for your study titled <strong>${studyTitle}</strong> on the Intune platform.
        </p>

        ${
          siteMessage
            ? `<div style="background-color: #f8f9fa; padding: 16px; margin: 24px 0; border-radius: 8px; border-left: 4px solid #1515D9;">
                <p style="font-size: 14px; color: #666; margin: 0; font-style: italic; text-align: left;">
                  <strong>Message from the Site:</strong><br />
                  "${siteMessage}"
                </p>
              </div>`
            : ""
        }

        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          This means the site has chosen not to proceed with participation in this study at this time.
        </p>

        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          You may message the site directly from your dashboard if you'd like to follow up or re-engage in the future.
        </p>

        <a href="${studyLink}" style="display: inline-block; padding: 12px 24px; background-color: #1515D9; color: #ffffff; border-radius: 8px; text-decoration: none; font-weight: bold; margin-bottom: 16px;">
          View Study Dashboard
        </a>

        <p style="font-size: 14px; color: #666; margin-top: 24px;">
          If you have any questions or need assistance, please contact us at 
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

export function getSiteArchivedEmailSubject(
  data: SiteArchivedTemplateData
): string {
  return `${data.siteName} has moved themselves to Archive – ${data.studyTitle}`;
} 