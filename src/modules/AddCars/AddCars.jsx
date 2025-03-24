"use client";
import React, { useEffect, useRef, useState } from "react";
import Tesseract from "tesseract.js";
import styles from "./style.module.scss";
import { Button, Flex } from "@chakra-ui/react";

const AddCars = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [url,setUrl] = useState(null);
  const [flashOn, setFlashOn] = useState(false);
  let track = null; // Chiroqni boshqarish uchun
  const toggleFlashlight = async () => {
    if (!videoRef.current) return;

    const stream = videoRef.current.srcObject;
    if (!stream) return;

    if (!track) {
      track = stream.getVideoTracks()[0]; // Kameraning video trackini olish
    }

    const capabilities = track.getCapabilities(); // Qurilmaning imkoniyatlarini olish

    if (capabilities.torch) {
      await track.applyConstraints({
        advanced: [{ torch: !flashOn }],
      });
      setFlashOn(!flashOn);
    } else {
      alert("Sizning qurilmangizda chiroqni yoqish imkoniyati yo‘q!");
    }
  };

  useEffect(() => {
    startCamera();
  }, [!text,!url]);

  // 📌 Kamerani ishga tushirish
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { exact: 1920 },
        height: { exact: 1080 },
        facingMode: "environment",
        frameRate: { ideal: 30, max: 60 },  // 📌 Yuqori kadr tezligi
        exposureMode: "continuous",        // 📌 Doimiy ekspozitsiya
        whiteBalanceMode: "continuous",    // 📌 Oq rang balansini avtomatik qilish
        brightness: 1.5,  
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Kameraga ruxsat yo'q:", err);
    }
  };


  const extractDataByNumbers = (text) => {
    const regexPatterns = {
      stateNumber: /1\.\s*([A-Z0-9]+)/, // 1. 4052ECA
      model: /2\.\s*([\w\s-]+)/, // 2. MAN TGX
      color: /3\.\s*([\w\s-]+)/, // 3. OQ BELIY
      owner: /4\.\s*"([^"]+)"/, // 4. "PARADISE FRUIT LOGISTIC" MCHJ
      address: /5\.\s*([\w\s,]+)/, // 5. FARG'ONA VILOYATI, OLTIARIQ TUMANI
      date: /6\.\s*(\d{2}\.\d{2}\.\d{4})/, // 6. 17.05.2024
    };
  
    let extractedData = {};
    for (let key in regexPatterns) {
      let match = text.match(regexPatterns[key]);
      extractedData[key] = match ? match[1] : "Aniqlanmadi";
    }
  
    return extractedData;
  };


  // 📌 Rasmni olish va OCR qilish
  const captureImage = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
  
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  
    // 1️⃣ Haqiqiy video o‘lchamlarini olish
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
  
    // 2️⃣ O‘rtadan kesib olish uchun to‘rtburchak o‘lchami
    const rectWidth = 950;
    const rectHeight = 560;
    const x = (videoWidth - rectWidth) / 2;
    const y = (videoHeight - rectHeight) / 2;
  
    // 3️⃣ Canvas hajmini to‘g‘ri o‘rnatish
    canvas.width = rectWidth;
    canvas.height = rectHeight;
  
    // 4️⃣ Video tasviridan kerakli qismini olish
    ctx.drawImage(
      video,
      x, y, rectWidth, rectHeight,  // Video ichidagi kesish joyi
      0, 0, rectWidth, rectHeight   // Canvas'ga chizish
    );
  
    const imageDataURL = canvas.toDataURL("image/png");
    setUrl(imageDataURL);
  
    // 5️⃣ OCR orqali matnni tanib olish
    const {
      data: { text },
    } = await Tesseract.recognize(imageDataURL, "eng+uzb", {
      tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    });


  
    setText(extractDataByNumbers(text));
    setIsProcessing(false);
  };
  

  return (
    <>
      {!url && (
        <div className={styles.container}>
          {/* Kamera */}
          <video ref={videoRef} autoPlay playsInline className={styles.video} />

          {/* 📌 To‘rtburchakni markazga joylashtirish */}
          <div className={styles.overlay}>
            <div className={styles.box}></div>
          </div>

          {/* 📌 OCR tugmasi */}
        <Flex className={styles.button} alignItems={`center`} justifyContent={`center`} gap={4}>
        <Button
            onClick={captureImage}
            disabled={isProcessing}
            
          >
            {isProcessing ? "Matn ajratilyapti..." : "Rasmga olish"}
          </Button>
          <Button  onClick={toggleFlashlight}>
            {flashOn ? "Chiroqni o‘chirish" : "Chiroqni yoqish"}
          </Button>
        </Flex>

          {/* 📌 OCR matn natijasi */}

          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      )}

      {url && (
        <div className={styles.result}>
          <h3>Ajratilgan matn:</h3>
          <p>{text}</p>
          <Button onClick={() => {setText("");setUrl(null)}}>Qayta urunish</Button>
          <img src={url} alt="Rasm" />
        </div>
      )}
    </>
  );
};

export default AddCars;
