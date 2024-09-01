function notasDeMaterias(){
    let materia= prompt("nombre de la materia")
    let cantidadnotas= parseInt(prompt("cantidad de notas que tiene"))
    return  { materia, cantidadnotas };
}
function calcularpromedio(numero1, numero2){
    return numero1 / numero2;
}

const opcion= parseInt(prompt("cantidad de materias que desea calcular el promedio"))
for(let i = 0; i < opcion ; i++) {
    const { materia, cantidadnotas } = notasDeMaterias()
    let sumaNotas= 0
    for (let j = 0 ; j < cantidadnotas ; j++){
        let j = parseInt(prompt("ingrese la nota"))
        sumaNotas += j
    }
    let promedio= calcularpromedio(sumaNotas,cantidadnotas)
    let aprobadoDesaprobado
        if (promedio < 6){
            aprobadoDesaprobado= "No aprobado"
        }
        else {
            aprobadoDesaprobado= "aprobado"
        }
    console.log("su promedio en" + " " + materia + " " + "es" + " " + promedio + " " + "esta" + " " + aprobadoDesaprobado)
}