const listaInput = document.querySelector(".lista__input input"),
tarefasBox = document.querySelector(".tarefas");

let editaId;
let tarefaEditada = false;

let tarefas = JSON.parse(localStorage.getItem("lista-tarefas"));    

function mostraTarefa() {
    let li = "";
    if (tarefas) {
        tarefas.forEach((tarefa, id) => {
            let tarefaCompleta = tarefa.status == "verificada" ? "completa" : "";
            li += `<li class="tarefa">
                <label for="${id}">
                    <input onclick="atualizaStatus(this)" type="checkbox" id="${id}" ${tarefaCompleta}>
                    <p class="${tarefaCompleta}">${tarefa.name}</p>
                </label>
                <div class="tarefa__configuracoes">
                    <i onclick="mostraMenu(this)" class="fa-solid fa-ellipsis"></i>
                    <ul class="tarefa__menu">
                        <li onclick = "editaTarefa(${id}, '${tarefa.name}')" ><i class="fa-solid fa-pencil"></i>Editar</li>
                        <li onclick = "deletaTarefa(${id})" ><i class="fa-solid fa-trash-can"></i>Excluir</li>
                    </ul>
                </div>
            </li>`
        });
    }
    tarefasBox.innerHTML = li;
}

mostraTarefa();

function mostraMenu(tarefaSelecionada) {
    let tarefaMenu = tarefaSelecionada.parentElement.lastElementChild;
    tarefaMenu.classList.add("mostra");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != tarefaSelecionada){
            tarefaMenu.classList.remove("mostra");
        }
    })
    
}

function editaTarefa(id, tarefa){
    editaId = id;
    tarefaEditada = true;
    listaInput.value = tarefa;
}

function deletaTarefa(deleteId) {
    tarefas.splice(deleteId, 1);
    localStorage.setItem("lista-tarefas", JSON.stringify(tarefas));
    
    mostraTarefa();
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

listaInput.addEventListener("keyup", e => {
    let tarefaUsuario = listaInput.value.trim();
    if (e.key == "Enter" && tarefaUsuario) {
        if (!tarefaEditada) {
            if (!tarefas) {
                tarefas = [];
            }
            let infoTarefa = {name: tarefaUsuario, status: "pendente"};
            tarefas.push(infoTarefa);
        } else {
            tarefaEditada = true;
            tarefas[editaId].name = tarefaUsuario;
        }
        
        listaInput.value = "";
        localStorage.setItem("lista-tarefas", JSON.stringify(tarefas));
        mostraTarefa();
    }
})