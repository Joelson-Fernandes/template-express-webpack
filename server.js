require('dotenv').config(); //carrega variaveis de ambiente de desenvolvimento do arquivo .env
const express = require('express');
const app = express();
//modelagem do banco de dados
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true} )
    .then(() => {
        app.emit('connect')
    })
    .catch(e => console.log(e));
 
const session = require('express-session'); //session, este módulo lê diretamente e grava cookies  
//mongoStore garante que session serao salvas na base de dados e não em memoria
const MongoStore = require('connect-mongo');
const flash = require('connect-flash'); //mensagens destrutivas (erro, feedback, etc...) salvas em session
const routes = require('./routes'); //rotas da aplicação
const path = require('path'); // path trabalha com caminhos
//O helmet ajuda você a proteger seus aplicativos Express definindo vários cabeçalhos HTTP.
const helmet = require('helmet');
// o csrf é um token secreto e específico do usuário em todos os envios de formulários e URLs de efeito colateral para impedir falsificações de solicitação entre sites.
const csrf = require('csurf');
//Middlewares globais padrão
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');


//A função app.use() adiciona um novo middleware ao aplicativo. Essencialmente, sempre que uma solicitação atingir seu backend, o Express executará as funções para as suas funções que você passou em ordem.


//app.use(helmet());
app.use(express.urlencoded({ extended: true })); //permite a postagem de formularios para a aplicação
app.use(express.json()); //analisa as solicitações de JSON recebidas e coloca os dados analisados em .req.body
app.use(express.static(path.resolve(__dirname, 'public')));//arquivos estaticos que podem ser acessados diretamente

//configuração de sessions
const sessionOptions = session({
    secret: 'joe',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 24 * 7,
        httpOnly: true 
    }
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));//arquivos renderizados na tela
app.set('view engine', 'ejs');//serviço de renderização utilizado

app.use(csrf());
//Middlewares
app.use(middlewareGlobal, checkCsrfError, csrfMiddleware);
app.use(routes);

app.on('connect', () => {
    app.listen(8080, () => {
        console.log('acessar http://localhost:8080');
        console.log('Servidor executado na porta 8080');
    });
});
