import React, {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {z} from "zod";
import {Badge, Box, Fieldset, Flex, Heading, HStack, Image, Input, Separator, Stack, Table} from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot
} from "../../../components/ui/pagination.tsx";
import {AssetAdministrationShellService} from "../../../services/asset-administration-shell.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {AASResponse} from "../../../interfaces/AssetAdministrationShell.ts";
import {Button} from "../../../components/ui/button.tsx";
import {ArrowFatLinesRight, MagnifyingGlass, Pencil, Plus, Trash} from "@phosphor-icons/react";
import {Tooltip} from "../../../components/ui/tooltip.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot
} from "../../../components/ui/drawer.tsx";
import logoImg from "../../../assets/logo.svg";
import {Field} from "../../../components/ui/field.tsx";
import {toaster} from "../../../components/ui/toaster.tsx";
import {
  aasFilterSchema,
  AASFiltersSchema,
  createAssetAdministrationShellForm,
  CreateAssetAdministrationShellForm
} from "../../../types/asset-administration-shell.ts";
import {format, parseISO} from 'date-fns';
import {useMonitoring} from "../../../hooks/useMonitoring.tsx";


export function AssetAdministrationShells() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [editingAAS, setEditingAAS] = React.useState<boolean | null>(false)
  const [creatingAAS, setCreatingAAS] = React.useState<boolean | null>(false)
  const aasService = new AssetAdministrationShellService()
  const { startMonitoringData } = useMonitoring()
  const search = searchParams.get('search')
  const aasId = searchParams.get('aas_id')
  const navigate = useNavigate()

  const {
    register,
    handleSubmit
  } = useForm<AASFiltersSchema>({
    resolver: zodResolver(aasFilterSchema),
    defaultValues: {
      search: search ?? ''
    }
  })

  const {
    register: registerAasField,
    handleSubmit: handleAasSubmit,
    reset,
    formState: {isSubmitting: isCreationAasSubmitting, errors}
  } = useForm<CreateAssetAdministrationShellForm>({
    resolver: zodResolver(createAssetAdministrationShellForm)
  })

  const page = z.coerce
    .number()
    .transform((page) => page)
    .parse(searchParams.get('page') ?? '1')

  const pageSize = z.coerce
    .number()
    .transform((page) => page)
    .parse(searchParams.get('page_size') ?? '10')

  const {data: result, isLoading: isLoadingAAS, refetch: refetchAAS} = useQuery({
    queryKey: ['asset-administration-shells', page, pageSize, search],
    queryFn: () => aasService.findAll({page, pageSize, search}),
  })

  const {data: resultSpecificAAS, refetch: refetchSpecificAAS} = useQuery({
    queryKey: ['asset-administration-shells'],
    queryFn: () => aasService.findById(aasId),
  })

  const { mutateAsync: createAAS } = useMutation({
    mutationFn: aasService.create,
    onSuccess: () => {
      refetchAAS()
      toaster.create({
        description: "Asset Administration Shell created successfully.",
        type: 'success',
        duration: 3000,
      });
    }
  })

  const { mutateAsync: updateAAS } = useMutation({
    mutationFn: ({id, data}) => aasService.updateById(id, data),
    onSuccess: () => {
      refetchAAS()
      toaster.create({
        description: "Asset Administration Shell updated successfully.",
        type: 'success',
        duration: 3000,
      });
    }
  })

  const { mutateAsync: deleteAAS } = useMutation({
    mutationFn: aasService.deleteById,
    onSuccess: () => {
      refetchAAS()
      toaster.create({
        description: "Asset Administration Shell deleted successfully.",
        type: 'success',
        duration: 3000,
      });
    }
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
      state.set('page', page.toString())

      return state
    })
  }

  function handlePageSize(pageSize: number) {
    setSearchParams((state) => {
      state.set('page_size', (pageSize).toString())

      return state
    })
  }

  function handleAASId(aasId: string) {
    setSearchParams((state) => {
      state.set('aas_id', aasId)
      return state
    })
  }

  useEffect(() => {
    if (editingAAS) {
      refetchSpecificAAS()
    }
  }, [editingAAS, refetchSpecificAAS]);

  useEffect(() => {
    if (editingAAS && resultSpecificAAS) {
      reset({
        idShort: resultSpecificAAS.payload.id_short,
        databaseEndpoint: resultSpecificAAS.payload.database_endpoint,
        host: resultSpecificAAS.payload.host,
        port: resultSpecificAAS.payload.port,
        aasModeling: resultSpecificAAS.payload.aas_modeling,
      });
    }
    else if (creatingAAS) {
      reset({
        idShort: '',
        databaseEndpoint: '',
        host: '',
        port: undefined,
        aasModeling: '',
      })
    }
  }, [editingAAS, creatingAAS, resultSpecificAAS, reset]);

  return (
    <Box w='96%' margin='1% auto auto auto'>
      <Stack width="full" gap="5">
        <Flex alignItems='center' justifyContent='space-between'>
          <Heading size="xl" fontSize='2xl' as='b' color='greenPigment.100'>Asset Administration Shells</Heading>
          <form onSubmit={handleSubmit(handleSearch)}>
            <Flex alignItems='center' gap={4}>
              <Input placeholder='Pesquisar...' {...register('search')}/>
              <Tooltip openDelay={100} closeDelay={100} showArrow content='Pesquisar'>
                <Button type='submit' disabled={isLoadingAAS} as='button' bg='greenPigment.100' color='white' onClick={() => null}>
                  <MagnifyingGlass size={32} weight="bold"/>
                </Button>
              </Tooltip>
              <DrawerRoot onInteractOutside={() => {
                setEditingAAS(false)
                setCreatingAAS(false)
              }} open={editingAAS || creatingAAS} placement='end' size='sm'>
                <DrawerBackdrop/>
                <Tooltip openDelay={100} closeDelay={100} showArrow content='Adicionar Asset Administration Shell'>
                  <Button onClick={() => setCreatingAAS(true)} as='button' bg='greenPigment.100' color='white'>
                    <Plus size={32} weight="bold"/>
                  </Button>
                </Tooltip>
                <DrawerContent>
                  <DrawerHeader p='32px 12px'>
                    <Image _hover={{
                      cursor: 'pointer'
                    }} onClick={() => navigate('/')} src={logoImg} w='90px' m='0 auto'/>
                  </DrawerHeader>
                  <DrawerBody p='0 12px'>
                    <form onSubmit={handleAasSubmit((data) => {
                      editingAAS ? updateAAS({id: aasId!, data}) : createAAS(data)
                    })}>
                      <Fieldset.Root size="lg" invalid>
                        <Fieldset.Legend>{`Asset Administration Shell ${editingAAS ? 'edition' : 'creation'}`}</Fieldset.Legend>
                        <Fieldset.Content>
                          <Field label="IdShort">
                            <Input placeholder="IdShort" {...registerAasField('idShort')} />
                          </Field>
                          <Field label="Database endpoint">
                            <Input placeholder="Database endpoint"  {...registerAasField('databaseEndpoint')}/>
                          </Field>
                          <Field label="Host">
                            <Input placeholder="Host" {...registerAasField('host')} />
                          </Field>
                          <Field label="Porta">
                            <Input type='number' placeholder="Porta" {...registerAasField('port', { valueAsNumber: true })} />
                          </Field>
                          <Field label="Moldeagem JSON">
                            <Input placeholder="Modelagem" {...registerAasField('aasModeling')} />
                          </Field>
                          <Button
                            // onClick={() => {
                            //   hasErrors && toaster.create({
                            //     description: 'Verifique os campos do formulário de login',
                            //     duration: 3000,
                            //     type: 'error',
                            //     placement: 'top'
                            //   })
                            // }}
                            type='submit'
                            disabled={isCreationAasSubmitting}
                            bg='greenPigment.100'
                            color='white'
                            size='lg'
                            _hover={{
                            bg: "mediumSeaGreen.100"
                          }}>
                            {editingAAS ? 'Editar' : 'Adicionar'}
                          </Button>
                        </Fieldset.Content>
                      </Fieldset.Root>
                    </form>
                  </DrawerBody>
                  <DrawerCloseTrigger />
                </DrawerContent>
              </DrawerRoot>
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
              <Table.ColumnHeader>Status</Table.ColumnHeader>
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
                <Table.Cell>{format(parseISO(item.created_at), 'dd/MM/yyyy HH:mm')}</Table.Cell>
                <Table.Cell>
                  <Badge size='lg' colorPalette={item.active ? 'green' : 'red'}>{item.active ? 'Online' : 'Offline'}</Badge>
                </Table.Cell>
                <Table.Cell>
                  <Flex alignItems='center' justifyContent='space-around'>
                    <Tooltip openDelay={100} closeDelay={100} showArrow content='Monitorar'>
                      <Button as='button' bg='blue.500' color='white' onClick={() => startMonitoringData()}>
                        <ArrowFatLinesRight size={32}/>
                      </Button>
                    </Tooltip>
                    <Separator orientation="vertical" height="6" size="md"/>
                    <Tooltip openDelay={100} closeDelay={100} showArrow content='Editar'>
                      <Button as='button' bg='greenPigment.100' color='white' onClick={() => {
                        setEditingAAS(true)
                        handleAASId(item.id)
                      }}>
                        <Pencil size={32}/>
                      </Button>
                    </Tooltip>
                    <Separator orientation="vertical" height="6" size="md"/>
                    <Tooltip openDelay={100} closeDelay={100} showArrow content='Deletar'>
                      <Button as='button' bg='red.500' color='white' onClick={() => {
                        return deleteAAS(item.id)
                      }}>
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
          count={result?.payload.total ?? 1}
          pageSize={pageSize}
          page={page}
          onPageChange={(e) => handlePaginate(e.page)}
          onPageSizeChange={(e) => handlePageSize(e.pageSize)}
        >
          <Flex alignItems='center'>
            <HStack wrap="wrap">
              <PaginationPrevTrigger/>
              <PaginationItems/>
              <PaginationNextTrigger/>
            </HStack>
          </Flex>
        </PaginationRoot>
      </Stack>
    </Box>
  )
}