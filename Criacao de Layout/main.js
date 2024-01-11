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
    nome: 'Jantar',
    periodo: Periodos.Noite
}, {
    id: 2,
    nome: 'Escovar os Dentes',
    periodo: Periodos.Dia
}, {
    id: 3,
    nome: 'Lavar o Rosto',
    periodo: Periodos.Dia
}, {
    id: 4,
    nome: 'Escovar os Dentes',
    periodo: Periodos.Noite
}, {
    id: 5,
    nome: 'Ler livro',
    periodo: Periodos.Noite
}, {
    id: 6,
    nome: 'Arrumar a cama',
    periodo: Periodos.Dia
}, {
    id: 7,
    nome: 'Deitar',
    periodo: Periodos.Noite
}];

let proximoIdTarefa = 8;

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
        return;
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

    if (confirm("Deseja mesmo apagar a tarefa?")) {
        remove(tarefa, tarefas);
    } 

    rerender();
}

function remove(element, arr) {
    const elementIdx = arr.findIndex(x => x == element);
    arr = arr.splice(elementIdx, 1);
}

function print(element, msg) {
    console.log(`${msg}: ${element}`);
}