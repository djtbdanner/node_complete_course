console.log(new Date().toISOString())
console.log(Math.floor(Math.random() * 1000 + 1))
var t = Date.now();
for (var i = 0; i < 1000; i++){
    console.log(Date.now());


}
var x = Date.now() - t;

var date = new Date(x);

console.log(date.toISOString())