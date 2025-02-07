const verifyEmailTemplate = ({ name, url }) => {
  return `
    <div style="font-family: 'Arial', sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 30px; border-radius: 10px; background: #fff; border: 1px solid #ddd; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
      
      <!-- Logo -->
      <div style="text-align: center;">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQuiHW4TNdJTywl0UynwQxUfi9CBCGxqZf5g&s" alt="Faith AND Fast" style="max-width: 180px; margin-bottom: 20px;">
      </div>
  
      <!-- Greeting -->
      <p style="font-size: 20px; font-weight: bold;">Hello ${name},</p>
      
      <!-- Welcome Message -->
      <p style="font-size: 16px; line-height: 1.6;">
        Welcome to <strong>Faith AND Fast</strong>! 🎉 We're thrilled to have you join our community.
        To complete your registration, please verify your email address by clicking the button below.
      </p>
  
      <!-- Verify Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${url}" style="
          display: inline-block;
          background: #ff8c00;
          color: #fff;
          padding: 14px 28px;
          font-size: 16px;
          font-weight: bold;
          text-decoration: none;
          border-radius: 8px;
          transition: background 0.3s ease-in-out;
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
        " onmouseover="this.style.background='#e07b00'" onmouseout="this.style.background='#ff8c00'">
          ✅ Verify Your Email
        </a>
      </div>
  
      <!-- Additional Info -->
      <p style="font-size: 14px; color: #666; text-align: center;">
        If the button doesn't work, you can also verify your email using the following link:
        <br>
        <a href="${url}" style="color: #ff8c00; text-decoration: none;">${url}</a>
      </p>
  
      <!-- Security Notice -->
      <p style="font-size: 14px; color: #777;">
        If you didn't sign up for Faith AND Fast, please ignore this email. This verification link is valid for **24 hours**.
      </p>
  
      <!-- Signature -->
      <p style="font-size: 16px; font-weight: bold; margin-top: 20px;">Best Regards,</p>
      <p style="font-size: 16px; font-weight: bold; color: #ff8c00;">Faith AND Fast Team</p>
  
      <!-- Footer -->
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="font-size: 12px; text-align: center; color: #777;">
        Need help? Contact us at 
        <a href="mailto:support@faithandfast.com" style="color: #ff8c00; text-decoration: none;">support@faithandfast.com</a>
      </p>
  
    </div>
    `;
};

export default verifyEmailTemplate;
