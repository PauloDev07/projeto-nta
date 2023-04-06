// LISTAGEM DE DADOS, LOCAL STORAGE E INTEGRAÇÃO DE DADOS POR JAVASCRIPT

var infostorage = localStorage.getItem('transacao');
if (infostorage != null) {
	var transacao = JSON.parse(infostorage);
} else {
	var transacao = [];
}

function desenhaTabela() {
	document.querySelector('.tabela tbody').innerHTML = '';

	//Coleta de dados e inserção no extrato
	for (produto in transacao) {
		let money = transacao[produto].valor;
		document.querySelector('.tabela tbody').innerHTML += `
        <tr class="dados" style="width: 100%; font-size: 14px; padding:8px; margin-bottom: 2px;">
            <td style="border-bottom: solid 1px #979797; text-Align: center">${
													transacao[produto].tipo
												}</td>
            <td style="border-bottom: solid 1px #979797; padding:12px;">${
													transacao[produto].nome
												}</td>
            <td style="border-bottom: solid 1px #979797; text-align: right;"> ${parseFloat(
													money
												).toLocaleString('pt-br', {
													style: 'currency',
													currency: 'BRL',
												})}</td>
        </tr>`;
	}

	//Mensagem para falta de transação cadastrada
	if (transacao.length == 0) {
		document.querySelector('.tabela').innerHTML = `
        <thead></thead>
        <tr class="dados">
            <td></td>
            <td style="text-Align: center; font-size: 30px; padding-top:100px;"> Nenhuma transação cadastrada</td>
            <td></td>
        </tr>
        <tfoot></tfoot>`;
	}
}

//Função para o total, resumo e thead/tfoot
function desenhaTotal() {
	var total = 0;

	//Calculo total das mercadorias
	for (produto in transacao) {
		if (transacao[produto].tipo == '+') {
			console.log('+');
			total += parseFloat(transacao[produto].valor);
		} else {
			console.log('-');
			total -= parseFloat(transacao[produto].valor);
		}

		//Chamada do total e resumo da transação
		var resumo = '';
		if (total > 0) {
			resumo = `[LUCRO]`;
		} else if (total < 0) {
			resumo = `[PREJUÍZO]`;
		}
	}

	//Chamada do tfoot
	document.querySelector('.tabela tfoot').innerHTML = `
        <tr class="duolinha">
            <td ></td>
            <td>Total</td>
            <td class="total"></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td class="resumo"></td>
        </tr>`;
	document.querySelector('.resumo').innerHTML = `${resumo}`;
	document.querySelector('.total').innerHTML = `${parseFloat(
		total
	).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`;

	//Chamada do thead
	document.querySelector('.tabela thead').innerHTML = `
    <tr class="linha">
        <td></td>
        <td>Mercadoria</td>
        <td style="text-align: right">Valor</td>
    </tr>`;
}

desenhaTotal();
desenhaTabela();

//Integração de localStorage e informações do formulário
function adiciona(add) {
	add.preventDefault();
	transacao.push({
		tipo: add.target.elements['tipo'].value,
		nome: add.target.elements['nome'].value,
		valor: add.target.elements['valor'].value
			.replaceAll('.', '')
			.replaceAll(',', '.'),
	});

	add.target.elements['nome'].value = '';
	add.target.elements['valor'].value = '';

	localStorage.setItem('transacao', JSON.stringify(transacao));
	desenhaTotal();
	desenhaTabela();
}

// MÁSCARAS DO PROJETO
//Limpeza de dados
function apenasnumeros(num) {
	e.preventDefault();
	console.log(num);
	if (/[0-9]/g.test(num.key)) {
		num.target.value += num.key;
	}
}

//Mensagem de confirmação
function limparDados() {
	let msg =
		'Deseja realmente limpar os dados? \nEssa ação removerá todos os dados salvos.';

	if (confirm(msg) == true) {
		transacao = [];
		localStorage.removeItem('transacao');
		desenhaTotal();
		desenhaTabela();
	}
}

//Bloqueio de "cola" no campo valor
const cola = document.querySelector('#valor');
cola.addEventListener('paste', function (c) {
	c.preventDefault();
});
