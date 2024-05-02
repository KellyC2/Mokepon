const seccionAtaque=document.getElementById("seleccionar-ataque")
const seccionReiniciar=document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar=document.getElementById("boton-reiniciar")

const seccionMascota =document.getElementById("seleccionar-mascota")

const spanMascotaJugador =document.getElementById("mascota-jugador")

const spanMascotaEnemigo=document.getElementById("mascota-enemigo")   

const seccionMensaje= document.getElementById("div-resultado")
const divAtaqueDelJugador= document.getElementById("ataque-del-jugador")
const divAtaqueDelEnemigo= document.getElementById("ataque-del-enemigo")

const spanVictoriasJugador= document.getElementById("victorias-jugador")
const spanVictoriasEnemigo= document.getElementById("vicotrias-enemigo")
const contenedorTarjetas=document.getElementById("contenedor-tarjetas")
const contenedorAtaques= document.getElementById("contendor-ataques")
const seccionVerMapa=document.getElementById("ver-mapa")
const canvasMapa=document.getElementById("mapa")
const anchoMaximoDeMapa=350

let ataqueJugador=[]
let ataqueEnemigo =[]
let opcionDeMokepones
let inputHipodoge 
let inputCapipepo
let inputRatigueya
let inputLangostelvis
let inputTucapalma
let inputPydos
let mascotaJugador
let imagenDeLaMascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo
let botonAgua
let botonTierra
let botonFuego
let botones= []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador=0
let victoriasEnemigo=0
let lienzo = canvasMapa.getContext("2d")
let intervalo
let mapaBackground=new Image()
mapaBackground.src="./assets/mokemap.png"
let alturaQueBuscamos
let anchoDelMapa=window.innerWidth -20
if(anchoDelMapa>anchoMaximoDeMapa){
    anchoDelMapa=anchoMaximoDeMapa - 20
}
alturaQueBuscamos=anchoDelMapa*600/800
mapa.width=anchoDelMapa
mapa.height= alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto,vida, fotoCabezaMokepon, id=null){
        this.id=id
        this.nombre=nombre
        this.foto= foto
        this.vida=vida
        this.ataques=[]
        this.ancho=40
        this.alto=40
        this.x= aleatorio(0, mapa.width - this.ancho)
        this.y=aleatorio(0, mapa.height-this.alto)        
        this.fotoEnMapa=new Image()
        this.fotoEnMapa.src= fotoCabezaMokepon
        this.velocidadX=0
        this.velocidadY=0               
    }

    pintarAvatarDeMokepon(){
        lienzo.drawImage(
            this.fotoEnMapa,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        )
    }
}

let jugadorId = null
let enemigoId = null
let mokepones=[]
let mokeponesEnemigos=[]

let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png",5, "./assets/hipodoge.png")
let capipepo= new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png")
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "./assets/ratigueya.png")
let langostelvis = new Mokepon("Langostelvis","./assets/langostelvis.png", 5, "./assets/avatarLangostelvis.png")
let tucapalma= new Mokepon("Tucapalma", "./assets/tucapalma.png", 5, "./assets/avatartucapalma.png")
let pydos= new Mokepon("Pydos", "./assets/pydos.png", 5, "./assets/avatarPydos.png")

const HIPODOGE_ATAQUES=[
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌱", id: "boton-tierra"}, 
]
hipodoge.ataques.push(...HIPODOGE_ATAQUES)   

const CAPIPEPO_ATAQUES=[
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
]
capipepo.ataques.push(...CAPIPEPO_ATAQUES)


const RATIGUEYA_ATAQUES=[
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌱", id: "boton-tierra"},
]
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)


const LANGOSTELVIS_ATAQUES=[
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌱", id: "boton-tierra"},
]
langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES)

const TUCAPALMA_ATAQUES=[
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
]
tucapalma.ataques.push(...TUCAPALMA_ATAQUES)

const PYDOS_ATAQUES=[
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
]
pydos.ataques.push(...PYDOS_ATAQUES)

mokepones.push(hipodoge,capipepo, ratigueya, langostelvis,tucapalma, pydos)

