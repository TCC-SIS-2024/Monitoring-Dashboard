import { Box, Button, Flex, Grid, GridItem, Img, Input, Text } from "@chakra-ui/react"
import noDataLogo from '../../../assets/no_data_logo.svg'

export function Dahsboard() {
  return (
    <>
      <Box w='96%' margin='1% auto auto auto'>
        <Box h='80px'>
          <Flex justifyContent='space-between' alignItems='center' h='100%'>
            <Text fontSize='2xl' as='b' color='greenPigment.100'>Monitoramento de Assets</Text>
            <Box width='30%'>
              <form>
                <Flex justifyContent='space-between' gap={5} alignItems='center'>
                  <Input bg='white' focusBorderColor="greenPigment.100" placeholder="Selecione o Digital Twin" width='60%'/>
                  <Button bg='white' variant='outline' colorScheme="teal" size='md'>Cancelar</Button>
                  <Button bg='greenPigment.100' color='white' size='md' sx={{
                    "&:hover": {
                      bg: "mediumSeaGreen.100"
                    }
                  }}>Pesquisar</Button>
                </Flex>
              </form>
            </Box>
          </Flex>
        </Box>
        <Box boxShadow='md' bg='white' borderRadius='8px' h='732px' >
          <Flex gap={6} flexDirection='column' alignItems='center' justify='center' h='100%'>
            <Img w='500px' src={noDataLogo}></Img>
            <Text textStyle='justify' color='softgray.100'>Nenhum dado encontrado. Por favor, pesquise por um digital twin
              e em seguida, clique no botão 'Pesquisar' para continuar.</Text>
          </Flex>
        </Box>
      </Box>
    </>
  )
}