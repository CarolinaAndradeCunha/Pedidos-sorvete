const saboresPorProduto = {
  'Açaí': ['Açaí', 'Cupuaçu', 'Morango'],
  'Sorvete': ['Baunilha', 'Chocolate', 'Morango'],
  'Milkshake': ['Açaí', 'Cupuaçu', 'Morango']
};

const pedido = JSON.parse(localStorage.getItem('pedido')) || {};
const produto = pedido.produto;
const sabores = saboresPorProduto[produto] || [];

const form = document.getElementById('form-sabores');
const erroMsg = document.getElementById('erro-sabor');

// Renderiza os cards
sabores.forEach(sabor => {
  const card = document.createElement('label');
  card.classList.add('card-sabor');

  const input = document.createElement('input');
  input.type = (produto === 'Milkshake') ? 'radio' : 'checkbox';
  input.name = 'sabor';
  input.value = sabor;

  const img = document.createElement('img');
  img.src = `imagens/${sabor.toLowerCase()}.jpg`;
  img.alt = sabor;

  const span = document.createElement('span');
  span.textContent = sabor;

  input.addEventListener('change', () => {
    if (produto === 'Milkshake') {
      document.querySelectorAll('.card-sabor').forEach(c => c.classList.remove('selecionado'));
    }
    if (input.checked) {
      card.classList.add('selecionado');
    } else {
      card.classList.remove('selecionado');
    }
  });

  card.appendChild(input);
  card.appendChild(img);
  card.appendChild(span);
  form.appendChild(card);
});

// Botão Avançar
document.getElementById('btn-avancar').addEventListener('click', () => {
  const selecionados = Array.from(document.querySelectorAll('input[name="sabor"]:checked'))
    .map(input => input.value);

  if (selecionados.length === 0) {
    erroMsg.textContent = 'Selecione pelo menos um sabor.';
    return;
  }

  erroMsg.textContent = '';
  pedido.sabores = selecionados;
  localStorage.setItem('pedido', JSON.stringify(pedido));
  window.location.href = 'acompanhamento4.html'; // ou próxima etapa
});
