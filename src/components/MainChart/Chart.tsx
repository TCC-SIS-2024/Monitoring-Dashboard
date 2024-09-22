import ReactECharts from 'echarts-for-react';
import { useEffect, useRef, useState } from 'react';

export function Chart() {

  const [data, setData] = useState<{ time: string; value: number }[]>([]);
  const [humidityData, sethumidityData] = useState<{ time: string; value: number }[]>([]);
  const [averageData, setAverageData] = useState<{ time: string; value: number }[]>([]);
  // const [dataZoomStart, setDataZoomStart] = useState(0);
  // const [dataZoomEnd, setDataZoomEnd] = useState(100);

  useEffect(() => {

    const average = data.reduce((accumulator, y) => accumulator + y.value, 0) / data.length
    const now = new Date();

    setAverageData((prevData) => [
      ...prevData,
      {
        time: now.toLocaleTimeString(),
        value: average
      },
    ]);
  }, [data])

  useEffect(() => {
    const interval = setInterval(() => {
      const newTemp = Math.random() * 30;
      const newHumidity = Math.random() * 100;

      const now = new Date();

      setData((prevData) => [
        ...prevData,
        {
          time: now.toLocaleTimeString(),
          value: newTemp,
        },
      ]);

      sethumidityData((prevData) => [
        ...prevData,
        {
          time: now.toLocaleTimeString(),
          value: newHumidity,
        },
      ]);

    }, 1000);


    return () => clearInterval(interval);
  }, []);

  const getOption = () => ({
    title: {
      text: 'Real-Time Temperature Data',
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const humidityParams = params[2]
        const param = params[0];
        return `${param.name}: ${param.value.toFixed(2)}°C : ${humidityParams.value.toFixed(2)}%`;
      },
    },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.time),
    },
    // dataZoom: [
    //   {
    //     type: 'slider',
    //     show: true,
    //     start: dataZoomStart,
    //     end: dataZoomEnd,
    //     onChanged: (event: any) => {
    //       setDataZoomStart(event.start);
    //       setDataZoomEnd(event.end);
    //     },
    //   },
    //   {
    //     type: 'inside',
    //     start: dataZoomStart,
    //     end: dataZoomEnd,
    //   },
    // ],
    yAxis: [
      {
        type: 'value',
        name: 'Temperature (°C)',
        position: 'left',
        axisLine: { lineStyle: { color: '#0FA968' } },
        axisLabel: { formatter: '{value} °C' },
      },
      {
        type: 'value',
        name: 'Humidity (%)',
        position: 'right',
        axisLine: { lineStyle: { color: '#007AFF' } },
        axisLabel: { formatter: '{value} %' },
      }],
    series: [
      {
        name: 'Temperature',
        type: 'line',
        data: data.map((d) => d.value),
        lineStyle: {
          color: '#0FA968',
        },
        showSymbol: false,
      },
      {
        name: 'AverageTemperature',
        type: 'line',
        data: averageData.map((d) => d.value),
        lineStyle: {
          color: '#FBC62F',
        },
        showSymbol: false,
      },
      {
        name: 'Humidity',
        type: 'line',
        data: humidityData.map((d) => d.value),
        lineStyle: {
          color: '#00C7F2',
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}%',
        },
        showSymbol: false,
      },
    ]
  });


  return (
    <ReactECharts
      option={getOption()}
      style={{ height: '100%', width: '100%' }}
    />
  )
}