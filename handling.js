var fs = require('fs.extra')
require('colors')
var jr = require('./jaderender')
var plot = require('./plot.js')
var pr = __projectroot

var contentdir = pr + './content/'
var templdir = pr + './templates/site.jade'
var destdir = pr + './generated/'

destdir = process.argv[2]||destdir

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

function savefile(fpath,string){
  fs.writeFileSync(fpath,string)
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

  register('md',function(init){
    init()
    push('md2html:'.yellow)

    var data = load_data_from_file(workingdir+fname)
    data.filename = fname

    var match = data.content.match(/!(.*)/)
    if(match){
      data.content = data.content.slice(match[0].length)
    }

    data.title = match?match[1]:'no title'
    print(`title is:`,data.title.red)

    var mdcoolify = function(content){
      var plotcounter = 0
      // extract plot commands
      print('extracting plots...')

      content = content.replace(/<plot([\s\S]*?)\/>/gi,function(matching,p1,offset){
        // for each replaced plot, generate one svg
        var suffix = (plotcounter++).toString()
        var destfilename = fname_without_ext+'_plot_'+suffix+'.svg'
        print('generating',destfilename.cyan)
        var command = p1
        plot.intosvg(command, destdir+pathpad+destfilename)

        var tag = `plot ${suffix}: ${command.trim().split('\n').join(' ')}`
        tag = tag.replace(/\"/g,'&quot;')
        return `<img class="plot" src="${destfilename}" title="${tag}" />`
      })

      return content
    }

    fs.mkdirpSync(destdir+pathpad)

    data.content = mdcoolify(data.content)

    print('generating HTML...')
    var html = jade(data)
    print('generated. length:',html.length)

    fname_without_ext += '.html'

    print(`writing file ${pathpad}${fname_without_ext}...`)
    fs.writeFileSync(destdir+pathpad+fname_without_ext,html)
    print('file written.')

    pop()
  })
}

module.exports = handle
