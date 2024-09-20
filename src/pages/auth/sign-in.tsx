import { Card, CardHeader, CardBody, CardFooter, Text, Image, Flex, Button } from '@chakra-ui/react'
import logoImg from '../../assets/logo.svg'
import { Input } from '@chakra-ui/react'

export function SignIn() {
  return (
    <Card w='24.5rem' h='28rem' borderRadius='8px' boxShadow='base'>
      <CardHeader marginTop='1.063rem'>
        <Flex alignItems='center' justifyContent='center'>
          <Image src={logoImg} />
        </Flex>
      </CardHeader>
      <CardBody padding='0'>
        <Flex gap='5' alignItems='center' justifyContent='center' flexDirection='column'>
          <Flex flexDirection='column'>
            <Text as='b'>E-mail</Text>
            <Input type='email' placeholder='ex: usuario@email.com.br' w='222px' />
          </Flex>
          <Flex flexDirection='column'>
            <Text as='b'>Senha</Text>
            <Input type='password' placeholder='Digite sua senha' w='222px' />
          </Flex>
          <Button bg='greenPigment.100' color='white' size='lg' sx={{
            "&:hover": {
              bg: "mediumSeaGreen.100"
            }
          }}>
            Login
          </Button>
          <Text sx={{
            "&:hover": {
              cursor: 'pointer',
              textDecoration: 'underline'
            }
          }}>Esqueceu a senha?</Text>
        </Flex>
      </CardBody>
    </Card>
  )
}