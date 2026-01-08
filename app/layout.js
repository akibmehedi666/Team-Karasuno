import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "600"],
});

export const metadata = {
  title: "Echoes Without Words",
  description: "A minimalist, interactive generative web experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.variable} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
