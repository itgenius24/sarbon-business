export function formatDateTime(date) {
  const now = new Date();
  const inputDate = new Date(new Date(date).setHours(new Date(date).getHours() - 5));

  // Sana bugungi kunga to'g'ri keladimi
  const isToday =
    now.getDate() === inputDate.getDate() &&
    now.getMonth() === inputDate.getMonth() &&
    now.getFullYear() === inputDate.getFullYear();

  // Soat va daqiqalarni olish
  const hours = String(inputDate.getHours()).padStart(2, "0");
  const minutes = String(inputDate.getMinutes()).padStart(2, "0");

  if (isToday) {
    return `Сегодня, ${hours}:${minutes}`;
  } else {
    // Bugungi emas, oddiy sanani qaytarish
    return `${inputDate.toLocaleDateString()}, ${hours}:${minutes}`;
  }


}

