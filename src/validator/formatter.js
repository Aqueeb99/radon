const trim = function(){
const a ="   functionup     "
const b = a.trim()
console.log(b)
}
const lower = function(){
const c ='ITS GOOD TO BE BAD'
const d = c.toLocaleLowerCase()
console.log(d)

}

const upper = function (){
const e = 'dont act like a fool'
const f = e.toLocaleUpperCase()
console.log(f)
}
module.exports.trim = trim
module.exports.lower = lower
module.exports.upper = upper