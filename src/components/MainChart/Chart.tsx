import ReactECharts from 'echarts-for-react';
import { useEffect, useRef, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { SensorData } from '../../interfaces/SensorData';

export function Chart() {
  const { sensorData } = useSocket()

  const [data, setData] = useState<SensorData[]>([]);
  // const [dataZoomStart, setDataZoomStart] = useState(0);
  // const [dataZoomEnd, setDataZoomEnd] = useState(100);

  useEffect(() => {

    if (sensorData) {
      setData((prev) => [
        ...prev.slice(-49),
        sensorData
      ])
    }

  }, [sensorData])

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
      data: data.map((d) => d.now),
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
        data: data.map((d) => d.temperature),
        lineStyle: {
          color: '#0FA968',
        },
        showSymbol: false,
      },
      {
        name: 'AverageTemperature',
        type: 'line',
        data: data.map((d) => d.averageTemperature),
        lineStyle: {
          color: '#FBC62F',
        },
        showSymbol: false,
      },
      {
        name: 'Humidity',
        type: 'line',
        data: data.map((d) => d.humidity),
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