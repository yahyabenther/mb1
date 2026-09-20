import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_sz5wu2e"; // TODO
const TEMPLATE_ID = "template_s1gnbeg"; // TODO
const PUBLIC_KEY = "ND6lia2oKzeBcrpva"; // TODO

export async function sendContactEmail(params: {
  name: string;
  email: string;
  message: string;
}) {
  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: params.name,
      from_email: params.email,
      message: params.message,
    },
    { publicKey: PUBLIC_KEY }
  );
}