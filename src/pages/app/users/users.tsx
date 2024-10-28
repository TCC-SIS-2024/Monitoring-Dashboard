import {
  Box, Flex,
  Heading, HStack, Separator,
  Stack,
  Table,
} from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot
} from "../../../components/ui/pagination.tsx";
import {UserService} from "../../../services/users.ts";
import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from 'react-router-dom'
import {z} from 'zod'
import {ResponseUser} from "../../../interfaces/CurrentUser.ts";
import {Button} from "../../../components/ui/button.tsx";
import {Pencil, Trash} from "@phosphor-icons/react";
import {Tooltip} from "../../../components/ui/tooltip.tsx";
import React from "react";

export function Users() {
  const [searchParams, setSearchParams] = useSearchParams()
  const usersService = new UserService()

  const page = z.coerce
    .number()
    .transform((page) => page)
    .parse(searchParams.get('page') ?? '1')

  const pageSize = z.coerce
    .number()
    .transform((page) => page)
    .parse(searchParams.get('page_size') ?? '10')

  const {data: result, isLoading: isLoadingUsers} = useQuery({
    queryKey: ['users', page, pageSize],
    queryFn: () => usersService.findAll({page, pageSize}),
  })

  function handlePaginate(page: number) {
    setSearchParams((state) => {
      state.set('page', (page + 1).toString())

      return state
    })
  }

  function handlePageSize(pageSize: number) {
    setSearchParams((state) => {
      state.set('page_size', (pageSize).toString())

      return state
    })
  }

  return (
    <Box w='96%' margin='1% auto auto auto'>
      <Stack width="full" gap="5">

        <Heading size="xl" fontSize='2xl' as='b' color='greenPigment.100'>Usuários</Heading>
        <Table.Root size="sm" variant="outline" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Id</Table.ColumnHeader>
              <Table.ColumnHeader>Nome do usuário</Table.ColumnHeader>
              <Table.ColumnHeader>E-mail</Table.ColumnHeader>
              <Table.ColumnHeader>Cargo</Table.ColumnHeader>
              <Table.ColumnHeader>Data de criação</Table.ColumnHeader>
              <Table.ColumnHeader textAlign='center'>Ações</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {result?.payload.data.map((item: ResponseUser) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.username}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>admin</Table.Cell>
                <Table.Cell>{item.created_at}</Table.Cell>
                <Table.Cell>
                  <Flex alignItems='center' justifyContent='space-around'>
                    <Tooltip openDelay={100} closeDelay={100} showArrow content='Editar'>
                      <Button as='button' bg='greenPigment.100' color='white' onClick={() => null}>
                        <Pencil size={32} />
                      </Button>
                    </Tooltip>
                    <Separator orientation="vertical" height="6" size="md" />
                    <Tooltip openDelay={100} closeDelay={100} showArrow content='Deletar'>
                      <Button as='button' bg='red.500' color='white' onClick={() => null}>
                        <Trash size={32} />
                      </Button>
                    </Tooltip>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <PaginationRoot
          defaultPage={1}
          count={result?.payload.total * pageSize}
          pageSize={pageSize}
          page={page}
          onPageChange={(e) => handlePaginate(e.page)}
          onPageSizeChange={(e) => handlePageSize(e.pageSize)}
        >
          <HStack wrap="wrap">
            <PaginationPrevTrigger/>
            <PaginationItems/>
            <PaginationNextTrigger/>
          </HStack>
        </PaginationRoot>
      </Stack>
    </Box>
  )
}