function iniciarJuego(){
    
    seccionAtaque.style.display="none"  
    seccionReiniciar.style.display="none"
    seccionVerMapa.style.display="none"   
    
    mokepones.forEach((Mokepon)=>{
        opcionDeMokepones=` 
        <input type="radio" name="mascota" id=${Mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${Mokepon.nombre}>
            <p>${Mokepon.nombre}</p>
            <img src=${Mokepon.foto} alt=${Mokepon.nombre}>
                        
        </label>        
        `  
    contenedorTarjetas.innerHTML+= opcionDeMokepones

        inputHipodoge =document.getElementById("Hipodoge")
        inputCapipepo =document.getElementById("Capipepo")
        inputRatigueya =document.getElementById("Ratigueya")
        inputLangostelvis=document.getElementById("Langostelvis")
        inputTucapalma=document.getElementById("Tucapalma")
        inputPydos=document.getElementById("Pydos")        
    })
    
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)    
    
    botonReiniciar.addEventListener("click", reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function(res){            
            if(res.ok){
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId=respuesta
                    })
            }
        }) 
}

function seleccionarMascotaJugador(){           
       
   if(inputHipodoge.checked){
    spanMascotaJugador.innerHTML= inputHipodoge.id
    mascotaJugador= inputHipodoge.id
   }else if(inputCapipepo.checked){
    spanMascotaJugador.innerHTML= inputCapipepo.id
    mascotaJugador= inputCapipepo.id
   }else if(inputRatigueya.checked){
    spanMascotaJugador.innerHTML=inputRatigueya.id
    mascotaJugador=inputRatigueya.id
    }else if(inputLangostelvis.checked){
    spanMascotaJugador.innerHTML=inputLangostelvis.id
    mascotaJugador=inputLangostelvis.id
    }else if(inputTucapalma.checked){
    spanMascotaJugador.innerHTML=inputTucapalma.id
    mascotaJugador=inputTucapalma.id
    }else if(inputPydos.checked){
    spanMascotaJugador.innerHTML=inputPydos.id
    mascotaJugador=inputPydos.id
   }else {
    alert("DEBES SELECCIONAR TU MASCOTA")
        return
   }

    seccionMascota.style.display="none" 

    seleccionarMokepon(mascotaJugador)
            
    extraerAtaque(mascotaJugador)  
    seccionVerMapa.style.display="flex"
    iniciarMapa()   
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })    
}

function extraerAtaque(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador===mokepones[i].nombre){
            ataques=mokepones[i].ataques
        }             
    }    
    mostrarAtaques(ataques)   
}


