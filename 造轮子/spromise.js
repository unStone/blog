/**
 * status:
 * 
 * 0 - pending
 * 1 - fulfilled with _value
 * 2 - rejected with _value
 */ 
var spromise = function(fn) {
  this.status = 0;

  var resolve = function() {
    console.log('resolve this', this)
    if(this.status !== 0) return
    this.status = 1;
  }.bind(this)

  var reject = function() {
    console.log('reject this', this)
    if(this.status !== 0) return
    this.status = 2;
  }.bind(this)

  fn(resolve, reject)
}

const a = new spromise(function (resolve, reject) {
  setTimeout(() => {
    resolve(1)
  }, 1000);
  console.log(123)
})