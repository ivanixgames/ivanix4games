(function(window) {
    
    
    var Ivx = window.Ivx || {};

    var ivxInit =false;

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
            console.log('Ivx.consoleInit: no div!');
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
    };

    Ivx._initConsole0 = function() {
        console.log('Ivx._init:');
        if (ivxInit) {
            //DomContentLoaded/Load event happens twice
            console.log('Ivx._init: already!');
            return;
        } 
        ivxInit = true;
        Ivx._initConsole();
    };

    window.Ivx = Ivx;

    Ivx._initConsole0();

} (window));
