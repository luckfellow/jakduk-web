'use strict';

var express = require('express');

module.exports.setup = function (app) {
  var router = express.Router();

  router.get('/', function (req, res) {
    res.render('error/coming_soon', {
      title: ['jakdu', 'common.jakduk'],
      headPage: 'head_error'
    });
  });

  router.get('/schedule', function (req, res) {
    res.render('error/coming_soon', {
      title: ['jakdu', 'common.jakduk'],
      headPage: 'head_error'
    });
  });

  app.use('/jakdu', router);
};