require('./global_env.js')

const fs = require('fs.extra');
var jr = require('./jaderender')
var colors = require('colors')

// var print = console.log
var range = (n)=>{var a =[];for(var i=0;i<n;i++){a.push(i)}return a}
var pr = __projectroot

var contentdir = pr + './content/'

function get_files_in(contentdir){
  return fs.readdirSync(contentdir)
}

function indir(pathpad,depth,printpad){
  depth = depth||0
  printpad = printpad||['']

  var print = function(){
    var a = printpad.join('')
    process.stdout.write(a.green)
    var args = []
    for(var i in range(arguments.length)){
      args.push(arguments[i])
    }
    console.log.apply(this,args)
  }

  var push = str=>printpad.push(str)
  var pop = ()=>printpad.pop()

  push('> ')

  pathpad+='/'
  var workingdir = contentdir +'/'+ pathpad

  var env={}
  env.print = print; env.push = push
  env.pop = pop
  env.workingdir = workingdir
  env.pathpad = pathpad

  env.relative_root = '../'.repeat(depth)

  print('into',pathpad,'...')
  var cf = get_files_in(workingdir)

  print('got',cf.length,'file/folders to process')
  print('they are',cf.toString().yellow)

  push('- ')

  for(var i=0;i<cf.length;i++){
    var fname = cf[i]
    env.fname = fname
    print('- item',i,(pathpad+fname).cyan)

    if(fs.lstatSync(workingdir+fname).isDirectory()){
      push('|')
      indir(pathpad+fname,depth+1,printpad)
      pop()
    }else{
      //is file

      var ext = fname.split('.')
      var fname_without_ext = ext[0]
      ext = ext.length==1?'':ext.pop()

      env.ext = ext
      env.fname_without_ext = fname_without_ext
      env.printpad = printpad

      forfile(env,ext)
    }
  }
  pop()
  pop()

  //
}

var filehandlers={}
function register(ext,processor){
  filehandlers[ext] = processor
}

function forfile(env,ext){
  if(filehandlers[ext]){
    filehandlers[ext].call(env,function(){
      for(i in env){
        this[i]=env[i]
      }
    })
  }else{
    env.print('ignoring')
  }
}

require('./handling')(register)

indir('')
