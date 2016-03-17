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
    window.Ivx = Ivx;
    
} (window));
