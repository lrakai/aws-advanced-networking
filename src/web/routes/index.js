var express = require('express');
var os = require('os');

var router = express.Router();
var ifaces = os.networkInterfaces();
var localAddress = '';
var environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';
var environmentNotice = environment === 'production' ? '' : environment + ' environment';

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false || localAddress !== '') {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }
    localAddress = iface.address;
  });
});


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Accumulator',
    environment: environment,
    environmentNotice: environmentNotice,
    localAddress: localAddress
  });
});

module.exports = router;
