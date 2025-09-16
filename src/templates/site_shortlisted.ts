export interface SiteShortlistedTemplateData {
  sponsorName: string;
  studyTitle: string;
  siteName: string;
  sponsorMessage: string;
  studyLink: string;
}

export function getSiteShortlistedEmailHTML(
  data: SiteShortlistedTemplateData
): string {
  const { sponsorName, studyTitle, siteName, sponsorMessage, studyLink } = data;

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); padding: 32px; text-align: center;">
        <img src="https://app.intune.bio/logos/1.png" alt="Intune Logo" style="width: 150px; margin-bottom: 20px;" />
        
        <h2 style="font-size: 24px; color: #1515D9; margin-bottom: 16px;">
          Your Site Has Been Shortlisted!
        </h2>
        
        <p style="font-size: 16px; margin-bottom: 24px;">
          <strong>${siteName}</strong>,
        </p>

        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          We're pleased to inform you that <strong>${sponsorName}</strong> has moved your site to the <strong>Shortlisted</strong> stage for the study <strong>"${studyTitle}"</strong> on the Intune platform.
        </p>

        ${
          sponsorMessage
            ? `<div style="background-color: #f8f9fa; padding: 16px; margin: 24px 0; border-radius: 8px; border-left: 4px solid #1515D9;">
                <p style="font-size: 14px; color: #666; margin: 0; font-style: italic; text-align: left;">
                  <strong>Message from the Sponsor:</strong><br />
                  ${sponsorMessage}
                </p>
              </div>`
            : ""
        }

        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          This means your site is under serious consideration for participation. Sponsors typically shortlist sites that meet key feasibility and suitability criteria and are preparing for final selection.
        </p>

        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          You can log in to your account to view next steps, share additional documents, or message the sponsor directly.
        </p>

        <a href="${studyLink}" style="display: inline-block; padding: 12px 24px; background-color: #1515D9; color: #ffffff; border-radius: 8px; text-decoration: none; font-weight: bold; margin-bottom: 16px;">
          Log in to Intune
        </a>

        <p style="font-size: 14px; color: #666; margin-top: 24px;">
          If you have any questions or need help, please reach out to us at 
          <a href="mailto:customercare@intune.bio" style="color: #1515D9;">customercare@intune.bio</a>.
        </p>

        <p style="font-size: 14px; color: #666; margin-top: 16px;">
          Warm regards,<br />
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

export function getSiteShortlistedEmailSubject(
  data: SiteShortlistedTemplateData
): string {
  return `${data.sponsorName} Has Shortlisted Your Site for "${data.studyTitle}" on Intune`;
}
