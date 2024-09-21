import { Avatar, Text, Flex, Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { CaretDown } from "@phosphor-icons/react";

export function UserInfo() {
  return (
    <>
      <Menu>
        <MenuButton bg='greenPigment.100' color='white' as={Button} rightIcon={<CaretDown />} sx={{
          "&:hover": {
            bg: 'greenPigment.100'
          }
        }}>
          <Flex gap={2.5} alignItems='center' justifyContent='space-between'>
            <Avatar size='sm' src="https://bit.ly/dan-abramov" />
            <Text color='white'>Ely Rabelo</Text>
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem>Sair</MenuItem>
          <MenuItem>Editar perfil</MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}