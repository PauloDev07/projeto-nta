
// LISTAGEM DE DADOS, LOCAL STORAGE E INTEGRAÇÃO DE DADOS POR JAVASCRIPT

var infostorage = localStorage.getItem('transacao')
if (infostorage != null) {
    var transacao = JSON.parse(infostorage)
} else {
    var transacao = [];
}

    //Atualização de dados da tabela 
function resetar() {
    resetabela = [...document.querySelectorAll('.tabela .dados')];
    resetabela.forEach((element) => {
        element.remove() 
    })
    
    //Coleta de dados e inserção no extrato
    for (produto in transacao) {
        document.querySelector('.tabela').innerHTML += `
        <tr class="dados" style="width: 100%; font-size: 14px;">
        <td style="border-bottom: solid 1px #979797; padding:8px">${transacao[produto].tipo}</td>
        <td style="border-bottom: solid 1px #979797; padding:8px">${transacao[produto].nome}</td>
        <td style="border-bottom: solid 1px #979797; padding:8px; text-align: right;">${transacao[produto].valor}</td>
        <td> <button onclick="removeritem(${produto})"> Remover </button></td>
        </tr>`
};}

    //Remoção de itens
function removeritem(rem) {
    transacao.splice(rem, 1);
    resetar();
    localStorage.setItem('transacao', JSON.stringify(transacao))
} resetar()





// INTEGRAÇÃO DE DADOS DO FORMULÁRIO AO EXTRATO


function adiciona(add) {
    add.preventDefault();    
    //Validação de caracteres numericos em "Valor'"
    for (n in add.target.elements['valor'].value) {
        if ('0123456789'.indexOf(add.target.elements['valor'].value[n]) == -1){
            alert('Apenas números são permitidos no campo Valor!')
            return false
        }}       
        
        //Integração de localStorage e informações do formulário
        var infostorage = localStorage.getItem('transacao')
        if (infostorage != null) {
            var transacao = JSON.parse(infostorage)
    } else {
        var transacao = [];
    }
    
    transacao.push({
        tipo: add.target.elements['tipo'].value,
        nome: add.target.elements['nome'].value,
        valor: add.target.elements['valor'].value
    })
    
    localStorage.setItem('transacao', JSON.stringify(transacao))
    document.getElementById('cadastro').click()
}


// Máscaras do formulário
function apenasnumeros(e) {
    e.preventDefault()
    console.log(e)
        if ((/[0-9]/g).test(e.key)) {
            e.target.value += e.key
}}



//toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})