var IvxPoopFactory = function(ivxGame) {

};
IvxPoopFactory.prototype.create = function() {
    var arr = [];
    for (var i = 0; i < ivxCfg.poop.max; i +=1 ) {
        var p = IvxSprite(ivxGame, 'poop', {pos: [0,0]});
        ivxGame.groupMain.add(p);
        p.kill();
        arr.push(p);
    
    }
    this.arr = arr;

};
IvxPoopFactory.prototype.launch = function(deer) {
    console.log('IvxPoopFactory.launch: ')
    var len = this.arr.length;
    var arr = this.arr;
    var poop;
    if (!this.next) {
        this.next = 0;
    }
    if (this.next < len) {
        poop  = arr[this.next];
    }
    this.next += 1;
    
    if (!poop) {
        console.warn('IvxPoopFactory.launch: out of poop!');
        return;
    }
    poop.position.setTo( deer.x, deer.y + 20);
    poop.revive();    
};