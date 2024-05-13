const {findAllEmpleados} = require('../services/empleadosServices')
module.exports = function (app) {

	//punto de entrada de los metodos
	app.get('/empleados', findAllEmpleados);
	app.get('/empleado/:id', findById);
	app.post('/empleado', addEmpleado);
	app.put('/empleado/:id', updateEmpleado);
	app.delete('/empleado/:id', deleteEmpleado);

}