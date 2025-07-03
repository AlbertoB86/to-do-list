window.addEventListener('load', iniciar);

function iniciar(){
    let entrada = document.getElementById("nuevaTarea");
    let boton = document.getElementById("añadir");
    let lista = document.getElementById("listaTareas");

    boton.addEventListener('click', function(){
        let texto = entrada.value.trim();

        if(texto !== ''){
            let li = document.createElement('li');
            li.className = 'tarea';
            li.textContent = texto;

            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'completado';

            let eliminar = document.createElement('button');
            eliminar.className = 'eliminar';
            eliminar.value = 'Eliminar';
            eliminar.textContent = 'X';
            
            li.prepend(checkbox);
            li.appendChild(eliminar);
            lista.appendChild(li);

            checkbox.addEventListener('click', function(){
                li.classList.add('tachar');
                
            });

            eliminar.addEventListener('click', function(){
                li.classList.add('borrando');
                setTimeout(() => {
                    li.remove();
                }, 700);
            });
            
            entrada.value = '';
        }
        else{
            alert('No has escrito ninguna tarea');
        }
    });
}


