
(function (window) {
    //=================================================
    var calcDim = function() {
        var ratio;            
        ratio = innerWidth / innerHeight;
        console.log('calcDim: ' 
        + innerWidth + ' x ' 
        + innerHeight + ', ratio: ' 
        + ratio);
        return { width: innerWidth, height: innerHeight, ratio: ratio};          
    };
 
    var sendCmd = function(k, v, ack) {
            var m, ackey;
            m = {k: 'cmd' + k, v:v };
            ackey = 'ack' + k;
            if(ack) {
                this[ackey] = ack; 
            /*
            } else {
                if(!this[ackey]) {
                    this[ackey] =function(){};
                }
            */
            }
                       
            this._target.postMessage(m, parent.location.origin);
            
    };
    var sendAck = function(k, v) {
            var m;
            m = {k: 'ack' + k, v:v };
          
            this._target.postMessage(m, parent.location.origin);
            
    };     
    //=================================================
    var MsgFrameParent = function () {
        var thisObj = this;
        
        
        thisObj.calcDim = calcDim;
        thisObj.sendCmd = sendCmd;
        thisObj.sendAck = sendAck;
        thisObj.targetDevice = null;        
        thisObj.targetOrient = null;

        thisObj._orient = 'port';
        thisObj._device = null;
        thisObj._deviceParse = function() {
            var device, os, web, dim;
            device = thisObj._device;
            os = 'na';
            if(device.iOS) {
                os = 'iOS';
            }
            if(device.android) {
                os = 'android';
            }           
            
            if(device.macOS) {
                os = 'macOS';
            }
                  
            if(device.linux) {
                os = 'linux';
            }            
            if(device.windows) {
                os = 'win';
            } 

            if(device.linux) {
                os = 'chromeOS';
            }            
            web='web-na'
            if(device.safari) {
                web='web-safari';
            }                                  
            if(device.mobileSafari) {
                web='web-safari safari-mobile';
            }
            if(device.chrome) {
                web='web-chrome';
            }
            if(device.firefox) {
                web='web-firefox';
            }
            if(device.ie) {
                web='web-ie ie'+ device.ieVersion ;
            }
            if(device.edge) {
                web='web-edge';
            }
            dim = device.width + 'x' + device.height;
            thisObj._dev  = {
                os: os,
                web: web,
                dim: dim
            };
            if (thisObj.targetDevice ) {
                thisObj.targetDevice.className = 'os-'+os + ' '+web + ' dim-'+dim + ' desktop-'+device.desktop;
            }
                     
        
        };
        thisObj.eventOrient = function (angle) {
            if (angle  < 0) {
                angle = 360 + angle; 
            }
            thisObj.targetAngle.setAttribute('class','deg'+angle);
            
        };
        thisObj.eventFullScreenToggle = function () {
            if(thisObj.targetOrient.ivxFullScreenFlag) {
                thisObj.cmdFullScreen(false);
            }   else {
                thisObj.cmdFullScreen(true);
            }    
        };        
        thisObj.cmdRedirect = function (v) {
            var domain, dArr, base;
            if (v.match('^http')) {
                domain = v.split('//')[1].split('/')[0];
                dArr = domain.split('.');
                base = dArr.slice(1).join('.');
                if (base !== 'ivanix.com') {
                    console.error('MsgFrameParent: base domain failed!');
                    return;
                }                
            } else {
                if (!(v.match('^/'))) {
                    console.error('MsgFrameParent: unkown url string!');
                    return;
                }
            }

            location.href = v;
        };
        thisObj.cmdFullScreen = function(flag) {
            var flags;
            console.log('MsgFrameParent.cmdFullScreen: '  + flag);
            if(flag) {
                thisObj.targetOrient.ivxFullScreenStart();
            } else {
                document.ivxFullScreenStop();
            }

            flags = {flag: flag, last: thisObj.targetOrient.ivxFullScreenFlag};
            thisObj.sendAck('FullScreen', flags );
            thisObj.targetOrient.ivxFullScreenFlag = flag;            
        };

        thisObj.cmdOrient = function(val) {
            console.log('MsgFrameParent.cmdOrient '  + val);
            switch(val) {
                case '?':                    
                    break;
                default:
                    thisObj._orient = val;
                    if (thisObj.targetOrient) {
                       thisObj.targetOrient.className = 'orient-'+val; 
                    } 
                        
                    break;
                    
            } 
            thisObj.sendAck('Orient', thisObj._orient);           
        };
        thisObj.cmdDevice = function(val) {
            console.log('MsgFrameParent.cmdDevice: '  + val);
            switch(val) {
                case '?':                    
                    break;
                default:
                    thisObj._device = val;
                    thisObj._deviceParse();
                    break;
                    
            } 
            thisObj.sendAck('Device', thisObj._device);           
        };        
        thisObj._parseMsg  = function (m) {
            var cmd;
            thisObj.ivxM=m;
            cmd = m.k;
            if (!cmd.indexOf('cmd') && thisObj[cmd]) {
                    thisObj[cmd](m.v);
            } else {
                console.error('IvxMsgParent._parseMsg: bad cmd: ' + cmd);
            }

        };
        thisObj._onRcv = function (e) {
            thisObj.e = e;

            console.log('ivxMsgParent._onRcv: ' + e.data);
            if (e.origin !== location.origin) {
                console.log('MsgFrameParent: origin mismatch!');
                return;
            }
            if (e.source === window) {
                console.log('MsgFrameParent._onRcv: discarding echo');
            }
            thisObj._target = e.source;
                        
            thisObj._parseMsg(e.data);       
        };       
        thisObj._initFullScreen = function() {
            var e, arr, toggle;
            e = thisObj.targetOrient;
            if(!e) {
                return;
            }
            arr = [ 
                    'requestFullScreen',
                    'mozRequestFullScreen',
                    'webkitRequestFullScreen',
                    'msRequestFullscreen'
                  ]
            arr.forEach(function(v) {
                if(e[v]) {
                    e.ivxFullScreenStart=e[v];
                }
            })
            arr = [ 
                    'exitFullscreen',
                    'mozCancelFullScreen',
                    'webkitExitFullscreen',
                    'msExitFullscreen'
                  ]
            arr.forEach(function(v) {
                if(document[v]) {
                    document.ivxFullScreenStop=document[v];
                }
            })
            toggle = document.querySelector('#ivx-fullscreen');
            toggle.addEventListener('click', function() {
               thisObj.eventFullScreenToggle(); 
            });  
        };
        thisObj._init = function() {

            window.addEventListener('message', thisObj._onRcv);
            thisObj.targetDevice = document.querySelector('#device');

            thisObj.targetOrient = document.querySelector('#orient');
            
            thisObj.targetAngle = document.querySelector('#orient-angle');
            window.addEventListener('orientationchange', function() {
                thisObj.eventOrient(window.orientation);
            });
            thisObj._initFullScreen();
        };
        thisObj._init();

    }
    //=================================================
    var MsgFrameObj = function () {
        var thisObj = this;

        thisObj.calcDim = calcDim; 
        thisObj.sendCmd = sendCmd;
        thisObj.sendAck = sendAck;
        thisObj._parseMsg  = function (m) {
            var cmd;
            thisObj.ivxM=m;
            cmd = m.k;
            console.log('ivxMsgObj._parseMsg: ' + cmd);
            if (!cmd.indexOf('ack') && thisObj[cmd]) {
                    thisObj[cmd](m.v);
            } else {
                console.error('ivxMsgObj._parseMsg: bad ack: ' + cmd);
            }

        };
        thisObj._onRcv = function(e) {
            var o;
            console.log('MsgFrameObj._onRcv: ' + e.data);
            thisObj.e = e;

            // if (e.origin !== location.origin) 
            //
            // patch for IE (Edge) which adds ":port" to location.origin
            //
            o = location.origin;
            if (o.indexOf(e.origin)) {
                console.error('MsgFrameObj: origin mismatch! ' + e.origin + ' !== ' + location.origin);
                return;
            }
            
            thisObj._parseMsg(e.data);              
        };
        thisObj.deviceInfo = function(game) {
          var device, i;
          device = game.device;
          i = JSON.parse(JSON.stringify(device));
          delete i['deviceReadyAt'];
          i.width = innerWidth;
          i.height = innerHeight;
          return i;
        };
        thisObj._init = function() {
            var ratio;            
            window.addEventListener('message', thisObj._onRcv);
            ratio = innerWidth / innerHeight;
 
            this._target = parent;         
        };
        thisObj._init();
    }
   //===========================================
    
    var isparent = document.querySelector('body[ivxmsgparent]');
    var ischild  = document.querySelector('body[ivxmsgobj]');
    if (isparent) {
        window.ivxMsgParent = new MsgFrameParent();
    } else {
        if(parent !== window && ischild) {
            console.log('ischild: ' + ischild);
            window.ivxMsgObj  = new MsgFrameObj();
        }
    }

} (window));

