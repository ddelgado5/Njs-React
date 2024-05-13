import { Form, Input, Modal, Flex, DatePicker } from 'antd';
import { EmpleadoDto } from "../dtos/empleado";
import { ActionButtons } from "./ActionButtons"
import dayjs from 'dayjs'

dayjs().format()


type UserFormProps = {
  isOpen: boolean;
  handleOk: (empleado: EmpleadoDto) => void;
  handleCancel: () => void;

  // edit
  nombre?: string;
  apellido?: string;
  fechaNacimiento?: Date,
  sexo?: string,
  fechaIngreso? : Date,
  estrato?: number,
};

type FieldType = {
  nombre?: string;
  apellido?: string;
  fechaNacimiento?: Date,
  sexo?: string,
  fechaIngreso? : Date,
  estrato?: number,
};

export function UserForm({
  isOpen,
  handleOk,
  handleCancel,
  nombre,
  apellido,
  fechaNacimiento,
  sexo,
  fechaIngreso,
  estrato
}: UserFormProps) {

  const [form] = Form.useForm();

  const handleOnCancel = () => {
    form.resetFields()
    handleCancel()
}

  return (
    <>      
    <Modal
      title={nombre ? "Editar Empleado": "Crear Empleado"}
      open={isOpen}
      onCancel={handleOnCancel}
      footer={<></>}
    >
      <Form
        name={nombre ? "Editar Empleado": "Crear Empleado"}
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          nombre,
          apellido,
          fechaNacimiento: fechaNacimiento ? dayjs(fechaNacimiento): fechaNacimiento,
          sexo,
          fechaIngreso: fechaIngreso ? dayjs(fechaIngreso): fechaIngreso,
          estrato
        }}
        onFinish={(empleado) => {
          const {
            nombre,
            apellido,
            fechaNacimiento,
            sexo,
            fechaIngreso,
            estrato
          } = empleado
          if(!nombre || !apellido || !fechaNacimiento || !sexo || !fechaIngreso || !estrato) {
            return
          }
          handleOk(empleado)
          handleOnCancel()
          
        }}
        onFinishFailed={() => {}}
        autoComplete="off"
      >

        <Form.Item<FieldType>
          label="Nombre"
          name="nombre"
          rules={[{ required: true, message: 'Este campo es requerido' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Apellido"
          name="apellido"
          rules={[{ required: true, message: 'Este campo es requerido' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Fecha de nacimiento"
          name="fechaNacimiento"
          rules={[{ required: true, message: 'Este campo es requerido' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item<FieldType>
          label="Sexo"
          name="sexo"
          rules={[{ required: true, message: 'Este campo es requerido' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Fecha de ingreso"
          name="fechaIngreso"
          rules={[{ required: true, message: 'Este campo es requerido' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item<FieldType>
          label="Estrato"
          name="estrato"
          rules={[{ required: true, message: 'Este campo es requerido' },
          { 
            validator: (_, value) => {
              if (value >= 0) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Por favor ingresa un número positivo'));
            }
          }
          ]}
        >
          <Input type='number' />
        </Form.Item>

        <Flex gap={"1rem"} justify="flex-end" style={{ padding: "0.2rem 0.3rem 0rem 0.3rem" }}>
          <ActionButtons nombre={nombre} onClose={handleOnCancel} />
        </Flex>
      </Form>
    </Modal>
    </>
  );
}
