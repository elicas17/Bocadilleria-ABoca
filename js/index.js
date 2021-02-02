window.onload = () => {
	// cargar en localstorage todos los producto, tmb se almacenara ahi el pedido
	anadirLocalStore();

	// carga la info de los .json dentro de un div
	cargarBocadillos();
	cargarBebidas();
	// crea tabla carro
	cargarCarro();
	
	// menu
	// document.getElementById("menuBoca").addEventListener('click', cargarBocadillos);
	// document.getElementById("menuBebi").addEventListener('click', cargarBebidas);
	
	cargarLocalDiv();

}
function cargarCarro() {
	let res = document.querySelector("#tbody");
	if (res.innerHTML.length > 0) {
		var xhttp = new XMLHttpRequest();
		xhttp.open('GET', 'bocadillos.json', true);
		xhttp.send();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let datos = JSON.parse(this.responseText);

				let res = document.querySelector("#tbody");
				res.innerHTML += '';
				for (let item of datos) {
					res.innerHTML += `
					<tr>
						<td id=table-boca-nombre-${item.id}>${item.nombre}</td>
						<td id="table-boca-cantidad-${item.id}">0</td>
						<td id="table-boca-precio-${item.id}">0</td>
					</tr>
				`
				}
			}
		};
		var xhttp = new XMLHttpRequest();
		xhttp.open('GET', 'bebidas.json', true);
		xhttp.send();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let datos = JSON.parse(this.responseText);

				let res = document.querySelector("#tbody");
				res.innerHTML += '';
				for (let item of datos) {
					res.innerHTML += `
					<tr>
						<td id=table-bebi-nombre-${item.id}>${item.nombre}</td>
						<td id=table-bebi-cantidad-${item.id}>0</td>
						<td id=table-bebi-precio-${item.id}>0</td>
					</tr>
				`
				}

			}
		}
	}


}
function cargarLocalTabla(boton) {
	var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
	if (boton == "btnBo1") {
		for (x of pedidoViejo) {
			if (x.bocata == document.getElementById("table-boca-nombre-1").innerHTML) {
				document.getElementById("table-boca-precio-1").innerHTML = x.total;
				document.getElementById("table-boca-cantidad-1").innerHTML = x.cantidad;

			}
		}
	}
	if (boton == "btnBo2") {
		for (x of pedidoViejo) {
			if (x.bocata == document.getElementById("table-boca-nombre-2").innerHTML) {
				document.getElementById("table-boca-precio-2").innerHTML = x.total;
				document.getElementById("table-boca-cantidad-2").innerHTML = x.cantidad;
			}
		}
	}
	if (boton == "btnBo3") {
		for (x of pedidoViejo) {
			if (x.bocata == document.getElementById("table-boca-nombre-3").innerHTML) {
				document.getElementById("table-boca-precio-3").innerHTML = x.total;
				document.getElementById("table-boca-cantidad-3").innerHTML = x.cantidad;
			}
		}
	}
	if (boton == "btnBe1") {
		for (x of pedidoViejo) {
			if (x.bebida == document.getElementById("table-bebi-nombre-1").innerHTML) {
				document.getElementById("table-bebi-precio-1").innerHTML = x.total;
				document.getElementById("table-bebi-cantidad-1").innerHTML = x.cantidad;
			}
		}
	}
	if (boton == "btnBe2") {
		for (x of pedidoViejo) {
			if (x.bebida == document.getElementById("table-bebi-nombre-2").innerHTML) {
				document.getElementById("table-bebi-precio-2").innerHTML = x.total;
				document.getElementById("table-bebi-cantidad-2").innerHTML = x.cantidad;
			}
		}
	}
	if (boton == "btnBe3") {
		for (x of pedidoViejo) {
			if (x.bebida == document.getElementById("table-bebi-nombre-3").innerHTML) {
				document.getElementById("table-bebi-precio-3").innerHTML = x.total;
				document.getElementById("table-bebi-cantidad-3").innerHTML = x.cantidad;
			}
		}
	}
}
function cargarLocalDiv() {
	var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
	for (x of pedidoViejo) {
		if (x.bocata == 'bocata de pollo') {
			console.log(document.getElementById("cantidad-boca-1"));

			document.getElementById("cantidad-boca-1").innerHTML = x.cantidad;
		}
	}
}
function anadirLocalStore() {
	var obj = [];
	if (localStorage.getItem('datosPedido') != undefined && localStorage.getItem('Sidebar')) {
		var xhttp = new XMLHttpRequest();
		xhttp.open('GET', 'bebidas.json', true);
		xhttp.send();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let datos = JSON.parse(this.responseText);
				for (let item of datos) {
					obj.push(JSON.parse(JSON.stringify({
						bebida: `${item.nombre}`,
						estado: "",
						precio: item.precio,
						cantidad: 0,
						total: 0
					})));

				}
			}
		};
		var xhttp = new XMLHttpRequest();
		xhttp.open('GET', 'bocadillos.json', true);
		xhttp.send();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let datos = JSON.parse(this.responseText);
				for (let item of datos) {
					obj.push(JSON.parse(JSON.stringify({
						bocata: `${item.nombre}`,
						precio: item.precio,
						cantidad: 0,
						total: 0
					})));
				}
				localStorage.setItem('datosPedido', JSON.stringify(obj));
			}
		};
	}
}
function cargarBebidas() {
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'bebidas.json', true);
	xhttp.send();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let datos = JSON.parse(this.responseText);
			let res = document.querySelector("#c-productos-bebidas");
			res.innerHTML = ' ';
			for (let item of datos) {
				res.innerHTML += `
					<div class="c-produc">
						<div>
							<img src="images/${item.src}" width="200">
						</div>
						<div>
							<p>${item.nombre}</p>
							<p>${item.precio}</p>
							<div>
								<input type="radio" id="contactChoice1"
								name="contact" value="email">
								<label for="contactChoice1">Frio</label>
						
								<input type="radio" id="contactChoice2"
								name="contact" value="phone">
								<label for="contactChoice2">Templado</label>
							</div>
							
						</div>
						<div>
							<button id="quitar-bebi-${item.id}">Quitar</button>
							<p id="cantidad-bebi-${item.id}">0</p>
							<button id="anadir-bebi-${item.id}">Añadir</button>
						</div>
					</div>	
				`
			}
			anadirBebi();
			quitarBebi();
		}
	};
}
function cargarBocadillos() {
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'bocadillos.json', true);
	xhttp.send();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let datos = JSON.parse(this.responseText);

			let res = document.querySelector("#c-productos-bocadillos");
			res.innerHTML = '';
			for (let item of datos) {
				res.innerHTML += `
					<div class="c-produc">
						<div>
							<img src="images/${item.src}" width="200">
						</div>
						<div>
							<p>${item.nombre}</p>
							<p>${item.precio}</p>
							<div>
								<ul id="c-ingre-${item.id}"></ul>
							</div>
						</div>
						<div>
							<button id="quitar-boca-${item.id}">Quitar</button>
							<p id="cantidad-boca-${item.id}">0</p>
							<button id="anadir-boca-${item.id}">Añadir</button>
						</div>
					</div>	
				`
				var conte_ingre = document.getElementById(`c-ingre-${item.id}`);

				for (let item2 of item.ingredientes)
					conte_ingre.innerHTML += `
					<li> ${item2}</li>
				`
			}
			anadirBoca();
			quitarBoca();
		}
	};
}
function anadirBoca() {
	document.getElementById("anadir-boca-1").addEventListener('click', boca1 = () => {
		var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
		for (x of pedidoViejo) {
			if (x.bocata == 'bocata de pollo') {
				x.cantidad=x.cantidad + 1;
				x.total = x.cantidad * x.precio;
				document.getElementById("cantidad-boca-1").innerHTML =  x.cantidad
			}
		}
		localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
		cargarLocalTabla("btnBo1");
		cargarLocalDiv();
	})
	document.getElementById("anadir-boca-2").addEventListener('click', boca2 = () => {
		cant_boca_2 = parseInt(document.getElementById("cantidad-boca-2").innerHTML) + 1;
		document.getElementById("cantidad-boca-2").innerHTML = cant_boca_2;

		var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
		for (x of pedidoViejo) {
			if (x.bocata == 'bocata de atun') {
				x.cantidad = cant_boca_2;
				x.total = x.cantidad * x.precio;
			}
		}
		localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
		cargarLocalTabla("btnBo2");
	})
	document.getElementById("anadir-boca-3").addEventListener('click', boca3 = () => {
		cant_boca_3 = parseInt(document.getElementById("cantidad-boca-3").innerHTML) + 1;
		document.getElementById("cantidad-boca-3").innerHTML = cant_boca_3;

		var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
		for (x of pedidoViejo) {
			if (x.bocata == 'bocata vegetal') {
				x.cantidad = cant_boca_3;
				x.total = x.cantidad * x.precio;
			}
		}
		localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
		cargarLocalTabla("btnBo3");
	})
}
function quitarBoca() {
	document.getElementById("quitar-boca-1").addEventListener('click', boca1 = () => {
		cantBoca1 = parseInt(document.getElementById("cantidad-boca-1").innerHTML);
		if (cantBoca1 > 0) {
			cant_boca_1 = parseInt(document.getElementById("cantidad-boca-1").innerHTML) - 1;
			document.getElementById("cantidad-boca-1").innerHTML = cant_boca_1;
			var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
			for (x of pedidoViejo) {
				if (x.bocata == 'bocata de pollo') {
					x.cantidad = cant_boca_1;
					x.total = x.cantidad * x.precio;
				}
			}
			localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
			cargarLocalTabla("btnBo1");
		}
	});
	document.getElementById("quitar-boca-2").addEventListener('click', boca2 = () => {
		cantBoca2 = parseInt(document.getElementById("cantidad-boca-2").innerHTML);
		if (cantBoca2 > 0) {
			cant_boca_2 = parseInt(document.getElementById("cantidad-boca-2").innerHTML) - 1;
			document.getElementById("cantidad-boca-2").innerHTML = cant_boca_2;
			var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
			for (x of pedidoViejo) {
				if (x.bocata == 'bocata de atun') {
					x.cantidad = cant_boca_2;
					x.total = x.cantidad * x.precio;
				}
			}
			localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
			cargarLocalTabla("btnBo2");
		}
	});
	document.getElementById("quitar-boca-3").addEventListener('click', boca3 = () => {
		cantBoca3 = parseInt(document.getElementById("cantidad-boca-3").innerHTML);
		if (cantBoca3 > 0) {
			cant_boca_3 = parseInt(document.getElementById("cantidad-boca-3").innerHTML) - 1;
			document.getElementById("cantidad-boca-3").innerHTML = cant_boca_3;
			var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
			for (x of pedidoViejo) {
				if (x.bocata == 'bocata vegetal') {
					x.cantidad = cant_boca_3;
					x.total = x.cantidad * x.precio;
				}
			}
			localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
			cargarLocalTabla("btnBo3");
		}
	});
}
function anadirBebi() {
	document.getElementById("anadir-bebi-1").addEventListener('click', bebi1 = () => {
		cant_bebi_1 = parseInt(document.getElementById("cantidad-bebi-1").innerHTML) + 1;
		document.getElementById("cantidad-bebi-1").innerHTML = cant_bebi_1;

		var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
		for (x of pedidoViejo) {
			if (x.bebida == 'zumo de naranja') {
				x.cantidad = cant_bebi_1;
				x.total = x.cantidad * x.precio;
			}
		}
		localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
		cargarLocalTabla("btnBe1");
	})
	document.getElementById("anadir-bebi-2").addEventListener('click', bebi2 = () => {
		cant_bebi_2 = parseInt(document.getElementById("cantidad-bebi-2").innerHTML) + 1;
		document.getElementById("cantidad-bebi-2").innerHTML = cant_bebi_2;

		var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
		for (x of pedidoViejo) {
			if (x.bebida == 'mate de mango') {
				x.cantidad = cant_bebi_2;
				x.total = x.cantidad * x.precio;
			}
		}
		localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
		cargarLocalTabla("btnBe2");
	})
	document.getElementById("anadir-bebi-3").addEventListener('click', bebi3 = () => {
		cant_bebi_3 = parseInt(document.getElementById("cantidad-bebi-3").innerHTML) + 1;
		document.getElementById("cantidad-bebi-3").innerHTML = cant_bebi_3;

		var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
		for (x of pedidoViejo) {
			if (x.bebida == 'mate de limon') {
				x.cantidad = cant_bebi_3;
				x.total = x.cantidad * x.precio;
			}
		}
		localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
		cargarLocalTabla("btnBe3");
	})
}
function quitarBebi() {
	document.getElementById("quitar-bebi-1").addEventListener('click', bebi1 = () => {
		cantBebi1 = parseInt(document.getElementById("cantidad-bebi-1").innerHTML);
		if (cantBebi1 > 0) {
			cant_bebi_1 = parseInt(document.getElementById("cantidad-bebi-1").innerHTML) - 1;
			document.getElementById("cantidad-bebi-1").innerHTML = cant_bebi_1;
			var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
			for (x of pedidoViejo) {
				if (x.bebida == 'zumo de naranja') {
					x.cantidad = cant_bebi_1;
					x.total = x.cantidad * x.precio;
				}
			}
			localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
			cargarLocalTabla("btnBe1");
		}
	});
	document.getElementById("quitar-bebi-2").addEventListener('click', bebi2 = () => {
		cantBebi2 = parseInt(document.getElementById("cantidad-bebi-2").innerHTML);
		if (cantBebi2 > 0) {
			cant_bebi_2 = parseInt(document.getElementById("cantidad-bebi-2").innerHTML) - 1;
			document.getElementById("cantidad-bebi-2").innerHTML = cant_bebi_2;
			var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
			for (x of pedidoViejo) {
				if (x.bebida == 'mate de mango') {
					x.cantidad = cant_bebi_2;
					x.total = x.cantidad * x.precio;
				}
			}
			localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
			cargarLocalTabla("btnBe2");
		}
	});
	document.getElementById("quitar-bebi-3").addEventListener('click', bebia3 = () => {
		cantBebi3 = parseInt(document.getElementById("cantidad-bebi-3").innerHTML);
		if (cantBebi3 > 0) {
			cant_bebi_3 = parseInt(document.getElementById("cantidad-bebi-3").innerHTML) - 1;
			document.getElementById("cantidad-bebi-3").innerHTML = cant_bebi_3;
			var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
			for (x of pedidoViejo) {
				if (x.bebida == 'mate de limon') {
					x.cantidad = cant_bebi_3;
					x.total = x.cantidad * x.precio;
				}
			}
			localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
			cargarLocalTabla("btnBe3");
		}
	});
}