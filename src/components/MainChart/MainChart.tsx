import {Box, Button, Flex, Grid, GridItem, Group, Input, InputAddon, Separator, Text} from "@chakra-ui/react";
import {CardData} from "./CardData";
import {Chart} from "./Chart";
import {CurrentTemperature} from "../CurrentTemperature";
import {QuantityAnomalies} from "../QuantityAnomalies";
import {Switch} from "../ui/switch.tsx";
import {useMonitoring} from "../../hooks/useMonitoring.tsx";
import {OpcuaParameters} from "../../interfaces/Opcua.ts";
import {MagnifyingGlass} from "@phosphor-icons/react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {historyRangeSearch, HistoryRangeSearch} from "../../types/history.ts";
import {useState} from "react";

interface MainChartProps {
  opcuaParams: OpcuaParameters
}

export function MainChart({opcuaParams}: Readonly<MainChartProps>) {

  const {switchRealTimeMonitoring, isRealTime} = useMonitoring()
  const [dateRange, setDateRange] = useState<HistoryRangeSearch>()

  const localMidnight = new Date();
  localMidnight.setHours(0, 0, 0, 0);

  const localEndOfDay = new Date(localMidnight);
  localEndOfDay.setHours(23, 59, 59, 999);

  const {
    register,
    handleSubmit,
    getValues
  } = useForm<HistoryRangeSearch>({
    resolver: zodResolver(historyRangeSearch),
    defaultValues: {
      startDate: localMidnight.toISOString(),
      endDate: localEndOfDay.toISOString()
    }
  })

  async function handleRangeDateSubmit({startDate, endDate}: HistoryRangeSearch) {
    const startDateRange = new Date(startDate).toISOString()
    const endDateRange = new Date(endDate).toISOString()
    setDateRange({startDate: startDateRange, endDate: endDateRange})
  }

  return (
    <>
      <Separator />
      <Box w='100%' h='60px'>
        <Flex gap={4} alignItems='center' justifyContent='space-between' h='100%'>
          <Flex gap={4} alignItems='center'>
            <Switch checked={isRealTime} onCheckedChange={(e) => switchRealTimeMonitoring(e.checked)} size="md" />
            <Text fontWeight="bold">RealTime Mode</Text>
          </Flex>
          {!isRealTime && (
            <form onSubmit={handleSubmit(handleRangeDateSubmit)} >
              <Flex gap={4} alignItems='center' justifyContent='space-between'>
                <Flex gap={4} alignItems='center'>
                  <Text fontWeight="bold">De: </Text>
                  <Input {...register('startDate')} bg='white' placeholder='Select Date and Time' size='sm' type='datetime-local' />
                </Flex>
                <Flex gap={4} alignItems='center'>
                  <Text fontWeight="bold">Até: </Text>
                  <Input {...register('endDate')} bg='white' placeholder='Select Date and Time' size='sm' type='datetime-local' />
                </Flex>
                <Button type='submit' bg='greenPigment.100' color='white' size='md' css={{
                  "&:hover": {
                    bg: "mediumSeaGreen.100"
                  }
                }}> <MagnifyingGlass /> Pesquisar</Button>
              </Flex>
            </form>

          )}
        </Flex>
      </Box>
      <Box w='100%' h='802px' >
        {
          isRealTime ? (
            <Grid h='100%'
                  templateRows='repeat(2, 1fr)'
                  templateColumns='repeat(7, 1fr)'
                  gap={6}>
              <GridItem rowSpan={2} colSpan={5}>
                <CardData isCahrt title='Dashboard'>
                  <Chart dateRange={getValues()} opcuaParams={opcuaParams} isRealModeView={isRealTime} />
                </CardData>
              </GridItem>
              <GridItem colSpan={2}>
                <CardData isCurrentTemperature title="Temperatura Atual">
                  <CurrentTemperature />
                </CardData>
              </GridItem>
              <GridItem colSpan={2}>
                <CardData isQtdAnomaly title="Quantidade de Anomalias">
                  <QuantityAnomalies />
                </CardData>
              </GridItem>
            </Grid>
          ) : (
            <Grid h='100%'
                  templateRows='repeat(1, 1fr)'
                  templateColumns='repeat(1, 1fr)'
                  gap={6}>
              <GridItem rowSpan={2} colSpan={5}>
                <CardData isCahrt title='Dashboard'>
                  <Chart dateRange={dateRange} opcuaParams={opcuaParams} isRealModeView={isRealTime} />
                </CardData>
              </GridItem>
            </Grid>
          )}
      </Box >
    </>
  )
}

/*


<Grid templateAreas={`
            "chart temperature"
            "chart anomalies"
          `} 
          gridTemplateRows={'50% fr 0'}
          gridTemplateColumns={'70% 1fr'}
          gap={6}
          h='100%' templateColumns='repeat(6, 1fr)' >
          <GridItem area={'chart'} bg='red.500' />
          <GridItem area={'temperature'} bg='blue.500' />
          <GridItem area={'anomalies'} bg='green.500' />
        </Grid>

*/