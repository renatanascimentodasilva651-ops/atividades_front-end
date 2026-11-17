const URL_API = "https://postman-echo.com/post";

function executar(evento){
    evento.preventDefault();

    limparForm();

    if (validarForm()) {
        enviarForm();
    } else {
        const concluido = document.querySelector("#concluido");
        concluido.textContent = "O cadastro nao foi concluido!";
        concluido.classList.add("erro");
        concluido.classList.remove("oculto");
    }
}

function mostrarErro(idErro, mensagem){
    const erro = document.querySelector(idErro);
    erro.textContent = mensagem;
    erro.classList.add("erro");
    erro.classList.remove("oculto");
}

function validarForm(){
    const nome = document.querySelector("#nome").value.trim();
    if (nome == "") {
        mostrarErro("#erro-nome", "Nome nao pode ser vazio");
    }

    const idade = document.querySelector("#idade").value;
    if (idade == "") {
        mostrarErro("#erro-idade", "Idade nao pode ser vazia");
    } else if (Number(idade) < 18) {
        mostrarErro("#erro-idade", "E necessario ter 18 anos");
    }

    // validar email com regex
    const email = document.querySelector("#email").value;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        mostrarErro("#erro-email", "Email invalido");
    }

    const telefone = document.querySelector("#telefone").value;
    if (!/^\d{10,11}$/.test(telefone)) {
        mostrarErro("#erro-telefone", "Telefone deve ter 10 ou 11 numeros");
    }

    const senha = document.querySelector("#senha").value;
    if (senha.length < 6) {
        mostrarErro("#erro-senha", "Senha deve ter pelo menos 6 caracteres");
    }

    const logradouro = document.querySelector("#logradouro").value.trim();
    if (logradouro == "") {
        mostrarErro("#erro-logradouro", "Logradouro nao pode ser vazio");
    }

    const numero = document.querySelector("#numero").value;
    if (numero == "") {
        mostrarErro("#erro-numero", "Numero nao pode ser vazio");
    }

    const cidade = document.querySelector("#cidade").value.trim();
    if (cidade == "") {
        mostrarErro("#erro-cidade", "Cidade nao pode ser vazia");
    }

    if (!document.querySelector('input[name="nivel"]:checked')) {
        mostrarErro("#erro-nivel", "Escolha um nivel");
    }

    if (document.querySelectorAll('input[name="tecnologia"]:checked').length === 0) {
        mostrarErro("#erro-tecnologia", "Escolha ao menos uma tecnologia");
    }

    const escolaridade = document.querySelector("#escolaridade").value;
    if (escolaridade == "") {
        mostrarErro("#erro-escolaridade", "Escolha a escolaridade");
    }

    const biografia = document.querySelector("#biografia").value.trim();
    if (biografia == "") {
        mostrarErro("#erro-biografia", "Biografia nao pode ser vazia");
    }

    const termos = document.querySelector("#termos");
    if (!termos.checked) {
        mostrarErro("#erro-termos", "E preciso aceitar os termos!");
    }

    return document.querySelectorAll(".erro").length === 0;
}

function enviarForm(){
    const nivel = document.querySelector('input[name="nivel"]:checked').value;
    const tecnologias = [];
    document.querySelectorAll('input[name="tecnologia"]:checked').forEach((item) => {
        tecnologias.push(item.value);
    });

    const dados = {
        nome: document.querySelector("#nome").value,
        idade: document.querySelector("#idade").value,
        email: document.querySelector("#email").value,
        telefone: document.querySelector("#telefone").value,
        senha: document.querySelector("#senha").value,
        logradouro: document.querySelector("#logradouro").value,
        numero: document.querySelector("#numero").value,
        cidade: document.querySelector("#cidade").value,
        nivel: nivel,
        tecnologias: tecnologias,
        escolaridade: document.querySelector("#escolaridade").value,
        biografia: document.querySelector("#biografia").value
    };

    const concluido = document.querySelector("#concluido");

    fetch(URL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    .then((resposta) => resposta.json())
    .then((retorno) => {
        alert(JSON.stringify(retorno, null, 2));
        concluido.textContent = "Cadastro concluido com sucesso!";
        concluido.classList.add("sucesso");
        concluido.classList.remove("oculto");
    })
    .catch((erro) => {
        alert("Erro ao enviar: " + erro.message);
    });
}

//()=> {} arrow function
function limparForm(){
    document.querySelectorAll(".erro").forEach((item) => {
        item.classList.remove("erro");
        item.classList.add("oculto");
    });
    document.querySelector("#concluido").classList.add("oculto");
    document.querySelector("#concluido").classList.remove("sucesso");
}