var connect = require('connect'),
    less = require('less'),
    fs = require('fs'),
    path = require('path'),
    serveStatic = require('serve-static');

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
  ensureDirectory( options.outputDir );

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

var ensureDirectory = function (filepath) {
  var dir = path.dirname(filepath),
      existsSync = fs.existsSync || path.existsSync;
  if (!existsSync(dir)) { fs.mkdirSync(dir); }
};
connect().use(serveStatic('public')).listen(3000);
