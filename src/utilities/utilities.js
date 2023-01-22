export function convertFecha(dato) {
    const fecha = dato.split(" ")[0].split(".");
    const dia = fecha[0];
    const mes = fecha[1];
    const año = fecha[2];
    let nombreMeses = {
        "01": "Enero",
        "02": "Febrero",
        "03": "Marzo",
        "04": "Abril",
        "05": "Mayo",
        "06": "Junio",
        "07": "Julio",
        "08": "Agosto",
        "09": "Septiembre",
        10: "Octubre",
        11: "Noviembre",
        12: "Diciembre",
    };

    return `${dia} ${nombreMeses[mes]} ${año}`;
}

export function getDate() {
    let fecha = new Date();
    let day = fecha.getDate();
    let mes = fecha.getMonth();
    let ahno = fecha.getFullYear();
    return `${day}/${mes + 1}/${ahno}`;
}

export function funcAgrupamientoActividades(listadoActividades) {
    let nuevoObjeto = {}
    let nuevoArr = []

    listadoActividades.forEach(actividad => {
        if (!nuevoObjeto.hasOwnProperty(actividad.fecha)) {
            nuevoObjeto[actividad.fecha] = {
                fecha: convertFecha(actividad.fecha),
                actividad: []
            }
        }

        nuevoObjeto[actividad.fecha].actividad.push({
            id: actividad.id,
            actividadDetalle: actividad.actividadDetalle,
            cliente: actividad.cliente.clienteNombre,
            horas: actividad.horas
        })

    })

    for (let clave in nuevoObjeto) {
        nuevoArr.push(nuevoObjeto[clave])
    }

    //console.log(nuevoArr)
    return nuevoArr
}







