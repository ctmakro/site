require('./global_env.js')

const fs = require('fs');
var jr = require('./jaderender')

var print = console.log

var contentdir = './content/';

function get_content_files(){
  return fs.readdirSync(contentdir)
}

function gen(data){
  print('generating HTML...')
  var html = jr('./templates/site.jade',data)
  print('generated. length:',html.length)

  return html
}

function load_data_from_file(fname){
  f = fs.readFileSync(`${contentdir}${fname}`,'utf8')
  return {
    filename:fname,
    content:f
  }
}

function loop(){
  print('scanning dir...')
  cf = get_content_files()
  
  print('we got',cf.length,'files to process')
  for(i in cf){
    fname = cf[i]
    print('----------------',i)

    print('loading from',fname)
    data = load_data_from_file(fname)

    match = data.content.match(/@(.*)/)
    if(match){
      data.content = data.content.slice(match[0].length)
    }
    data.title = match?match[1]:'no title'
    print(`title is:"${data.title}"`)

    html = gen(data)

    fname = fname.split('.')[0]+'.html'

    print(`writing file ${fname}...`)
    fs.writeFileSync(`./generated/${fname}`,html)
    print('file written.')
  }
}

loop()
