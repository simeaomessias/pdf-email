/* ====================================================================== */
/*           CAPTURA DE TODOS OS ELEMENTOS DA TELA DE INICIAL             */
/* ====================================================================== */
    /*
    // Formulário
    var formulario = document.getElementById('formDados')

    // Dados Gerais
    var nome = document.getElementById('input-nomeUsuario')
    var email = document.getElementById('input-emailUsuario')
    var emailConfirmar = document.getElementById('input-emailUsuarioConfirmar')
    
    // Botões
    var btnAvancar = document.getElementById('btn-avancar')
    */

/* ====================================================================== */
/* VALIDAÇÃO - CADASTRO DE PROCESSO                                       */
/* ====================================================================== */

/*
btnAvancar.addEventListener ('click', () => {

    
    // Objeto com todos os campos do processo
    var dados = {
        'nome': nome.value,
        'email': email.value,
        'emailConfirmacao': emailConfirmar.value
    }

    // Validações
    if (!nome.value || typeof nome.value == undefined || nome.value == null) {
        erros.push({texto: "Nome inválido."})
    } else if (nome.value.length < 3) {
        erros.push({texto: "Nome muito curto."})
    }
    if (!/[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/g.test(nome.value)) {
        erros.push({texto: "O nome deve conter apenas letras."})
    }
    if (!email.value || typeof email.value == undefined || email.value == null) {
        erros.push({texto: "E-mail inválido."})
    }
    if (!emailConfirmar.value || typeof emailConfirmar.value == undefined || emailConfirmar.value == null) {
        erros.push({texto: "E-mail inválido."})
    }
    if (email.value !== emailConfirmar.value) {
        erros.push({texto: "Os e-mails informados não são iguais."})
    }

    // Encerramento da função
    if (erros.length == 0) {
        formulario.submit()
    } else {
        // Criação de elementos para mostrar a lista de alertas
        var tabela = document.getElementById("tabela-erros")
        tabela.innerHTML = ""
        for (var i=0; i<=erros.length-1;i++) {
            tabela.innerHTML +="<tr><td class='alerta-erros'>"+erros[i].texto+"</td></tr>"
        }
        // window.scrollTo(0, 0)
    }
    
})*/
