const form = document.getElementById('my_form');

const imgAprovado = '<img src="./img/aprovado.png"'
const imgReprovado = '<img src="./img/reprovado.png"'
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';

const cssContainer = document.querySelector('.container');

let linhas = '';


form.addEventListener('submit', function(e){
    e.preventDefault();
    adicionaLinha();
    atualizaTabela();
    atualizaMedia();
    mediaFinal(atualizaMedia());
});

function adicionaLinha(){
    const inputNomeAtividade = document.getElementById('name_activity');
    const inputNoteAtividade = document.getElementById('note');
    if(atividades.includes(inputNomeAtividade.value)){
        alert(`Atividade ${inputNomeAtividade.value} já adicionada`);
    }else{
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNoteAtividade.value));
        
        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNoteAtividade.value}</td>`;
        linha += `<td>${inputNoteAtividade.value >=7 ? imgAprovado : imgReprovado }</td>`;
        linha += '</tr>';
        
        linhas += linha;
        
    }
    inputNomeAtividade.value = '';
    inputNoteAtividade.value = '';
}
function atualizaTabela(){
    const bodyTable = document.querySelector('tbody');
    bodyTable.innerHTML = linhas;
}
function atualizaMedia(){
    let somaNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaNotas += notas[i];
    }
    const media = somaNotas / notas.length;
    return media;
}

function mediaFinal(mediaa) {

    let linhaMedia = '<tr>';
    linhaMedia += `<td>Média final</td>`;
    linhaMedia += `<td>${Math.round(mediaa)}</td>`;
    linhaMedia += `<td>${mediaa >= 7 ? spanAprovado : spanReprovado }</td>`;
    linhaMedia += '</tr>';


    linhass = linhaMedia;

    if (mediaa >= 7) {
        cssContainer.classList.add('shadowAprovado');
        cssContainer.classList.remove('shadowReprovado');
    } else {
        cssContainer.classList.add('shadowReprovado');
        cssContainer.classList.remove('shadowAprovado');
    }

    const somaMedia = document.querySelector('tfoot');
    somaMedia.innerHTML = linhass;
}

