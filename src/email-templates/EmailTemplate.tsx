import React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}


const EmailTemplate: React.FC<EmailTemplateProps> = ({ name, email, message }) => (
  <div style={{
    fontFamily: 'Segoe UI, Arial, sans-serif',
    background: '#EEF2FF',
    borderRadius: 16,
    maxWidth: 480,
    margin: '0 auto',
    padding: 32,
    color: '#222',
    border: '1px solid #e0e7ff',
    boxShadow: '0 2px 8px 0 #e0e7ff',
  }}>
    <div style={{ textAlign: 'center', marginBottom: 24 }}>
      <img src="https://talantmuenster.de/logo1.svg" alt="Talant Münster" style={{ height: 64, marginBottom: 12 }} />
      <h2 style={{ color: '#1e2563', fontWeight: 700, fontSize: 24, margin: 0 }}>Новая заявка с сайта</h2>
    </div>
    <table style={{ width: '100%', fontSize: 16, marginBottom: 24 }}>
      <tbody>
        <tr>
          <td style={{ padding: '8px 0', color: '#6b7280', width: 120 }}>Имя:</td>
          <td style={{ padding: '8px 0', color: '#1e2563', fontWeight: 500 }}>{name}</td>
        </tr>
        <tr>
          <td style={{ padding: '8px 0', color: '#6b7280' }}>Email:</td>
          <td style={{ padding: '8px 0', color: '#1e2563', fontWeight: 500 }}>{email}</td>
        </tr>
        <tr>
          <td style={{ padding: '8px 0', color: '#6b7280' }}>Сообщение:</td>
          <td style={{ padding: '8px 0', color: '#1e2563', fontWeight: 500 }}>
            <div style={{ background: '#fff', borderRadius: 8, padding: 12, border: '1px solid #e0e7ff', color: '#222', whiteSpace: 'pre-line' }}
              dangerouslySetInnerHTML={{ __html: message }} />
          </td>
        </tr>
      </tbody>
    </table>
    <div style={{ borderTop: '1px solid #e0e7ff', paddingTop: 16, fontSize: 13, color: '#6b7280', textAlign: 'center' }}>
      Это автоматическое письмо, не отвечайте на него.<br />
      <a href="https://talantmuenster.de" style={{ color: '#1e2563', textDecoration: 'none', fontWeight: 500 }}>talantmuenster.de</a>
    </div>
  </div>
);

export default EmailTemplate;
