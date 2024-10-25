import { Card, Text, Image, Flex, Button, Box, Fieldset } from '@chakra-ui/react'
import logoImg from '../../assets/logo.svg'
import { Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { signInForm, SignInForm } from '../../types/authentication'
import { useAuthentication } from '../../hooks/useAuthentication'
import { zodResolver } from '@hookform/resolvers/zod'
import {toaster} from "../../components/ui/toaster.tsx";
import {Field} from "../../components/ui/field.tsx";

export function SignIn() {
  const { handleSignIn } = useAuthentication()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm)
  })

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Card.Root w='24.5rem' h='32rem' borderRadius='8px' boxShadow='base'>
      <Card.Header marginTop='1.063rem'>
        <Flex alignItems='center' justifyContent='center'>
          <Image src={logoImg} />
        </Flex>
      </Card.Header>
      <Card.Body p='0'>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <Fieldset.Root marginTop='34px'>
            <Fieldset.Content>
              <Field m='0 auto' w='92%' label='E-mail' invalid={!!errors.email}>
                <Input
                  focusBorderColor='mediumSeaGreen.100' type='email'
                  placeholder='ex: usuario@email.com.br'
                  {...register('email')} />
                {
                  !errors.email ? (<Fieldset.HelperText></Fieldset.HelperText>) : (
                    <Fieldset.ErrorText>{errors.email?.message}</Fieldset.ErrorText>
                  )
                }
              </Field>
              <Field m='0 auto' w='92%' label='Senha' invalid={!!errors.password}>
                <Input focusBorderColor='mediumSeaGreen.100' type='password' placeholder='Digite sua senha' {...register('password')} />
                {
                  !errors.password ? (<Fieldset.HelperText></Fieldset.HelperText>) : (
                    <Fieldset.ErrorText>{errors.password?.message}</Fieldset.ErrorText>
                  )
                }
              </Field>
              <Button
                w='92%'
                m='0 auto'
                onClick={() => {
                hasErrors && toaster.create({
                  description: 'Verifique os campos do formulário de login',
                  duration: 3000,
                  type: 'error',
                  placement: 'top'
                })
              }} type='submit' disabled={isSubmitting} bg='greenPigment.100' color='white' size='lg' _hover={{
                bg: "mediumSeaGreen.100"
              }}>
                Login
              </Button>
              <Text
                textAlign='center'
                _hover={{
                cursor: 'pointer',
                textDecoration: 'underline'
              }}>Esqueceu a senha?</Text>
            </Fieldset.Content>
          </Fieldset.Root>
        </form>
      </Card.Body>
    </Card.Root>
  )
}