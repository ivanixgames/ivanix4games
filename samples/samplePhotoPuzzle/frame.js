

(function (window, ivxMsgParent) {
    var elementFS, elementAspect;
    
    var IvxFrame = function() {
        var thisObj;
        thisObj = this;
        this._initOrient = function() {
            

        };
        this._init = function () {
            this._label = window.document.querySelector('#label');
            this._initOrient();
            Ivx.consoleMin();
        }
        this._init();
    };
    window.IvxFrame = IvxFrame;
} (window, ivxMsgParent));
var ivx = new IvxFrame();
