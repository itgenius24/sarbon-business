export function translateArray(arr) {
  const translationMap = {
    top: "Верхняя",
    side: "Боковая",
    back: "Задняя",
    with_removal: "Со снятием стоек",
    coupling:"Сцепка",
    pneumatic:"Пневмоход",
    konika:"Коники",
    tir:"TIR",
    cemt:"CEMT (ЕКМТ)"
  };

  return arr?.map((item) => translationMap[item])?.filter(item => item);
}
