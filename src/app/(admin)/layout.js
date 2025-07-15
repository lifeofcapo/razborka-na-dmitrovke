import "@/app/globals.css";

export default function AdminLayout({ children }) {
  return (
    <html lang="ru" className="h-full bg-gray-100">
      <body className="h-full">
        <div className="admin-layout">
          <div className="admin-content">
            <main className="p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
