const campoNome = document.querySelector("#nome");
const saudacao = document.querySelector("#saudacao");

function salvar(){
    localStorage.setItem("nome", campoNome.value);
    mostrar();
}

function apagar(){
    localStorage.removeItem("nome");
    campoNome.value = "";
    mostrar();
}

function mostrar(){
    const nome = localStorage.getItem("nome");
    if (nome) {
        saudacao.textContent = "Olá, " + nome + "!";
        campoNome.value = nome;
    } else {
        saudacao.textContent = "Nenhum nome salvo.";
    }
}

// Ao abrir a página, mostra o que já estava salvo
mostrar();