import { Card, CardHeader, CardBody, CardFooter, Text, Image, Flex, Button, FormControl, FormLabel, Box, FormErrorMessage, FormHelperText } from '@chakra-ui/react'
import logoImg from '../../assets/logo.svg'
import { Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { signInForm, SignInForm } from '../../types/authentication'
import { useAuthentication } from '../../hooks/useAuthentication'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@chakra-ui/react'

export function SignIn() {
  const { handleSignIn } = useAuthentication()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm)
  })

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Card w='24.5rem' h='32rem' borderRadius='8px' boxShadow='base'>
      <CardHeader marginTop='1.063rem'>
        <Flex alignItems='center' justifyContent='center'>
          <Image src={logoImg} />
        </Flex>
      </CardHeader>
      <CardBody padding='0'>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <Flex gap='4' alignItems='center' justifyContent='center' flexDirection='column'>
            <Box>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>E-mail</FormLabel>
                <Input
                  focusBorderColor='mediumSeaGreen.100' type='email'
                  placeholder='ex: usuario@email.com.br' w='222px'
                  {...register('email')} />
                {
                  !errors.email ? (<FormHelperText></FormHelperText>) : (
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                  )
                }
              </FormControl>
            </Box>
            <Box>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Senha</FormLabel>
                <Input focusBorderColor='mediumSeaGreen.100' type='password' placeholder='Digite sua senha' w='222px' {...register('password')} />
                {
                  !errors.password ? (<FormHelperText></FormHelperText>) : (
                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                  )
                }
              </FormControl>
            </Box>
            <Button onClick={() => {
              hasErrors && toast({
                description: 'Verifique os campos do formulário de login',
                duration: 3000,
                status: 'error',
                position: 'top'
              })
            }} type='submit' disabled={isSubmitting} bg='greenPigment.100' color='white' size='lg' sx={{
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
        </form>
      </CardBody>
    </Card>
  )
}