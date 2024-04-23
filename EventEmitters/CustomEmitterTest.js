// const EventEmitter = require('events')
const EventEmitter = 
class Emitter extends EventEmitter{} ; 
const myEmitter = new Emitter();

function c1 () {
      console.log("an eevent occured");
}
function c2 () {
      console.log("an event 2 occured");
}

myEmitter.on("event1", c1);
myEmitter.on("event2", c2);

myEmitter.emit('event1')
myEmitter.emit('event2')