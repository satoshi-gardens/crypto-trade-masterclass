-- Insert admin notification template if it doesn't exist
INSERT INTO email_templates (type, subject, html_content, description, variables)
VALUES (
  'admin_application_notification',
  'New Course Application: {{courseTitle}}',
  '<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 20px; margin-bottom: 20px; }
        .details { background-color: #fff; padding: 20px; border-left: 4px solid #0070f3; margin: 20px 0; }
        .label { font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Course Application Received</h2>
        </div>
        
        <div class="details">
            <h3>Applicant Information</h3>
            <p><span class="label">Name:</span> {{firstName}} {{lastName}}</p>
            <p><span class="label">Email:</span> {{email}}</p>
            <p><span class="label">Phone:</span> {{phone}}</p>
            <p><span class="label">Location:</span> {{city}}, {{country}}</p>
        </div>

        <div class="details">
            <h3>Course Details</h3>
            <p><span class="label">Course:</span> {{courseTitle}}</p>
            <p><span class="label">Package:</span> {{packageType}}</p>
            <p><span class="label">Price:</span> CHF {{price}}</p>
            <p><span class="label">Payment Type:</span> {{paymentType}}</p>
            <p><span class="label">Referral Code:</span> {{referralCode}}</p>
        </div>

        <p>To reply to the applicant, simply respond to this email.</p>
    </div>
</body>
</html>',
  'Email template for notifying admins about new course applications',
  '{"firstName": "string", "lastName": "string", "email": "string", "phone": "string", "city": "string", "country": "string", "courseTitle": "string", "packageType": "string", "price": "string", "paymentType": "string", "referralCode": "string"}'
)
ON CONFLICT (type) DO UPDATE
SET 
  subject = EXCLUDED.subject,
  html_content = EXCLUDED.html_content,
  description = EXCLUDED.description,
  variables = EXCLUDED.variables;