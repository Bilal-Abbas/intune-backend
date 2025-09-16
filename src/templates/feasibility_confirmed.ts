export interface FeasibilityConfirmedTemplateData {
  sponsorName: string;
  studyTitle: string;
  siteName: string;
  sponsorMessage: string;
  studyLink: string;
}

export function getFeasibilityConfirmedEmailHTML(
  data: FeasibilityConfirmedTemplateData
): string {
  const { sponsorName, studyTitle, siteName, sponsorMessage, studyLink } = data;

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); padding: 32px; text-align: center;">
        <img src="https://app.intune.bio/logos/1.png" alt="Intune Logo" style="width: 150px; margin-bottom: 20px;" />
        
        <h2 style="font-size: 24px; color: #1515D9; margin-bottom: 16px;">
          Feasibility Confirmed!
        </h2>
        
        <p style="font-size: 16px; margin-bottom: 24px;">
          <strong>${siteName}</strong>,
        </p>

        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          Great news! <strong>${sponsorName}</strong> has confirmed your site's feasibility and moved your site to the <strong>Feasibility Confirmed</strong> status for their study:
        </p>

        <h3 style="font-size: 20px; color: #333; margin-bottom: 16px; font-weight: bold;">
          "${studyTitle}"
        </h3>

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
          This means your site is being seriously considered for participation, and you've advanced to the next step in the site selection process.
        </p>

        <div style="background-color: #f8f9fa; padding: 20px; margin: 24px 0; border-radius: 8px; text-align: left;">
          <h4 style="font-size: 16px; color: #1515D9; margin-bottom: 12px;">You can now:</h4>
          <ul style="font-size: 14px; color: #333; margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;">View and respond to any next steps shared by the sponsor</li>
            <li style="margin-bottom: 8px;">Share updated documents or messages as needed</li>
            <li style="margin-bottom: 8px;">Track your progress on the platform</li>
          </ul>
        </div>

        <a href="${studyLink}" style="display: inline-block; padding: 12px 24px; background-color: #1515D9; color: #ffffff; border-radius: 8px; text-decoration: none; font-weight: bold; margin-bottom: 16px;">
          Log in to View Your Status and Continue
        </a>

        <p style="font-size: 14px; color: #666; margin-top: 24px;">
          If you have any questions or need support, contact us anytime at 
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

export function getFeasibilityConfirmedEmailSubject(
  data: FeasibilityConfirmedTemplateData
): string {
  return `${data.sponsorName} Has Confirmed Feasibility for "${data.studyTitle}" on Intune`;
}
