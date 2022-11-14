
// Listagem de Dados, Local Storage e integração de extrato de compras por Java Script


var infostorage = localStorage.getItem('transacao')
 if (infostorage != null) {
    var transacao = JSON.parse(infostorage)
 } else {
    var transacao = [];
 }

function resetar() {
    resetabela = [...document.querySelectorAll('.tabela .dados')];
    resetabela.forEach((element) => {
        element.remove() 
    })

    for (produto in transacao) {
      //  let select = document.getElementById('tipo');
       // let tipo = select.options[select.selectedIndex].value;
        document.querySelector('.tabela').innerHTML += `
        <tr class="dados">
            <td style="border-bottom: solid 1px #979797; padding:8px">${transacao[produto].tipo}</td>
            <td style="border-bottom: solid 1px #979797; padding:8px">${transacao[produto].nome}</td>
            <td style="border-bottom: solid 1px #979797; padding:8px; text-align: right;">${transacao[produto].valor}</td>
            <td> <button onclick="removeritem(${produto})"> Remover </button></td>
        </tr>`
};}

function removeritem(rem) {
    transacao.splice(rem, 1);
    resetar();
    localStorage.setItem('transacao', JSON.stringify(transacao))
} resetar()


// INTEGRAÇÃO DE DADOS DO FORMULÁRIO AO EXTRATO


function adiciona(add) {
    add.preventDefault();
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