export interface SponsorWelcomeTemplateData {
  sponsorName: string;
  dashboardLink: string;
  organizationName?: string;
}

export function getSponsorWelcomeEmailHTML(
  data: SponsorWelcomeTemplateData
): string {
  const { sponsorName, dashboardLink, organizationName } = data;

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); padding: 32px; text-align: center;">
        <img src="https://app.intune.bio/logos/1.png" alt="Intune Logo" style="width: 150px; margin-bottom: 20px;" />
        
        <h2 style="font-size: 24px; color: #1515D9; margin-bottom: 16px;">
          Welcome to Intune – Let's Get Started
        </h2>
        
        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          ${sponsorName},
        </p>
        
        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          Welcome to Intune – we're excited to have your clinical research site join our network!
        </p>

        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          With your account now active, you can:
        </p>

        <div style="text-align: left; margin-bottom: 24px;">
          <ul style="font-size: 16px; line-height: 1.6; color: #333; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Set up your Site Profile to showcase your capabilities</li>
            <li style="margin-bottom: 8px;">Get matched with sponsor studies that align with your experience</li>
            <li style="margin-bottom: 8px;">Receive new study matches by email as they become available</li>
            <li style="margin-bottom: 8px;">Submit proposals and communicate directly with sponsors</li>
            <li style="margin-bottom: 8px;">Track study progress from invitation to activation – all in one place</li>
          </ul>
        </div>

        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          To get started, we recommend completing your profile and uploading key documents so sponsors can better assess your qualifications.
        </p>

        <div style="margin: 24px 0;">
          <a href="${dashboardLink}" style="display: inline-block; padding: 12px 24px; background-color: #1515D9; color: #ffffff; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Log in to your dashboard
          </a>
        </div>

        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          If you have any questions or need help setting up, feel free to reach out to us at 
          <a href="mailto:customercare@intune.bio" style="color: #1515D9; text-decoration: none;">customercare@intune.bio</a>.
        </p>

        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          We look forward to supporting your success in clinical research.
        </p>

        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
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

export function getSponsorWelcomeEmailSubject(
  data: SponsorWelcomeTemplateData
): string {
  return `Welcome to Intune – Let's Get Started`;
}
