window.onload = () => {
	pedido="";
	
	datosPedido=[];

	cargarBocadillos();
	cargarCarro();
	document.getElementById("menuBoca").addEventListener('click',cargarBocadillos);
	document.getElementById("menuBebi").addEventListener('click',cargarBebidas);
	// anadir()

}

function cargarBebidas(){
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'bebidas.json', true);
	xhttp.send();
	xhttp.onreadystatechange= function() {
		if (this.readyState == 4 && this.status == 200) {
			let datos=JSON.parse(this.responseText);
			
			let res=document.querySelector("#c-productos");
			res.innerHTML = ' ';
			for(let item of datos){
				res.innerHTML+=`
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
		  }
	};
}
function cargarBocadillos() {
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'bocadillos.json', true);
	xhttp.send();
	xhttp.onreadystatechange= function() {
		if (this.readyState == 4 && this.status == 200) {
			let datos=JSON.parse(this.responseText);
			
			let res=document.querySelector("#c-productos");
			res.innerHTML = '';
			for(let item of datos){
				res.innerHTML+=`
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
				var conte_ingre=document.getElementById(`c-ingre-${item.id}`);

				for(let item2 of item.ingredientes)
				conte_ingre.innerHTML+=`
					<li> ${item2}</li>
				`
			}
			anadirBoca();
			quitarBoca();
		  }
	};
}
function cargarCarro(){
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'bocadillos.json', true);
	xhttp.send();
	xhttp.onreadystatechange= function() {
		if (this.readyState == 4 && this.status == 200) {
			let datos=JSON.parse(this.responseText);
			
			let res=document.querySelector("#tbody");
			res.innerHTML += '';
			for(let item of datos){
				res.innerHTML+=`
					<tr>
						<td>${item.nombre}</td>
						<td>0</td>
						<td>${item.precio}</td>
					</tr>
				`
			}

		}
	};
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'bebidas.json', true);
	xhttp.send();
	xhttp.onreadystatechange= function() {
		if (this.readyState == 4 && this.status == 200) {
			let datos=JSON.parse(this.responseText);
			
			let res=document.querySelector("#tbody");
			res.innerHTML += '';
			for(let item of datos){
				res.innerHTML+=`
					<tr>
						<td>${item.nombre}</td>
						<td>0</td>
						<td>${item.precio}</td>
					</tr>
				`
			}

		}
	}
}
function anadirBoca(){

	// console.log(document.getElementById("cantidad-boca-1").innerHTML);

		document.getElementById("anadir-boca-1").addEventListener('click',boca1=()=>{
		cant_boca_1= parseInt(document.getElementById("cantidad-boca-1").innerHTML)+1 ;
		document.getElementById("cantidad-boca-1").innerHTML=cant_boca_1;
		})
		document.getElementById("anadir-boca-2").addEventListener('click',boca2=()=>{
		cant_boca_2= parseInt(document.getElementById("cantidad-boca-2").innerHTML)+1 ;
		document.getElementById("cantidad-boca-2").innerHTML=cant_boca_2;
		})
		document.getElementById("anadir-boca-3").addEventListener('click',boca3=()=>{
		cant_boca_3= parseInt(document.getElementById("cantidad-boca-3").innerHTML)+1 ;
		document.getElementById("cantidad-boca-3").innerHTML=cant_boca_3;
		})
}
function quitarBoca(){
	if(parseInt(document.getElementById("cantidad-boca-1").innerHTML)>0){
		document.getElementById("quitar-boca-1").addEventListener('click',boca1=()=>{
		cant_boca_1= parseInt(document.getElementById("cantidad-boca-1").innerHTML)-1 ;
		document.getElementById("cantidad-boca-1").innerHTML=cant_boca_1;
		})
	}
	if(parseInt(document.getElementById("cantidad-boca-2").innerHTML)>0){
		document.getElementById("quitar-boca-2").addEventListener('click',boca2=()=>{
		cant_boca_2= parseInt(document.getElementById("cantidad-boca-2").innerHTML)-1 ;
		document.getElementById("cantidad-boca-2").innerHTML=cant_boca_2;
		})
	}
	if(parseInt(document.getElementById("cantidad-boca-3").innerHTML)>0){
		document.getElementById("quitar-boca-3").addEventListener('click',boca3=()=>{
		cant_boca_3= parseInt(document.getElementById("cantidad-boca-3").innerHTML)-1 ;
		document.getElementById("cantidad-boca-3").innerHTML=cant_boca_3;
		})
	}	


}