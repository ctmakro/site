var fs = require('fs.extra')
var gnuplot = require('gnuplot');

function intosvg(command,fpath){
  var p = gnuplot()
  command =
  `set term svg size 320,240 enhanced font 'Verdana,10'

  set linetype 1 lc rgb "#66aa33" lw 1.2

  unset output
  set samples 320

  set style line 101 lc rgb '#aaaaaa' lt 1 lw 1
  set border 3 back ls 101
  set tics nomirror

  set style line 102 lc rgb '#eeeeee' lt 1 lw 1
  set grid back ls 102
  ` + command
  p.print(command,{end:true})
  p.pipe(fs.createWriteStream(fpath))
}

// runonce('set term svg\n unset output\n plot [-3:3] sin(x)')
module.exports.intosvg = intosvg
