export function formatPhoneNumber(phoneNumber) {
  // Telefon raqamidan bo'sh joylar va ortiqcha belgilarni olib tashlaymiz
  phoneNumber = phoneNumber?.replace(/\D/g, '');

  if (phoneNumber?.length === 12) {
    // Raqamni `+998 97 913 69 19` formatiga keltiramiz
    return `+${phoneNumber?.slice(0, 3)} ${phoneNumber?.slice(3, 5)} ${phoneNumber?.slice(5, 8)} ${phoneNumber?.slice(8, 10)} ${phoneNumber?.slice(10, 12)}`;
  } else {
    return phoneNumber;
  }
}
