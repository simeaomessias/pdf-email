# Criação e envio de arquivo (pdf) por e-mail

O objetivo desse projeto foi praticar a criação de arquivo pdf a partir de arquivo html e aprender o módulo Nodemailer para envio de e-mail.

## Funcionalidades
- Após validação simplificada dos dados passados via formulário, a aplicação cria um arquivo pdf usando esses dados em seu conteúdo. A bibliotca html-pdf foi usado nesse etapa.
- Se o arquivo for criado com sucesso, um e-mail com esse arquivo anexado será enviado para o endereço fornecido.
- Apresenta mensagem de erro para o caso de falha na criação do arquivo ou problema na tentativa de envio do e-mail.

## Tecnologias utilizadas
- HTML5
- CSS3
- JavaScript
- Node.js / Express.js / Handlebars.js
- Html-pdf
- Nodemailer

## Como acessar
- **Para receber um e-mail** <br>
  https://sm-pdf-email.herokuapp.com/
- **Para instalar e executar o projeto** <br>
  1. Fazer clone deste repositório. <br>
     `https://github.com/simeaomessias/pdf-email.git`
  2. Certificar que o npm está instalado. <br>
     O npm pode ser obtido instalando o [Node](https://nodejs.org/en/).
  3. Inserir as credenciais do seu e-mail (usado para enviar as mensagens) em **nodeMailer.createTransport** na rota /email.
  3. Executar o comando *npm start*. <br>
     Acesse http://localhost:8081 para visualizar no navegador.

## Sugestões
Entre em contato
- https://www.linkedin.com/in/simeaomessias/
- https://twitter.com/simeaomessias
- simeaoclaudiomessiasneto@gmail.com

## Autor
https://github.com/simeaomessias

