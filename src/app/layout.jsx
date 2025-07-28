import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className="font-meiryo">{children}</body>
    </html>
  );
} 