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

function notasDeMaterias() {
    const materia = prompt("Ingrese el nombre de la materia:");
    const cantidadNotas = parseInt(prompt("Cantidad de notas que tiene:"))
    return { materia, cantidadNotas }
}

function obtenerNotas(cantidadNotas) {
    const notas = []
    for (let i = 0; i < cantidadNotas; i++) {
        let nota = parseInt(prompt("Ingrese la nota:"))
        notas.push(nota)
    }
    return notas
}

function calcularPromediosAlumnos() {
    const cantidadAlumnos = parseInt(prompt("¿Cuántos alumnos quiere calcular?"))
    for (let i = 0; i < cantidadAlumnos; i++) {
        const { materia, cantidadNotas } = notasDeMaterias()
        const notas = obtenerNotas(cantidadNotas)
        
        const nombre = prompt("Ingrese el nombre del estudiante:")
        const alumno = new Persona(nombre)
        alumno.agregarNotas(notas)

        console.log("Su promedio en " + materia + " es " + alumno.notaFinal + " de " + nombre +". Esta " + alumno.obtenerResultado())
    }
}

calcularPromediosAlumnos()