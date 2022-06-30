/*
const HomeModel = require('../models/Home')

HomeModel.create({
    titulo: 'titulo de teste',
    descricao: 'descricao de teste'
})
    .then(dados => console.log(dados))
    .catch(e => console.log(e));
*/

exports.paginaInicial = (req, res) => {
    //req.flash('info', 'Ola Mundo!')
    //console.log(req.flash('info'));
    //console.log(req.session.usuario);
    res.render('index', {
        titulo: 'Modelo webpack + express',
    });
    return;
}

exports.trataPost = (req, res) => {
    res.send(`seu nome: ${req.body.nome}`);
    return;
}