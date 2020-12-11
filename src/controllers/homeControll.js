exports.homePage = (req, res) => {
    res.render('index');
    return;
}

exports.trataPage = (req, res) => {
    res.send(req.body);
    return;
}