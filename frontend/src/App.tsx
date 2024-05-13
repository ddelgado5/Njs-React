import { useEffect, useState } from 'react'
import { UserList } from './components/UserList';
import { Button, message, Layout, Flex } from 'antd';
import { UserForm } from './components/UserForm';
import { PlusCircleOutlined } from '@ant-design/icons';

import './App.css'
import { findAllEmpleados, updateEmpleado, addEmpleado, deleteEmpleado } from './services/EmpleadoService';
import { Empleado, EmpleadoDto } from './dtos/empleado';
import { headerStyle, contentStyle, footerStyle, layoutStyle } from "./App.styles"

function App() {
  const [showModal, setShowModal] = useState(false);
  const [empleados, setEmpleados] = useState<Empleado[]>([])
  const [messageApi, contextHolder] = message.useMessage();
  const { Header, Footer, Content } = Layout;


  const handleClose = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const onCreate = async (empleado: EmpleadoDto) => {
    const resp = await addEmpleado(empleado)
    if(!resp.state) {
      messageApi.error(resp.message);
      return;
    }

    getEmpleados()
  }

  const onUpdate = async (empleado: Empleado) => {
    const resp = await updateEmpleado(empleado._id, empleado)
    if(!resp.state) {
      messageApi.error(resp.message);
      return;
    }

    getEmpleados()
  }

  const onDelete = async (id: string) => {
    if (!id) return;

    const resp = await deleteEmpleado(id)
    if(!resp.state) {
      messageApi.error(resp.message);
      return;
    }
    getEmpleados()
  }

  const getEmpleados = async () => {
    const data = await findAllEmpleados();
    if(!data.state) {
      messageApi.error(data.message);
      return;
    }

    setEmpleados(data.data)
};

useEffect(() => {
  const fetchData = () => {
    getEmpleados(); 
  }

  fetchData()
}, []);

  return (
    <>
    <Layout style={layoutStyle}>
    <Flex align="space-between" vertical>
      <Header style={headerStyle}>Prueba técnica de Salud Electrónica</Header>
      <Flex justify="flex-end" style={{ width: "100%", margin: "1.5rem 0rem", display: "flex", padding: "0rem 1rem" }}>
        <Button type="primary" onClick={handleOpenModal} shape="round" icon={<PlusCircleOutlined />} >Crear Usuario</Button>
      </Flex>
      <Layout>        
        <Content style={contentStyle}>
          <UserForm isOpen={showModal} handleCancel={handleClose} handleOk={onCreate} />          
          <UserList data={empleados} onUpdateEmpleado={onUpdate} onDeleteEmpleado={onDelete} />          
        </Content>
      </Layout>
      <Flex style={{ position: "absolute", bottom: 0, width: "100%"}}>
        <Footer style={footerStyle}>By: Diana Paola Delgado </Footer>
      </Flex>
    </Flex>
    </Layout>
      {contextHolder}
      
    </>
  );
}

export default App;
