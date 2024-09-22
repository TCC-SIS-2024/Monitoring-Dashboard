import { Box, Flex, Img } from "@chakra-ui/react"
import logoMiniWhite from '../../assets/logo_mini_white.svg'
import { UserInfo } from "./UserInfo"

export function Header() {

  // paddingLeft='40px' paddingRight='40px'
  return (
    <Box height='60px' minW='100vw' bg='greenPigment.100'>
      <Flex justifyContent='space-between' alignItems='center' alignSelf='center' h='100%' w='96%' margin='0 auto'>
        <Img w='50px' h='50px' src={logoMiniWhite} />
        <UserInfo />
      </Flex>
    </Box>
  )
}