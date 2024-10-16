import {Avatar, Text, Flex, Menu, MenuButton, MenuList, MenuItem, Button} from "@chakra-ui/react";
import { CaretDown } from "@phosphor-icons/react";
import {useQuery} from "@tanstack/react-query";
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext.tsx";
import {useAuthentication} from "../../hooks/useAuthentication.tsx";
import { Skeleton } from '@chakra-ui/react'

export function UserInfo() {

  const { getCurrentUser } = useContext(AuthContext)

  const { data: currentUser, isLoading: isLoadingCurrentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    staleTime: Infinity
  })

  const { handleLogOut } = useAuthentication()

  return (
    <>
      <Menu>
        <MenuButton bg='greenPigment.100' color='white' as={Button} rightIcon={<CaretDown />} sx={{
          "&:hover": {
            bg: 'greenPigment.100'
          }
        }}>
          <Skeleton isLoaded={!isLoadingCurrentUser}>
            <Flex gap={2.5} alignItems='center' justifyContent='space-between'>
              <Avatar size='sm' src="https://bit.ly/dan-abramov" />
              <Text color='white'>{currentUser?.username}</Text>
            </Flex>
          </Skeleton>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleLogOut()}>Sair</MenuItem>
          <MenuItem>Editar perfil</MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}