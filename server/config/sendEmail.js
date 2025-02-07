import Sib from "sib-api-v3-sdk";
import dotenv from "dotenv";
dotenv.config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const tranEmailApi = new Sib.TransactionalEmailsApi();
    await tranEmailApi.sendTransacEmail({
      sender: { email: "support@faithandfast.com", name: "Faith AND Fast" },
      to: [{ email: sendTo }],
      subject: subject,
      htmlContent: html,
    });

    console.log("Email sent successfully!");
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export default sendEmail;
