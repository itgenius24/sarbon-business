"use strict";

export const convertLatinToCyril = (word) => {
  var answer = ""
    , a = {};

  a["YO"]="Ё";
  a["I"]="Й";
  a["TS"]="Ц";
  a["U"]="У";
  a["K"]="К";
  a["E"]="Е";
  a["N"]="Н";
  a["G"]="Г";
  a["SH"]="Ш";
  a["SCH"]="Щ";
  a["Z"]="З";
  a["H"]="Х";
  a["'"]="Ъ";

  a["yo"]="ё";
  a["i"]="й";
  a["ts"]="ц";
  a["u"]="у";
  a["k"]="к";
  a["e"]="е";
  a["n"]="н";
  a["g"]="г";
  a["sh"]="ш";
  a["sch"]="щ";
  a["z"]="з";
  a["h"]="х";
  a["'"]="ъ";

  a["F"]="Ф";
  a["I"]="Ы";
  a["V"]="В";
  a["A"]="А";
  a["P"]="П";
  a["R"]="Р";
  a["O"]="О";
  a["L"]="Л";
  a["D"]="Д";
  a["ZH"]="Ж";
  a["E"]="Э";

  a["f"]="ф";
  a["i"]="ы";
  a["v"]="в";
  a["a"]="а";
  a["p"]="п";
  a["r"]="р";
  a["o"]="о";
  a["l"]="л";
  a["d"]="д";
  a["zh"]="ж";
  a["e"]="э";

  a["Ya"]="Я";
  a["CH"]="Ч";
  a["S"]="С";
  a["M"]="М";
  a["I"]="И";
  a["T"]="Т";
  a["'"]="Ь";
  a["B"]="Б";
  a["YU"]="Ю";

  a["ya"]="я";
  a["ch"]="ч";
  a["s"]="с";
  a["m"]="м";
  a["i"]="и";
  a["t"]="т";
  a["'"]="ь";
  a["b"]="б";
  a["yu"]="ю";


  for (let i in word){
    if (Object.prototype.hasOwnProperty.call(word, i)) {
      if (a[word[i]] === undefined){
        answer += word[i];
      } else {
        answer += a[word[i]];
      }
    }
  }
  return answer;
};
