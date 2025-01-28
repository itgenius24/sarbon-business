import { color } from "framer-motion";
import React, { useState } from "react";

export const useDashboard = () => {
  const [startDate,setStartDate] = useState(new Date())
  const [endDate,setEndDate] = useState(new Date())
  console.log(`startDate`,startDate)
  const topStatis = [
    {
      id: 1,
      total: 12,
      deck: `Umumiy foydalanuvchilar soni`,
      color: `rgba(0, 122, 255, 1)`,
    },
    {
      id: 2,
      total: 12,
      deck: `Umumiy Xozain mashinalar soni`,
      color: `rgba(0, 122, 255, 1)`,
    },
    {
      id: 3,
      total: 12,
      deck: `Umumiy Tranpsportlar soni`,
      color: `rgba(0, 122, 255, 1)`,
    },
    {
      id: 4,
      total: 12,
      deck: `Umumiy Yuklar`,
      color: `rgba(0, 122, 255, 1)`,
    },
  ];

  const chartData = {
    labels: [`Foydalanuvchilar`, `Xozain mashinalar`, `Transportlar`, `Yuklar`],
    datasets: [
      {
        label: "",
        data: [40, 23, 83, 100],
        borderColor: "transparent",
        backgroundColor: [
          "rgb(64, 81, 156)",
          "rgb(18, 155, 128)",
          "rgb(9, 172, 211)",
          "rgb(116, 26, 205)",
          "rgb(220, 128, 44)",
        ],
        barPercentage: 0.4,
        categoryPercentage: 0.4,
      },
    ],
  };

  const colorArea = {
    id: "colorArea",
    beforeDatasetsDraw(chart) {
      const ctx = chart.ctx;
      const { top, left, width, height } = chart.chartArea;
      ctx.save();
      ctx.fillStyle = "rgb(245, 245, 245)";
      ctx.fillRect(left, top, width, height);
      ctx.restore();
    },
  };

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 0,
        borderRadius: 10,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Horizontal Bar Chart",
      },
      datasets: {
        display: false,
      },
      colorArea,
    },
    scales: {
      x: {
        ticks: {
          color: "#222", // Label color
          font: {
            size: 14,
          },
        },
      },
      y: {
        ticks: {
          color: "#222",
          font: {
            size: 16,
          },
        },
      },
    },
  };

  const columns1 = [
    {
      title: `ID`,
      dataIndex: "photo",
      width: `200px`,
    },
    {
      title: `Nomer telefon`,
      dataIndex: "photo",
      width: `350px`,
    },
    {
      title: `Familya ism`,
      dataIndex: "photo",
      width: `350px`,
    },
    {
      title: `Kiritilgan vaqt`,
      dataIndex: "photo",
      width: `200px`,
    },
    {
      title: `Roll`,
      dataIndex: "photo",
      width: `200px`,
    },
    {
      title: `Dispatcher`,
      dataIndex: "photo",
      width: `200px`,
    },
  ];
  const columns2 = [
    {
      title: `ID`,
      dataIndex: "photo",
      width: `200px`,
    },
    {
      title: `Nomer telefon`,
      dataIndex: "photo",
      width: `300px`,
    },
    {
      title: `Familya ism`,
      dataIndex: "photo",
      width: `350px`,
    },
    {
      title: `Kiritilgan vaqt`,
      dataIndex: "photo",
      width: `200px`,
    },
    {
      title: `Roll`,
      dataIndex: "photo",
      width: `200px`,
    },
    {
      title: `xozain mashinasi`,
      dataIndex: "photo",
      width: `200px`,
    },
    {
      title: `Dispatcher`,
      dataIndex: "photo",
      width: `200px`,
    },
  ];
  const columns3 = [
    {
      title: `ID`,
      dataIndex: "photo",
      width: `200px`,
    },
    {
      title: `Gos nomer`,
      dataIndex: "photo",
      width: `300px`,
    },
    {
      title: `Voditel`,
      dataIndex: "photo",
      width: `350px`,
    },
    {
      title: `Kiritilgan vaqt`,
      dataIndex: "photo",
      width: `200px`,
    },
    {
      title: `Status Avto`,
      dataIndex: "photo",
      width: `200px`,
    },
    {
      title: `firma x/m`,
      dataIndex: "photo",
      width: `200px`,
    },
    {
      title: `Toplivo`,
      dataIndex: "photo",
      width: `200px`,
    },
    {
      title: `Eco standart`,
      dataIndex: "photo",
      width: `200px`,
    },
  ];
  const columns4 = [
    {
      title: `Gruz id`,
      dataIndex: "photo",
      width: `200px`,
    },
    {
      title: `Prodajnik`,
      dataIndex: "photo",
      width: `200px`,
    },
    {
      title: `A tochka`,
      dataIndex: "photo",
      width: `20px`,
    },
    {
      title: `B tochka`,
      dataIndex: "photo",
      width: `200px`,
    },
    {
      title: `Tip gruza`,
      dataIndex: "photo",
      width: `200px`,
    },
    {
      title: `Tip mashina`,
      dataIndex: "photo",
      width: `200px`,
    },
    {
      title: `Obshay summa`,
      dataIndex: "photo",
      width: `200px`,
    },
    {
      title: `Peredoplata`,
      dataIndex: "photo",
      width: `200px`,
    },
    {
      title: `Summa posle zaversheniya`,
      dataIndex: "photo",
      width: `200px`, 
    },
    {
      title: `Valyuta`,
      dataIndex: "photo",
      width: `200px`, 
    },
    {
      title: `Status gruza`,
      dataIndex: "photo",
      width: `200px`, 
    },
  ];
  return {
    topStatis,
    chartData,
    options,
    setStartDate,
    startDate,
    endDate,
    setEndDate,
    columns1,
    columns2,
    columns3,
    columns4
  };
};
