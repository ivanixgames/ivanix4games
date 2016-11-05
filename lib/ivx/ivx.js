/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Ivanix Mobile LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS ofi  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
(function(window) {
    
    
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
    var fcnRecall;

    fcnRecall = function(obj, namespace, prop) {
	    Object.defineProperty(obj, prop, {
	
	        set: function(val) {
                var jsonStr;
                jsonStr = JSON.stringify(val);
	            localStorage.setItem(namespace + ':' + prop, jsonStr);
	        },
	        get: function() {
	            var jsonStr, val;
	            jsonStr = localStorage.getItem(namespace + ':' + prop);
                val = JSON.parse(jsonStr);
	            return val;
	        }
	    });
    };

    var fcnArgs  = function () {
        var args, argsArr, kv, k, v;
        args = location.href.split('?')[1];
        if(!args) {
            return {};
        }
        argsArr = args.split('&');
        var obj = {};
        for (var i = 0; i < argsArr.length; i++) {
            kv = argsArr[i].split('=');
            k = kv[0];
            if (kv.length === 2 ) {
                v = kv[1];
            } else {
                v = null;
            }
            obj[k] = v;
        }
        return obj;
    };

    var IvxArray = fcnExtend(Array,'Array', function() {
        Array.call(this);

    });

    IvxArray.prototype.sortOn = function(key, desc){
        this.sort(function(a, b) {
            var result = desc ? (a[key] < b[key]) : (a[key] > b[key]);
            return result ? 1 : -1;
        });
        return this;
    }    
    IvxArray.prototype.ivxShuffle = function() {
        var r, swap;
        for(var i = 0; i < this.length; i++) {
            r = Math.floor(Math.random() * this.length);
            swap = this[i];
            this[i] = this[r];
            this[r]  = swap;
        }
        return this;
    };
    IvxArray.ivxSeq = function(size, start) {
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
    Ivx.consoleLog = function(msg) {
       console._log(msg);
       var txt = Ivx._consoleTxt;
       txt.innerText += '\n' + msg;
       txt.scrollTop = txt.scrollHeight;
    };
    Ivx.consoleWarn = function(msg) {
       console._warn(msg);
       var txt = Ivx._consoleTxt;
       txt.innerText += '\n' + msg;
       txt.scrollTop = txt.scrollHeight;
    };
    Ivx.consoleError = function(msg) {
       console._error(msg);
       var txt = Ivx._consoleTxt;
       txt.innerHTML += '<p>' + msg + '</p>';
       txt.scrollTop = txt.scrollHeight;
    };
    Ivx.consoleHide = function(msg) {
       Ivx._consoleDiv.setAttribute('class','hide');
    };     
    Ivx.consoleMin = function(msg) {
       Ivx._consoleDiv.setAttribute('class','min');
    };     
    Ivx.consoleShow = function(msg) {
       Ivx._consoleDiv.setAttribute('class','show');
    };     
    Ivx.consoleToggle = function(msg) {
        var c;
        c = Ivx._consoleDiv.getAttribute('class');
        if (c === 'show') {
            Ivx.consoleMin();
        } else {
            Ivx.consoleShow();
            
        }
    };     
    Ivx.consoleOff = function(msg) {
        Ivx.consoleHide();
        console.log = console._log;
        console.warn = console._warn;
        console.error = console._error;
    };     
    Ivx.consoleOn = function(msg) {
        Ivx.consoleShow();
        console.log = Ivx.consoleLog;
        console.warn = Ivx.consoleWarn;
        console.error = Ivx.consoleError;
        console.log('Ivx.consoleOn');
    };
    Ivx.consoleDoubleTap = function() {
        var ts, diff;
        
        console.log('click: Ivx.consoleDoubleTap()');
        
        ts = Date.now();
        diff = ts - Ivx._consoleTS;
    
        console.log('dif: ' + diff);
        if(diff < 3500) {
            console.log('double tap detected');
            Ivx.consoleToggle();
        } else {
            Ivx._consoleTS=ts;            
        }

        
    };
    Ivx._initConsole = function() {
        var div, txt, tog;
        
        div = document.querySelector('#ivx-console');
        if(!div) {
            return;
        }
        
        console.log('Ivx.consoleInit:');

        txt = document.createElement('div');
        txt.setAttribute('class','ivx-console');
        div.appendChild(txt);
 
        tog = document.createElement('div');
        tog.setAttribute('class','ivx-toggle');
        //tog.innerText="c";        
        div.appendChild(tog);

        
        Ivx._consoleTxt = txt;
        Ivx._consoleDiv = div;
        Ivx._consoleTS = 0;

        
        if(Ivx._consoleDiv) {
            console.log('Ivx.init: found logElement');
            console._log = console.log;
            console._warn = console.warn;
            console._error = console.error;
            Ivx.consoleOn();
 
        }

        tog.addEventListener('click', function(event) {
            console.log('click: Ivx.consoleToggle()');
            Ivx.consoleToggle();
        }, false);
/*
        tog.addEventListener('touchstart', function(event) {
            console.log('touchstart');
            //Ivx.consoleDoubleTap();
            Ivx.consoleToggle();
        }, false);
   */
    };
    Ivx._init = function() {
        Ivx._initConsole();
    };
    
    Ivx.Array = IvxArray;
    Ivx.extend = fcnExtend;
    Ivx.recall = fcnRecall;
    Ivx.args = fcnArgs;
    window.Ivx = Ivx;
    Ivx._init();
} (window));
