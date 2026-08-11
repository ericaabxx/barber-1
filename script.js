function mostrarTela(idTela) {
    const telas = document.querySelectorAll('.tela');

    telas.forEach(function(tela) {
        tela.classList.remove('ativa');
    });

    const telaSelecionada = document.getElementById(idTela);

    telaSelecionada.classList.add('ativa');
}