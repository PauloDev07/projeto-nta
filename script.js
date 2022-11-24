
// LISTAGEM DE DADOS, LOCAL STORAGE E INTEGRAÇÃO DE DADOS POR JAVASCRIPT

    var infostorage = localStorage.getItem('transacao')
    if (infostorage != null) {
        var transacao = JSON.parse(infostorage)
    } else {
        var transacao = [];
    }

    //Coleta de dados e inserção no extrato
    for  (produto in transacao) {
        let money = transacao[produto].valor
        document.querySelector('.tabela tbody').innerHTML += `
        <tr class="dados" style="width: 100%; font-size: 14px; padding:8px; margin-bottom: 2px;">
            <td style="border-bottom: solid 1px #979797; text-Align: center">${transacao[produto].tipo}</td>
            <td style="border-bottom: solid 1px #979797; padding:12px;">${transacao[produto].nome}</td>
            <td style="border-bottom: solid 1px #979797; text-align: right;"> ${parseFloat(money).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
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
    //Integração de localStorage e informações do formulário
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
        .replaceAll(".", "")
        .replaceAll(",", "."),
    })
    
    localStorage.setItem('transacao', JSON.stringify(transacao))
    document.getElementById('cadastro').click()
}

    //Calculo total das mercadorias
    var total = 0
    for (negocio in transacao) {
        if (transacao[negocio].tipo == '+'){
            console.log('+')
            total += parseFloat((transacao[negocio].valor))
        } else {
            console.log('-')
            total -= parseFloat((transacao[negocio].valor))
        }
    }
    
    document.querySelector('.total').innerHTML = `${parseFloat(total).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`

    //Resumo da transação
    var resumo = ''
    if (total >= 1) {
        resumo = `[LUCRO]`
    } else if (total <= -1) {
        resumo = `[PREJUÍZO]`
    }   document.querySelector('.resumo').innerHTML = `${resumo}`




// MÁSCARAS DO PROJETO
    //Limpeza de dados 
    function apenasnumeros(num) {
        e.preventDefault()
        console.log(num)
        if ((/[0-9]/g).test(num.key)) {
            num.target.value += num.key
        }}
        
    //Mensagem de confirmação
    function limpardados(){
        let msg = "Deseja realmente limpar os dados? \nEssa ação removerá todos os dados salvos.";
        if (confirm(msg) == true) {
            localStorage.clear();            
        }         
    }

    //Bloqueio de "cola" no campo valor
    const cola = document.querySelector('#valor');
    cola.addEventListener("paste", function(c) {
        c.preventDefault();
    });