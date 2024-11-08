import ReactECharts from 'echarts-for-react';
import {useEffect, useState} from 'react';
import {useSocket} from '../../hooks/useSocket';
import {SensorData} from '../../interfaces/SensorData';
import {OpcuaParameters} from "../../interfaces/Opcua.ts";
import {useMonitoring} from "../../hooks/useMonitoring.tsx";
import {HistoryRangeSearch} from "../../types/history.ts";

interface ChartProps {
  isRealModeView: boolean
  opcuaParams: OpcuaParameters
  dateRange: HistoryRangeSearch | undefined
}

export function Chart({isRealModeView, opcuaParams, dateRange}: Readonly<ChartProps>) {
  const { sensorData } = useSocket()
  const { getHistorizedDataFromAAS } = useMonitoring()
  const [data, setData] = useState<SensorData[]>([]);
  const [dataZoomStart, setDataZoomStart] = useState(0);
  const [dataZoomEnd, setDataZoomEnd] = useState(100);

  useEffect(() => {

    if (sensorData) {
      setData((prev) => [
        ...prev.slice(-49),
        sensorData
      ])
    }

  }, [sensorData])

  useEffect(() => {
    const fetchData = async () => {
      if (opcuaParams !== undefined && dateRange !== undefined) {
        let historizedData = await getHistorizedDataFromAAS({
          opcuaServerHost: opcuaParams.opcuaServerHost,
          opcuaServerPort: opcuaParams.opcuaServerPort,
          startDate: dateRange?.startDate,
          endDate: dateRange?.endDate
        })

        historizedData = historizedData.payload.data

        if (historizedData && Array.isArray(historizedData)) {

          const filteredHistorizedData = historizedData.filter((item) => item.idShort === 'Temperature')

          const formattedData = filteredHistorizedData.map((item) => {
            const adjustedTimestamp = new Date(item.timestamp);
            adjustedTimestamp.setHours(adjustedTimestamp.getHours() - 4);
            const formattedTimestamp = adjustedTimestamp.toLocaleString();

            return {
              temperature: item.value.value,
              humidity: null,
              averageTemperature: null,
              now: formattedTimestamp
            }
          })

          setData((_) => [...formattedData]);
        }
      }
    }

    if (!isRealModeView) {
      fetchData()
    }

  }, [isRealModeView, dateRange, opcuaParams]);

  const getOption = () => ({
    title: {
      text: 'Real-Time Temperature Data',
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        // const humidityParams = params[2]
        const param = params[0];
        // ${humidityParams.value.toFixed(2)}%
        return `${param.name}: ${param.value.toFixed(2)}°C`;
      },
    },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.now),
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        start: dataZoomStart,
        end: dataZoomEnd,
        onChanged: (event: any) => {
          setDataZoomStart(event.start);
          setDataZoomEnd(event.end);
        },
      },
      {
        type: 'inside',
        start: dataZoomStart,
        end: dataZoomEnd,
      },
    ],
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
        markPoint: !isRealModeView ? {
          itemStyle: {
            color: '#0FA968'
          },
          data: [
            { type: 'max', name: 'Max'},
            { type: 'min', name: 'Min' }
          ]
        } : null,
        markLine: !isRealModeView ? {
          lineStyle: {
            color: '#FDD017'
          },
          data: [
            { type: 'average', name: 'Avg' },
            { type: 'max', name: 'Max Temp', yAxis: 32,
              lineStyle: {
                color: '#FF0000'
              }
            },
            { type: 'min', name: 'Min Temp', yAxis: 20,
              lineStyle: {
                color: '#FF0000'
              }
            },
          ]
        } : null,
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