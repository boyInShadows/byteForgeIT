import "./globals.css";

export const metadata = {
  title: "ByteForge – Web & App + Managed IT",
  description: "ByteForge builds modern web & app experiences backed by reliable managed IT.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-bf-bg text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
