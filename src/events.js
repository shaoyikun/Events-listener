(function(golbal,factory){
    if(typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = golbal.document ?
        factory(golbal, true) :
        function(w) {
            if(!w.document) {
                throw new Error("Events requires a window with a document");
            }
            return factory(w);
        }
    } else {
        factory(golbal);
    }
}(typeof window !== 'undefined' ? window : this,function(window,noGlobal){
    var __Core = {

        __List:[],

        subscribe: function(key, fn) {
            if(!this.__List[key]) {
                this.__List[key] = [];
            }
            this.__List[key].push(fn);
        },
        publish: function() {
            let keys = Array.prototype.slice.call(arguments)

            keys.map((key) => {
                let fns = this.__List[key];
                fns && fns.length && (
                    fns.map((item) => {
                        item.apply(this,arguments);
                    })
                )
            })
            
        },
        unsubscribe: function(key,fn = null) {
            let fns = this.__List[key];

            if(!fns) {
                return;
            }

            if(!fn) {
                fns.length = 0;
            } else {
                fns.map((item,index,arr) => {
                    (item === fn) && (arr.splice(index,1))
                });
            }
        }
    }

    if(!noGlobal) {
        window.Events = __Core;
    }
}));
