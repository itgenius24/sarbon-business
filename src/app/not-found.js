import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | Sarbon",
  description: "The page you are looking for doesn't exist or has been moved.",
};

export default function GlobalNotFound() {
  return (
    <html lang="ru">
      <body>
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f7fafc",
          fontFamily: "system-ui, sans-serif"
        }}>
          <div style={{
            textAlign: "center",
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "48px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            maxWidth: "500px",
            margin: "0 16px"
          }}>
            <h1 style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "#3182ce",
              marginBottom: "16px",
              lineHeight: "1.2"
            }}>
              404
            </h1>
            
            <h2 style={{
              fontSize: "32px",
              fontWeight: "600",
              color: "#2d3748",
              marginBottom: "16px",
              lineHeight: "1.3"
            }}>
              Страница не найдена
            </h2>
            
            <p style={{
              fontSize: "18px",
              color: "#718096",
              marginBottom: "32px",
              lineHeight: "1.6"
            }}>
              Извините, страница, которую вы ищете, не существует или была перемещена.
            </p>
            
            <Link href="/ru" style={{
              display: "inline-block",
              backgroundColor: "#3182ce",
              color: "white",
              padding: "12px 32px",
              fontSize: "16px",
              fontWeight: "600",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "all 0.2s"
            }}>
              Вернуться на главную
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
