
window.addEventListener("load", iniciar, false);

var intentos = 0;

function iniciar() {
    document.getElementById("btnEnviar").addEventListener("click", validar, false);
    document.getElementById("nombre").addEventListener("blur", mayuscula, false);
    document.getElementById("apellidos").addEventListener("blur", mayuscula, false);
    document.getElementById("btnClear").addEventListener("click", limpiar, false);
}

function limpiar() {
    let formulario = document.getElementById("formulario");

    for (let i = 0; i < formulario.elements.length; i++) {
        if (formulario.elements[i].hasAttribute("class")) {
            formulario.elements[i].removeAttribute("class");
        }
    }
    document.getElementById("errores").innerHTML = "";
    document.getElementById("intentos").innerHTML = "";
}

function mayuscula() {
    var aux;
    aux = "";
    for (var i = 0; i < this.value.length; i++) {
        if (i == 0) {
            aux += this.value[i].toUpperCase();
        } else if (this.value[i - 1] == " ") {
            aux += this.value[i].toUpperCase();
        } else {
            aux += this.value[i];
        }
    }

    this.value = aux;
}

function validar(e) {
    document.getElementById("errores").innerHTML = "";
    if (validaNombre() && validaApellido() && validaEdad() && validaNIF() && validaEmail()
        && validaProvincia() && validaFecha() && validaTelefono() && validaHora()) {

        alert("Todos los campos son correctos, ahora se procederá a su envío");

    } else {
        if (!validaNombre()) {
            document.getElementById("errores").innerHTML += "<p><strong><font color='red'>Error al introducir el nombre</font></strong></p>";
        }

        if (!validaApellido()) {
            document.getElementById("errores").innerHTML += "<p><strong><font color='red'>Error al introducir los apellidos</font></strong></p>";
        }

        if (!validaEdad()) {
            document.getElementById("errores").innerHTML += "<p><strong><font color='red'>Error al introducir la edad</font></strong></p>";
        }

        if (!validaNIF()) {
            document.getElementById("errores").innerHTML += "<p><strong><font color='red'>Error al introducir el nif</font></strong></p>";
        }

        if (!validaEmail()) {
            document.getElementById("errores").innerHTML += "<p><strong><font color='red'>Error al introducir el email</font></strong></p>";
        }

        if (!validaProvincia()) {
            document.getElementById("errores").innerHTML += "<p><strong><font color='red'>Error al introducir la provincia</font></strong></p>";
        }

        if (!validaFecha()) {
            document.getElementById("errores").innerHTML += "<p><strong><font color='red'>Error al introducir la fecha de nacimiento</font></strong></p>";
        }

        if (!validaTelefono()) {
            document.getElementById("errores").innerHTML += "<p><strong><font color='red'>Error al introducir el teléfono</font></strong></p>";
        }

        if (!validaHora()) {
            document.getElementById("errores").innerHTML += "<p><strong><font color='red'>Error al introducir la hora de visita</font></strong></p>";
        }

        aumentaIntentos();
        e.preventDefault();
    }
}

function aumentaIntentos() {
    intentos++;
    document.getElementById("intentos").innerHTML = "<p>Intento número: " + intentos + "</p>";
}

function validaNombre() {
    let nombre = document.getElementById("nombre");

    if (nombre.value.trim() != "") {
        if (nombre.hasAttribute("class")) {
            nombre.removeAttribute("class");
        }
        return true;
    }
    nombre.setAttribute("class", "error");
    return false;
}

function validaApellido() {
    let apellido = document.getElementById("apellidos");
    if (apellido.value != "") {
        if (apellido.hasAttribute("class")) {
            apellido.removeAttribute("class");
        }
        return true;
    }

    apellido.setAttribute("class", "error");
    return false;
}


function validaEdad() {
    let edad = document.getElementById("edad");

    let esNumero = isNaN(parseInt(edad.value));

    if (!esNumero && parseInt(edad.value) >= 0 && parseInt(edad.value) <= 105) {
        if (edad.hasAttribute("class")) {
            edad.removeAttribute("class");
        }
        return true;
    }

    edad.setAttribute("class", "error");
    return false;
}

function validaNIF() {
    let nif = document.getElementById("nif");

    let expr = /^\d{8}[-]{1}[A-Z a-z]{1}$/

    if (expr.test(nif.value)) {
        if (compruebaLetraNIF(nif.value)) {
            if (nif.hasAttribute("class")) {
                nif.removeAttribute("class");
            }
            return true;
        }
    }

    nif.setAttribute("class", "error");
    return false;

}

function compruebaLetraNIF(dniCompleto) {
    let letra = dniCompleto[dniCompleto.length - 1];

    let numero = parseInt(dniCompleto.substring(0, dniCompleto.indexOf("-")))

    var letras = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B",
        "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];

    if (letra.toUpperCase() == letras[(numero % 23)]) {
        return true
    }

    return false;
}

function validaEmail() {
    let email = document.getElementById("email");
    let regExpr = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9._-]+\.[A-Za-z]{2,4}$/;

    if (regExpr.test(email.value)) {
        if (email.hasAttribute("class")) {
            email.removeAttribute("class");
        }
        return true;
    }

    email.setAttribute("class", "error");
    return false;
}

function validaProvincia() {
    let prov = document.getElementById("provincia");
    if (prov.value != "0") {
        if (prov.hasAttribute("class")) {
            prov.removeAttribute("class");
        }
        return true;
    }

    prov.setAttribute("class", "error");
    return false;
}

function validaFecha() {
    let fechaNac = document.getElementById("fecha");

    let expr = /^[0-9]{2}[/ -]{1}[0-9]{2}[/ -]{1}[0-9]{4}$/

    let fechaActual = new Date();
    let fechaN = new Date(fechaNac.value);

    if (expr.test(fechaNac.value)) {
        if (fechaActual > fechaN) {
            if (fechaNac.hasAttribute("class")) {
                fechaNac.removeAttribute("class")
            }
            return true;
        }
    }

    fechaNac.setAttribute("class", "error");
    return false;
}

function validaTelefono() {
    let tlf = document.getElementById("telefono");
    let expr = /[0-9]{9}/;

    if (expr.test(tlf.value)) {
        if (tlf.hasAttribute("class")) {
            tlf.removeAttribute("class");
        }
        return true;
    }
    tlf.setAttribute("class", "error");
    return false;
}

function validaHora() {
    let horaVisita = document.getElementById("hora");

    let expr = /^[0-9]{2}[:]{1}[0-9]{2}$/

    if (expr.test(horaVisita.value)) {
        if (horaVisita.hasAttribute("class")) {
            horaVisita.removeAttribute("class")
        }
        return true;
    }

    horaVisita.setAttribute("class", "error");
    return false;
}