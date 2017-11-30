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

//graphviz shit
var spawn  = require('child_process').spawn

function dot(command,fpath){
  var gv = spawn('dot',[
    '-Tsvg',
    '-o'+fpath,
  ])
  var out = ''
  var err = ''
  gv.stdout.on('data',data=>{
    out+=data
  })
  gv.stdout.on('end',()=>{
    // if we dont register a callback here, the process will die early
    console.log('graphviz dot ended')
  })
  gv.stderr.on('end',()=>{
    // if we dont register a callback here, the process will die early
    console.log('graphviz dot ended')
  })
  gv.stderr.on('data',data=>{
    err+=data
  })

  gv.stdin.write(command)
  gv.stdin.end()
}

function test(){
  dot(`
    digraph {
      a -> b[label="0.2",weight="0.2"];
      a -> c[label="0.4",weight="0.4"];
      c -> b[label="0.6",weight="0.6"];
      c -> e[label="0.6",weight="0.6"];
      e -> e[label="0.1",weight="0.1"];
      e -> b[label="0.7",weight="0.7"];
    }
    `,'./digraph.svg'
  )
}
module.exports.dot = dot
// test()
