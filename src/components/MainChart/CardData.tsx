import { Box, Divider, Flex } from "@chakra-ui/react";
import { Heading } from '@chakra-ui/react'
import React from "react";

interface CardDataProps {
  title: string
  children: React.ReactNode
  isCahrt?: boolean
}

export function CardData({ title, children, isCahrt = false }: CardDataProps) {
  return (
    <Box p='15px'boxShadow='md' h='100%' bg='white' borderRadius='8px'>
      <Heading as='h1' size='md' color='greenPigment.100'>{title}</Heading>
      <Divider m='10px 0' />
      <Flex h={isCahrt ? '93%' : '85%'} justifyContent='center' alignItems='center' alignSelf='center' flexDirection='column'>
        <Box>
          {children}
        </Box>
      </Flex>
    </Box>
  )
}