import {Box, Flex, Text} from "@chakra-ui/react"
import {NoDataFound} from "../../../components/NoDataFound"
import {SearchInput} from "../../../components/SearchInput"
import {MainChart} from "../../../components/MainChart/MainChart"
import {useMonitoring} from "../../../hooks/useMonitoring.tsx";

export function Dahsboard() {

  const { isMonitoring } = useMonitoring()

  return (
    <Box w='96%' margin='1% auto auto auto'>
      <Box h='80px'>
        <Flex justifyContent='space-between' alignItems='center' h='100%'>
          <Text fontSize='2xl' as='b' color='greenPigment.100'>Monitoramento de Assets</Text>
          <SearchInput/>
        </Flex>
      </Box>
      {
        isMonitoring ? <MainChart/> : <NoDataFound/>
      }
    </Box>
  )
}