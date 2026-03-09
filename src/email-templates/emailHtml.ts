export function getEmailHtml({ name, email, phone, message }: { name: string, email: string, phone: string, message: string }) {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #EEF2FF; border-radius: 16px; max-width: 480px; margin: 0 auto; padding: 32px; color: #222; border: 1px solid #e0e7ff; box-shadow: 0 2px 8px 0 #e0e7ff;">
      <div style="text-align: center; margin-bottom: 24px;">
        <img src=\"https://talantmuenster.de/logo1.svg\" alt=\"Talant Münster\" style=\"height: 64px; margin-bottom: 12px;\" />
        <h2 style="color: #1e2563; font-weight: 700; font-size: 24px; margin: 0;">Новая заявка с сайта</h2>
      </div>
      <table style="width: 100%; font-size: 16px; margin-bottom: 24px;">
        <tbody>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; width: 120px;">Имя:</td>
            <td style="padding: 8px 0; color: #1e2563; font-weight: 500;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Email:</td>
            <td style="padding: 8px 0; color: #1e2563; font-weight: 500;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Телефон:</td>
            <td style="padding: 8px 0; color: #1e2563; font-weight: 500;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Сообщение:</td>
            <td style="padding: 8px 0; color: #1e2563; font-weight: 500;">
              <div style="background: #fff; border-radius: 8px; padding: 12px; border: 1px solid #e0e7ff; color: #222; white-space: pre-line;">
                ${message}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="border-top: 1px solid #e0e7ff; padding-top: 16px; font-size: 13px; color: #6b7280; text-align: center;">
        Это автоматическое письмо, не отвечайте на него.<br />
        <a href=\"https://talantmuenster.de\" style=\"color: #1e2563; text-decoration: none; font-weight: 500;\">talantmuenster.de</a>
      </div>
    </div>
  `;
}
