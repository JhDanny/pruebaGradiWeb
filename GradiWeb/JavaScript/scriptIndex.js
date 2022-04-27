alert("hola")
const imagenProducto = document.querySelector(".main__imgPrincipal")
const imagenSecundaria = document.querySelector(".main__imgSecundarias")
const tituloPrincipal = document.querySelector(".main__section")
const botonSelecionColor = document.querySelector(".main__botonColor")
const botonSelecionTalla = document.getElementById("talla")
const contadorProductos = document.querySelector(".div__contador")
const descripcion = document.querySelector(".div__descripcion")
const valoTotal = document.querySelector(".div__valorTotal")
const validarCarrito = document.querySelector(".div__botonCarrito")
const siguienteImg = document.querySelector(".main__imgSMas")
const anteriorImg = document.querySelector(".main__imgSMenos")


const apiGradiWeb = 'https://graditest-store.myshopify.com/products/free-trainer-3-mmw.js'
fetch(apiGradiWeb)
.then(response => response.json())
.then (data => {

// imagen 
    imagenProducto.innerHTML = `<img class="main__imagenPrincipal" src="https:${data.featured_image}"/>`;
// carousel  

    var continuar = 0;
    const img = document.createElement('div')
    img.innerHTML = `<img class="main__imagenPrincipal" src="https:${data.images[continuar]}"/>`;
    imagenSecundaria.appendChild(img)
    
    anteriorImg.addEventListener('click',()=>{
        
        if(continuar<3){
             continuar ++
        }else{
            continuar=3
        }
            img.innerHTML = `<img class="main__imagenPrincipal" src="https:${data.images[continuar]}"/>`;
            imagenSecundaria.appendChild(img)
        });

    siguienteImg.addEventListener('click',()=>{

        if(continuar>0){
            continuar = continuar -1
        }else{
            continuar=0
        }

        img.innerHTML = `<img class="main__imagenPrincipal" src="https:${data.images[continuar]}"/>`;
        imagenSecundaria.appendChild(img)
        });

//informacion           
    tituloPrincipal.innerHTML = `
    <span = class="main__tituloPrincipal">by Nike x ALYX </span> 
    <h2 class="main__tituloSecundario"> ${data.title}<h2/>
    <h3 class="main__precioPrincipal">$ ${data.price}<h3/>
    <h5 class="main__precionSecundario">$ ${data.compare_at_price}<h1/>`;

//Colores    
    botonSelecionColor.innerHTML= `
    <label for="color"> Color: </label>
    <input class="botonColor__red" type="radio" id="${data.options[0].values[0]}" name="color" checked/>
    <input class="botonColor__black" type="radio" id="${data.options[0].values[1]}" name="color"/>`;



// tallas 
    data.options[1].values.forEach(dato => {
    const tallas = document.createElement('div')
    tallas.innerHTML = `
    <input class="main__tallastext" type="radio" name="info" id="info${dato}"/>
    <label class="main__tallasCheck" for="info${dato}">${dato}</label>
    `;
    botonSelecionTalla.appendChild(tallas)
    });

// contador     
    contadorProductos.innerHTML=`
    <button class="main__max">+</button>
    <h4 = class="main__cont"><span class=main__span>0</span></h4>
    <button class="main__min">-</button>`;

    const aumentar = document.querySelector(".main__max")
    const span = document.querySelector(".main__span")
    let contador = 0
    valoTotal.innerHTML=`<span class="descripcion__span">total price: 0</span>`;

    aumentar.addEventListener('click',()=>{
    contador ++
    span.textContent = contador
    valoTotal.innerHTML=`<span class="descripcion__span">total price:${data.price * contador}</span>` 
    }) 

    const disminuir = document.querySelector(".main__min")
    disminuir.addEventListener('click',()=>{
        if (contador > 0) {
        contador = contador-1
        valoTotal.innerHTML= `<span class="descripcion__span">total price:${data.price * contador}</span>` 
    } else {
        contador = 0
        
    }
    span.textContent = contador
    
    })
 

// mensaje descripcion

    descripcion.innerHTML= data.description

//validacion de check

    validarCarrito.innerHTML=`
    <button class="boton__carrito" >Add to cart</button>`;

    validarCarrito.addEventListener('click',()=>{
        
        const validacionRojo = document.querySelector(".botonColor__red").checked;
        
        if (validacionRojo == true){

            console.log("rojo selecionado")

           
            data.options[1].values.forEach(dato => {
                console.log(dato)

               /* el proceso que se iba a realizar en esta zona es
                  comparar los .cheked de color y talla, en el momento 
                  de que ambos fueran true se realizaba un comparador de 
                  busqueda dentro del array "variants" cuando 
                  option1 = (color selecionado) & option2 = (talla selecionada)
                  fueran igual a las seleciones selecionaba el id */
                
            })

                       
        }else{

            const validacionNegro = document.querySelector(".botonColor__black").checked;
            

            console.log("negro selecionado")

        }
        
    })
    
    console.log(data)
})
.catch (error => console.log(error))

// 