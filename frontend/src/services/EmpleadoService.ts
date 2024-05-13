import axios from 'axios';
import {EmpleadoDto, Empleado} from "../dtos/empleado";
import {ResponseType} from "../dtos/comun"

const url =import.meta.env.VITE_API_URL;

// GET - Consultar todos los empleados
const findAllEmpleados = async () => {
    const response = await axios.get<ResponseType<Empleado[]>>(`${url}/empleados`);
    return response.data;
};

// GET - Consultar empleado por ID
const findById = async (id: string) => {
    const response = await axios.get<ResponseType<Empleado>>(`${url}/empleados/${id}`);
    return response.data;
};

// POST - Agregar empleado
const addEmpleado = async (empleadoData: EmpleadoDto) => {
    const response = await axios.post<ResponseType<Empleado>>(`${url}/empleado`, empleadoData);
    return response.data;
};

// PUT - Actualizar empleado
const updateEmpleado = async (id: string, empleadoData: EmpleadoDto) => {
    const response = await axios.put<ResponseType<Empleado>>(`${url}/empleado/${id}`, empleadoData);
    return response.data;
}

// DELETE - Borrar empleado
const deleteEmpleado = async (id: string) => {
    const response = await axios.delete(`${url}/empleado/${id}`);
    return response.data;
};

export { findAllEmpleados , findById , addEmpleado , updateEmpleado , deleteEmpleado };