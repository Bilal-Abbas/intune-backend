export interface SiteWelcomeTemplateData {
  firstName: string;
  dashboardLink: string;
  organizationName?: string;
}

export function getSiteWelcomeEmailHTML(
  data: SiteWelcomeTemplateData
): string {
  const { firstName, dashboardLink, organizationName } = data;

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); padding: 32px; text-align: center;">
        <img src="https://app.intune.bio/logos/1.png" alt="Intune Logo" style="width: 150px; margin-bottom: 20px;" />
        
        <h2 style="font-size: 24px; color: #1515D9; margin-bottom: 16px;">
          Welcome to Intune - Accelerate Your Clinical Trials
        </h2>
        
        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          ${firstName},
        </p>
        
        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          Welcome to Intune! We're excited to have you onboard.
        </p>

        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          Your account is now active, and you're ready to begin listing your clinical sites, discovering high-quality studies, and using our powerful matching tools, including the InSite™ score, to accelerate your trial startup.
        </p>

        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          Here's what you can do next:
        </p>

        <div style="text-align: left; margin-bottom: 24px;">
          <ul style="font-size: 16px; line-height: 1.6; color: #333; padding-left: 20px;">
            <li style="margin-bottom: 8px;"><strong>List your first site:</strong> Share essential details so sponsors can understand your capabilities.</li>
            <li style="margin-bottom: 8px;"><strong>Match with studies:</strong> Use our AI-driven tools to identify qualified studies based on study criteria.</li>
            <li style="margin-bottom: 8px;"><strong>Engage with sponsors:</strong> Share documents, track feasibility, and manage studies progress in one place.</li>
          </ul>
        </div>

        <div style="margin: 24px 0;">
          <a href="${dashboardLink}" style="display: inline-block; padding: 12px 24px; background-color: #1515D9; color: #ffffff; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Get Started
          </a>
        </div>

        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          If you have any questions or need help getting started, we're here to help. Just reply to this email or visit our 
          <a href="https://app.intune.bio/support" style="color: #1515D9; text-decoration: none;">Help & Support center</a>.
        </p>

        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          We look forward to helping your site successful selection for clinical studies.
        </p>

        <p style="font-size: 16px; margin-bottom: 24px; text-align: left;">
          Warm regards,<br />
          The Intune Team
        </p>

        <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 24px; text-align: center;">
          <p style="font-size: 14px; color: #666; margin-bottom: 8px;">
            <a href="https://app.intune.bio" style="color: #1515D9; text-decoration: none;">app.intune.bio</a>
          </p>
          <p style="font-size: 14px; color: #666; margin-bottom: 0;">
            Need help? Contact us at 
            <a href="mailto:customercare@intune.bio" style="color: #1515D9; text-decoration: none;">customercare@intune.bio</a>
          </p>
        </div>

        <p style="font-size: 12px; color: #888; margin-top: 32px;">
          2265 E Foothill Blvd, Pasadena CA, USA 91107<br />
          © Intune Bio, Inc.
        </p>
      </div>
    </div>
  `;
}

export function getSiteWelcomeEmailSubject(
  data: SiteWelcomeTemplateData
): string {
  return `Welcome to Intune - Accelerate Your Clinical Trials`;
}
