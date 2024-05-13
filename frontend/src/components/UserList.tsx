import { Space, Table, Button, Popconfirm } from 'antd';
import { useState } from "react"
import { EditOutlined, DeleteFilled } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { UserForm } from './UserForm';
import { EmpleadoDto, Empleado } from '../dtos/empleado';
import { DATE_FORMAT } from "../utilidades"
import dayjs from 'dayjs'

dayjs().format()


type UserListProps = {
  data: Empleado[]
  onUpdateEmpleado: (empleado: Empleado) => void
  onDeleteEmpleado: (id: string) => void
}

export function UserList({ data, onUpdateEmpleado, onDeleteEmpleado }: UserListProps) {

  const [showModal, setShowModal] = useState(false)
  const [employeeSeleted, setEmpleyeeSelected] = useState<Partial<Empleado>>({})

  const handleSelect = (employee: Empleado) => {
    // conteoRecursivo(employee)
    setShowModal(true)
    setEmpleyeeSelected(employee)
  }

  const handleUpdate = (empleadoDto: EmpleadoDto) => {
    onUpdateEmpleado({
      ...empleadoDto,
      _id: employeeSeleted._id as string
    })
  }

  const handleDelete = (employee: Empleado) => {
    onDeleteEmpleado(employee._id)
  }
  
  
  // type ContarLetras = {[letras: string]: number};
  // function conteoRecursivo(employee: Empleado): ContarLetras{
  //   const count: ContarLetras = {};
  //   const unirDatos = employee.nombre.toUpperCase() + employee.apellido.toUpperCase();
    
  //   employee.cantidad = {};
  //   for (const letra of unirDatos) {
  //     count[letra] = (count[letra] || 0) + 1;
  //     employee.cantidad = count
  //   }
  //   return count;
  // }

  const columns: TableProps<Empleado>['columns'] = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Apellido',
      dataIndex: 'apellido',
      key: 'apellido',
    },
    {
      title: 'Fecha de nacimiento',
      dataIndex: 'fechaNacimiento',
      key: 'fechaNacimiento',
      render: (fechaNacimiento: Date) => {
        const fNacimiento = dayjs(fechaNacimiento).format(DATE_FORMAT)
        const edad = dayjs().diff(dayjs(fechaNacimiento), 'year')

      return <p>
        {fNacimiento} ---EDAD:  {edad}
      </p>
      
      },
    },
    {
      title: 'Sexo',
      dataIndex: 'sexo',
      key: 'sexo',
    },
    {
      title: 'Fecha de ingreso',
      dataIndex: 'fechaIngreso',
      key: 'fechaIngreso',
      render: (fechaIngreso: Date) => {
        const dateParsed = dayjs(fechaIngreso).format(DATE_FORMAT)
      return <p>
        {dateParsed}
      </p>
      }
    },
    {
      title: 'Estrato',
      dataIndex: 'estrato',
      key: 'estrato',
    },
    {
      title: 'Cantidad de letras',
      dataIndex: 'cantidad',
      key: 'cantidad',
    },
    {
      title: 'Opciones',
      dataIndex: '_id',
      key: '_id',
      render: (_, employee) => 
      <Space size="middle">
        <Button onClick={() => handleSelect(employee)}  type="primary" shape="circle" icon={<EditOutlined />} size={"small"} />
        <Popconfirm
          title="¿Estás seguro de eliminar este empleado?"
          onConfirm={() => handleDelete(employee)}
          okText="Sí"
          cancelText="No"
        >
          <Button style={{ color: 'red' }} shape="circle" size="small"  icon={<DeleteFilled />} />
        </Popconfirm>
      </Space>

    ,
    },
  ];

  return <>
      <Table columns={columns} dataSource={data.map(_ => ({..._, key: _._id}))} />
      { showModal ? 
        <UserForm isOpen={showModal} handleCancel={() => {
          setShowModal(false)
        }} {...employeeSeleted} handleOk={handleUpdate} />: null
      }
  </>;
}
