export function translateArray(arr) {
    const translationMap = {
      top: "Верхняя",
      side: "Боковая",
      back: "Задняя",
      with_removal: "Со снятием стоек"
    };
  
    return arr?.map(item => translationMap[item] || item);
  }
  
 
  