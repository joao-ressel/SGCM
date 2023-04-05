let botaoCarregar = document.querySelector("a#load");

if(botaoCarregar) {
    botaoCarregar.addEventListener("click", () => {
        let tabela = document.querySelector("table");
        let url = "http://my-json-server.typicode.com/danielnsilva/json/profissionais";
        fetch(url)
        .then(resposta => resposta.json())
        .then(dados => {
            for (const item of dados){
                    let linha = document.createElement("tr");
                    let id = document.createElement("td");
                    let nome = document.createElement("td");
                    let registro = document.createElement("td");
                    let especialidade = document.createElement("td");
                    let unidade = document.createElement("td");
                    let telefone = document.createElement("td");
                    let email = document.createElement("td");
                    let acoes = document.createElement("td");
                    id.classList.add("fit");
                    id.textContent = item.id;
                    nome.textContent = item.nome;
                    registro.textContent = item.registro;
                    especialidade.textContent = item.especialidade;
                    unidade.textContent = item.unidade;
                    telefone.textContent = item.telefone;
                    email.textContent = item.email;
                    acoes.innerHTML = `<a href="javascript:void(0)" class="botao">Editar</a>
                    <a href="javascript:void(0)" class="botao excluir">Excluir</a>`;
                    linha.appendChild(id);
                    linha.appendChild(nome);
                    linha.appendChild(registro);
                    linha.appendChild(especialidade);
                    linha.appendChild(unidade);
                    linha.appendChild(telefone);
                    linha.appendChild(email);
                    linha.appendChild(acoes);
                    tabela.tBodies[0].appendChild(linha);
            }
        }).catch((erro =>{
            console.log(erro);
        }));
    });
}

let botaoSalvar = document.querySelector(".botao#salvar");

if(botaoSalvar){
    botaoSalvar.addEventListener("click", () => {
        
        let tabela = document.getElementById("tabela");
        let linha = document.createElement("tr");   
        let id = document.createElement("td");
        let nome = document.createElement("td");
        let registroConcelho = document.createElement("td");
        let especialidade = document.createElement("td");
        let unidade = document.createElement("td");
        let telefone = document.createElement("td");
        let email = document.createElement("td");
        let acoes = document.createElement("td");

        let cellId = document.querySelectorAll("tr").length - 1;
        let cellNome = document.getElementById("nome").value;
        let cellRegistroConcelho = document.getElementById("registroConcelho").value;
        let cellEspecialidade = document.getElementById("especialidade").value;
        let cellUnidade = document.getElementById("unidade").value;
        let cellTelefone = document.getElementById("telefone").value;
        let cellEmail = document.getElementById("email").value; 

        id.innerHTML = cellId;
        nome.innerHTML = cellNome;
        registroConcelho.innerHTML = cellRegistroConcelho;
        especialidade.innerHTML = cellEspecialidade;
        unidade.innerHTML = cellUnidade;
        telefone.innerHTML = cellTelefone;
        email.innerHTML = cellEmail;
        acoes.innerHTML = `<a href="javascript:void(0)" class="botao">Editar</a>
        <a href="javascript:void(0)" class="botao excluir">Excluir</a>`;
        
        linha.appendChild(id);
        linha.appendChild(nome);
        linha.appendChild(registroConcelho);
        linha.appendChild(especialidade);
        linha.appendChild(unidade);
        linha.appendChild(telefone);
        linha.appendChild(email);
        linha.appendChild(acoes);
        tabela.tBodies[0].appendChild(linha);
    })
}

let botaoForm = document.querySelector("a#add");

if(botaoForm){
    botaoForm.addEventListener("click", () => {
        let formulario = document.querySelector('form');
        formulario.style.display = 'block';
    })
}

let botaoCancelar = document.querySelector(".botao#cancelar");

if(botaoCancelar){
    botaoCancelar.addEventListener("click", () => {
        let formulario = document.querySelector('form');
        formulario.style.display = 'none';
    })
}

let botoesExcluir = document.querySelectorAll("a.botao.excluir");
console.log(botoesExcluir);

for (let botao of botoesExcluir) {
    botao.addEventListener("click", () => {
        if (confirm("Deseja realmente excluir?")) {
            botao.parentNode.parentNode.remove();
        }
    });
}