const rtaOk = ({status, message, data})=>{

    return {state: true, status: status ?? 200, message: message ?? "OK", data}
}

const rtaCrear = ({status, message, data})=>{

    return {state: true, status: status ?? 201, message: message ?? "Bien, registro creado correctamente", data}
}

const rtaErrorServidor = ({status, message})=>{

    return {state: false, status: status ?? 500, message: message ?? "Ups!, Ha ocurrido un error en el servidor, vuelve a intentarlo más tarde"}
}

const rtaNoEncontro = ({status, message})=>{

    return {state: false, status: status ?? 400, message: message ?? "Ups!, Registro no encontrado"}
}

const rtaEliminar = ({status, message})=>{

    return {state: true, status: status ?? 200, message: message ?? "Bien, registro eliminado correctamente"}
}

const rtaActualizar = ({status, message, data})=>{

    return {state: true, status: status ?? 200, message: message ?? "Empleado actualizado correctamente", data}
}
module.exports = {rtaOk, rtaErrorServidor, rtaCrear, rtaNoEncontro, rtaEliminar, rtaActualizar}