// pega elementos do DOM
const btnAvancar = document.getElementById('btn-avancar');
const mensagemErro = document.getElementById('mensagem-erro');

btnAvancar.addEventListener('click', () => {
  // pega todos os radios nome 'produto'
  const radios = document.querySelectorAll('input[name="produto"]');
  
  // verifica se algum está marcado
  const selecionado = Array.from(radios).some(radio => radio.checked);

  if (!selecionado) {
    // mostra a mensagem de erro
    mensagemErro.style.display = 'block';
  } else {
    // esconde a mensagem de erro
    mensagemErro.style.display = 'none';

    // pega o valor selecionado
    const produtoSelecionado = document.querySelector('input[name="produto"]:checked').value;

    // salva no localStorage, dentro de um objeto 'pedido'
    let pedido = JSON.parse(localStorage.getItem('pedido')) || {};

    // atualiza o produto escolhido
    pedido.produto = produtoSelecionado;

    // salva de volta no localStorage (como string)
    localStorage.setItem('pedido', JSON.stringify(pedido));

    // redireciona para a próxima página
    window.location.href = 'tamanho2.html';
  }
});