function mostrarAtaques(ataques){
    ataques.forEach((ataque)=>{
        ataquesMokepon =`
        <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML+=ataquesMokepon
        
    })  
 
    botonAgua=document.getElementById("boton-agua")
    botonTierra=document.getElementById("boton-tierra")
    botonFuego=document.getElementById("boton-fuego")
    
    botones=document.querySelectorAll(".BAtaque")  
    
    
}

function seleccionarMascotaEnemigo(avatarMokeponEnemigo){
    //let mascotaAleatorio=aleatorio(0, mokepones.length-1)   
    //spanMascotaEnemigo.innerHTML= mokepones[mascotaAleatorio].nombre
    //ataquesMokeponEnemigo= mokepones[mascotaAleatorio].ataques
    spanMascotaEnemigo.innerHTML=avatarMokeponEnemigo.nombre
    ataquesMokeponEnemigo= avatarMokeponEnemigo.ataques
    secuenciaAtaque()
}

function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener("click", (e)=>{
            if(e.target.innerText=== "🌱") {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#CBEDD5"
                boton.disabled=true                
            }
            else if(e.target.innerText==="🔥"){
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background="#CBEDD5"
                boton.disabled=true
            }
            else{
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background= "#CBEDD5"
                boton.disabled=true
            }
            //seleccionarAtaqueEnemigo()
            if(ataqueJugador.length===5){
                enviarAtaques()
            }
        })
    })    
}

function enviarAtaques(){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo=setInterval(obtenerAtaques,50)
}

function obtenerAtaques(){
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then(function(res){
            if (res.ok){
                res.json()
                    .then(function({ataques}){
                        if(ataques.length===5){

                            ataqueEnemigo=ataques
                            combate()
                        }
                    })
            }
        })
}

function seleccionarAtaqueEnemigo(){
    console.log("ataques enemigo", ataquesMokeponEnemigo);
    let ataqueAleatorio=aleatorio(0,ataquesMokeponEnemigo.length-1)
   
    if(ataquesMokeponEnemigo[ataqueAleatorio].nombre=="🌱"){
        ataqueEnemigo.push("TIERRA")
    } else if(ataquesMokeponEnemigo[ataqueAleatorio].nombre=="🔥"){
        ataqueEnemigo.push("FUEGO")
    }else {ataqueEnemigo.push("AGUA")}
   
    console.log(ataqueEnemigo)

   iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length===5){
        combate()
    }
}

function indexambosOponentes(jugador, enemigo){
    indexAtaqueJugador= ataqueJugador[jugador]
    indexAtaqueEnemigo=ataqueEnemigo[enemigo]
}

function combate(){ 
    clearInterval(intervalo)    
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index]===ataqueEnemigo[index]){
            indexambosOponentes(index, index)
            crearMensaje("EMPATE")
            victoriasEnemigo
            victoriasJugador
            spanVictoriasEnemigo.innerHTML=victoriasEnemigo
            spanVictoriasJugador.innerHTML= victoriasJugador
        } else if(ataqueJugador[index]==="FUEGO" && ataqueEnemigo[index] ==="TIERRA"){
            indexambosOponentes(index,index)
            crearMensaje("GANASTE")
            victoriasJugador++            
            spanVictoriasJugador.innerHTML= victoriasJugador
            spanVictoriasEnemigo.innerHTML=victoriasEnemigo

        } else if (ataqueJugador[index]==="AGUA" && ataqueEnemigo[index]==="FUEGO"){
            indexambosOponentes(index,index)
            crearMensaje("GANASTE")
            victoriasJugador++            
            spanVictoriasJugador.innerHTML= victoriasJugador
            spanVictoriasEnemigo.innerHTML=victoriasEnemigo  
        } else if (ataqueJugador[index]==="TIERRA" && ataqueEnemigo[index]==="AGUA" ){
            indexambosOponentes(index,index)
            crearMensaje("GANASTE")
            victoriasJugador++            
            spanVictoriasJugador.innerHTML= victoriasJugador
            spanVictoriasEnemigo.innerHTML=victoriasEnemigo
        } else{
            indexambosOponentes(index,index)        
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVictoriasEnemigo.innerHTML=victoriasEnemigo
            spanVictoriasJugador.innerHTML=victoriasJugador
        }
        
    }     
    revisarVidas()
}

function crearMensaje(resultado){            
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")   

    seccionMensaje.innerHTML= resultado
    nuevoAtaqueDelJugador.innerHTML= indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML= indexAtaqueEnemigo   
    
    divAtaqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    divAtaqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal){       
    seccionMensaje.innerHTML= resultadoFinal        
    
    seccionReiniciar.style.display="block"
}


function revisarVidas(){
    if(victoriasEnemigo===victoriasJugador){
    crearMensajeFinal("ESTO FUE UN EMPATE!! 🎉")
    }else if(victoriasEnemigo<victoriasJugador){
    crearMensajeFinal("FELICITACIONES, GANASTE!! 🎉🎉🎉")
    }else if(victoriasJugador<victoriasEnemigo){
        crearMensajeFinal("Lo siento, PERDISTE 🙁")    
    } 
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

function pintarCanvas(){ 
    imagenDeLaMascotaJugador.x= imagenDeLaMascotaJugador.x + imagenDeLaMascotaJugador.velocidadX
    imagenDeLaMascotaJugador.y= imagenDeLaMascotaJugador.y + imagenDeLaMascotaJugador.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height,
    )  
    imagenDeLaMascotaJugador.pintarAvatarDeMokepon()

    enviarPosicion(imagenDeLaMascotaJugador.x, imagenDeLaMascotaJugador.y)

    mokeponesEnemigos.forEach(function(mokepon){
        mokepon.pintarAvatarDeMokepon()
        revisarColision(mokepon)            
    })   
}

function enviarPosicion(x, y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method:"post",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })    
    .then(function (res) {
        if(res.ok){
            res.json()
                .then(function({enemigos}){
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function(enemigo){
                        let mokeponEnemigo= null
                        const mokeponNombre = enemigo.mokepon.nombre ||""
                        if(mokeponNombre==="Hipodoge"){
                            mokeponEnemigo = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png",5, "./assets/hipodoge.png", enemigo.id)
                        }else if (mokeponNombre ==="Capipepo") {
                            mokeponEnemigo= new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png", enemigo.id)
                        }else if (mokeponNombre=== "Ratigueya"){
                            mokeponEnemigo = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "./assets/ratigueya.png", enemigo.id)
                        }else if (mokeponNombre=== "Langostelvis"){
                            mokeponEnemigo = new Mokepon("Langostelvis","./assets/langostelvis.png", 5, "./assets/avatarLangostelvis.png", enemigo.id)
                        }else if (mokeponNombre==="Tucapalma"){
                            mokeponEnemigo= new Mokepon("Tucapalma", "./assets/tucapalma.png", 5, "./assets/avatartucapalma.png", enemigo.id)                            
                        }else if (mokeponNombre==="Pydos"){
                            mokeponEnemigo= new Mokepon("Pydos", "./assets/pydos.png", 5, "./assets/avatarPydos.png", enemigo.id)
                        }    
                        
                        mokeponEnemigo.x=enemigo.x
                        mokeponEnemigo.y=enemigo.y  
                        return mokeponEnemigo             
                    })                                
                                       
                })
        }
    })
}

function moverDerecha(){
    imagenDeLaMascotaJugador.velocidadX= 5
}
function moverIzquiera(){
    imagenDeLaMascotaJugador.velocidadX= -5
}
function moverArriba(){
    imagenDeLaMascotaJugador.velocidadY=-5
}
function moverAbajo(){
    imagenDeLaMascotaJugador.velocidadY= 5
}

function detenerMovimiento(){
    imagenDeLaMascotaJugador.velocidadX=0
    imagenDeLaMascotaJugador.velocidadY=0
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case "ArrowUp":
            moverArriba()            
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquiera()
            break
        case "ArrowRight":
            moverDerecha()
            break   
        default:
            break
    } 
}

function iniciarMapa(){    
    imagenDeLaMascotaJugador=obtenerObjetoMokepon(mascotaJugador)
    intervalo=setInterval(pintarCanvas, 50)
    window.addEventListener("keydown", sePresionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoMokepon(){
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador===mokepones[i].nombre){
            return mokepones[i]
        }             
    }  
}

function revisarColision(enemigo){
    const arribaDeAvatarMokeponJugador= imagenDeLaMascotaJugador.y
    const abajoDeAvatarMokeponJugador=imagenDeLaMascotaJugador.y + imagenDeLaMascotaJugador.alto
    const derechaDeAvatarMokeponJugador= imagenDeLaMascotaJugador.x + imagenDeLaMascotaJugador.ancho
    const izquierdaDeAvatarMokeponJugador=imagenDeLaMascotaJugador.x
    
    const arribaEnemigo=enemigo.y
    const abajoEnemigo=enemigo.y + enemigo.alto
    const derechaEnemigo=enemigo.x + enemigo.ancho
    const izquierdaEnemigo=enemigo.x

    if (arribaDeAvatarMokeponJugador>abajoEnemigo||
        abajoDeAvatarMokeponJugador<arribaEnemigo||
        derechaDeAvatarMokeponJugador< izquierdaEnemigo||
        izquierdaDeAvatarMokeponJugador>derechaEnemigo
    ){
        return
    } 
    detenerMovimiento()
    clearInterval(intervalo)
    console.log("se detecto una colision");

    enemigoId = enemigo.id
    seccionAtaque.style.display="flex"
    seccionVerMapa.style.display="none"         
    seleccionarMascotaEnemigo(enemigo)  
}
window.addEventListener("load",iniciarJuego)