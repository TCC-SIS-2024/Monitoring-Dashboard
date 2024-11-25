import {Box, Heading} from "@chakra-ui/react";
import {useMonitoring} from "../hooks/useMonitoring.tsx";

export function QuantityAnomalies() {

  const { qtdAnomalies } = useMonitoring()

  return (
    <Box>
      <Heading as='h1' color='greenPigment.100' size='4xl'>{qtdAnomalies}</Heading>
    </Box>
  )
}