window.onload = () => {
	JsonDatos = [];
	obj = [];
	localOtraVez=false;

	$.ajax({
		url: "bocadillos.json",
		success: function (result) {
			//Aquí tenemos la respuesta de la petición en caso de éxito  
			for (x of result) {
				JsonDatos.push(x);
			}
			for (let item of result) {
				if (item.nombre == "bocata de pollo" || item.nombre == "bocata de atun" || item.nombre == "bocata vegetal") {
					obj.push(JSON.parse(JSON.stringify({
						bocata: `${item.nombre}`,
						precio: item.precio,
						cantidad: 0,
						total: 0
					})));
				}
			}
			if(localStorage.getItem('datosPedido')==undefined){ 
				localOtraVez=true;
				localStorage.setItem('datosPedido', JSON.stringify(obj));
			}
			cargarCarroBoca(result);
			cargarBocadillos(result);
			
		},
		error: function (error) {
			//Aquí tenemos la respuesta de la petición en caso de error
			alert("Ha ocurrido un error. No es posible comunicarse con el servidor");
		}
	});

	$.ajax({
		url: "bebidas.json",
		success: function (result) {
			//Aquí tenemos la respuesta de la petición en caso de éxito  
			for (x of result) {
				JsonDatos.push(x);
			}
			for (let item of result) {
				if (item.nombre == "zumo de naranja" || item.nombre == "mate de mango" || item.nombre == "mate de limon") {
					obj.push(JSON.parse(JSON.stringify({
						bebida: `${item.nombre}`,
						frio: 0,
						templado: 0,
						precio: item.precio,
						cantidad: 0,
						total: 0
					})));
				}
			} 
			if(localOtraVez==true){
				localStorage.setItem('datosPedido', JSON.stringify(obj)); 
			}
			cargarCarroBebi(result);
			cargarBebidas(result);
		},
		error: function (error) {
			//Aquí tenemos la respuesta de la petición en caso de error
			alert("Ha ocurrido un error. No es posible comunicarse con el servidor");
		}
	});

	document.getElementById("imprimirCuenta").addEventListener('click',imprimirCuenta);

}
imprimirCuenta=()=>{
	// window.print();
	var doc =window.open('','width=800','heigth=600');
	var tabla=document.getElementById("c-table").innerHTML;

	doc.document.write('<html><head><title>Factura Pedido</title></head>'); 
	doc.document.write('<body>');
	doc.document.write('<table>'+ tabla +'</table>');
	doc.document.write('</body></html>');
	doc.document.close();
	doc.print();
}
cargarCarroBoca = (datos) => {
	let total=0;
	let res = document.querySelector("#tbody"); 
	var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido")); 
	for (let item of datos) {
		for (x of pedidoViejo) {
			if (item.nombre == x.bocata) {
				res.innerHTML += `
								<tr>
									<td id=table-boca-nombre-${item.id}>${item.nombre}</td>
									<td id="table-boca-cantidad-${item.id}">${x.cantidad}</td>
									<td id="table-boca-precio-${item.id}">${x.total}</td>
								</tr>
								`

								total=total+x.total; 
			}
		}
	}
	document.getElementById("table-total").innerHTML=total;
}
cargarCarroBebi = (datos) => {
	let res = document.querySelector("#tbody");
	var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
	let total=document.getElementById("table-total").innerHTML;
	for (let item of datos) {
		for (x of pedidoViejo) {
			if (item.nombre == x.bebida) {
				res.innerHTML += `
								<tr>
									<td id=table-bebi-nombre-${item.id}>${item.nombre}</td>
									<td id=table-bebi-cantidad-${item.id}>${x.cantidad}</td>
									<td id=table-bebi-precio-${item.id}>${x.total}</td>
								</tr>
								`
				total+total+x.total;
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
function cargarBebidas(datos) {
	var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
	let res = document.querySelector("#c-productos-bebidas");
	for (let item of datos) {
		for (x of pedidoViejo) {
			if (item.nombre == x.bebida) {
				res.innerHTML += `
							<div class="c-produc">
								<div>
									<img src="images/${item.src}" width="200">
								</div>
								<div>
									<p>${item.nombre}</p>
									<p>${item.precio}</p>
									<div>
										<form>
											<input name="tempe" type="radio" id="bebi-frio-${item.id}" checked>
											<label for="bebi-frio-${item.id}">Frio</label>
									
											<input name="tempe" type="radio" id="bebi-templa-${item.id}">
											<label for="bebi-templa-${item.id}">Templado</label>
										</form>
									</div>
									
								</div>
								<div>
									<button id="quitar-bebi-${item.id}">Quitar</button>
									<p id="cantidad-bebi-${item.id}">${x.cantidad}</p>
									<button id="anadir-bebi-${item.id}">Añadir</button>
								</div>
								<div>
									<p style="color:red;">*Selecciona la temperatura de la botella que quieras quitar.</p>
									<p >Botellas frias: <label id="extra-bebi-frio-${item.id}">${x.frio}</label></p>
									<p>Botellas templadas: <label id="extra-bebi-temple-${item.id}">${x.templado}</label></p>
								</div>
							</div>	
						`
			}
			
		}
	} 
	 anadirBebi(); 
	 quitarBebi();

}
function cargarBocadillos(datos) {
	var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
	 let res = document.querySelector("#c-productos-bocadillos");
			for (let item of datos) {
				for (x of pedidoViejo) {
					if (item.nombre == x.bocata) {
						res.innerHTML += `
							<div class="c-produc">
								<div>
									<img src="images/${item.src}" width="200">
								</div>
								<div>
									<p>${item.nombre}</p>
									<p>${item.precio}</p>
									<div>
										<ul id="c-ingre-${item.id}">

										</ul>
									</div>
								</div>
								<div>
									<button id="quitar-boca-${item.id}">Quitar</button>
									<p id="cantidad-boca-${item.id}">${x.cantidad}</p>
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
				}
			
			} 
		anadirBoca();
		quitarBoca(); 
	 
}
function anadirBoca() { 
	document.getElementById("anadir-boca-1").addEventListener('click',  () => {
		let total=0;
		var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
		for (x of pedidoViejo) {
			if (x.bocata == 'bocata de pollo') {
				x.cantidad = x.cantidad + 1;
				x.total = x.cantidad * x.precio;
				document.getElementById("cantidad-boca-1").innerHTML = x.cantidad; 
			}
			total=total+x.total; 
		} 
		document.getElementById("table-total").innerHTML=total;
		localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
		cargarLocalTabla("btnBo1");
	})
	document.getElementById("anadir-boca-2").addEventListener('click',  () => { 
		let total=0;
		var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
		for (x of pedidoViejo) {
			if (x.bocata == 'bocata de atun') {
				x.cantidad = x.cantidad + 1;
				x.total = x.cantidad * x.precio;
				document.getElementById("cantidad-boca-2").innerHTML = x.cantidad;
			}
			total=total+x.total;
		}
		document.getElementById("table-total").innerHTML=total;
		localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
		cargarLocalTabla("btnBo2");
	})
	document.getElementById("anadir-boca-3").addEventListener('click',  () => {
		let total=0;
		var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
		for (x of pedidoViejo) {
			if (x.bocata == 'bocata vegetal') {
				x.cantidad = x.cantidad + 1;
				x.total = x.cantidad * x.precio;
				document.getElementById("cantidad-boca-3").innerHTML = x.cantidad;
			}
			total=total+x.total;
		}
		document.getElementById("table-total").innerHTML=total;
		localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
		cargarLocalTabla("btnBo3");
	})
}
function quitarBoca() {
	document.getElementById("quitar-boca-1").addEventListener('click',  () => {
		let total=0;
		var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
		for (x of pedidoViejo) {
			if (x.bocata == 'bocata de pollo') {
				if (x.cantidad > 0) {
					x.cantidad = x.cantidad - 1;;
					x.total = x.cantidad * x.precio;
					document.getElementById("cantidad-boca-1").innerHTML = x.cantidad;
				}
			}
			total=total+x.total;
		}
		document.getElementById("table-total").innerHTML=total;
		localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
		cargarLocalTabla("btnBo1");

	});
	document.getElementById("quitar-boca-2").addEventListener('click',  () => {
		let total=0;
		var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
		for (x of pedidoViejo) {
			if (x.bocata == 'bocata de atun') {
				if (x.cantidad > 0) {
					x.cantidad = x.cantidad - 1;;
					x.total = x.cantidad * x.precio;
					document.getElementById("cantidad-boca-2").innerHTML = x.cantidad;
				}
			}
			total=total+x.total;
		}
		document.getElementById("table-total").innerHTML=total;
		localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
		cargarLocalTabla("btnBo2");
	});
	document.getElementById("quitar-boca-3").addEventListener('click', () => {
		let total=0;
		var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
		for (x of pedidoViejo) {
			if (x.bocata == 'bocata vegetal') {
				if (x.cantidad > 0) {
					x.cantidad = x.cantidad - 1;;
					x.total = x.cantidad * x.precio;
					document.getElementById("cantidad-boca-3").innerHTML = x.cantidad;
				}
			}
			total=total+x.total;
		}
		document.getElementById("table-total").innerHTML=total;
		localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
		cargarLocalTabla("btnBo3");
	});
}
function anadirBebi() {
	document.getElementById("anadir-bebi-1").addEventListener('click', () => {
		let total=0;
		var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
		for (x of pedidoViejo) {
			if (x.bebida == 'zumo de naranja') {
				x.cantidad = x.cantidad + 1;
				x.total = x.cantidad * x.precio; 
				if (document.getElementById("bebi-frio-1").checked) {
					x.frio=x.frio+1;
					document.getElementById("cantidad-bebi-1").innerHTML = x.cantidad;
					document.getElementById("extra-bebi-frio-1").innerHTML=x.frio;
				}else{
					x.templado=x.templado+1;
					document.getElementById("extra-bebi-temple-1").innerHTML=x.templado;
				} 
				document.getElementById("cantidad-bebi-1").innerHTML = x.cantidad;
			}
			total=total+x.total;
		}
		document.getElementById("table-total").innerHTML=total;
		localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
		cargarLocalTabla("btnBe1");
	})
	document.getElementById("anadir-bebi-2").addEventListener('click',  () => {
		let total=0;
		var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
		for (x of pedidoViejo) {
			if (x.bebida == 'mate de mango') {
				x.cantidad = x.cantidad + 1;
				x.total = x.cantidad * x.precio;
				if (document.getElementById("bebi-frio-2").checked) {
					x.frio=x.frio+1;
					document.getElementById("cantidad-bebi-2").innerHTML = x.cantidad;
					document.getElementById("extra-bebi-frio-2").innerHTML=x.frio;
				}else{
					x.templado=x.templado+1;
					document.getElementById("extra-bebi-temple-2").innerHTML=x.templado;
				} 
				document.getElementById("cantidad-bebi-2").innerHTML = x.cantidad;
			}
			total=total+x.total;
		}
		document.getElementById("table-total").innerHTML=total;
		localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
		cargarLocalTabla("btnBe2");
	})
	document.getElementById("anadir-bebi-3").addEventListener('click', () => {
		let total=0;
		var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
		for (x of pedidoViejo) {
			if (x.bebida == 'mate de limon') {
				x.cantidad = x.cantidad + 1;
				x.total = x.cantidad * x.precio;
				if (document.getElementById("bebi-frio-3").checked) {
					x.frio=x.frio+1;
					document.getElementById("cantidad-bebi-3").innerHTML = x.cantidad;
					document.getElementById("extra-bebi-frio-3").innerHTML=x.frio;
				}else{
					x.templado=x.templado+1;
					document.getElementById("extra-bebi-temple-3").innerHTML=x.templado;
				} 
				document.getElementById("cantidad-bebi-3").innerHTML = x.cantidad;
			}
			total=total+x.total;
		}
		document.getElementById("table-total").innerHTML=total;
		localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
		cargarLocalTabla("btnBe3");
	})
}
function quitarBebi() {
	document.getElementById("quitar-bebi-1").addEventListener('click',   () => {
		let total=0;
		var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
		for (x of pedidoViejo) {
			if (x.bebida == 'zumo de naranja') { 
				if (x.cantidad > 0) { 
					if (document.getElementById("bebi-frio-1").checked) { 
						if(x.frio>0){
							x.cantidad = x.cantidad - 1;;
							x.total = x.cantidad * x.precio;  
							x.frio=x.frio-1;
							document.getElementById("extra-bebi-frio-1").innerHTML = x.frio;
						}else{
							alert('No tienes bebidas frias en el carro');
						}
					}else{
						if(x.templado>0){
							x.cantidad = x.cantidad - 1;;
							x.total = x.cantidad * x.precio;  
							x.templado=x.templado-1;
							document.getElementById("extra-bebi-temple-1").innerHTML = x.frio; 
						}else{
							alert('No tienes bebidas al tiempo en el carro');
						}
					} 
					document.getElementById("cantidad-bebi-1").innerHTML = x.cantidad;
				}
			} 
			total=total+x.total;
			
		}
		document.getElementById("table-total").innerHTML=total;
		localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
		cargarLocalTabla("btnBe1");
	});
	document.getElementById("quitar-bebi-2").addEventListener('click',  () => {
		let total=0;
		var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
		for (x of pedidoViejo) {
			if (x.bebida == 'mate de mango') {
				if (x.cantidad > 0) {
					if (document.getElementById("bebi-frio-2").checked) { 
						if(x.frio>0){
							x.cantidad = x.cantidad - 1;;
							x.total = x.cantidad * x.precio;  
							x.frio=x.frio-1;
							document.getElementById("extra-bebi-frio-2").innerHTML = x.frio;
						}else{
							alert('No tienes bebidad frias en el carro');
						}
					}else{
						if(x.templado>0){
							x.cantidad = x.cantidad - 1;;
							x.total = x.cantidad * x.precio;  
							x.templado=x.templado-1;
							document.getElementById("extra-bebi-temple-2").innerHTML = x.frio; 
						}else{
							alert('No tienes bebidad al tiempo en el carro');
						}
					} 
					document.getElementById("cantidad-bebi-2").innerHTML = x.cantidad;
				}
			}
			total=total+x.total;
		}
		document.getElementById("table-total").innerHTML=total;
		localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
		cargarLocalTabla("btnBe2");
	});
	document.getElementById("quitar-bebi-3").addEventListener('click',  () => {
		let total=0;
		var pedidoViejo = JSON.parse(localStorage.getItem("datosPedido"));
		for (x of pedidoViejo) {
			if (x.bebida == 'mate de limon') {
				if (x.cantidad > 0) {
					if (document.getElementById("bebi-frio-3").checked) { 
						if(x.frio>0){
							x.cantidad = x.cantidad - 1;;
							x.total = x.cantidad * x.precio;  
							x.frio=x.frio-1;
							document.getElementById("extra-bebi-frio-3").innerHTML = x.frio;
						}else{
							alert('No tienes bebidad frias en el carro');
						}
					}else{
						if(x.templado>0){
							x.cantidad = x.cantidad - 1;;
							x.total = x.cantidad * x.precio;  
							x.templado=x.templado-1;
							document.getElementById("extra-bebi-temple-3").innerHTML = x.frio; 
						}else{
							alert('No tienes bebidad al tiempo en el carro');
						}
					} 
					document.getElementById("cantidad-bebi-3").innerHTML = x.cantidad;
				}
			}
			total=total+x.total;
		}
		document.getElementById("table-total").innerHTML=total;
		localStorage.setItem("datosPedido", JSON.stringify(pedidoViejo));
		cargarLocalTabla("btnBe3");
	});
}