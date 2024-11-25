import {Box, Flex, Heading} from "@chakra-ui/react";
import {useSocket} from "../hooks/useSocket";

export function CurrentTemperature() {

  const { sensorData } = useSocket()

  return (
    <Box w='100%'>
      <Flex flexDirection='column' alignItems='center'>
        <Heading as='h1' color='greenPigment.100' size='3xl'>{sensorData?.temperature ? sensorData.temperature.toFixed(2) : 0} ºC</Heading>
      </Flex>
    </Box>
  )
}