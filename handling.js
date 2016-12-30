var fs = require('fs.extra')
require('colors')
var jr = require('./jaderender')

var pr = __projectroot

var contentdir = pr + './content/'
var templdir = pr + './templates/site.jade'
var destdir = pr + './generated/'

function jade(data){
  var html = jr(templdir,data)
  return html
}

function load_data_from_file(fpath){
  f = fs.readFileSync(fpath,'utf8')
  return {
    content:f
  }
}

var justcopy = function(r){
  r()
  print('justCopy:'.green,fname.red)
  fs.copy(contentdir+pathpad+fname, destdir+pathpad+fname, { replace: true }, function (err) {
    if (err) {
      // i.e. file already exists or can't write to directory
      console.error(err)
    }
  });
}

function handle(register){
  
  'py.html.htm.js.css.png.jpg.gif'.split('.')
  .map((ext)=>{
    register(ext,justcopy)
  })

  register('md',function(r){
    r()
    push('md2html:'.yellow)

    var data = load_data_from_file(workingdir+fname)
    data.filename = fname

    var match = data.content.match(/!(.*)/)
    if(match){
      data.content = data.content.slice(match[0].length)
    }

    data.title = match?match[1]:'no title'
    print(`title is:`,data.title.red)

    print('generating HTML...')
    var html = jade(data)
    print('generated. length:',html.length)

    fname_without_ext += '.html'

    print(`writing file ${pathpad}${fname_without_ext}...`)
    fs.mkdirpSync(destdir+pathpad)
    fs.writeFileSync(destdir+pathpad+fname_without_ext,html)
    print('file written.')

    pop()
  })
}

module.exports = handle
