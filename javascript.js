class Persona {
    constructor(nombre) {
        this.nombre = nombre
        this.notas = []
        this.notaFinal = 0
    }

    agregarNotas(notas) {
        this.notas = notas
        this.calcularNotaFinal()
    }

    calcularNotaFinal() {
        const sumaNotas = this.notas.reduce((acc, nota) => acc + nota, 0)
        if (this.notas.length > 0) {
            this.notaFinal = sumaNotas / this.notas.length
        } else {
            this.notaFinal = 0
        }
    }

    obtenerResultado() {
        if(this.notaFinal < 6){
            return "no aprobado"
        }
        else {
            return "aprobado"
    }}
}
document.getElementById('calcularboton').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value.trim()
    const materia = document.getElementById('materia').value.trim()
    const notasInput = document.getElementById('notas').value

    if (!nombre || !materia || !notasInput) {
    let resultadoDiv = document.getElementById("resultado")
    resultadoDiv.innerHTML="Por favor, complete todos los campos correctamente."
    return
    }

    const notas = notasInput.split(',').map(nota => {
        const trimmedNota = parseFloat(nota.trim())
        return !isNaN(trimmedNota) && trimmedNota >= 0 && trimmedNota <= 10 ? trimmedNota : null
    }).filter(nota => nota !== null)

    if (notas.length === 0) {
        alert("Ingrese al menos una nota válida entre 0 y 10.")
        return
    }

    const alumno = new Persona(nombre)
    alumno.agregarNotas(notas)
    mostrarResultado(alumno, materia)
    almacenarDatosEnLocalStorage(alumno, materia)
})

function mostrarMensaje(mensaje) {
    const resultadoDiv = document.getElementById('resultado')
    resultadoDiv.innerHTML = `<span>${mensaje}</span>`
}

function almacenarDatosEnLocalStorage(alumno, materia) {
    const datosExistentes = JSON.parse(localStorage.getItem('datosEstudiantes')) || []
    const nuevoRegistro = {
        nombre: alumno.nombre,
        materia: materia,
        notas: alumno.notas,
        promedio: alumno.notaFinal,
        estado: alumno.obtenerResultado()
    };
    
    datosExistentes.push(nuevoRegistro)
    localStorage.setItem('datosEstudiantes', JSON.stringify(datosExistentes))
    console.log("Datos almacenados en localStorage:", datosExistentes)
}

document.getElementById('cargarJsonboton').addEventListener('click', () => {
    const datosJSON = localStorage.getItem('datosEstudiantes')
    if (datosJSON) {
        mostrarListaEstudiantes(JSON.parse(datosJSON))
    } else {
        mostrarMensaje("No hay datos almacenados.")
    }
})

function mostrarListaEstudiantes(datos) {
    const resultadoDiv = document.getElementById('resultado')
    resultadoDiv.innerHTML = ''; 

    const lista = document.createElement('ul')
    
    datos.forEach(data => {
        const li = document.createElement('li')
        li.innerHTML = `${data.nombre} - ${data.materia}: Promedio <strong>${data.promedio.toFixed(2)}</strong>, Estado: <strong>${data.estado}</strong>`
        lista.appendChild(li)
    })
    
    resultadoDiv.appendChild(lista)
}

function mostrarResultado(alumno, materia) {
    const resultadoDiv = document.getElementById('resultado')
    resultadoDiv.innerHTML = `
        Su promedio en <strong>${materia}</strong> es <strong>${alumno.notaFinal.toFixed(2)}</strong> de <strong>${alumno.nombre}</strong>. Esta <strong>${alumno.obtenerResultado()}</strong>.
    `
}

window.onload = () => {
    const datosJSON = localStorage.getItem('datosEstudiantes')
    if (datosJSON) {
        const datos = JSON.parse(datosJSON)
        datos.forEach(data => {
            const alumno = new Persona(data.nombre)
            alumno.agregarNotas(data.notas)
            mostrarResultado(alumno, data.materia)
        })
    }
};