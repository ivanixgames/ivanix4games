

(function (window, ivxMsgParent) {
    console.log('frame.js: ivxMsgParent: ' + ivxMsgParent);
    var elementFS, elementAspect, ivxHud;
    
    ivxHud= {};
    
    
    

    var IvxFrame = function() {
        var thisObj;
        thisObj = this;
        this._initPromptFS = function() {
            var e;
            console.log('IvxFrame._initPromptFS');
            e = document.querySelector('#ivx-ask-fullscreen');
            ivxMsgParent.cmdAskFullScreen = function() {
                e.style.display = "block";        
            };
            e.addEventListener('click', function(event) {
                var target = event.target;
                var val = target.getAttribute('ivx-val');
                if(!val) {
                    return;
                }               
                e.style.display = "none";
                ivxMsgParent.sendAck('AskFullScreen', val);           
            });      
        };
        this._init = function () {
            Ivx.consoleHide();
            console.log('IvxFrame._init');
            this._label = window.document.querySelector('#label');
            this._initPromptFS();
            
        }
        this._init();
    };
    window.IvxFrame = IvxFrame;
} (window, ivxMsgParent));
var ivx = new IvxFrame();
