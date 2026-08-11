// ==========================================
// DADOS DO AGENDAMENTO
// ==========================================

const agendamento = {
    barbeiro: '',
    telefoneBarbeiro: '',
    servicos: [],
    data: null,
    horario: '',
    nome: '',
    telefone: '',
    observacao: ''
};


// ==========================================
// NAVEGAÇÃO
// ==========================================

function mostrarTela(idTela) {

    const telas =
        document.querySelectorAll('.tela');


    telas.forEach(function(tela) {

        tela.classList.remove('ativa');

    });


    const telaSelecionada =
        document.getElementById(idTela);


    if (telaSelecionada) {

        telaSelecionada.classList.add('ativa');

        window.scrollTo(0, 0);

    }
}


// ==========================================
// BARBEIRO
// ==========================================

function selecionarBarbeiro(nome, telefone) {

    agendamento.barbeiro = nome;

    agendamento.telefoneBarbeiro = telefone;

    mostrarTela('tela-servicos');

}


// ==========================================
// SERVIÇOS
// ==========================================

function selecionarServico(servico) {

    const circle =
        servico.querySelector('.circle');


    const estaSelecionado =
        servico.classList.contains('selecionado');


    if (estaSelecionado) {

        servico.classList.remove('selecionado');

        circle.src =
            'circle.svg';

    } else {

        servico.classList.add('selecionado');

        circle.src =
            'circle-1.svg';

    }


    atualizarServicos();

    atualizarBotaoProximo();

}


// ==========================================
// ATUALIZA SERVIÇOS NO OBJETO
// ==========================================

function atualizarServicos() {

    const selecionados =
        document.querySelectorAll(
            '.servico.selecionado'
        );


    agendamento.servicos = [];


    selecionados.forEach(function(servico) {

        const nome =
            servico.dataset.nome;

        const preco =
            Number(servico.dataset.preco);


        agendamento.servicos.push({

            nome: nome,

            preco: preco

        });

    });

}


// ==========================================
// BOTÃO PRÓXIMO DOS SERVIÇOS
// ==========================================

function atualizarBotaoProximo() {

    const selecionados =
        document.querySelectorAll(
            '.servico.selecionado'
        );


    const botao =
        document.getElementById(
            'btn-proximo'
        );


    if (!botao) {
        return;
    }


    if (selecionados.length > 0) {

        botao.style.display = 'flex';

    } else {

        botao.style.display = 'none';

    }
}


// ==========================================
// IR PARA DATA
// ==========================================

function irParaData() {

    atualizarServicos();

    mostrarTela('tela-data');

}


// ==========================================
// CALENDÁRIO
// ==========================================

const hoje = new Date();

let mesAtual =
    hoje.getMonth();

let anoAtual =
    hoje.getFullYear();

let dataSelecionada = null;


// ==========================================
// GERAR CALENDÁRIO
// ==========================================

function gerarCalendario() {

    const tituloMes =
        document.getElementById(
            'titulo-mes'
        );


    const diasCalendario =
        document.getElementById(
            'dias-calendario'
        );


    if (!tituloMes || !diasCalendario) {
        return;
    }


    diasCalendario.innerHTML = '';


    const nomesMeses = [

        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'

    ];


    tituloMes.textContent =
        `${nomesMeses[mesAtual]} ${anoAtual}`;


    const primeiroDiaMes =
        new Date(
            anoAtual,
            mesAtual,
            1
        ).getDay();


    const quantidadeDiasMes =
        new Date(
            anoAtual,
            mesAtual + 1,
            0
        ).getDate();


    // ESPAÇOS ANTES DO PRIMEIRO DIA

    for (
        let i = 0;
        i < primeiroDiaMes;
        i++
    ) {

        const vazio =
            document.createElement('div');

        diasCalendario.appendChild(
            vazio
        );

    }


    // CRIA OS DIAS

    for (
        let dia = 1;
        dia <= quantidadeDiasMes;
        dia++
    ) {

        const botaoDia =
            document.createElement(
                'button'
            );


        botaoDia.classList.add('dia');

        botaoDia.textContent = dia;


        const dataDoDia =
            new Date(
                anoAtual,
                mesAtual,
                dia
            );


        const hojeSemHorario =
            new Date(
                hoje.getFullYear(),
                hoje.getMonth(),
                hoje.getDate()
            );


        // DIAS PASSADOS

        if (
            dataDoDia < hojeSemHorario
        ) {

            botaoDia.classList.add(
                'desativado'
            );

            botaoDia.disabled = true;

        } else {

            botaoDia.onclick =
                function() {

                    selecionarDia(this);

                };

        }


        diasCalendario.appendChild(
            botaoDia
        );

    }


    const botaoProximoData =
        document.getElementById(
            'btn-proximo-data'
        );


    if (botaoProximoData) {

        botaoProximoData.style.display =
            'none';

    }


    dataSelecionada = null;

}


