import { Box, Flex, Img, Text } from "@chakra-ui/react";
import noDataLogo from '../assets/no_data_logo.svg'

export function NoDataFound() {
  return (
    <Box boxShadow='md' bg='white' borderRadius='8px' h='732px' >
      <Flex gap={6} flexDirection='column' alignItems='center' justify='center' h='100%'>
        <Img w='500px' src={noDataLogo}></Img>
        <Text textStyle='justify' color='softgray.100'>Nenhum dado encontrado. Por favor, pesquise por um digital twin
          e em seguida, clique no botão 'Pesquisar' para continuar.</Text>
      </Flex>
    </Box>
  )
}