
export interface EmpleadoDto {
    nombre: string;
    apellido: string
    fechaNacimiento: Date;
    sexo: string
    fechaIngreso: Date;
    estrato: number
}

export interface Empleado extends EmpleadoDto {
    _id: string;
    cantidad?: Record<string, number>;
}