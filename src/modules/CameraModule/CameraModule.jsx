"use client";
import React, { useEffect, useRef, useState } from "react";
import Tesseract from "tesseract.js";
import Webcam from "react-webcam";
import styles from "./style.module.scss";
import { Button, Flex } from "@chakra-ui/react";

const CameraModule = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [url, setUrl] = useState(null);
  const [flashOn, setFlashOn] = useState(false);
  const [data, setData] = useState(null);
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
  }, [!text, !url]);

  // 📌 Kamerani ishga tushirish
  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          // width: { exact: 1920 },
          // height: { exact: 1080 },
          facingMode: "environment",
          // frameRate: { ideal: 30, max: 60 }, // 📌 Yuqori kadr tezligi
          // exposureMode: "continuous", // 📌 Doimiy ekspozitsiya
          // whiteBalanceMode: "continuous", // 📌 Oq rang balansini avtomatik qilish
          // brightness: 1.5,
        },
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });
  };

  const captureImage = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Video o‘lchamini olish
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    // Ramka o‘lchami (doimo 390x250)
    const frameWidth = 190;
    const frameHeight = 130;

    // Kesish koordinatalari (markazdan)
    const x = (videoWidth - frameWidth) / 2;
    const y = (videoHeight - frameHeight) / 1.8;

    // Canvas o‘lchamini ramka o‘lchamiga moslash
    canvas.width = frameWidth;
    canvas.height = frameHeight;

    // Video dan markaziy qismini kesib olish
    ctx.drawImage(
      video,
      x,
      y,
      frameWidth,
      frameHeight, // Video ichidan kesish
      0,
      0,
      frameWidth,
      frameHeight // Canvas'ga tushirish
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
          <div id="box" className={styles.overlay}>
            <div className={styles.box}></div>
          </div>

          {/* 📌 OCR tugmasi */}
          <Flex
            className={styles.button}
            alignItems={`center`}
            justifyContent={`center`}
            gap={4}
          >
            <Button onClick={captureImage} disabled={isProcessing}>
              {isProcessing ? "Matn ajratilyapti..." : "Rasmga olish"}
            </Button>
            <Button onClick={toggleFlashlight}>
              {flashOn ? "Chiroqni o‘chirish" : "Chiroqni yoqish"}
            </Button>
          </Flex>

          {/* 📌 OCR matn natijasi */}

          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      )}

      {url && (
        <div className={styles.result}>
          <p>{text}</p>
          <Button
            onClick={() => {
              setText("");
              setUrl(null);
            }}
          >
            Qayta urunish
          </Button>
          <img src={url} alt="Rasm" />
        </div>
      )}
    </>
  );
};

export default CameraModule;

// const processImage = async (imageSrc) => {
//   const img = new Image();
//   img.src = imageSrc;
//   img.onload = async () => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     canvas.width = img.width;
//     canvas.height = img.height;
//     ctx.drawImage(img, 0, 0);

//     // Oq-qora qilib konvertatsiya qilish
//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const pixels = imageData.data;
//     for (let i = 0; i < pixels.length; i += 4) {
//       const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
//       if (avg < 100) { // Qora yozuvlar
//         pixels[i] = pixels[i + 1] = pixels[i + 2] = 0; // Qora
//       } else {
//         pixels[i] = pixels[i + 1] = pixels[i + 2] = 255; // Oq
//       }
//     }
//     ctx.putImageData(imageData, 0, 0);

//     // OCR matnni o‘qish
//     Tesseract.recognize(canvas.toDataURL(), "uzb+eng", { logger: (m) => console.log(m) }).then(({ data: { text } }) => {
//       setText(text);
//     });
//   };
// };
