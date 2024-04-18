// Se requiere el módulo nodemailer para el envío de correos electrónicos.
const nodemailer = require("nodemailer");
require("dotenv").config();

// Creación de un objeto transporter con la configuración para Gmail.
let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true para el puerto 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  },
});

/**
 * Función asincrónica para enviar correos electrónicos.
 *
 * @param {Object} mail - Objeto que contiene los detalles del correo electrónico.
 * @param {string} mail.to - Dirección de correo electrónico del destinatario.
 * @param {string} mail.subject - Asunto del correo electrónico.
 * @param {string} mail.text - Cuerpo del mensaje en texto plano.
 * @param {string} mail.html - Cuerpo del mensaje en formato HTML (opcional).
 *
 * @returns {Promise<void>} - No retorna ningún valor, pero imprime en consola el resultado del envío.
 *
 * @description
 * Esta función toma un objeto 'mail' con los detalles necesarios para enviar un correo.
 * Utiliza el objeto 'transporter' para manejar el envío utilizando SMTP de Gmail. En caso de éxito,
 * imprime una confirmación en la consola. Si el envío falla, captura y muestra el error.
 *
 * Ejemplo de uso:
 * sendEmail({
 *   to: 'destinatario@example.com',
 *   subject: 'Prueba de Nodemailer',
 *   text: 'Este es un correo de prueba enviado desde Node.js usando Nodemailer.',
 *   html: '<b>Este es un correo de prueba enviado desde Node.js usando Nodemailer.</b>'
 * });
 */
const sendEmail = async (mail) => {
  const mailDetails = {
    from: process.env.EMAIL_USERNAME, // Remitente del correo
    to: mail.to, // Destinatario del correo
    subject: mail.subject, // Asunto del correo
    text: mail.text, // Contenido del correo en texto plano
    html: mail.html, // Contenido del correo en formato HTML (opcional)
  };
  try {
    const info = await transporter.sendMail(mailDetails);
    console.log("Email sent: ", info.response); // Registro del éxito del envío
  } catch (error) {
    console.error("Error sending mail: ", error); // Manejo de errores durante el envío
  }
};

module.exports = { sendEmail };