// ==========================================
// MUDAR MÊS
// ==========================================

function mudarMes(valor) {

    mesAtual += valor;


    if (mesAtual > 11) {

        mesAtual = 0;

        anoAtual++;

    }


    if (mesAtual < 0) {

        mesAtual = 11;

        anoAtual--;

    }


    gerarCalendario();

}


// ==========================================
// SELECIONAR DIA
// ==========================================

function selecionarDia(diaSelecionado) {

    const dias =
        document.querySelectorAll(
            '.dia:not(.desativado)'
        );


    dias.forEach(function(dia) {

        dia.classList.remove(
            'selecionado'
        );

    });


    diaSelecionado.classList.add(
        'selecionado'
    );


    const numeroDia =
        Number(
            diaSelecionado.textContent
        );


    dataSelecionada =
        new Date(
            anoAtual,
            mesAtual,
            numeroDia
        );


    // SALVA NO OBJETO

    agendamento.data =
        dataSelecionada;


    const botao =
        document.getElementById(
            'btn-proximo-data'
        );


    if (botao) {

        botao.style.display =
            'flex';

    }

}


// ==========================================
// AGENDA DO BARBEIRO
// ==========================================

const agendaBarbeiros = {

    matheus: {

        domingo: [],

        segunda: [
            '10:00',
            '11:30',
            '14:00',
            '15:00',
            '16:30'
        ],

        terca: [
            '09:00',
            '10:30',
            '12:00',
            '14:30',
            '15:00'
        ],

        quarta: [
            '09:00',
            '10:00',
            '11:00',
            '16:00'
        ],

        quinta: [
            '09:00',
            '10:30',
            '12:00',
            '14:30',
            '15:00'
        ],

        sexta: [
            '10:00',
            '11:30',
            '14:00',
            '17:00'
        ],

        sabado: [
            '09:00',
            '10:00',
            '11:00'
        ]

    }

};


// ==========================================
// IR PARA HORÁRIOS
// ==========================================

function irParaHorarios() {

    if (!dataSelecionada) {

        return;

    }


    const numeroDiaSemana =
        dataSelecionada.getDay();


    const nomesDiasSemana = [

        'domingo',
        'segunda',
        'terca',
        'quarta',
        'quinta',
        'sexta',
        'sabado'

    ];


    const diaSemana =
        nomesDiasSemana[
            numeroDiaSemana
        ];


    mostrarHorarios(
        diaSemana
    );


    mostrarTela(
        'tela-data-hora'
    );

}


// ==========================================
// MOSTRAR HORÁRIOS
// ==========================================

function mostrarHorarios(diaSemana) {

    const container =
        document.getElementById(
            'horarios-disponiveis'
        );


    if (!container) {

        return;

    }


    container.innerHTML = '';


    const nomeBarbeiro =
        agendamento.barbeiro
            .toLowerCase();


    const agenda =
        agendaBarbeiros[nomeBarbeiro];


    const horarios =
        agenda
            ? agenda[diaSemana] || []
            : [];


    if (horarios.length === 0) {

        container.innerHTML =
            '<p class="sem-horarios">Nenhum horário disponível.</p>';

        return;

    }


    horarios.forEach(
        function(horario) {


            const botao =
                document.createElement(
                    'button'
                );


            botao.classList.add(
                'horario-btn'
            );


            // TEXTO

            const texto =
                document.createElement(
                    'span'
                );

            texto.textContent =
                horario;


            // CÍRCULO

            const circle =
                document.createElement(
                    'img'
                );

            circle.classList.add(
                'horario-circle'
            );

            circle.src =
                'circle.svg';

            circle.alt =
                'Selecionar';


            botao.appendChild(
                texto
            );

            botao.appendChild(
                circle
            );


            botao.onclick =
                function() {

                    selecionarHorario(
                        this
                    );

                };


            container.appendChild(
                botao
            );

        }
    );

}


// ==========================================
// SELECIONAR HORÁRIO
// ==========================================

