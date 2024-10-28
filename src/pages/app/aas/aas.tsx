import React from "react";
import {useSearchParams} from "react-router-dom";
import {z} from "zod";
import {Box, Flex, Heading, HStack, Input, Separator, Stack, Table} from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot
} from "../../../components/ui/pagination.tsx";
import {AssetAdministrationShellService} from "../../../services/asset-administration-shell.ts";
import {useQuery} from "@tanstack/react-query";
import {AASResponse} from "../../../interfaces/AssetAdministrationShell.ts";
import {Button} from "../../../components/ui/button.tsx";
import {ArrowFatLinesRight, MagnifyingGlass, Pencil, Plus, Trash} from "@phosphor-icons/react";
import {Tooltip} from "../../../components/ui/tooltip.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const aasFilterSchema = z.object({
  search: z.string().optional()
})

type AASFiltersSchema = z.infer<typeof aasFilterSchema>

export function AssetAdministrationShells() {
  const [searchParams, setSearchParams] = useSearchParams()
  const aasService = new AssetAdministrationShellService()
  const search = searchParams.get('search')

  const {register, handleSubmit} = useForm<AASFiltersSchema>({
    resolver: zodResolver(aasFilterSchema),
    defaultValues: {
      search: search ?? ''
    }
  })

  const page = z.coerce
    .number()
    .transform((page) => page)
    .parse(searchParams.get('page') ?? '1')

  const pageSize = z.coerce
    .number()
    .transform((page) => page)
    .parse(searchParams.get('page_size') ?? '10')

  const {data: result, isLoading: isLoadingAAS} = useQuery({
    queryKey: ['asset-administration-shells', page, pageSize, search],
    queryFn: () => aasService.findAll({page, pageSize, search}),
  })

  function handleSearch({search}: AASFiltersSchema) {
    setSearchParams((state) => {
      if (search) {
        state.set('search', search)
      } else {
        state.delete('search')
      }

      return state
    })
  }

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
        <Flex alignItems='center' justifyContent='space-between'>
          <Heading size="xl" fontSize='2xl' as='b' color='greenPigment.100'>Asset Administration Shells</Heading>
          <form onSubmit={handleSubmit(handleSearch)}>
            <Flex alignItems='center' gap={4}>
              <Input focusBorderColor='mediumSeaGreen.100' placeholder='Pesquisar...' {...register('search')}/>
              <Tooltip openDelay={100} closeDelay={100} showArrow content='Pesquisar'>
                <Button type='submit' disabled={isLoadingAAS} as='button' bg='greenPigment.100' color='white' onClick={() => null}>
                  <MagnifyingGlass size={32} weight="bold"/>
                </Button>
              </Tooltip>
              <Tooltip openDelay={100} closeDelay={100} showArrow content='Adicionar Asset Administration Shell'>
                <Button as='button' bg='greenPigment.100' color='white' onClick={() => null}>
                  <Plus size={32} weight="bold"/>
                </Button>
              </Tooltip>
            </Flex>
          </form>
        </Flex>
        <Table.Root size="sm" variant="outline" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Id</Table.ColumnHeader>
              <Table.ColumnHeader>IdShort</Table.ColumnHeader>
              <Table.ColumnHeader>Database endpoint</Table.ColumnHeader>
              <Table.ColumnHeader>Modelagem JSON</Table.ColumnHeader>
              <Table.ColumnHeader>host</Table.ColumnHeader>
              <Table.ColumnHeader>porta</Table.ColumnHeader>
              <Table.ColumnHeader>Data de criação</Table.ColumnHeader>
              <Table.ColumnHeader textAlign='center'>Ações</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {result?.payload.data.map((item: AASResponse) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.id_short}</Table.Cell>
                <Table.Cell>{item.database_endpoint}</Table.Cell>
                <Table.Cell>{item.aas_modeling}</Table.Cell>
                <Table.Cell>{item.host}</Table.Cell>
                <Table.Cell>{item.port}</Table.Cell>
                <Table.Cell>{item.created_at}</Table.Cell>
                <Table.Cell>
                  <Flex alignItems='center' justifyContent='space-around'>
                    <Tooltip openDelay={100} closeDelay={100} showArrow content='Monitorar'>
                      <Button as='button' bg='blue.500' color='white' onClick={() => null}>
                        <ArrowFatLinesRight size={32}/>
                      </Button>
                    </Tooltip>
                    <Separator orientation="vertical" height="6" size="md"/>
                    <Tooltip openDelay={100} closeDelay={100} showArrow content='Editar'>
                      <Button as='button' bg='greenPigment.100' color='white' onClick={() => null}>
                        <Pencil size={32}/>
                      </Button>
                    </Tooltip>
                    <Separator orientation="vertical" height="6" size="md"/>
                    <Tooltip openDelay={100} closeDelay={100} showArrow content='Deletar'>
                      <Button as='button' bg='red.500' color='white' onClick={() => null}>
                        <Trash size={32}/>
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