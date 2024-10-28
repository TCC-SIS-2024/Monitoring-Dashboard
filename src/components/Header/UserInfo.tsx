import {Text, Flex, Skeleton} from "@chakra-ui/react";
import {CaretDown} from "@phosphor-icons/react";
import {useQuery} from "@tanstack/react-query";
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext.tsx";
import {useAuthentication} from "../../hooks/useAuthentication.tsx";
import {MenuContent, MenuItem, MenuRoot, MenuTrigger} from "../ui/menu.tsx";
import {Button} from "../ui/button.tsx";
import {Avatar} from "../ui/avatar.tsx";

export function UserInfo() {

  const {getCurrentUser} = useContext(AuthContext)

  const {data: currentUser, isLoading: isLoadingCurrentUser} = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    staleTime: Infinity
  })

  const {handleLogOut} = useAuthentication()

  return (
      <MenuRoot>
        <MenuTrigger asChild>
          <Button bg='greenPigment.100' color='white' as={Button} _hover={{
            bg: 'greenPigment.100'
          }}>
            <Skeleton loading={isLoadingCurrentUser}>
              <Flex gap={2.5} alignItems='center' justifyContent='space-between'>
                <Avatar size='sm' src="https://bit.ly/dan-abramov"/>
                <Text color='white'>{currentUser?.username}</Text>
                <CaretDown size={30}/>
              </Flex>
            </Skeleton>
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem _hover={{
            cursor: 'pointer'
          }} value={''} onClick={() => handleLogOut()}>Sair</MenuItem>
          <MenuItem _hover={{
            cursor: 'pointer'
          }} value='sair'>Editar perfil</MenuItem>
        </MenuContent>
      </MenuRoot>
  )
}