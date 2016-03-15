(function(window, Array) {
    
    
    var Ivx = window.Ivx || {};    

    var fcnExtend;
    fcnExtend  = function (baseClass, baseAlias, newClass) {
        'use strict';

        newClass.prototype = Object.create(baseClass.prototype);
        newClass.prototype.constructor = newClass;
        newClass.prototype._super = baseClass.prototype;

        if (baseAlias) {
            var superbaseAlias = '_$$'+ baseAlias ;
            if (baseClass.prototype[superbaseAlias]) {
                throw new Error('baseAlias super class already exists! (' + superbaseAlias +')');
            } else {
                newClass.prototype[superbaseAlias] = baseClass;
            }
            superbaseAlias = '_$'+ baseAlias ;
            if (baseClass.prototype[superbaseAlias]) {
                throw new Error('baseAlias super proto already exists! (' + superbaseAlias +')');
            } else {
                newClass.prototype[superbaseAlias] = baseClass.prototype;
            }
        }
        newClass.prototype._$super = function(baseAlias, method) {
            var args = Array.prototype.slice.call(arguments,2);
            return this['_$'+baseAlias][method].apply(this,args);
        };
        return newClass;

    };       
    var fcn = {
        extend: fcnExtend
    };
/*    
    var IvxArr = fcnExtend(Array,'Array', function() {
        Array.call(this);

    });
*/  
    Array.prototype.sortOn = function(key, desc){
        this.sort(function(a, b) {
            var result = desc ? (a[key] < b[key]) : (a[key] > b[key]);
            return result ? 1 : -1;
        });
        return this;
    }    
    Array.prototype.ivxShuffle = function() {
        var r, swap;
        for(var i = 0; i < this.length; i++) {
            r = Math.floor(Math.random() * this.length);
            swap = this[i];
            this[i] = this[r];
            this[r]  = swap;
        }
        return this;
    };
    Array.ivxSeq = function(size, start) {
        var arr = [];
        if (start === undefined) {
            start = 0;
        }
        arr.length = 0;
        for(var i = 0; i < size; i++) {
            arr.push(i + start);
        }
        return arr;
    };
        
         
    //Ivx.Array = IvxArr;
    Ivx.fcn = fcn;
    window.Ivx = Ivx;
    
} (window, Array));
/*

*/