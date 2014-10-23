var log = require('winston').loggers.get('server'),
    path = require('path'),
    less = require('less'),
    fs = require('fs'),
    express = require('express'),
    engines = require('consolidate'),
    // expressLess = require('express-less'),
    app = express();

// credit to http://onedayitwillmake.com/blog/2013/03/compiling-less-from-a-node-js-script/
fs.readFile( 'public/styles.less', function ( error, data ) {
  var dataString = data.toString(),
      options = {
        paths         : ['public/less'],
        outputDir     : 'public/css',
        optimization  : 1,
        filename      : 'styles.less',
        compress      : false
      };

  options.outputfile = options.filename.split('.less')[0] + (options.compress ? '.min' : '') + '.css';
  options.outputDir = path.resolve( process.cwd(), options.outputDir) + '/';
  // ensureDirectory( options.outputDir );

  var parser = new less.Parser(options);
  parser.parse( dataString, function ( error, cssTree ) {
      if ( error ) {
        less.writeError( error, options );
        return;
      }

    // Create the CSS from the cssTree
    var cssString = cssTree.toCSS( {
      compress   : options.compress
    } );

    // Write output
    fs.writeFileSync( options.outputDir + options.outputfile, cssString, 'utf8' );
    console.log('Converted Less: ' + options.filename + ', to CSS: ' + options.outputDir + options.outputfile);
  });
});

require("node-jsx").install();

app.set('views', __dirname);
app.engine('html', engines.mustache);
app.set('view engine', 'html');
// app.use('public/css', expressLess(__dirname, { debug: true }));
app.get('/', function(req, res) {
  res.render('index');
});
app.use(express.static(__dirname, '/public'));
app.listen(3000, function (err) {
  log.info("Server started; listening on port 3000");
});
