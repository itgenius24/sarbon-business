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
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: "environment",
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Kameraga ruxsat yo'q:", err);
    }
  };

  const preprocessImage = (imageDataURL) => {
    return new Promise((resolve) => {
      let img = new Image();
      img.src = imageDataURL;
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // 📌 Rasmni grayscale (qora-oq) formatga o'tkazish
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let pixels = imageData.data;

        for (let i = 0; i < pixels.length; i += 4) {
          let avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3; // O'rtacha rang
          pixels[i] = avg; // Red
          pixels[i + 1] = avg; // Green
          pixels[i + 2] = avg; // Blue
        }

        ctx.putImageData(imageData, 0, 0);

        // 📌 Binarizatsiya qilish (threshold = 128)
        let binaryData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let binaryPixels = binaryData.data;

        for (let i = 0; i < binaryPixels.length; i += 4) {
          let value = binaryPixels[i] > 128 ? 255 : 0; // Agar 128 dan yuqori bo'lsa oq, past bo'lsa qora
          binaryPixels[i] = value;
          binaryPixels[i + 1] = value;
          binaryPixels[i + 2] = value;
        }

        ctx.putImageData(binaryData, 0, 0);

        // 📌 Qayta ishlangan rasmni chiqarish
        resolve(canvas.toDataURL("image/png"));
      };
    });
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
    const rectWidth = 390;
    const rectHeight = 250;
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
  
    setText(text);
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
