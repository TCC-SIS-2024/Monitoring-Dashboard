import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { Heading } from '@chakra-ui/react'
import React from "react";
import { Database, Pulse } from '@phosphor-icons/react'

interface CardDataProps {
  title: string
  children: React.ReactNode
  isCahrt?: boolean
  isCurrentTemperature?: boolean
  isQtdAnomaly?: boolean
}

export function CardData({ title, children, isCurrentTemperature = false, isQtdAnomaly = false, isCahrt = false }: CardDataProps) {
  return (
    <Box p='15px' boxShadow='md' h='100%' bg='white' borderRadius='8px'>
      <Heading as='h1' size='md' color='greenPigment.100'>{title}</Heading>
      <Divider m='10px 0' />
      <Flex h={isCahrt ? '93%' : '70%'} justifyContent='center' alignItems='center' alignSelf='center' flexDirection='column'>
        {children}
      </Flex>
      {!isCahrt && (
        <>
          <Divider m='10px 0' />
          <Flex alignItems='center' gap={2}>
            {isCurrentTemperature && (
              <>
                <Database color="#0FA968" size={30} />
                <Text>Digital Twin se encontra em boas condições de armazenamento.</Text>
              </>
            )}

            {isQtdAnomaly && (
              <>
                <Pulse color="#0FA968" size={30} />
                <Text>Não foram encontradas anomalias.</Text>
              </>
            )}
          </Flex>
        </>
      )}
    </Box>
  )
}