export default function NotFound() {
  return (
    <div style={{ textAlign: "center", paddingTop: 100 }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>404 - Sahifa topilmadi</h1>
      <p>Bu sahifa mavjud emas yoki o‘chirilgan.</p>
      <a href="/" style={{ color: "#0070f3", textDecoration: "underline" }}>
        Bosh sahifaga qaytish
      </a>
    </div>
  );
}