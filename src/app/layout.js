import { Inter } from "next/font/google";
import "./globals.css";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bro BId",
  description: "Get Better Deals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <head>
        {/* Metadata and additional head elements */}
      </head>
      <body className={inter.className}>
        {children}

      </body>
    </html>
  );
}
