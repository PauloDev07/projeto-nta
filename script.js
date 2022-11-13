
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
     //   let select = document.getElementById('buysell');
     //   let tipo = select.options[select.selectedIndex].value;
        document.querySelector('.tabela').innerHTML += `
        <tr class="dados">
            <td style="border-bottom: solid 1px #979797; padding:8px">${transacao[produto].tipo}</td>
            <td style="border-bottom: solid 1px #979797; padding:8px">${transacao[produto].nome}</td>
            <td style="border-bottom: solid 1px #979797; padding:8px; text-align: right;">${transacao[produto].valor}</td>
            <td> <button onclick="alteraritem(${produto})"> Alterar </button></td>
        </tr>`
};}

function alteraritem(alt) {
    transacao.splice(alt, 1);
    resetar();
    localStorage.setItem('transacao', JSON.stringify(transacao))
} resetar()


// INTEGRAÇÃO DE DADOS DO FORMULÁRIO AO EXTRATO


