const Periodos = {
    Dia: 'Dia',
    Noite: 'Noite'
};

const tarefas = [{
    id: 0,
    nome: 'Levantar',
    periodo: Periodos.Dia
}, {
    id: 1,
    nome: 'Dormir',
    periodo: Periodos.Noite
}];

let proximoIdTarefa = 2;

const listaDia = document.querySelector(`.lista-Dia`);
const listaNoite = document.querySelector(`.lista-Noite`);

const btnAdicionarTarefa = document.querySelector(".adicionar-tarefa");
btnAdicionarTarefa.addEventListener("click", criarTarefa);


// vantagens do render e rerender: facil de implementar (mais simples), porem menos performatico 
render();

function render() {
    tarefas.forEach(tarefa => {
        const tarefaListItem = createTarefaListItem(tarefa);
    
        if (tarefa.periodo == Periodos.Dia) {
            listaDia.appendChild(tarefaListItem);
        } else {
            listaNoite.appendChild(tarefaListItem);
        }
    });
}

function rerender() {
    listaDia.innerHTML = '';
    listaNoite.innerHTML = '';

    render();
}

function criarTarefa() {
    const radioDia = document.querySelector("#radio-dia");
    const input = document.querySelector(".nova-tarefa");
    const nomeTarefa = input.value;

    const periodoSelecionado = radioDia.checked ? Periodos.Dia : Periodos.Noite;

    if (!nomeTarefa) {
        alert("Não pode adicionar tarefas vazias.")
    }

    if (!periodoSelecionado) {
        alert("Favor selecionar em qual lista adicionar.")
        return;
    }

    const tarefa = {
        id: proximoIdTarefa,
        nome: nomeTarefa,
        periodo: periodoSelecionado
    };

    proximoIdTarefa++;
    tarefas.push(tarefa);

    rerender();

    // const tarefaListItem = createTarefaListItem(tarefa);

    // document.querySelector(`.lista-${tarefa.periodo}`).appendChild(tarefaListItem);

    input.value = "";
}

function createTarefaListItem(tarefa) {
    const li = document.createElement("li");
    li.id = tarefa.id;
    li.classList.add('pb-3');

    const nomeTarefa = document.createElement('span');
    nomeTarefa.innerHTML = tarefa.nome;

    li.appendChild(nomeTarefa);

    const removerTarefaBtn = document.createElement('button');
    removerTarefaBtn.id = `removerTarefa${tarefa.id}`;
    removerTarefaBtn.innerHTML = 'X';

    removerTarefaBtn.classList.add('btn', 'btn-danger', 'remover-tarefa', 'float-end', 'me-2');

    removerTarefaBtn.dataset.tarefaId = tarefa.id;
    removerTarefaBtn.addEventListener('click', removerTarefa);

    li.appendChild(removerTarefaBtn);

    return li;
}

function removerTarefa(event) { 
    const button = event.target;

    const tarefa = tarefas.find(t => t.id == button.dataset.tarefaId);

    remove(tarefa, tarefas);

    rerender();
}

function remove(element, arr) {
    const elementIdx = arr.findIndex(x => x == element);
    arr = arr.splice(elementIdx, 1);
}