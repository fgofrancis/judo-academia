package com.cdigital.academia.restController;

import jakarta.mail.internet.MimeMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactController {

    private final JavaMailSender mailSender;

    public ContactController(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @PostMapping("/contacto-text")
    public ResponseEntity<String> enviarFormularioText(
            @RequestParam String nombre,
            @RequestParam String email,
            @RequestParam(required = false) String telefono,
            @RequestParam String programa,
            @RequestParam String mensaje) {

        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo("fgocam@gmail.com"); // destinatario
            mail.setSubject("Nuevo mensaje de contacto");
            mail.setText(
                    "Nombre: " + nombre + "\n" +
                    "Email: " + email + "\n" +
                    "Teléfono: " + telefono + "\n" +
                    "Programa: " + programa + "\n" +
                    "Mensaje: " + mensaje
            );

            mailSender.send(mail);

            return ResponseEntity.ok("Mensaje enviado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al enviar el mensaje");
        }
    }

    @PostMapping("/contacto-html")
    public ResponseEntity<String> enviarFormularioHtml(
            @RequestParam String nombre,
            @RequestParam String email,
            @RequestParam (required = false) String telefono,
            @RequestParam String programa,
            @RequestParam String mensaje
    ){
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo("fgocam@gmail.com");
            helper.setSubject("Nuevo mensaje de contacto");

            //Contendio HTML
            String htmlContent = "<h2 style='color:#2c3e50;'>Nuevo mensaje de contacto</h2>"
                    + "<p><strong>Nombre:</strong>" + nombre +  "</p>"
                    + "<p><strong>Email:</strong>" +email + "</p>"
                    + "<p><strong> Teléfono:</strong>" + (telefono != null ? telefono : "No especificado") +"</p>"
                    + "<p><strong>Programa:</strong> " + programa + "</p>"
                    + "<p><strong>Mensaje:</strong><br>" + mensaje + "</p>"
                    + "<hr><p style='font-size:12px;color:#7f8c8d;'>Este correo fue generado automáticamente desde el formulario web.</p>";

            helper.setText(htmlContent, true); // interpreta como HTML
            mailSender.send(mimeMessage);

            return ResponseEntity.ok("Mensaje enviado correctamente");
        }catch (Exception e){
            return ResponseEntity.status(500).body("Error al enviar mensaje");
        }
    }

    @PostMapping("/contacto-html-tabla")
    public ResponseEntity<String> enviarFormularioHtmlTabla(
            @RequestParam String nombre,
            @RequestParam String email,
            @RequestParam(required = false) String telefono,
            @RequestParam String programa,
            @RequestParam String mensaje) {

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo("fgocam@gmail.com");
            helper.setSubject("Nuevo mensaje de contacto");

            // Contenido HTML con tabla
            String htmlContent =
                    "<h2 style='color:#2c3e50;'>Nuevo mensaje de contacto</h2>" +
                            "<table style='border-collapse:collapse;width:100%;'>" +
                            "  <tr style='background-color:#f2f2f2;'>" +
                            "    <td style='padding:8px;border:1px solid #ddd;'><strong>Nombre</strong></td>" +
                            "    <td style='padding:8px;border:1px solid #ddd;'>" + nombre + "</td>" +
                            "  </tr>" +
                            "  <tr>" +
                            "    <td style='padding:8px;border:1px solid #ddd;'><strong>Email</strong></td>" +
                            "    <td style='padding:8px;border:1px solid #ddd;'>" + email + "</td>" +
                            "  </tr>" +
                            "  <tr style='background-color:#f2f2f2;'>" +
                            "    <td style='padding:8px;border:1px solid #ddd;'><strong>Teléfono</strong></td>" +
                            "    <td style='padding:8px;border:1px solid #ddd;'>" + (telefono != null ? telefono : "No especificado") + "</td>" +
                            "  </tr>" +
                            "  <tr>" +
                            "    <td style='padding:8px;border:1px solid #ddd;'><strong>Programa</strong></td>" +
                            "    <td style='padding:8px;border:1px solid #ddd;'>" + programa + "</td>" +
                            "  </tr>" +
                            "  <tr style='background-color:#f2f2f2;'>" +
                            "    <td style='padding:8px;border:1px solid #ddd;'><strong>Mensaje</strong></td>" +
                            "    <td style='padding:8px;border:1px solid #ddd;'>" + mensaje + "</td>" +
                            "  </tr>" +
                            "</table>" +
                            "<hr><p style='font-size:12px;color:#7f8c8d;'>Este correo fue generado automáticamente desde el formulario web.</p>";

            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);

            return ResponseEntity.ok("Mensaje enviado correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al enviar el mensaje");
        }
    }

}
