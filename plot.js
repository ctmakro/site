var fs = require('fs.extra')
var gnuplot = require('gnuplot');

function intosvg(command,fpath){
  var p = gnuplot()
  command =
  `set term svg size 320,240
  set linetype 1 lc rgb "#66aa33" lw 1.2
  set grid
  unset output
  ` + command
  p.print(command,{end:true})
  p.pipe(fs.createWriteStream(fpath))
}

// runonce('set term svg\n unset output\n plot [-3:3] sin(x)')
module.exports.intosvg = intosvg
