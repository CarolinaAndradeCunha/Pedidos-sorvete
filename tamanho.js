// pegar elementos
const opcoesContainer = document.getElementById('opcoes-tamanho');
const btnAvancar = document.getElementById('btn-avancar');
const mensagemErro = document.getElementById('mensagem-erro');

// pega o pedido do localStorage
let pedido = JSON.parse(localStorage.getItem('pedido'));

if (!pedido || !pedido.produto) {
  alert('Nenhum produto selecionado! Voltando para a página inicial.');
  window.location.href = 'index.html';  // página inicial do pedido
}

// opções dinâmicas conforme produto escolhido
const opcoesPorProduto = {
  'Sorvete': ['Casquinha', 'Cascão', 'Copinho'],
  'Açaí': ['Copo 300ml', 'Copo 500ml', 'Copo 1L'],
  'Milkshake': ['Copo 300ml', 'Copo 500ml', 'Copo 1L']
};

// pega as opções corretas
const opcoes = opcoesPorProduto[pedido.produto];

// função para criar o HTML das opções
function criarOpcaoTamanho(nome) {
  // criar label com input radio, imagem fake só pra manter padrão, e texto
  // você pode trocar as imagens depois, por enquanto só texto

  const label = document.createElement('label');
  label.className = 'card-produto';

  const input = document.createElement('input');
  input.type = 'radio';
  input.name = 'tamanho';
  input.value = nome;
  input.hidden = true;

  const span = document.createElement('span');
  span.textContent = nome;

  label.appendChild(input);
  label.appendChild(span);

  return label;
}

// monta as opções na tela
opcoes.forEach(opcao => {
  const elemento = criarOpcaoTamanho(opcao);
  opcoesContainer.appendChild(elemento);
});

// lógica do botão avançar
btnAvancar.addEventListener('click', () => {
  const radios = document.querySelectorAll('input[name="tamanho"]');
  const selecionado = Array.from(radios).some(r => r.checked);

  if (!selecionado) {
    mensagemErro.style.display = 'block';
  } else {
    mensagemErro.style.display = 'none';

    // pega o tamanho selecionado
    const tamanhoSelecionado = document.querySelector('input[name="tamanho"]:checked').value;

    // salva no pedido
    pedido.tamanho = tamanhoSelecionado;
    localStorage.setItem('pedido', JSON.stringify(pedido));

    // redireciona para a próxima página (exemplo: sabor.html)
    window.location.href = 'sabor3.html';
  }
});
