import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { ChartLineUp, DropSimple } from "@phosphor-icons/react";
import { useSocket } from "../hooks/useSocket";

export function CurrentTemperature() {

  const { sensorData } = useSocket()

  return (
    <Box w='100%'>
      <Flex flexDirection='column' alignItems='center'>
        <Heading as='h1' color='greenPigment.100' size='3xl'>{sensorData?.temperature ? sensorData.temperature.toFixed(2) : 0} ºC</Heading>
        <Flex marginTop='40px' w='60%' alignItems='center' justifyContent='space-between' gap={3}>
          <Flex w='100%' alignItems='center'>
            <DropSimple color='#00C7F2' size={30} />
            <Text>Humidade baixa</Text>
          </Flex>
          <Divider orientation='vertical' />
          <Flex w='100%' alignItems='center'>
            <ChartLineUp color="#FBC62F" size={30} />
            <Text>média {sensorData?.averageTemperature ? sensorData.averageTemperature.toFixed(2) : 0} ºC </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}