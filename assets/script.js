const listaInput = document.querySelector(".lista__input input"),
tarefasBox = document.querySelector(".tarefas");

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
                        <li><i class="fa-solid fa-pencil"></i>Editar</li>
                        <li><i class="fa-solid fa-trash-can"></i>Excluir</li>
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
        if (!tarefas) {
            tarefas = [];
        }
        listaInput.value = "";
        let infoTarefa = {name: tarefaUsuario, status: "pendentes"};
        tarefas.push(infoTarefa);
        localStorage.setItem("lista-tarefas", JSON.stringify(tarefas));
        mostraTarefa();
    }
})