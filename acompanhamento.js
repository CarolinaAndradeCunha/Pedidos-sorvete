const opcoesAcompanhamento = {
  acai: {
    multiplos: true,
    opcoes: [
      { nome: "Leite Condensado", img: "img/leite-condensado.jpg" },
      { nome: "Leite Ninho", img: "img/leite-ninho.jpg" },
      { nome: "Ovomaltine", img: "img/ovomaltine.jpg" },
    ],
  },
  sorvete: {
    multiplos: false,
    opcoes: [
      { nome: "Morango", img: "img/morango.jpg" },
      { nome: "Chocolate", img: "img/chocolate.jpg" },
    ],
  },
  milkshake: {
    multiplos: false,
    opcoes: [
      { nome: "Morango", img: "img/morango.jpg" },
      { nome: "Chocolate", img: "img/chocolate.jpg" },
    ],
  },
};

const tipoEscolhido = localStorage.getItem("tipo");

const form = document.getElementById("form-acompanhamento");
const erro = document.getElementById("erro");
const subtitulo = document.getElementById("subtitulo");
const btnAvancar = document.getElementById("btn-avancar");

if (!tipoEscolhido || !opcoesAcompanhamento[tipoEscolhido]) {
  form.innerHTML = "<p>Erro: tipo não identificado.</p>";
  btnAvancar.disabled = true;
} else {
  const { multiplos, opcoes } = opcoesAcompanhamento[tipoEscolhido];
  subtitulo.textContent = `Você pode escolher ${multiplos ? "mais de um" : "apenas um"} acompanhamento:`;

  opcoes.forEach((opcao, index) => {
    const input = document.createElement("input");
    input.type = multiplos ? "checkbox" : "radio";
    input.name = "acompanhamento";
    input.id = `opcao-${index}`;
    input.value = opcao.nome;

    const label = document.createElement("label");
    label.htmlFor = `opcao-${index}`;
    label.className = "opcao";

    const img = document.createElement("img");
    img.src = opcao.img;
    img.alt = opcao.nome;

    const span = document.createElement("span");
    span.textContent = opcao.nome;

    label.appendChild(img);
    label.appendChild(span);
    label.appendChild(input);

    label.addEventListener("click", () => {
      if (!multiplos) {
        document.querySelectorAll(".opcao").forEach(el => el.classList.remove("selecionado"));
      }
      label.classList.toggle("selecionado");
      input.checked = !input.checked;
    });

    form.appendChild(label);
  });
}

btnAvancar.addEventListener("click", () => {
  erro.textContent = "";
  const selecionados = [...document.querySelectorAll('input[name="acompanhamento"]:checked')];

  if (selecionados.length === 0) {
    erro.textContent = "Escolha pelo menos uma opção para continuar.";
    return;
  }

  const acompanhamentos = selecionados.map(el => el.value);
  localStorage.setItem("acompanhamento", JSON.stringify(acompanhamentos));

  window.location.href = "resumo.html"; // próxima página
});
