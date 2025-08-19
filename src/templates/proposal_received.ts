export interface ProposalReceivedTemplateData {
  siteName: string;
  studyTitle: string;
  siteMessage: string;
  sponsorContactName: string;
  proposalLink: string;
}

export function getProposalReceivedEmailHTML(
  data: ProposalReceivedTemplateData
): string {
  const {
    siteName,
    studyTitle,
    siteMessage,
    sponsorContactName,
    proposalLink,
  } = data;

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); padding: 32px;">
        <img src="https://app.intune.bio/logos/1.png" alt="Intune Logo" style="width: 150px; margin-bottom: 20px;" />
        
        <h2 style="font-size: 24px; color: #1515D9; margin-bottom: 16px;">
          New Proposal Received
        </h2>
        
        <p style="font-size: 16px; margin-bottom: 24px;">
          <strong>${siteName}</strong> has submitted a proposal for your study, <strong>${studyTitle}</strong>, on the Intune platform.
        </p>

        <div style="background-color: #f8f9fa; border-left: 4px solid #1515D9; padding: 16px; margin: 24px 0; border-radius: 4px;">
          <p style="font-size: 14px; color: #666; margin: 0 0 8px 0;"><strong>Message from the Site:</strong></p>
          <p style="font-size: 16px; margin: 0; font-style: italic;">"${siteMessage}"</p>
        </div>

        <p style="font-size: 16px; margin-bottom: 24px;">
          You can review the full proposal, including documents and site details, in the Proposals section of your study dashboard.
        </p>

        <a href="${proposalLink}" style="display: inline-block; padding: 12px 24px; background-color: #1515D9; color: #ffffff; border-radius: 8px; text-decoration: none; font-weight: bold;">
          View Proposal
        </a>

        <p style="font-size: 14px; color: #666; margin-top: 24px;">
          To view or respond, please log in at <a href="https://intune.bio" style="color: #1515D9;">https://intune.bio</a>.
        </p>

        <p style="font-size: 14px; color: #666; margin-top: 16px;">
          If you have any questions or need support, contact us at <a href="mailto:customercare@intune.bio" style="color: #1515D9;">customercare@intune.bio</a>.
        </p>

        <p style="font-size: 14px; color: #666; margin-top: 24px;">
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

export function getProposalReceivedEmailSubject(
  data: ProposalReceivedTemplateData
): string {
  return `${data.siteName} Has Submitted a Proposal for ${data.studyTitle}`;
}
