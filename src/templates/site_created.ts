export interface SiteCreatedTemplateData {
  siteName: string;
  siteLink: string;
  siteOrgName?: string;
  siteDescription?: string;
}

export function getSiteCreatedEmailHTML(
  data: SiteCreatedTemplateData
): string {
  const { siteName, siteLink, siteOrgName, siteDescription } = data;

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); padding: 32px; text-align: center;">
        <img src="https://app.intune.bio/logos/1.png" alt="Intune Logo" style="width: 150px; margin-bottom: 20px;" />
        
        <h2 style="font-size: 24px; color: #1515D9; margin-bottom: 16px;">
          Site Published Successfully!
        </h2>
        
        <p style="font-size: 16px; margin-bottom: 24px;">
          Your site <strong>${siteName}</strong> has been published and is now visible to potential sponsors.
        </p>

        ${
          siteOrgName
            ? `<p style="font-size: 16px; margin-bottom: 16px;"><strong>Organization:</strong> ${siteOrgName}</p>`
            : ""
        }

        ${
          siteDescription
            ? `<p style="font-size: 14px; color: #666; margin-bottom: 24px; line-height: 1.5;">${siteDescription}</p>`
            : ""
        }

        <a href="${siteLink}" style="display: inline-block; padding: 12px 24px; background-color: #1515D9; color: #ffffff; border-radius: 8px; text-decoration: none; font-weight: bold;">
          View Site
        </a>

        <p style="font-size: 14px; color: #666; margin-top: 24px;">
          You will receive notifications when sponsors express interest in your site.
        </p>

        <p style="font-size: 12px; color: #888; margin-top: 32px;">
          2265 E Foothill Blvd, Pasadena CA, USA 91107<br />
          © Intune Bio, Inc.
        </p>
      </div>
    </div>
  `;
}

export function getSiteCreatedEmailSubject(
  data: SiteCreatedTemplateData
): string {
  return `Site Published: ${data.siteName}`;
}
