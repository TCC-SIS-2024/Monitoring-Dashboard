import {
  Box,
  CheckboxGroup,
  Fieldset,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Separator,
  Stack,
  Table,
} from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot
} from "../../../components/ui/pagination.tsx";
import {RoleService} from "../../../services/roles.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useNavigate, useSearchParams} from 'react-router-dom'
import {z} from 'zod'
import {Button} from "../../../components/ui/button.tsx";
import {MagnifyingGlass, Pencil, Plus, Trash} from "@phosphor-icons/react";
import {Tooltip} from "../../../components/ui/tooltip.tsx";
import {ResponseRole} from "../../../interfaces/Role.ts";
import {format, parseISO} from "date-fns";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "../../../components/ui/popover"
import {ResponsePermission} from "../../../interfaces/Permission.ts";
import {formatPermission} from "../../../utils/permission_formatter.ts";
import { List } from "@chakra-ui/react"
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
import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createRoleForm, CreateRoleForm, roleFilterSchema, RoleFiltersSchema} from "../../../types/role.ts";
import {toaster} from "../../../components/ui/toaster.tsx";
import {Checkbox} from "../../../components/ui/checkbox.tsx";

export function Roles() {
  const [searchParams, setSearchParams] = useSearchParams()
  const roleService = new RoleService()
  const [editingRole, setEditingRole] = React.useState<boolean | null>(false)
  const [creatingRole, setCreatingRole] = React.useState<boolean | null>(false)
  const navigate = useNavigate()
  const search = searchParams.get('search')

  const {
    register,
    handleSubmit
  } = useForm<RoleFiltersSchema>({
    resolver: zodResolver(roleFilterSchema),
    defaultValues: {
      search: search ?? ''
    }
  })

  const {
    register: registerRoleField,
    handleSubmit: handleRoleSubmit,
    reset,
    formState: {isSubmitting: isCreationRoleSubmitting, errors}
  } = useForm<CreateRoleForm>({
    resolver: zodResolver(createRoleForm)
  })

  const page = z.coerce
    .number()
    .transform((page) => page)
    .parse(searchParams.get('page') ?? '1')

  const pageSize = z.coerce
    .number()
    .transform((page) => page)
    .parse(searchParams.get('page_size') ?? '10')

  const {data: result, isLoading: isLoadingRoles, refetch: refetchRole} = useQuery({
    queryKey: ['roles', page, pageSize, search],
    queryFn: () => roleService.findAll({page, pageSize, search}),
  })

  const { mutateAsync: createRole } = useMutation({
    mutationFn: roleService.create,
    onSuccess: () => {
      refetchRole()
      toaster.create({
        description: "Role created successfully.",
        type: 'success',
        duration: 3000,
      });
    }
  })

  function handlePaginate(page: number) {
    setSearchParams((state) => {
      state.set('page', (page + 1).toString())

      return state
    })
  }

  function handleSearch({search}: RoleFiltersSchema) {
    setSearchParams((state) => {
      if (search) {
        state.set('search', search)
      } else {
        state.delete('search')
      }

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
          <Heading size="xl" fontSize='2xl' as='b' color='greenPigment.100'>Cargos</Heading>
          <form onSubmit={handleSubmit(handleSearch)}>
            <Flex alignItems='center' gap={4}>
              <Input placeholder='Pesquisar...' {...register('search')}/>
              <Tooltip openDelay={100} closeDelay={100} showArrow content='Pesquisar'>
                <Button type='submit' disabled={isLoadingRoles} as='button' bg='greenPigment.100' color='white' onClick={() => null}>
                  <MagnifyingGlass size={32} weight="bold"/>
                </Button>
              </Tooltip>
              <DrawerRoot onInteractOutside={() => {
                setEditingRole(false)
                setCreatingRole(false)
              }} open={editingRole || creatingRole} placement='end' size='sm'>
                <DrawerBackdrop/>
                <Tooltip openDelay={100} closeDelay={100} showArrow content='Adicionar Asset Administration Shell'>
                  <Button onClick={() => setCreatingRole(true)} as='button' bg='greenPigment.100' color='white'>
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
                    <form onSubmit={handleRoleSubmit((data) => {
                      editingRole ? null : createRole(data)
                    })}>
                      <Fieldset.Root size="lg" invalid>
                        <Fieldset.Legend>{`${editingRole ? 'Edição' : 'Criação'} de cargo`}</Fieldset.Legend>
                        <Fieldset.Content>
                          <Field label="Título">
                            <Input placeholder="admin, general..." {...registerRoleField('name')} />
                          </Field>
                          <CheckboxGroup defaultValue={["react"]} name="permission">
                            <Fieldset.Legend fontSize="sm" mb="2">
                              Selecione permissões
                            </Fieldset.Legend>
                            <Fieldset.Content>
                              <Checkbox value="react">React</Checkbox>
                              <Checkbox value="svelte">Svelte</Checkbox>
                              <Checkbox value="vue">Vue</Checkbox>
                              <Checkbox value="angular">Angular</Checkbox>
                            </Fieldset.Content>
                          </CheckboxGroup>
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
                            disabled={isCreationRoleSubmitting}
                            bg='greenPigment.100'
                            color='white'
                            size='lg'
                            _hover={{
                              bg: "mediumSeaGreen.100"
                            }}>
                            {editingRole ? 'Editar' : 'Adicionar'}
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
              <Table.ColumnHeader>Identificador</Table.ColumnHeader>
              <Table.ColumnHeader>Título</Table.ColumnHeader>
              <Table.ColumnHeader>Data de criação</Table.ColumnHeader>
              <Table.ColumnHeader>Permissões</Table.ColumnHeader>
              <Table.ColumnHeader textAlign='center'>Ações</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {result?.payload.data.map((item: ResponseRole) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{format(parseISO(item.created_at), 'dd/MM/yyyy HH:mm')}</Table.Cell>
                <Table.Cell>
                  <PopoverRoot>
                    <PopoverTrigger asChild>
                      <Button size="sm" variant="outline">
                        Visualizar Permissões
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverBody>
                        {item.permissions?.map((perm: ResponsePermission) => {
                          return (
                            <List.Root>
                              <List.Item>
                                {formatPermission(perm.value)}
                              </List.Item>
                            </List.Root>
                          )
                        })}
                      </PopoverBody>
                    </PopoverContent>
                  </PopoverRoot>
                </Table.Cell>
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
          count={result?.payload.total ?? 1}
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