import img0423 from "../assets/image/IMG_0423.jpg";
import img1886 from "../assets/image/IMG_1886.jpg";
import img3407 from "../assets/image/IMG_3407.jpg";
import img4809 from "../assets/image/IMG_4809.jpg";
import img4917 from "../assets/image/IMG_4917.JPG.jpeg";
import img6527 from "../assets/image/IMG_6527.jpg";
import img7080 from "../assets/image/IMG_7080.jpg";
import img8550 from "../assets/image/IMG_8550.jpg";
import img3959 from "../assets/image/IMG_3959.png";

export const MOCK_IMAGES = {
  hero: img4917,
  gallery: [img3959, img0423, img1886, img3407, img4809, img6527],
  studio1: img7080,
  studio2: img8550,
} as const;

export interface Service {
  name: string;
  price: string;
  desc: string;
}

export const SERVICES: Service[] = [
  {
    name: "Fine Line & Minimalist",
    price: "Starts from $150",
    desc: "Delicate, detailed, and subtle designs focusing on precise linework.",
  },
  {
    name: "Black & Grey Realism",
    price: "Starts from $300",
    desc: "High-contrast, hyper-realistic portraits and surrealism.",
  },
  {
    name: "Traditional & Neo-Trad",
    price: "Starts from $200",
    desc: "Bold lines, vibrant colors, and classic motifs reimagined.",
  },
  {
    name: "Custom Sleeves & Large Scale",
    price: "By Consultation",
    desc: "Bespoke conceptual pieces tailored entirely to your body's flow.",
  },
];

export interface FAQ {
  q: string;
  a: string;
}

export const FAQS: FAQ[] = [
  {
    q: "How do I book an appointment?",
    a: "You can start by filling out our consultation form or contacting us via WhatsApp. We require a deposit to secure your booking.",
  },
  {
    q: "Does getting a tattoo hurt?",
    a: "Pain is subjective and varies depending on placement and personal tolerance. We aim to provide a comfortable, relaxed environment.",
  },
  {
    q: "How should I prepare for my session?",
    a: "Get plenty of rest, eat a solid meal beforehand, and stay hydrated. Avoid alcohol for at least 24 hours prior.",
  },
  {
    q: "Do you accept walk-ins?",
    a: "We primarily operate by appointment to ensure each client receives the dedicated time they deserve, but we occasionally announce walk-in availability on Instagram.",
  },
];
