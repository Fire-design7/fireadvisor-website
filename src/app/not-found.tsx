import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="bg">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          background: "#0f172a",
          color: "white",
          fontFamily: "sans-serif",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", color: "#fbbf24" }}>
          404
        </p>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, margin: 0 }}>
          Страницата не е намерена
        </h1>
        <p style={{ color: "#cbd5e1", maxWidth: "28rem" }}>
          Възможно е връзката да е остаряла или адресът да е сгрешен.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            borderRadius: "9999px",
            background: "#f59e0b",
            color: "#0f172a",
            fontWeight: 600,
            padding: "0.625rem 1.25rem",
            textDecoration: "none",
          }}
        >
          Начало
        </Link>
      </body>
    </html>
  );
}
