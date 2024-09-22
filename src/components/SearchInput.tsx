import { Box, Button, Flex, Select } from "@chakra-ui/react"
import { MagnifyingGlass } from "@phosphor-icons/react"

export function SearchInput() {

  const options = [
    {
      label: 'AAS1', value: 'AAS1'
    },
    {
      label: 'opc.tcp://0.0.0.0:4840', value: 'opc.tcp://0.0.0.0:4840'
    },
    {
      label: 'AAS3', value: 'AAS3'
    }
  ]

  return (
    <Box width='30%'>
      <form>
        <Flex justifyContent='space-between' gap={5} alignItems='center'>
          <Select bg='white' focusBorderColor="greenPigment.100" placeholder="Selecione o Digital Twin" width='60%'>
            {options && options.map((opt) => {
              return (
                <option key={opt.label} value={opt.value}>{opt.label}</option>
              )
            })}
          </Select>
          {/* <Input bg='white' focusBorderColor="greenPigment.100" placeholder="Selecione o Digital Twin" width='60%' /> */}
          <Button bg='white' variant='outline' colorScheme="teal" size='md'>Cancelar</Button>
          <Button leftIcon={<MagnifyingGlass />} bg='greenPigment.100' color='white' size='md' sx={{
            "&:hover": {
              bg: "mediumSeaGreen.100"
            }
          }}>Pesquisar</Button>
        </Flex>
      </form>
    </Box>
  )
}