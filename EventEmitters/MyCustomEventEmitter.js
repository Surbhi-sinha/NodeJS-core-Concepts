// Event Emitters : - So basically Node JS is completely based on the Events(Event driven architecture) whenever we listen to an event the server response as simple as that.

// these event emitters follow the structure of the publisher subscriber model where one element subscribes and other publishes the result. very similar to the js Events.

// Here we are trying to make our own event emitter which tries to mimic the original functionality of the NodeJS core EventEmitter class.

class CustomEventEmitter {

      // master object to store the Key:Value pair of the listeners and there functions.
      listener = {};


      // addListener event checks if the event is already registered. If yes then it returns an array otherwise empty array.
      addListener(eventName, fn) {
            this.listener[eventName] = this.listener[eventName] || [];
            this.listener[eventName].push(fn);
            return this;
      };

      on(eventName, fn) { // an alias of the addListener method
            return addListener(eventName, fn);
      };

      removeListener(eventName, fn) { //  remove a listener from an event and if the event has multiple listeners then others will not get impacted
            // Grab the array of the listeners registered for the particular eventName
            let lis = this.listener[eventName];
            // if none found return listners for chaining
            if (!lis) return this;
            // if found, loop through all the listeners and remove the listner that matches with the given 'fn'
            for (let i = lis.length; i > 0; i--) {
                  if (lis[i] === fn) {
                        lis.splice(i, 1);
                        break;
                  }
            }
            // return 'this' to continue chaining because the same listener might be registered multiple times.
            return this;
      };

      off(eventName, fn) { //again an alias of the Removelistner
            return removeListener(eventName, fn);
      };

      once(eventName, fn) {
            //Grab the event array Object or Empty if first time registration
            this.listener[eventName] = this.listener[eventName] || [];
            //Creating a wrapper which will called "onceWrapper" which will invoke the "fn" when the event is emiiter and also removes the listener.
            const onceWrapper = () => {
                  fn();
                  this.off(eventName, onceWrapper);
            }

            // add the wrapper function in the list of listeners
            this.listener[eventName].push(onceWrapper);

            // returning this for chaining.
            return this;

      };

      emit(eventName, ...args) {
            // Get the functions for said eventName parameter
            let fns = this.listener[eventName];
            // if no listeners return false
            if (!fns) return false;

            //for all function listeners , invoke the function with arguements 
            fns.forEach((f) => {
                  f(...args);
            });
            // return true when done
            return true
      };

      listenerCount(eventName) {
            // Get the functions/listeners under consideration or an empty array if none.
            let fns = this.listener[eventName] || [];
            // Return the length.
            return fns.length;
      };

      rawListener(eventName) {
            // Returns a copy of the array of listeners for the event named eventName, including any wrappers (such as those created by .once()). The once wrappers in this implementation will not be available if the event has been emitted once.  
            return this.listener[eventName];
      };

}
