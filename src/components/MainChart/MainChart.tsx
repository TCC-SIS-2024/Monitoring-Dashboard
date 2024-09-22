import { Box, Divider, Flex, Grid, GridItem, Input } from "@chakra-ui/react";
import { CardData } from "./CardData";
import { Chart } from "./Chart";
import { CurrentTemperature } from "../CurrentTemperature";
import { QuantityAnomalies } from "../QuantityAnomalies";

export function MainChart() {
  return (
    <>
      <Divider />
      <Box w='100%' h='60px'>
        <Flex alignItems='center' justifyContent='flex-end' h='100%'>
          <Input bg='white' placeholder='Select Date and Time' w='14%' size='sm' type='datetime-local' />
        </Flex>
      </Box>
      <Box w='100%' h='710px' >
        <Grid h='100%'
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(7, 1fr)'
          gap={6}>
          <GridItem rowSpan={2} colSpan={5}>
            <CardData isCahrt title='Dashboard'>
              <Chart />
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