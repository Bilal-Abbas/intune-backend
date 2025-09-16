export interface InvitationSentTemplateData {
  sponsorName: string;
  studyTitle: string;
  siteName: string;
  sponsorMessage: string;
  studyLink: string;
}

export function getInvitationSentEmailHTML(
  data: InvitationSentTemplateData
): string {
  const { sponsorName, studyTitle, siteName, sponsorMessage, studyLink } = data;

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); padding: 32px; text-align: center;">
        <img src="https://app.intune.bio/logos/1.png" alt="Intune Logo" style="width: 150px; margin-bottom: 20px;" />
        
        <h2 style="font-size: 24px; color: #1515D9; margin-bottom: 16px;">
          You're Invited to Submit a Proposal!
        </h2>
        
        <p style="font-size: 16px; margin-bottom: 24px;">
          <strong>${sponsorName}</strong> has moved your site to the Invited stage for their study:
        </p>

        <h3 style="font-size: 20px; color: #333; margin-bottom: 16px; font-weight: bold;">
          ${studyTitle}
        </h3>

        <p style="font-size: 16px; margin-bottom: 24px;">
          They believe your site may be a strong match and would like to invite you to submit a proposal.
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

        <div style="background-color: #f8f9fa; padding: 20px; margin: 24px 0; border-radius: 8px; text-align: left;">
          <h4 style="font-size: 16px; color: #1515D9; margin-bottom: 12px;">You can now:</h4>
          <ul style="font-size: 14px; color: #333; margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;">View the full study details</li>
            <li style="margin-bottom: 8px;">Communicate directly with the sponsor</li>
            <li style="margin-bottom: 8px;">Submit a proposal through the platform</li>
          </ul>
        </div>

        <a href="${studyLink}" style="display: inline-block; padding: 12px 24px; background-color: #1515D9; color: #ffffff; border-radius: 8px; text-decoration: none; font-weight: bold; margin-bottom: 16px;">
          Log in to View and Respond
        </a>

        <p style="font-size: 14px; color: #666; margin-top: 24px;">
          If you have any questions, feel free to reach out to us at 
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

export function getInvitationSentEmailSubject(
  data: InvitationSentTemplateData
): string {
  return `${data.sponsorName} Invites You to Submit a Proposal for "${data.studyTitle}" on Intune`;
}
