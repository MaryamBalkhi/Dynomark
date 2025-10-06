<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['fullname']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    $to = "info@dynomark.com.af"; // Change this to your actual email
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $body = "You have received a new message from your website contact form:\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Subject: $subject\n";
    $body .= "Message:\n$message\n";

    if (mail($to, "New Contact Form Submission: $subject", $body, $headers)) {
        echo "<script>alert('Thank you! Your message has been sent successfully.'); window.location.href='contact.html';</script>";
    } else {
        echo "<script>alert('Error sending message. Please try again later.'); window.history.back();</script>";
    }
}
?>
