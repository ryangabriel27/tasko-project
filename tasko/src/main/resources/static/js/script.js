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

document.getElementById('botao-cliente').addEventListener('click', function() {
    // Redirecionar para a página de cadastro de cliente
    window.location.href = '/cadastro?tipo=cliente'; 
  });

  document.getElementById('botao-prestador').addEventListener('click', function() {
    // Redirecionar para a página de cadastro de prestador
    window.location.href = '/cadastro?tipo=prestador'; 
  });

  function mostrarOpcoes() {
    document.getElementById("tela-inicial").style.display = "none";
    document.getElementById("tela-opcoes").style.display = "block";
  }

  // Função para voltar para a tela inicial
  function voltarTelaInicial() {
    document.getElementById("tela-inicial").style.display = "block";
    document.getElementById("tela-opcoes").style.display = "none";
  }