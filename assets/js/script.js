const listaInput = document.querySelector(".lista__input input"),
filtros = document.querySelectorAll(".controles__filtros span"),
limpar = document.querySelector(".controles__limpar"),
tarefasBox = document.querySelector(".tarefas");

let editaId;
let tarefaEditada = false;
let tarefas = JSON.parse(localStorage.getItem("lista-tarefas"));    


filtros.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        mostraTarefa(btn.id);

    });
});


function mostraTarefa(filtro) {
    let li = "";
    if (tarefas) {
        tarefas.forEach((tarefa, id) => {
            let tarefaCompleta = tarefa.status == "completa" ? "verificada" : "";
            if(filtro == tarefa.status || filtro == "todos"){
                li += `<li class="tarefa">
                    <label for="${id}">
                        <input onclick="atualizaStatus(this)" type="checkbox" id="${id}" ${tarefaCompleta}>
                        <p class="${tarefaCompleta}">${tarefa.name}</p>
                    </label>
                    <div class="tarefa__configuracoes">
                        <i onclick="mostraMenu(this)" class="fa-solid fa-ellipsis"></i>
                        <ul class="tarefa__menu">
                            <li onclick = 'editaTarefa(${id}, "${tarefa.name}")' ><i class="fa-solid fa-pencil"></i>Editar</li>
                            <li onclick = 'deletaTarefa(${id}, "${filtro}")' ><i class="fa-solid fa-trash-can"></i>Excluir</li>
                        </ul>
                    </div>
                </li>`;
            }
        });
    }
    tarefasBox.innerHTML = li || '<span>Você não possui nenhuma tarefa aqui</span>';
    
    let verificaTarefa = tarefasBox.querySelectorAll(".tarefa");
    !verificaTarefa.length ? limpar.classList.remove("active") : limpar.classList.add("active");
    tarefasBox.offsetHeight >= 300 ? tarefasBox.classList.add("overflow") : tarefasBox.classList.remove("overflow");
}

mostraTarefa("todos");

function mostraMenu(tarefaSelecionada) {
    let tarefaMenu = tarefaSelecionada.parentElement.lastElementChild;
    tarefaMenu.classList.add("mostra");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != tarefaSelecionada){
            tarefaMenu.classList.remove("mostra");
        }
    })
    
}

function atualizaStatus(tarefaSelecionada) {
    let tarefaNome = tarefaSelecionada.parentElement.lastElementChild;
    if (tarefaSelecionada.checked) {
        tarefaNome.classList.add("verificada");
        tarefas[tarefaSelecionada.id].status = "completa";
    } 
    else {
        tarefaNome.classList.remove("verificada");
        tarefas[tarefaSelecionada.id].status = "pendente";
    }
    localStorage.setItem("lista-tarefas", JSON.stringify(tarefas));
}

function editaTarefa(id, tarefa){
    editaId = id;
    tarefaEditada = true;
    listaInput.value = tarefa;
    listaInput.focus();
    listaInput.classList.add("active");
}

function deletaTarefa(deleteId, filtro) {
    tarefaEditada = false;
    tarefas.splice(deleteId, 1);
    localStorage.setItem("lista-tarefas", JSON.stringify(tarefas));
    
    mostraTarefa(filtro);
}

limpar.addEventListener("click", () => {
    tarefaEditada = false;
    tarefas.splice(0, tarefas.length);
    localStorage.setItem("lista-tarefas", JSON.stringify(tarefas));
    mostraTarefa(filtro);
});


listaInput.addEventListener("keyup", e => {
    let tarefaUsuario = listaInput.value.trim();
    if (e.key == "Enter" && tarefaUsuario) {
        if (!tarefaEditada) {
                tarefas = !tarefas ? [] : tarefas;
                let infoTarefa = {name: tarefaUsuario, status: "pendente"};
                tarefas.push(infoTarefa);
            }
        else {
            tarefaEditada = false;
            tarefas[editaId].name = tarefaUsuario;
        }
        
        listaInput.value = "";
        localStorage.setItem("lista-tarefas", JSON.stringify(tarefas));
        mostraTarefa(document.querySelector("span.active").id);
    }
});