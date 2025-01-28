import { color } from 'framer-motion'
import React from 'react'

export const useDashboard = () => {

    const topStatis = [
        {
            id:1,
            total:12,
            deck:`Umumiy foydalanuvchilar soni`,
            color:`rgba(0, 122, 255, 1)`
        },
        {
            id:2,
            total:12,
            deck:`Umumiy Xozain mashinalar soni`,
            color:`rgba(0, 122, 255, 1)`
        },
        {
            id:3,
            total:12,
            deck:`Umumiy Tranpsportlar soni`,
            color:`rgba(0, 122, 255, 1)`
        },
        {
            id:4,
            total:12,
            deck:`Umumiy Yuklar`,
            color:`rgba(0, 122, 255, 1)`
        }
    ]

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
  return {
    topStatis,
    chartData,
    options
  }
}

