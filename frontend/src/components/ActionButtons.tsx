import { Button, Form } from 'antd';

type ActionButtonProps = {
    onClose: () => void
    nombre?: string
}

function ActionButtons({ onClose, nombre }: ActionButtonProps) {     
    return (
        <>
            <Form.Item>
                <Button onClick={onClose}>Cancelar</Button>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {nombre ? "Editar ": "Crear "} Empleado
                </Button>
            </Form.Item>
          </>
    )
}

export { ActionButtons }