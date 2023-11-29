//Index
//Variáveis
var login;
var senha;

function entrar(){
    elemento = document.getElementById("login-entrar");
    login = elemento.value;
    elemento = document.getElementById("senha-entrar");
    senha = elemento.value;
    if (login == "admin" && senha == "admin"){
        window.location.href = "cardapio.html";
    } else if (login == "" || senha == ""){
        alert("Preencha os campos de login e senha.")
    } else {
        alert("Login ou senha incorretos.");
    }
}

//Cardapio
//Variáveis
var pedido = 1;
var mesa = document.getElementById("mesa");
var valor_quantia = new Array();
var quantia = new Array();
var lanche = new Array();
var obs = document.getElementById("observacao");
var valor_precoFinal = document.getElementById("precoFinal");
var precoFinal = parseFloat(valor_precoFinal.innerHTML);

function adicionar(v, r, l){
    valor_quantia[r] = document.getElementsByClassName("quantia")[r];

    precoFinal = precoFinal + v; //Atualiza o precoFinal com o valor do lanche de indicie 'r'

    valor_precoFinal.innerHTML = precoFinal; //Imprimi na tela o precoFinal atualizado
    
    quantia[r] = parseInt(valor_quantia[r].innerHTML) + 1; //Acresecenta 1 na quantidade de lanches de indicie 'r'

    valor_quantia[r].innerHTML = quantia[r]; //Atualiza o valor final da quantia do lanche de indicie 'r'

    lanche[r] = quantia[r] + "x " + l; //Captura a quantia e o nome do lanche de indicie 'r'
}

function retirar(v, r, l){
    if (quantia[r] > 0){
        //Se a quantia for maior que zero, então...

        precoFinal = precoFinal - v; //Atualiza o precoFinal com o valor retirado do lanche de indicie 'r'

        valor_precoFinal.innerHTML = precoFinal; //Imprimi na tela o precoFinal atualizado

        valor_quantia[r].innerHTML = quantia[r] - 1; //Captura o valor atual da quantia do lanche de indicie 'r'

        quantia[r] = parseInt(valor_quantia[r].innerHTML); //Atualiza o valor final da quantia do lanche de indicie 'r'

        if (quantia[r] > 0){
            lanche[r] = " " + l + " x" + quantia[r]; //Captura a quantia e o nome do lanche de indicie 'r' se a quantia for maior que '0'
        } else {
            lanche[r] = ""; //Se a quantia for igual a '0' (não é possível ser menor) atuliza o lanche como vazio
        }
    } 
    
}

function resetar(v, r, l){
   if (quantia[r] > 0){
        precoFinal = precoFinal - (quantia[r] * v);
        valor_precoFinal.innerHTML = precoFinal;
        valor_quantia[r].innerHTML = 0;
        quantia[r] = 0;
        lanche[r] = "";
    }
    //Reseta todos os valores do lanche de indicie 'r' para o valor inicial
}

function enviar(){
    if (mesa.value > 0 && lanche != "") {
        //Se for declarado o número da mesa e ele for maior que zero e o lanche for diferente de zero, então...

        alert("Seu pedido é o número " + pedido) //Informa o número do pedido

        var tabela = document.getElementById("pedido"); //Captura a tabela com id pedido

        var linha = document.createElement("tr"); //Cria uma linha para a tabela
         
        for (var i = 0; i < 5; i++){
            //Enqunato o contador 'i = 0' for menor que '5', faça...

            var coluna = document.createElement("td"); //Cria uma coluna para a linha da tabela

            var textColuna;

            if (i == 0) {
               //Se o contador 'i' for igual a '0', então...

                textColuna = document.createTextNode(pedido); //Captura o valor da variável 'pedido'

            } else if (i == 1) {
                //Se o contador 'i' for igual a '1', então...

                textColuna = document.createTextNode(mesa.value); //Captura o valor da variável 'mesa'

            } else if (i == 2){
                //Se o contador 'i' for igual a '2', então...

                textColuna = document.createTextNode(lanche); //Captura o valor da variável 'lanhce'

            } else if (i == 3){
                //Se o contador 'i' for igual a '3', então...

                textColuna = document.createTextNode(obs.value); //Captura o valor da variável 'obs'

            } else {
                //Se o contador 'i' for outro valor (agora só é possível ser igual a '4'), então...
                
                textColuna = document.createTextNode("R$"+precoFinal);
                //Captura o valor da variável 'precoFinal' concatenado com 'R$'

            }
            coluna.appendChild(textColuna); //Coloca o valor capturado anteriormente na coluna

            linha.appendChild(coluna); //Adiciona a coluna no final da linha
        }

        tabela.appendChild(linha); //Adiciona a linha no final da tabela

        pedido = pedido + 1;  //Atualiza o valor do pedido acresecentando mais '1'

        mesa.value = 0;
        obs.value = "";
        valor_precoFinal.innerHTML = 0;
        precoFinal = 0;
        for (var i = 0; i <= quantia.length; i++){
            valor_quantia[i].innerHTML = "0"
            quantia[i] = 0;
            lanche[i] = "";
        }
        
    } else {
        //Se não for declarado o número da mesa e ele for menor ou igual a '0'' e o lanche for igual a '0', então...

        alert("Informe sua mesa ou adicione o(s) lanche(s).") //Cria um alerta para que seja informado a mesa ou adicionar o lanche ao pedido
    }
}
