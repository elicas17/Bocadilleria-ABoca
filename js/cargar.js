// const getBebidas = () => {
// 	var usebebidas = new Promise((resolve, reject) => {
// 		var xhttp = new XMLHttpRequest();
// 		xhttp.open('GET', 'bebidas.json');
// 		xhttp.responseType = 'json';
// 		xhttp.send();
// 		xhttp.onload = function () {
// 			if (xhttp.status == 200) {
// 				resolve(xhttp.response)
// 			} else {
// 				reject("resuesta erronea");
// 			}
// 		}
// 	});
// 	usebebidas
// 		.then(respuesta => {
// 			for (x of respuesta) {
// 				JsonDatos.push(x);
// 			}

// 		})
// 		.catch(error => {
// 			console.log(error + "-bebi");
// 		});
// }
// const getBocadillos = () => {
// 	var usebocadillos = new Promise((resolve, reject) => {
// 		var xhttp = new XMLHttpRequest();
// 		xhttp.open('GET', 'bocadillos.json');
// 		xhttp.responseType = 'json';
// 		xhttp.send();
// 		xhttp.onload = function () {
// 			if (xhttp.status == 200) {
// 				resolve(xhttp.response)
// 			} else {
// 				reject("resuesta erronea");
// 			}
// 		}
// 	});
// 	usebocadillos
// 		.then(respuesta => {
// 			for (x of respuesta) {
// 				JsonDatos.push(x);
// 			}
// 			anadirLocalStore(JsonDatos);
// 		})
// 		.catch(error => {
// 			console.log(error + "-boca");
// 		});

// }
// function anadirLocalStore(datos) {
// 	// if (localStorage.getItem('datosPedido') == undefined) {

// 	console.log(JSON.parse(datos));
// 	for (let item of datos) {
// 		if (item.nombre == "bocata de pollo" || item.nombre == "bocata de atun" || item.nombre == "bocata vegetal") {
// 			obj.push(datos);
// 			obj.push(JSON.parse(JSON.stringify({
// 				bebida: `${item.nombre}`,
// 				frio: 0,
// 				templado: 0,
// 				precio: item.precio,
// 				cantidad: 0,
// 				total: 0
// 			})));
// 		}

// 	}
// 	for (let item of datos) {
// 		if (item.nombre == "zumo de naranja" || item.nombre == "mate de mango" || item.nombre == "mate de limon") {
// 			obj.push(datos);
// 			obj.push(JSON.parse(JSON.stringify({
// 				bocata: `${item.nombre}`,
// 				precio: item.precio,
// 				cantidad: 0,
// 				total: 0
// 			})));
// 		}

// 	}
// 	localStorage.setItem('datosPedido', JSON.stringify(obj));

// }