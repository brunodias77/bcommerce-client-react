import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css'; // Importe o CSS
import { ToastContainer } from "react-toastify"; // Importe o Container

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "B-Commerce",
  description: "Seu e-commerce completo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        {children}
        {/* Adicione o ToastContainer aqui */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}