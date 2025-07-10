window.addEventListener('load', iniciar);

function iniciar(){
    let entrada = document.getElementById("nuevaTarea");
    let boton = document.getElementById("añadir");
    let lista = document.getElementById("listaTareas");

    //Cargar tareas guardadas
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareas.forEach(tarea => agregarTarea(tarea.texto, tarea.completada));

    boton.addEventListener('click', function (){
        let texto = entrada.value.trim();
        if (texto !== ''){
            agregarTarea(texto, false);
            guardarTareas();
            entrada.value = '';
        } else{
            alert('No has escrito ninguna tarea');
        }
    });

    function agregarTarea(texto, completada){
        let li = document.createElement('li');
        li.className = 'tarea';

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'completado';
        checkbox.checked = completada;

        let spanTexto = document.createElement('span');
        spanTexto.textContent = texto;
        if (completada) spanTexto.classList.add('tachar');

        let eliminar = document.createElement('button');
        eliminar.className = 'eliminar';
        
        let img = document.createElement('img');
        img.src = './goma-de-borrar.png';
        img.alt = 'Borrar';
        img.style.width = '20px';
        img.style.height = '20px';

        eliminar.appendChild(img);
        li.appendChild(checkbox);
        li.appendChild(spanTexto);
        li.appendChild(eliminar);
        lista.appendChild(li);

        checkbox.addEventListener('click', function(){
            spanTexto.classList.toggle('tachar');
            guardarTareas();
        });

        eliminar.addEventListener('click', function(){
            li.classList.add('borrando');
            setTimeout(() => {
                li.remove();
                guardarTareas();
            }, 500);
        });
    }

    function guardarTareas(){
        let tareas = [];
        lista.querySelectorAll('.tarea').forEach(li => {
            let texto = li.querySelector('span').textContent;
            let completada = li.querySelector('input[type="checkbox"]').checked;
            tareas.push({ texto, completada });
        });
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
}


