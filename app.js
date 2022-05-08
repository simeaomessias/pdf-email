// ======================================================================
// MÓDULOS

import express from 'express'

import { engine } from 'express-handlebars';
import Handlebars from 'handlebars'

import fs from 'fs'

import pdf from 'html-pdf'
import nodeMailer from 'nodemailer'

const app = express()

// ======================================================================
// CONFIGURAÇÕES

// Usando express.json() e express.urlencoded()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Usando a pasta publica na raiz do projeto
app.use(express.static('public'))

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// ======================================================================
// VARIÁVEIS

var dados = {
    'nome': "",
    'email': "",
    'emailConfirmacao': ""
}

var erros = []
var acertos = []


// ======================================================================
// ROTAS

// ====================================================
app.get('/', (req, res) => {

    dados = {
        'nome': '',
        'email': '',
        'emailConfirmacao': ''
    }

    res.render('home', {layout: 'main', dados: dados})
})

// ====================================================
app.post('/', (req, res) => {

    dados = {
        'nome': req.body.nomeUsuario,
        'email': req.body.emailUsuario,
        'emailConfirmacao': req.body.emailUsuarioConfirmar
    }

    erros = []
    acertos = []

    // Validações
    if (!req.body.nomeUsuario || typeof req.body.nomeUsuario == undefined || req.body.nomeUsuario == null) {
        erros.push({texto: "Nome inválido."})
    } else if (req.body.nomeUsuario.length < 3) {
        erros.push({texto: "Nome muito curto."})
    }
    if (!/[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/g.test(req.body.nomeUsuario)) {
        erros.push({texto: "O nome deve conter apenas letras."})
    }
    if (!req.body.emailUsuario || typeof req.body.emailUsuario == undefined || req.body.emailUsuario == null) {
        erros.push({texto: "E-mail inválido."})
    }
    if (!req.body.emailUsuarioConfirmar || typeof req.body.emailUsuarioConfirmar == undefined || req.body.emailUsuarioConfirmar == null) {
        erros.push({texto: "Confirmação de e-mail inválida."})
    }
    if (req.body.emailUsuario !== req.body.emailUsuarioConfirmar) {
        erros.push({texto: "Os e-mails informados não são iguais."})
    }

    if (erros.length > 0) {
        
        res.render('home', {erros: erros, dados: dados})

    } else {

        res.redirect('/arquivo')
    
    }
})

// ====================================================
app.get('/arquivo', (req, res) => {
    
    acertos = [];
    erros = [];

    // CRIAÇÃO DO ARQUIVO

    (async () => {

        try {

            const templateArquivo = fs.readFileSync('./views/modeloArquivoPDF.html').toString()
            var templateCompilado = Handlebars.compile(templateArquivo)
            var resultado = templateCompilado(dados)

            const options = {
                type: 'pdf',
                format: 'A4',
                orientation: 'portrait'
            }

            pdf.create(resultado, options).toFile(`${dados.email}.pdf`, (error, res) => {
                if (error) {

                } else {

                }
            })

            acertos.push({'texto': "ARQUIVO CRIADO COM SUCESSO!"})

            res.redirect('/email')

        } catch (error) {

            erros.push({'texto': "Erro na criação do arquivo."})
            erros.push({'texto': "O e-mail não será enviado."})
            erros.push({'texto': `${error}`})

            res.render('resultado', {erros: erros})

        }

    })();
})

// ====================================================
app.get('/email', (req, res) => {

    (async () => {

        let transporter = nodeMailer.createTransport({
            host: '',
            port: 0,
            secure: false,
            auth: {
                user: 'seuemail',
                pass: 'suasenha'
            }
        });

        let mailOptions = {
            from: '"Projeto (PDF por E-mail)" <sm-remetente@outlook.com>',
            to: dados.email,
            subject: "PDF por EMAIL",
            text: "",
            attachments: [
                {
                    path: `./${dados.email}.pdf`
                }
            ],
            html: '<br><h1><i>Obrigado por testar a aplicação desse projeto.</i></h1>'
        };

        transporter.sendMail(mailOptions, (error, info) => {

            if (error) {

                erros.push({'texto': "ERRO AO ENVIAR O E-MAIL"})
                console.log(`ERRO: ${error}`)
                res.render('resultado', {erros: erros})
            
            } else {

                acertos.push({'texto': "E-MAIL ENVIADO COM SUCESSO!"})
                acertos.push({'texto': "- - - - - - - - - - - - - - - - - - - - - - - - - - -"})
                acertos.push({'texto': `REMETENTE`})
                acertos.push({'texto': `sm-remetente@outlook.com`})
                acertos.push({'texto': `DESTINO`})
                acertos.push({'texto': `${dados.email}`})
                acertos.push({'texto': `ASSUNTO`})
                acertos.push({'texto': `PDF por EMAIL`})
                acertos.push({'texto': `ANEXO`})
                acertos.push({'texto': `${dados.email}.pdf`})                
                console.log('Message %s sent: %s', info.messageId, info.response);
                res.render('resultado', {acertos: acertos, erros: erros})
            
            }

            // Código para deletar o arquivo criado
            fs.unlink(`${dados.email}.pdf`, (error) => {
                if (error) {
                    console.log(`Erro ao excluir o arquivo ${dados.email}.pdf`)
                    return
                }
            })
        })
    })();
})

// ======================================================================
// SERVIDOR

const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})