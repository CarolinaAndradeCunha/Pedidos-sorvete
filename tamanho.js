// pegar elementos
const opcoesContainer = document.getElementById('opcoes-tamanho');
const btnAvancar = document.getElementById('btn-avancar');
const mensagemErro = document.getElementById('mensagem-erro');

// pega o pedido do localStorage
let pedido = JSON.parse(localStorage.getItem('pedido'));

if (!pedido || !pedido.produto) {
  alert('Nenhum produto selecionado! Voltando para a página inicial.');
  window.location.href = 'index.html'; // página inicial do pedido
}

// opções dinâmicas conforme produto escolhido
const opcoesPorProduto = {
  'Sorvete': [
    { nome: 'Casquinha', imagem: 'casquinha.jpg' },
    { nome: 'Cascão', imagem: 'cascade.jpg' },
    { nome: 'Copinho', imagem: 'copinho.jpg' }
  ],
  'Açaí': [
    { nome: 'Copo 300ml', imagem: 'copo300ml.jpg' },
    { nome: 'Copo 500ml', imagem: 'copo500ml.jpg' },
    { nome: 'Copo 1L', imagem: 'copo1l.jpg' }
  ],
  'Milkshake': [
    { nome: 'Copo 300ml', imagem: 'milk300.jpg' },
    { nome: 'Copo 500ml', imagem: 'milk500.jpg' },
    { nome: 'Copo 1L', imagem: 'milk1l.jpg' }
  ]
};

// pega as opções corretas
const opcoes = opcoesPorProduto[pedido.produto];

// função para criar o HTML das opções
function criarOpcaoTamanho(opcao) {
  const label = document.createElement('label');
  label.className = 'card-produto';

  const input = document.createElement('input');
  input.type = 'radio';
  input.name = 'tamanho';
  input.value = opcao.nome;
  input.hidden = true;

  const imagem = document.createElement('img');
  imagem.src = `img/tamanhos/${opcao.imagem}`;
  imagem.alt = opcao.nome;

  const span = document.createElement('span');
  span.textContent = opcao.nome;

  label.appendChild(input);
  label.appendChild(imagem);
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
    mensagemErro.textContent = 'Por favor, selecione um tamanho antes de continuar.';
  } else {
    mensagemErro.style.display = 'none';

    const tamanhoSelecionado = document.querySelector('input[name="tamanho"]:checked').value;

    pedido.tamanho = tamanhoSelecionado;
    localStorage.setItem('pedido', JSON.stringify(pedido));

    window.location.href = 'sabor3.html';
  }
});
