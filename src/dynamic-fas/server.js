import path from 'path';
import fs from 'fs';

import cors from 'cors';
import express from 'express';
import useragent from 'express-useragent';

import { parse as parseUrl } from 'url'

import sha256 from 'js-sha256';

import NdsCtl from './libs/ndsctl.js'
import DefaultColorHandler from './libs/default_color_handler.js';

const app_port = process.env.PORT || 3000;
const redir_port = process.env.REDIR_PORT || 3001;
const opennds_faskey = process.env.OPENNDS_FASKEY || 'opennds_faskey';

const app = express();
var defaultColorHandler = new DefaultColorHandler();
var ndsCtl = new NdsCtl();

app.use(cors());
app.options('*', cors());
app.use('/static', express.static('./public/static/'));
app.use(useragent.express());

// Get currently authenticated users

app.get('/clients', (req, res) => {
  const result = ndsCtl.exec_cmd('status');
  console.log(`Current clients count: ${result.stdout}`);
  result.stdout.pipe(res);
})

// Start timer for resetting color to default

app.get('/reset', (req, res) => {
  console.log('default color handlerd started')
  defaultColorHandler.start();
  res.json({ reset: 1});
})

// PHP example

// if (isset($_GET["terms"])) {
//   // ToS requested
//   display_terms();
//   footer();
// } elseif (isset($_GET["status"])) {
//   // The status page is triggered by a client if already authenticated by openNDS (eg by clicking "back" on their browser)
//   status_page();
//   footer();
// } elseif (isset($_GET["landing"])) {
//   // The landing page is served to the client immediately after openNDS authentication, but many CPDs will immediately close
//   landing_page();
//   footer();
// } else {
//   login_page();
//   footer();
// }

// https://opennds.readthedocs.io/en/stable/fas.html

app.get('*', (req, res) => {
  var index_html_path = './public/'

  if (req.query.fas) {
    console.log('Received request to FAS');

    let buff = Buffer.from(req.query.fas, 'base64');
    const query = buff.toString();
    let params = query.split(', ').map(param => {
      return param.split('=')
    })
    let fas = {}
    params.forEach(param => fas[param[0]] = param[1])
    const opennds_tok =  sha256(fas.hid + opennds_faskey)
    console.log('opennds_tok calculated')
    const opennds_url = 'http://' + fas.gatewayaddress + '/' + fas.authdir + '/'
    const opennds_redir = 'http://' + fas.gatewayaddress.split(':')[0] + ':' + redir_port + '/'

    if (req.useragent.isAndroid) {
      // if (req.useragent.source.match('Android 6')) {
      //   console.log(`Android 6 detected --> redirect to ${opennds_redir}`)
      //   return res.redirect(301, opennds_redir)
      // }
      index_html_path = index_html_path + 'index_android.html'
    } else if (req.useragent.isiPhone || req.useragent.isiPad) {
      index_html_path = index_html_path + 'index_iphone.html'
    } else {
      index_html_path = index_html_path + 'index.html'
    }
    console.log(`Open ${index_html_path}`)
    const indexFile = path.resolve(index_html_path);
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.log('Something went wrong:', err);
        return res.status(500).send('Oops, better luck next time!');
      }
      data = data.replace('__FAS_TOK__', opennds_tok);
      data = data.replace('__FAS_CALLBACK_URL__', opennds_url);
      data = data.replace('__FAS_REDIRECT_URL__', opennds_redir);
      res.send(data);
    });
  } else {
    res.send('FAS ERROR!!!');
  }
  
})

app.listen(app_port, () => {
  console.log(`😎 Server is listening on port ${app_port}`);
});