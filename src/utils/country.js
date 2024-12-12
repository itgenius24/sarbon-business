export const countries = [
  {
    name: "Kazakhstan",
    code: "KZ",
    vehicle_plate_regex: "^[A-Z]{1}\\d{3}[A-Z]{2}\\d{2,3}$",
  },
  {
    name: "Kyrgyzstan",
    code: "KG",
    vehicle_plate_regex: "^[0-9]{2}\\s[\u0410-\u042F]{2}\\s[0-9]{4}$",
  },
  {
    name: "Tajikistan",
    code: "TJ",
    vehicle_plate_regex: "^[0-9]{2}\\s[\u0410-\u042F]{2}\\s[0-9]{4}$",
  },
  {
    name: "Turkmenistan",
    code: "TM",
    vehicle_plate_regex: "^[0-9]{2}\\s[\u0410-\u042F]{2}\\s[0-9]{4}$",
  },
  {
    name: "Uzbekistan",
    code: "UZ",
    vehicle_plate_regex: "^[0-9]{2}[A-Z]{2}[0-9]{3}[A-Z]{1}$",
  },
  {
    name: "Russia",
    code: "RU",
    vehicle_plate_regex:
      "^[\u0410-\u0412\u0415\u041a\u041c\u041d\u041e\u0420\u0421\u0422\u0423\u0425]{1}\\d{3}[\u0410-\u0412\u0415\u041a\u041c\u041d\u041e\u0420\u0421\u0422\u0423\u0425]{2}\\d{2,3}$",
  },
  {
    name: "Armenia",
    code: "AM",
    vehicle_plate_regex: "^[0-9]{2}[A-Z]{2}[0-9]{3}$",
  },
  {
    name: "Azerbaijan",
    code: "AZ",
    vehicle_plate_regex: "^[0-9]{2}-[A-Z]{2}-[0-9]{3}$",
  },
  {
    name: "Georgia",
    code: "GE",
    vehicle_plate_regex: "^[A-Z]{2}\\d{3}[A-Z]{2}$",
  },
  {
    name: "Ukraine",
    code: "UA",
    vehicle_plate_regex: "^[A-Z]{2}\\d{4}[A-Z]{2}$",
  },
  {
    name: "Belarus",
    code: "BY",
    vehicle_plate_regex: "^[0-9]{4}\\s[\u0410-\u042F]{2}-[0-9]{1}$",
  },
  {
    name: "Moldova",
    code: "MD",
    vehicle_plate_regex: "^[A-Z]{3}\\d{3}$",
  },
  {
    name: "Albania",
    code: "AL",
    vehicle_plate_regex: "^[A-Z]{2}\\d{4}[A-Z]{1}$",
  },
  {
    name: "Andorra",
    code: "AD",
    vehicle_plate_regex: "^AD\\d{4}$",
  },
  {
    name: "Austria",
    code: "AT",
    vehicle_plate_regex: "^[A-Z]{1,3}\\d{1,4}[A-Z]{1,2}$",
  },
  {
    name: "Belgium",
    code: "BE",
    vehicle_plate_regex: "^[1-9]{1}[A-Z]{3}\\d{3}$",
  },
  {
    name: "Bosnia and Herzegovina",
    code: "BA",
    vehicle_plate_regex: "^[A-Z]{2}\\d{3}[A-Z]{2}$",
  },
  {
    name: "Bulgaria",
    code: "BG",
    vehicle_plate_regex: "^[A-Z]{1,2}\\d{4}[A-Z]{1,2}$",
  },
  {
    name: "Croatia",
    code: "HR",
    vehicle_plate_regex: "^[A-Z]{2}\\d{3}-\\d{2}$",
  },
  {
    name: "Cyprus",
    code: "CY",
    vehicle_plate_regex: "^[A-Z]{3}\\d{3}$",
  },
  {
    name: "Czech Republic",
    code: "CZ",
    vehicle_plate_regex: "^[A-Z]{2}-\\d{5}$",
  },
  {
    name: "Denmark",
    code: "DK",
    vehicle_plate_regex: "^[A-Z]{2}\\d{5}$",
  },
  {
    name: "Estonia",
    code: "EE",
    vehicle_plate_regex: "^[A-Z]{3}-\\d{3}$",
  },
  {
    name: "Finland",
    code: "FI",
    vehicle_plate_regex: "^[A-Z]{3}-\\d{3}$",
  },
  {
    name: "France",
    code: "FR",
    vehicle_plate_regex: "^[A-Z]{2}-\\d{3}-[A-Z]{2}$",
  },
  {
    name: "Germany",
    code: "DE",
    vehicle_plate_regex: "^[A-Z]{1,3}-[A-Z]{1,2}\\d{1,4}$",
  },
  {
    name: "Greece",
    code: "GR",
    vehicle_plate_regex: "^[A-Z]{3}-\\d{4}$",
  },
  {
    name: "Hungary",
    code: "HU",
    vehicle_plate_regex: "^[A-Z]{3}-\\d{3}$",
  },
  {
    name: "Iceland",
    code: "IS",
    vehicle_plate_regex: "^[A-Z]{1,2}\\d{3}$",
  },
  {
    name: "Ireland",
    code: "IE",
    vehicle_plate_regex: "^d{2}-[A-Z]{1,2}-\\d{1,5}$",
  },
  {
    name: "Italy",
    code: "IT",
    vehicle_plate_regex: "^[A-Z]{2}\\d{3}[A-Z]{2}$",
  },
  {
    name: "Latvia",
    code: "LV",
    vehicle_plate_regex: "^[A-Z]{2}-\\d{4}$",
  },
  {
    name: "Liechtenstein",
    code: "LI",
    vehicle_plate_regex: "^FL-\\d{1,5}$",
  },
  {
    name: "Lithuania",
    code: "LT",
    vehicle_plate_regex: "^[A-Z]{3}\\d{3}$",
  },
  {
    name: "Luxembourg",
    code: "LU",
    vehicle_plate_regex: "^[A-Z]{2}-\\d{5}$",
  },
  {
    name: "Malta",
    code: "MT",
    vehicle_plate_regex: "^[A-Z]{3}\\d{4}$",
  },
  {
    name: "Netherlands",
    code: "NL",
    vehicle_plate_regex: "^[A-Z]{1,2}\\d{2,3}[A-Z]{1,2}$",
  },
  {
    name: "North Macedonia",
    code: "MK",
    vehicle_plate_regex: "^[A-Z]{2}\\d{1,4}[A-Z]{1,2}$",
  },
  {
    name: "Norway",
    code: "NO",
    vehicle_plate_regex: "^[A-Z]{2}\\d{3,4}$",
  },
  {
    name: "Poland",
    code: "PL",
    vehicle_plate_regex: "^[A-Z]{2}\\d{4}[A-Z]{1}$",
  },
  {
    name: "Portugal",
    code: "PT",
    vehicle_plate_regex: "^[A-Z]{2}\\d{2}-\\d{2}$",
  },
  {
    name: "Romania",
    code: "RO",
    vehicle_plate_regex: "^[B-DFGHJKLMNPRSTVWXYZ]{2}\\d{2,4}[A-Z]{2}$",
  },
  {
    name: "San Marino",
    code: "SM",
    vehicle_plate_regex: "^[A-Z]{1,2}\\d{1,5}$",
  },
  {
    name: "Serbia",
    code: "RS",
    vehicle_plate_regex: "^[A-Z]{2}\\d{1,4}$",
  },
  {
    name: "Slovakia",
    code: "SK",
    vehicle_plate_regex: "^[A-Z]{2}\\d{3}[A-Z]{1}$",
  },
  {
    name: "Slovenia",
    code: "SI",
    vehicle_plate_regex: "^[A-Z]{2}\\d{3}[A-Z]{1,2}$",
  },
  {
    name: "Spain",
    code: "ES",
    vehicle_plate_regex: "^[A-Z]{4}\\d{3}$",
  },
  {
    name: "Sweden",
    code: "SE",
    vehicle_plate_regex: "^[A-Z]{3}\\d{3}$",
  },
  {
    name: "Switzerland",
    code: "CH",
    vehicle_plate_regex: "^[A-Z]{2}\\d{1,3}$",
  },
  {
    name: "Turkey",
    code: "TR",
    vehicle_plate_regex: "^[0-9]{2}[A-Z]{1,2}\\d{1,4}$",
  },
  {
    name: "United Kingdom",
    code: "GB",
    vehicle_plate_regex: "^[A-Z]{2}\\d{1,4}[A-Z]{1}$",
  },
  {
    name: "Vatican City",
    code: "VA",
    vehicle_plate_regex: "^[A-Z]{1,2}\\d{1,5}$",
  },
  {
    name: "China",
    code: "CN",
    vehicle_plate_regex: "^[A-Z]{1}[A-Z\\d]{5}$",
  },
  {
    name: "India",
    code: "IN",
    vehicle_plate_regex: "^[A-Z]{2}\\d{4}$",
  },
  {
    name: "Monaco",
    code: "MC",
    vehicle_plate_regex: "^[A-Z]{1,3}\\d{1,5}$",
  },
];
