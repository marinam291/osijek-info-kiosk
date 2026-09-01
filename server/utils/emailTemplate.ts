export const getEmailTemplate = (
  senderName: string,
  senderEmail: string,
  messageBody: string,
): string => {
  return `
    <div style="background: linear-gradient(180deg, #eef2f7 0%, #dbe7f2 100%); padding: 50px 20px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 1px solid #c1d3e8;">
        
        <!-- Gornja dekorativna traka (Tamnoplava i Zlatna) -->
        <tr>
          <td style="height: 8px; background: linear-gradient(90deg, #1a365d 50%, #b8860b 50%);"></td>
        </tr>

        <!-- Zaglavlje -->
        <tr>
          <td style="padding: 40px 30px 20px 30px; text-align: center;">
            <h1 style="margin: 0; color: #1a365d; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">URED GRADONAČELNIKA</h1>
            <div style="width: 60px; height: 3px; background-color: #b8860b; margin: 15px auto;"></div>
            <p style="margin: 0; color: #4a5568; font-size: 15px; font-weight: 500;">Grad Osijek • Digitalni sustav za komunikaciju</p>
          </td>
        </tr>

        <!-- Sadržaj -->
        <tr>
          <td style="padding: 0 40px 40px 40px;">
            
            <!-- Elegantni okvir za pošiljatelja -->
            <div style="background-color: #fcfcfc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="color: #1a365d; font-weight: bold; font-size: 14px; padding-bottom: 8px; border-bottom: 1px solid #edf2f7;">INFORMACIJE O POŠILJATELJU</td>
                </tr>
                <tr>
                  <td style="padding-top: 15px;">
                    <p style="margin: 0 0 5px 0; color: #2d3748;"><strong>Ime:</strong> ${senderName}</p>
                    <p style="margin: 0; color: #2d3748;"><strong>E-mail:</strong> <a href="mailto:${senderEmail}" style="color: #b8860b; text-decoration: none;">${senderEmail}</a></p>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Poruka -->
            <div style="font-size: 16px; line-height: 1.7; color: #4a5568; background: #fff; padding: 15px; border-left: 4px solid #1a365d;">
              ${messageBody.replace(/\n/g, "<br>")}
            </div>

          </td>
        </tr>

        <!-- Donja traka -->
        <tr>
          <td style="height: 8px; background: linear-gradient(90deg, #b8860b 50%, #1a365d 50%);"></td>
        </tr>
      </table>
      
      <!-- Footer -->
      <div style="text-align: center; margin-top: 30px; font-size: 11px; color: #718096; letter-spacing: 0.5px;">
        Ovaj mail je poslan putem automatiziranog Info-Kioska Grada Osijeka.
      </div>
    </div>
  `;
};
