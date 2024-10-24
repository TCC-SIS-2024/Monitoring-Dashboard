import {
  Box,
  Flex,
  Img,
  Drawer,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader, DrawerBody, Button, VStack, StackDivider, Image
} from "@chakra-ui/react"
import logoMiniWhite from '../../assets/logo_mini_white.svg'
import {UserInfo} from "./UserInfo"
import React from "react";
import {AddressBook, Binary, List, LockSimpleOpen, Users} from '@phosphor-icons/react'
import logoImg from '../../assets/logo.svg'

export function Header() {

  const {isOpen, onOpen, onClose} = useDisclosure()
  const btnRef = React.useRef()

  // paddingLeft='40px' paddingRight='40px'
  return (
    <Box height='60px' minW='100vw' bg='greenPigment.100'>
      <Flex justifyContent='space-between' alignItems='center' alignSelf='center' h='100%' w='96%' margin='0 auto'>
        <Button ref={btnRef} variant='outline' bg='greenPigment.100' color='white' onClick={onOpen} sx={{
          "&:hover": {
            bg: "mediumSeaGreen.100"
          }
        }}>
          <List size={25}/>
        </Button>
        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          placement='left'
          finalFocusRef={btnRef}
        >
          <DrawerOverlay/>
          <DrawerContent>
            <DrawerCloseButton/>
            <DrawerHeader p='32px 12px'>
              <Image src={logoImg} w='90px' m='0 auto'/>
            </DrawerHeader>
            <DrawerBody p='0 12px'>
              <VStack
                divider={<StackDivider borderColor='gray.200'/>}
                spacing={2}
                align='stretch'
              >
                <Box transition='0.3S ease' p='0 5px' h='40px' sx={{
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
                <Box transition='0.3S ease' p='0 5px' h='40px' sx={{
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
                <Box transition='0.3S ease' p='0 5px' h='40px' sx={{
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
                <Box transition='0.3S ease' p='0 5px' h='40px' sx={{
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
          </DrawerContent>
        </Drawer>
        <Img w='50px' h='50px' src={logoMiniWhite}/>
        <UserInfo/>
      </Flex>
    </Box>
  )
}