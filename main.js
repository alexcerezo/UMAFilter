// ==UserScript==
// @name        UMAFilter
// @namespace   uma.filtro.asignaturas
// @match       https://informatica.cv.uma.es/?tab=oficiales
// @grant       none
// @version     1.3
// @author      Alejandro Cerezo Contreras - GitHub @alexcerezo
// @description Filtra asignaturas usando el bloque específico del código de asignatura (ej: 0301)
// @homepage    https://github.com/alexcerezo/UMAFilter
// @license     MIT
// ==/UserScript==

(function() {
    'use strict';

    // ================= CONFIGURACIÓN =================
    // Introduce los códigos de las 5 asignaturas de este cuatrimestre.
    // Ejemplo: Para "5388-25-0301-A", usa "0301"
    const MIS_ASIGNATURAS_CUATRI = ["0306", "0307", "0308", "0309", "0865"];
    // =================================================

    function aplicarFiltro() {
        // Buscamos la tabla de matriculación oficial
        const tabla = document.querySelector('table.generaltable');
        if (!tabla) console.log("Tabla no encontrada");

        const filas = tabla.querySelectorAll('tbody tr');

        filas.forEach(fila => {
            const celdaCodigo = fila.querySelector('td.cell.c0');

            if (celdaCodigo) {
                // Extraemos la parte de la asignatura (lo que hay entre el 2º y 3º guion)
                // Split por '-' genera ["5388", "25", "0301", "A"] -> El índice 2 es "0301"
                const idAsignatura = celdaCodigo.innerText.trim().split('-')[2];

                if (!MIS_ASIGNATURAS_CUATRI.includes(idAsignatura)) {
                    fila.style.display = 'none';
                }
            }
        });
    }

    // Ejecución inmediata y retardada para asegurar que el contenido de Moodle está ahí
    aplicarFiltro();
    window.addEventListener('load', aplicarFiltro);

    // Por si el campus tarda en renderizar la tabla con JS propio
    setTimeout(aplicarFiltro, 500);
    setTimeout(aplicarFiltro, 2000);

})();
