import { transporter } from '../config/mailer.config.js';
import { config } from '../config/env.js';

export const sendResetPasswordEmail = async (email, token) => {
  const resetLink = `${config.baseUrl}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: '"Ecommerce Soporte" <no-reply@ecommerce.com>',
    to: email,
    subject: 'Recuperación de contraseña',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto;">
        <h2>Recuperación de contraseña</h2>
        <p>Recibimos una solicitud para restablecer tu contraseña. Este enlace expira en 1 hora.</p>
        <a href="${resetLink}"
           style="display:inline-block; padding:12px 24px; background-color:#2563eb; color:#fff; text-decoration:none; border-radius:6px; margin-top:12px;">
          Restablecer contraseña
        </a>
        <p style="margin-top:16px; color:#666; font-size:13px;">
          Si no solicitaste esto, ignorá este correo.
        </p>
      </div>
    `,
  });
};