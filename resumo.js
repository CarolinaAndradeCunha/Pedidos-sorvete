document.addEventListener("DOMContentLoaded", () => {
  const pedido = {
    tipo: localStorage.getItem("tipo") || "",
    tamanho: localStorage.getItem("tamanho") || "",
    sabores: JSON.parse(localStorage.getItem("sabores") || "[]"),
    cobertura: localStorage.getItem("cobertura") || ""
  };

  document.getElementById("tipo").textContent = pedido.tipo;
  document.getElementById("tamanho").textContent = pedido.tamanho;
  document.getElementById("sabores").textContent = pedido.sabores.join(", ");
  document.getElementById("cobertura").textContent = pedido.cobertura;

  document.getElementById("editar").addEventListener("click", () => {
    // Limpa o pedido atual para reiniciar
    localStorage.clear();
    window.location.href = "pag1.html";
  });

  document.getElementById("confirmar").addEventListener("click", () => {
    const confirmar = confirm("Pedido confirmado! Deseja montar outro pedido?");
    if (confirmar) {
      localStorage.clear();
      window.location.href = "pag1.html";
    } else {
      alert("Obrigada pelo pedido! 😊");
    }
  });
});
