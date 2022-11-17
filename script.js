
// LISTAGEM DE DADOS, LOCAL STORAGE E INTEGRAÇÃO DE DADOS POR JAVASCRIPT

var infostorage = localStorage.getItem('transacao')
if (infostorage != null) {
    var transacao = JSON.parse(infostorage)
} else {
    var transacao = [];
}

//Coleta de dados e inserção no extrato
for  (produto in transacao) {
    document.querySelector('.tabela').innerHTML += `
    <tr class="dados" style="width: 100%; font-size: 14px; padding:8px;">
        <td style="text-Align: center">${transacao[produto].tipo}</td>
        <td style="border-bottom: solid 1px #979797; padding:12px;">${transacao[produto].nome}</td>
        <td style="border-bottom: solid 1px #979797; text-align: right;">${transacao[produto].valor}</td>
    </tr>`
};

if (transacao.length == 0) {
    document.querySelector('.tabela').innerHTML = `
    <tr class="dados">
        <td></td>
        <td style="text-Align: center; font-size: 30px; padding-top:100px;"> Nenhuma transação cadastrada</td>
        <td></td>
    </tr>`
};

// INTEGRAÇÃO DE DADOS DO FORMULÁRIO AO EXTRATO


function adiciona(add) {
    add.preventDefault();    
    //Validação de caracteres numericos em "Valor'"
    for (i in add.target.elements['valor'].value) {
        if ('0123456789,.'.indexOf(add.target.elements['valor'].value[i]) == -1){
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


// MÁSCARAS DO PROJETO
//Limpeza de dados e mensagem de confirmação
function apenasnumeros(num) {
    e.preventDefault()
    console.log(num)
    if ((/[0-9]/g).test(num.key)) {
        num.target.value += num.key
    }}
    
    function limpardados(){
        let msg = "Deseja realmente limpar os dados? \nEssa ação removerá todos os dados salvos.";
        if (confirm(msg) == true) {
            localStorage.clear();            
        }         
    }


//Máscara de formatação de valores com uso de pontos e virgulas
    function formatarMoeda() {
        let moeda = document.getElementById('valor');
        let preco = moeda.value;

        preco = preco + '';
        preco = parseInt(preco.replace(/[\D]+/g, ''));
        preco = preco + '';
        preco = preco.replace(/([0-9]{2})$/g, ",$1");

        if (preco.length > 6) {
            preco = preco.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }
        moeda.value = preco;
        if(preco == 'NaN') moeda.value = '';
    }

  

    var arr = [1,2,3,4,5,6,7,8,9,10];
    var soma = arr.reduce(function(soma, i) {
    return soma + i;
});
console.log(soma);













//.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    
    //Atualização de dados da tabela 
    //function resetar() {
        //    resetabela = [...document.querySelectorAll('.tabela .dados')];
        //    resetabela.forEach((element) => {
        //        element.remove() 
        //    })
        //resetar()
        //Remoção de itens
        // <td> <button onclick="removeritem(${produto})"> Remover </button></td>
        //function removeritem(rem) {
        //transacao.splice(rem, 1);
        //resetar();
        //localStorage.setItem('transacao', JSON.stringify(transacao))}