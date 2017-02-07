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

    var ivxInit =false;

    var fcnExtend;
    fcnExtend  = function (baseClass, baseAlias, newClass) {
        'use strict';

        newClass.prototype = Object.create(baseClass.prototype);
        newClass.prototype.constructor = newClass;

        newClass.superProto = baseClass.prototype;
        newClass.superCall = function(objThis, method) {
           var args = Array.prototype.slice.call(arguments,2);
           baseClass.prototype[method].call(objThis, args);
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
    
    Ivx.Array = IvxArray;
    Ivx.extend = fcnExtend;
    Ivx.recall = fcnRecall;
    Ivx.args = fcnArgs;
    Ivx.cookieGet = function (name) {
	  var value = "; " + document.cookie;
	  var parts = value.split("; " + name + "=");
	  if (parts.length == 2) return parts.pop().split(";").shift();
    };


    window.Ivx = Ivx;
} (window));
