import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "../ui/drawer.tsx"
import logoMiniWhite from '../../assets/logo_mini_white.svg'
import {UserInfo} from "./UserInfo"
import {AddressBook, Binary, List, LockSimpleOpen, Users} from '@phosphor-icons/react'
import logoImg from '../../assets/logo.svg'
import {useNavigate} from "react-router-dom";
import {Box, Flex, Image, StackSeparator, VStack} from "@chakra-ui/react";
import {Button} from "../ui/button.tsx";

export function Header() {

  const navigate = useNavigate()

  // paddingLeft='40px' paddingRight='40px'
  return (
    <Box height='60px' minW='100vw' bg='greenPigment.100'>
      <Flex justifyContent='space-between' alignItems='center' alignSelf='center' h='100%' w='96%' margin='0 auto'>
        <DrawerRoot
          placement='start'
        >
          <DrawerBackdrop/>
          <DrawerTrigger>
              <Button variant='outline' bg='greenPigment.100' color='white' css={{
                "&:hover": {
                  bg: "mediumSeaGreen.100"
                }
              }}>
                <List size={25}/>
              </Button>
            </DrawerTrigger>

            <DrawerContent>
              <DrawerHeader p='32px 12px'>
                <Image _hover={{
                  cursor: 'pointer'
                }} onClick={() => navigate('/')} src={logoImg} w='90px' m='0 auto'/>
              </DrawerHeader>
              <DrawerBody p='0 12px'>
                <VStack
                  separator={<StackSeparator borderColor='gray.200'/>}
                  align='stretch'
                >
                  <Box onClick={() => navigate('/users')} transition='0.3S ease' p='0 5px' h='40px' css={{
                    "&:hover": {
                      cursor: "pointer",
                      bg: "greenPigment.100",
                      color: 'white',
                      borderRadius: '5px',
                    }
                  }
                  }>
                    <Flex height='100%' alignItems='center' textAlign='center' justifyContent='space-between'>
                      <Box>Usuários</Box>
                      <Users size={30}/>
                    </Flex>
                  </Box>
                  <Box transition='0.3S ease' p='0 5px' h='40px' css={{
                    "&:hover": {
                      cursor: "pointer",
                      bg: "greenPigment.100",
                      color: 'white',
                      borderRadius: '5px',
                    }
                  }
                  }>
                    <Flex height='100%' alignItems='center' textAlign='center' justifyContent='space-between'>
                      <Box>Permissões</Box>
                      <LockSimpleOpen size={30}/>
                    </Flex>
                  </Box>
                  <Box transition='0.3S ease' p='0 5px' h='40px' css={{
                    "&:hover": {
                      cursor: "pointer",
                      bg: "greenPigment.100",
                      color: 'white',
                      borderRadius: '5px',
                    }
                  }
                  }>
                    <Flex height='100%' alignItems='center' textAlign='center' justifyContent='space-between'>
                      <Box>Cargos</Box>
                      <AddressBook size={30}/>
                    </Flex>
                  </Box>
                  <Box onClick={() => navigate('/asset-administration-shells')} transition='0.3S ease' p='0 5px' h='40px' css={{
                    "&:hover": {
                      cursor: "pointer",
                      bg: "greenPigment.100",
                      color: 'white',
                      borderRadius: '5px',
                    }
                  }
                  }>
                    <Flex height='100%' alignItems='center' textAlign='center' justifyContent='space-between'>
                      <Box>Asset Administration Shells</Box>
                      <Binary size={30}/>
                    </Flex>
                  </Box>
                </VStack>
              </DrawerBody>

              <DrawerCloseTrigger />
            </DrawerContent>
        </DrawerRoot>
        <Image _hover={{
          cursor: 'pointer'
        }} onClick={() => navigate('/')} objectFit='contain' w='50px' h='50px' src={logoMiniWhite}/>
        <UserInfo/>
      </Flex>
    </Box>
  )
}