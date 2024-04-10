
const infoEmail = {
    nombre: '',
    email: '',
    mensaje: ''
}

// variables

const formulario = document.querySelector('#formulario');
const nombre = document.querySelector('#nombre');
const inputEmail = document.querySelector('#email');
const spinner = document.querySelector('#spinner')
const btnEnviar = document.querySelector('#enviar');
const inputMensaje = document.querySelector('#mensaje');

// eventos
nombre.addEventListener('input', validarFormulario);
inputEmail.addEventListener('input', validarFormulario);
inputMensaje.addEventListener('input',validarFormulario);
formulario.addEventListener('submit', enviarEmail);



// funciones

function validarFormulario(e){
    e.preventDefault();

    
    if(e.target.value.trim() === ''){
        alertaError(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
        infoEmail[e.target.name] = '';
        comprobarEmail();
        return;
    }

    if(e.target.id === 'email' && !validarEmail(e.target.value)){
        alertaError(`El campo ${e.target.id} no es valido`, e.target.parentElement);
        infoEmail[e.target.name] = '';
        comprobarEmail();
        return;
    }


    limpiarAlerta(e.target.parentElement);

    infoEmail[e.target.name] = e.target.value.trim().toLowerCase();

    comprobarEmail();

}

function alertaError(mensaje, referencia){
    const alerta = referencia.querySelector('.error');
    if(alerta){
        alerta.remove()
    }



    const error = document.createElement('p');
    error.textContent = mensaje;

    error.classList.add('error');

    // agregar el error

    referencia.appendChild(error);
    
}


function limpiarAlerta(referencia){
    const alerta = referencia.querySelector('.error');
    if(alerta){
        alerta.remove()
    }
}


function validarEmail(email){
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 

    const resultado = regex.test(email);

    return resultado;

}

function enviarEmail(e){


    spinner.style.display = 'flex';
    formulario.appendChild(spinner);

    setTimeout(() => {
        spinner.remove();

        formulario.reset();

        const correcto = document.createElement('p');
        correcto.classList.add('correcto');
        correcto.textContent = 'Mensaje enviado correctamente'
    
        formulario.appendChild(correcto);

        setTimeout(() => {
            correcto.remove();
        }, 3000);

    }, 3000);

}

function comprobarEmail(){
    if(Object.values(infoEmail).includes('')){
        btnEnviar.style.opacity = '0.5';
        btnEnviar.disabled = true;
    }else{
        btnEnviar.style.opacity = '1';
        btnEnviar.disabled = false;
    }

}