function selecionarHorario(
    horarioSelecionado
) {

    const horarios =
        document.querySelectorAll(
            '.horario-btn'
        );


    horarios.forEach(
        function(horario) {


            horario.classList.remove(
                'selecionado'
            );


            const circle =
                horario.querySelector(
                    '.horario-circle'
                );


            if (circle) {

                circle.src =
                    'circle.svg';

            }

        }
    );


    horarioSelecionado.classList.add(
        'selecionado'
    );


    const circleSelecionado =
        horarioSelecionado.querySelector(
            '.horario-circle'
        );


    circleSelecionado.src =
        'circle-1.svg';


    // SALVA HORÁRIO

    agendamento.horario =
        horarioSelecionado
            .querySelector('span')
            .textContent;


    const botao =
        document.getElementById(
            'btn-proximo-horario'
        );


    if (botao) {

        botao.style.display =
            'flex';

    }

}


// ==========================================
// IR PARA CONFIRMAÇÃO
// ==========================================

function irParaConfirmacao() {

    preencherConfirmacao();

    mostrarTela(
        'tela-confirmacao'
    );

}


// ==========================================
// PREENCHER CONFIRMAÇÃO
// ==========================================

function preencherConfirmacao() {

    const barbeiro =
        document.getElementById(
            'resumo-barbeiro'
        );


    const data =
        document.getElementById(
            'resumo-data'
        );


    const servicos =
        document.getElementById(
            'resumo-servicos'
        );


    const total =
        document.getElementById(
            'resumo-total'
        );


    // BARBEIRO

    barbeiro.textContent =
        agendamento.barbeiro;


    // DATA

    if (agendamento.data) {

        const dataFormatada =
            agendamento.data
                .toLocaleDateString(
                    'pt-BR',
                    {
                        weekday: 'short',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    }
                );


        data.textContent =
            `${dataFormatada} às ${agendamento.horario}`;

    }


    // SERVIÇOS

    servicos.innerHTML = '';


    let valorTotal = 0;


    agendamento.servicos.forEach(
        function(servico) {


            const linha =
                document.createElement(
                    'div'
                );


            linha.classList.add(
                'resumo-servico'
            );


            const nome =
                document.createElement(
                    'span'
                );


            const preco =
                document.createElement(
                    'strong'
                );


            nome.textContent =
                servico.nome;


            preco.textContent =
                servico.preco
                    .toLocaleString(
                        'pt-BR',
                        {
                            style: 'currency',
                            currency: 'BRL'
                        }
                    );


            linha.appendChild(nome);

            linha.appendChild(preco);


            servicos.appendChild(
                linha
            );


            valorTotal +=
                servico.preco;

        }
    );


    total.textContent =
        valorTotal.toLocaleString(
            'pt-BR',
            {
                style: 'currency',
                currency: 'BRL'
            }
        );

}


// ==========================================
// FINALIZAR AGENDAMENTO
// ==========================================

function finalizarAgendamento() {

    const nome =
        document.getElementById(
            'nome'
        ).value.trim();


    const telefone =
        document.getElementById(
            'telefone'
        ).value.trim();


    const observacao =
        document.getElementById(
            'observacao'
        ).value.trim();


    // VALIDAÇÃO

    if (nome === '') {

        alert(
            'Informe seu nome.'
        );

        return;

    }


    if (telefone === '') {

        alert(
            'Informe seu WhatsApp.'
        );

        return;

    }


    // SALVA

    agendamento.nome =
        nome;

    agendamento.telefone =
        telefone;

    agendamento.observacao =
        observacao;


    enviarWhatsApp();

}


// ==========================================
// MENSAGEM WHATSAPP
// ==========================================
function enviarWhatsApp() {

    let mensagem =
`*NOVO AGENDAMENTO*

*Cliente:* ${agendamento.nome}
*WhatsApp:* +55 ${agendamento.telefone}

*Profissional:* ${agendamento.barbeiro}

*Data:* ${agendamento.data.toLocaleDateString('pt-BR')}
*Horário:* ${agendamento.horario}

*Serviços:*`;

    let valorTotal = 0;

    agendamento.servicos.forEach(function(servico) {

        mensagem +=
`\n• ${servico.nome} - ${servico.preco.toLocaleString(
            'pt-BR',
            {
                style: 'currency',
                currency: 'BRL'
            }
        )}`;

        valorTotal += servico.preco;
    });

    mensagem +=
`\n
*Total:* ${valorTotal.toLocaleString(
        'pt-BR',
        {
            style: 'currency',
            currency: 'BRL'
        }
    )}`;

    if (agendamento.observacao !== '') {

        mensagem +=
`\n
*Observação:*
${agendamento.observacao}`;
    }

    const mensagemCodificada =
        encodeURIComponent(mensagem);

    const url =
        `https://wa.me/${agendamento.telefoneBarbeiro}?text=${mensagemCodificada}`;

    window.open(url, '_blank');
}
// ==========================================
// INICIALIZA
// ==========================================

gerarCalendario();