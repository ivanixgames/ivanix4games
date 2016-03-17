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


    Ivx.SvcPhotos = function () {
        var thisObj, objGroups, objPhotos;
        thisObj = this;
        this._url = 'https://picasaweb.google.com/data/feed/api/user/';

        this._read = function (url, cb) {
            $(function(){
                $.ajax({
                    dataType: 'jsonp',
                    url: url,
                    data: {
                        alt: 'json-in-script',
                    },
                    success: function(data){
                        console.log('IvxImgRsc: success');
                        cb(true, data);
                    },
                    error: function(jqxhr, txt, http) {
                        console.error('IvxImgRsc: read failed!: ' + txt + '/' + http);
                        cb(false, {txt: txt, http: http});
                    }
                });
            });

        };
        thisObj.groups = {};
        objGroups = thisObj.groups;
    
        objGroups._fetch = function(ok, data, cb) {
            var entry;
            if (!ok) {
                console.error('IvxSvcPhotos.groups._fetch: error: ' + data)
                cb(ok, data);
                return;
            }
            thisObj.data  = data;
            objGroups.entries = [];
            $.each(data.feed.entry, function() {
                var split;
                split = this.title.$t.split('/');
                // ivanixdev: ugly hack!
                // google picasa and photos does not support nested albums
                // so we use '/' album title to denote psuedo nested folder path.
                if (split.length < 2) {
                    return true;
                }
                entry = {};
                
                entry.path = this.title.$t;
                entry.split = split;

                entry.desc = this.media$group.media$description.$t;
                entry.count = this.gphoto$numphotos.$t;
                $.each(this.link, function() {          
                    if (this.type === "application/atom+xml" && this.rel === "http://schemas.google.com/g/2005#feed") {
                    
                        entry.link = this.href;
                    }
                })
                objGroups.entries.push(entry);
            });
            objGroups.sorted = objGroups.entries.sortOn('path');
            objGroups.cd();
            console.log('svcPhotos.fetch: found: ' + objGroups.entries.length);
            cb(ok);
        };
        objGroups.fetch = function(user, cb) {
            var url;
            if (!cb) {
                cb = function() {};
            }
            
            url = thisObj._url + user;
            
            thisObj._read(url, function(ok, data) {
                objGroups._fetch(ok, data, cb);
            });
        };
        objGroups.selected = null;
        objGroups._cdArr = [];
        objGroups._cdFound = {};
        
        objGroups.path = function() {
        return objGroups._cdArr.join('/');  
        };
        objGroups.folders = function() {
        return objGroups._cdFound.folders;  
        };    
        objGroups.photos = function() {
            return objGroups._cdFound.photos;
        };
        objGroups.cd = function(dir) {
            var i, sorted, length,   pattern, depth, sublist, val, count, unique;
                    
            objGroups.selected = null;
            switch (dir) {
                case undefined:
                case '':
                    objGroups._cdArr = [];
                    break;
                case '..':
                    objGroups._cdArr.pop();
                    break;
                default:
                    if (dir) {
                        objGroups._cdArr.push(dir);                  
                    }

            }

            pattern = objGroups._cdArr.join('/');
            sorted = objGroups.sorted;
            length = sorted.length;
            sublist =[];
            depth = objGroups._cdArr.length;
            count = 0;     
            for(i = 0; i < length; i++ ) {
                var o = sorted[i];
                //console.log('dir:  looping i: ' + i);
                if (!o.path.indexOf(pattern) && pattern.length < o.path.length) {
                    val = o.split[depth];
                    if (!(sublist.length && sublist[sublist.length - 1] === val)) {
                        //console.log('dir: found idx: ' + i);
                        sublist.push(o.split[depth]);
                    }                
                }
                if (o.path === pattern) {
                    count  = o.count;
                    unique = o;
                }
            }

            objGroups._cdFound =  {folders: sublist, photos: count, entry: unique };
        };

        thisObj.photos = {};
        objPhotos = thisObj.photos;
        objPhotos.entries = [];
        objPhotos._fetch = function(ok, data, cb) {

            if (!ok) {
                console.error('IvxSvcPhotos.photos._fetch: error: ' + data);
                cb(ok, data);
                return;
            }
            console.log('IvxSvcPhotos.photos.fetch: ok');
            objPhotos.data = data;
            objPhotos.entries = data.feed.entry;
            cb(ok, objPhotos.entries);
        };    
        objPhotos.fetch = function(cb) {
            var url;
            if (!objGroups._cdFound.entry) {
                console.error('IvxSvcPhotos.photos.fetch: error!');
                return false;
            }
            url = objGroups._cdFound.entry.link;
            thisObj._read(url, function(ok, data) {
                objPhotos._fetch(ok, data, cb);
            });
            return true;      
        };
    };

    window.Ivx = Ivx;
    
} (window));
