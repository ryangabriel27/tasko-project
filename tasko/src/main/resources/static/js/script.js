document.getElementById('botao-cadastrar').addEventListener('click', function(event) {
    event.preventDefault();

    var telaInicial = document.getElementById('tela-inicial');
    var telaOpcoes = document.getElementById('tela-opcoes');

    telaInicial.style.animation = 'slideUpOut 0.5s ease forwards';

    setTimeout(function() {
        telaInicial.style.display = 'none';
        telaOpcoes.style.display = 'block';
        telaOpcoes.style.animation = 'slideUpIn 0.5s ease forwards';
    }, 500);
});

document.getElementById('botao-voltar').addEventListener('click', function() {
    var telaInicial = document.getElementById('tela-inicial');
    var telaOpcoes = document.getElementById('tela-opcoes');

    telaOpcoes.style.animation = 'slideUpOut 0.5s ease forwards';

    setTimeout(function() {
        telaOpcoes.style.display = 'none';
        telaInicial.style.display = 'block';
        telaInicial.style.animation = 'slideUpIn 0.5s ease forwards';
    }, 500);
});