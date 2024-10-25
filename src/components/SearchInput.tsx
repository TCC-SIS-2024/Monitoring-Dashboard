import { Box, Button, Flex } from "@chakra-ui/react"
import { MagnifyingGlass } from "@phosphor-icons/react"
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./ui/select.tsx"
import { createListCollection } from "@chakra-ui/react"

export function SearchInput() {

  const options = createListCollection({
    items: [
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
  })

  return (
    <Box width='30%'>
      <form>
        <Flex justifyContent='space-between' gap={5} alignItems='center'>
          <SelectRoot collection={options} bg='white' focusBorderColor="greenPigment.100" placeholder="Selecione o Digital Twin" width='60%'>
            <SelectTrigger>
              <SelectValueText placeholder="Selecione o asset administration shell" />
            </SelectTrigger>
            <SelectContent>
              {options && options.items.map((opt) => (
                  <SelectItem _hover={{
                    cursor: 'pointer'
                  }} key={opt.label} item={opt}>{opt.label}</SelectItem>
                )
              )
              }
            </SelectContent>
          </SelectRoot>
          {/* <Input bg='white' focusBorderColor="greenPigment.100" placeholder="Selecione o Digital Twin" width='60%' /> */}
          <Button bg='white' variant='outline' colorScheme="teal" size='md'>Cancelar</Button>
          <Button bg='greenPigment.100' color='white' size='md' sx={{
            "&:hover": {
              bg: "mediumSeaGreen.100"
            }
          }}> <MagnifyingGlass /> Pesquisar</Button>
        </Flex>
      </form>
    </Box>
  )
}