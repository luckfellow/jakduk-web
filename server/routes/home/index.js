const i18n = require('i18n');

module.exports.setup = function (app) {
  app.get(['/', '/home'], (req, res, next) => {
    res.locals.title = [
      i18n.__('common.jakduk')
    ];

    res.render('index', {
      layout: false
    });
  });
};
