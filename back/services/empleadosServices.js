const Empleados = require('../models/empleado.js');
const {rtaNoEncontro, rtaErrorServidor, rtaOk, rtaCrear, rtaActualizar, rtaEliminar} = require('../utils.js')

//GET - consultar todos los empleados
findAllEmpleados = async function (req, res) {
    const empleadosAux = await Empleados.find();
    const empleados = empleadosAux.map((item) => {
        return {
            _id: item.id,
            nombre: item.nombre,
            apellido: item.apellido,
            fechaNacimiento: item.fechaNacimiento,
            sexo: item.sexo,
            fechaIngreso: item.fechaIngreso,
            estrato: item.estrato,
            cantidad: item.cantidad
        }
    })
    try{
        return res.status(200).json(rtaOk({
            data:empleados 
        }));
    }catch{
        return res.status(500).json(rtaErrorServidor())
    }
    
};

//GET - consultar por el Id de empleado
findById = async function (req, res) {
    let id = req.params.id;
    try{
        const empleado =await Empleados.findById(id);
        if(!empleado){
            return res.status(400).json(rtaNoEncontro({status:400}));
        }
        return res.status(200).json(rtaOk({data:empleado}))
    }catch(err){
        return res.status(500).json(rtaErrorServidor({status:500}))

    }

    
};

//POST - agregar empleado
addEmpleado =async function (req, res) {
    const {nombre, apellido, fechaNacimiento,sexo,fechaIngreso, estrato } =  req.body; 
    const empleado = new Empleados({
        nombre,
        apellido,
        fechaNacimiento,
        sexo,
        fechaIngreso,
        estrato
    });
    try{
        await empleado.save();
        return res.status(201).json(rtaCrear({data:empleado}));
    }catch{
        return res.status(500).json(rtaErrorServidor({status:500}))
    }

};

//PUT - actualizar empleado
updateEmpleado = async function (req, res) {
    const id = req.params.id;
    const payload = req.body;
    try{
        const empleado = await Empleados.findOneAndUpdate({_id: id}, payload)
        if(!empleado){
            return res.status(400).json(rtaNoEncontro({status:400}));
        }
        return res.status(200).json(rtaActualizar({data: empleado}));
    }catch{
        return res.status(500).json(rtaErrorServidor({status:500}))
    }
    
}

//DELETE - Borrar empleado
deleteEmpleado = async function (req, res) {
    const id = req.params.id;
    try{
        const countEmpleado = await Empleados.deleteOne({_id: id});
        if(countEmpleado.deletedCount === 0){
            return res.status(400).json(rtaNoEncontro({status:400}));
        }
        return res.status(200).json(rtaEliminar({status:200}));

    }catch{
        return res.status(500).json(rtaErrorServidor({status:500}))

    }
    
}
module.exports = {deleteEmpleado, findAllEmpleados, updateEmpleado, addEmpleado, findById}
