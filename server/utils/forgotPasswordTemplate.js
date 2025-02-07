const forgotPasswordTemplate = ({ name, otp }) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Password Reset Request</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f7fc;
              color: #333;
            }
  
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              padding: 40px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
  
            .header {
              text-align: center;
              padding-bottom: 30px;
            }
  
            .header h1 {
              color: #4a90e2;
              font-size: 32px;
              margin-bottom: 0;
              font-weight: bold;
            }
  
            .body {
              font-size: 16px;
              line-height: 1.6;
              color: #555555;
              margin-top: 20px;
            }
  
            .body p {
              margin: 15px 0;
            }
  
            .otp-container {
              background-color: #fdd835;
              color: #333;
              font-size: 24px;
              padding: 25px;
              text-align: center;
              font-weight: bold;
              border-radius: 8px;
              margin-top: 30px;
              border: 2px solid #fbc02d;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
  
            .otp-container p {
              margin: 0;
            }
  
            .footer {
              text-align: center;
              margin-top: 40px;
              font-size: 14px;
              color: #888888;
            }
  
            .footer p {
              margin: 5px 0;
            }
  
            .footer a {
              color: #4a90e2;
              text-decoration: none;
            }
  
            .button-container {
              text-align: center;
              margin-top: 30px;
            }
  
            .button {
              background-color: #4a90e2;
              color: white;
              padding: 15px 35px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: bold;
              text-transform: uppercase;
              font-size: 18px;
              transition: background-color 0.3s, transform 0.3s;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            }
  
            .button:hover {
              background-color: #357ab7;
              transform: translateY(-2px);
            }
  
            .button:active {
              background-color: #2c6c9e;
              transform: translateY(0);
            }
  
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
            </div>
  
            <div class="body">
              <p>Hello ${name},</p>
              <p>We received a request to reset the password for your Faith AND Fast account.</p>
              <p>If you didn't request a password reset, you can ignore this email.</p>
              <p>To reset your password, please use the following OTP:</p>
              <div class="otp-container">
                <p>${otp}</p>
              </div>
              <p>This OTP is valid for only 10 minutes. Enter it on the Faith AND Fast website to proceed with resetting your password.</p>
            </div>
  
            <div class="footer">
              <p>Faith AND Fast | <a href="https://www.faithandfast.com" target="_blank">www.faithandfast.com</a></p>
              <p>For assistance, please contact <a href="mailto:support@faithandfast.com">support@faithandfast.com</a></p>
            </div>
  
            <div class="button-container">
              <a href="https://www.faithandfast.com/reset-password" class="button">Reset Password</a>
            </div>
          </div>
        </body>
      </html>
    `;
};

export default forgotPasswordTemplate;
