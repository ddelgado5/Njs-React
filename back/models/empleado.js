const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const empleadoSchema = new Schema({
	nombre: { type: String },
	apellido: { type: String },	
	fechaNacimiento: { type: Date }, //TODO:Modificar por fecha de nacimiento y calcular edad en la interfaz de usuario
	sexo: { type: String },
	fechaIngreso : { type: Date },
	estrato: { type: Number },
});


empleadoSchema.virtual('cantidad').get( function () {
	return conteoRecursivo(this.nombre, this.apellido)
})

function conteoRecursivo(nombre, apellido) {
    const count = {};
    const unirDatos = nombre.toUpperCase() + apellido.toUpperCase();    
    for (const letra of unirDatos) {
      count[letra] = (count[letra] || 0) + 1;      
    }

	const letras = Object.entries(count).map(([letra, cantidad]) => (
        `${letra}: ${cantidad}, `
    ))
    return letras;
  }

module.exports = mongoose.model('empleados', empleadoSchema);