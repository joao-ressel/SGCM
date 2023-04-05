let botaoCarregar = document.querySelector("a#load");

if(botaoCarregar) {
    //let xhr = new XMLHttpRequest();
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
                    let acoes = document.createElement("td")
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
               // }
            }
        }).catch((erro =>{
            console.log(erro);
        }));
       // xhr.open("GET", url);
       // xhr.addEventListener("readystatechange", () => {
           // if(xhr.readyState == 4 && xhr.status == 200) {
                // let dados = JSON.parse(xhr.responseText);
                // for (const item of dados) {
                //     let linha = document.createElement("tr");
                //     let id = document.createElement("td");
                //     let nome = document.createElement("td");
                //     let registro = document.createElement("td");
                //     let especialidade = document.createElement("td");
                //     let unidade = document.createElement("td");
                //     let telefone = document.createElement("td");
                //     let email = document.createElement("td");
                //     let acoes = document.createElement("td")
                //     id.classList.add("fit");
                //     id.textContent = item.id;
                //     nome.textContent = item.nome;
                //     registro.textContent = item.registro;
                //     especialidade.textContent = item.especialidade;
                //     unidade.textContent = item.unidade;
                //     telefone.textContent = item.telefone;
                //     email.textContent = item.email;
                //     acoes.innerHTML = `<a href="javascript:void(0)" class="botao">Editar</a>
                //     <a href="javascript:void(0)" class="botao excluir">Excluir</a>`;
                //     linha.appendChild(id);
                //     linha.appendChild(nome);
                //     linha.appendChild(registro);
                //     linha.appendChild(especialidade);
                //     linha.appendChild(unidade);
                //     linha.appendChild(telefone);
                //     linha.appendChild(email);
                //     linha.appendChild(acoes);
                //     tabela.tBodies[0].appendChild(linha);
                // }
           // }
       // });
       // xhr.send();
    });
}

let botoesExcluir = document.querySelectorAll("a.botao.excluir");


for (let botao of botoesExcluir){
    botao.addEventListener("click", () => {
        if(confirm("Deseja realmente excluir?")){
            botao.parentNode.parentNode.remove();
        }
    });
}