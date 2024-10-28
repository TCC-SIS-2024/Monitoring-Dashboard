import {useSearchParams} from "react-router-dom";
import {z} from "zod";
import {Box, Heading, HStack, Stack, Table} from "@chakra-ui/react";
import {ResponseUser} from "../../../interfaces/CurrentUser.ts";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot
} from "../../../components/ui/pagination.tsx";
import {AssetAdministrationShellService} from "../../../services/asset-administration-shell.ts";
import {useQuery} from "@tanstack/react-query";
import {AASResponse} from "../../../interfaces/AssetAdministrationShell.ts";

export function AssetAdministrationShells () {
  const [searchParams, setSearchParams] = useSearchParams()

  const aasService = new AssetAdministrationShellService()

  const page = z.coerce
    .number()
    .transform((page) => page)
    .parse(searchParams.get('page') ?? '1')

  const pageSize = z.coerce
    .number()
    .transform((page) => page)
    .parse(searchParams.get('page_size') ?? '10')

  const {data: result, isLoading: isLoadingAAS} = useQuery({
    queryKey: ['asset-administration-shells', page, pageSize],
    queryFn: () => aasService.findAll({page, pageSize}),
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
        <Heading size="xl">Asset Administration Shells</Heading>
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
              <Table.ColumnHeader>Ações</Table.ColumnHeader>
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