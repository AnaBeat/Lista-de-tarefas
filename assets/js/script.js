const listaInput = document.querySelector(".lista__input input"),
tarefasBox = document.querySelector(".tarefas");

let tarefas = JSON.parse(localStorage.getItem("lista-tarefas"));    

function mostraTarefa() {
    let li = "";
    tarefas.forEach((tarefa, id) => {
        li += `<li class="tarefa">
            <label for="${id}">
                <input type="checkbox" id="${id}">
                <p>${tarefa.name}</p>
            </label>
            <div class="tarefa__configuracoes">
                <i class="fa-solid fa-ellipsis"></i>
                <ul class="tarefa__menu">
                    <li><i class="fa-solid fa-pencil"></i>Editar</li>
                    <li><i class="fa-solid fa-trash-can"></i>Excluir</li>
                </ul>
            </div>
        </li>`
    });
    tarefasBox.innerHTML = li;
}

mostraTarefa();

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