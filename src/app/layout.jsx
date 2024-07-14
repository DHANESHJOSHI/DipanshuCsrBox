import { AuthWrapper } from "@/lib/AuthProvider";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="false">
    
        <AuthWrapper>
      
          {children}
          </AuthWrapper>
        <Toaster />
      </body>
    </html>
  );
}
