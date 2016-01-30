(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 500,
	height: 500,
	fps: 24,
	color: "#3399FF",
	manifest: []
};



// symbols:



(lib.Top = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CC9933").ss(25,1,1).p("AAApWIAASu");
	this.shape.setTransform(0,50,1,0.833);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,1,1).p("AD6AAQAABphKBIQhJBJhnAAQhoAAhKhJQhHhIAAhpQAAhmBHhKQAygwA/gPQAegKAjAAQAjAAAeAKQA+APAxAwQBKBKAABmg");

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AiyCxQhGhIgBhpQABhmBGhKQAygvA/gQQAegKAjAAQAjAAAdAKQA/AQAxAvQBJBKABBmQgBBphJBIQhJBIhnABQhngBhLhIg");

	this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-26,-26,52,138.5);


(lib.Bottom = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#993300").ss(25,1,1).p("AgEmdIAJM7");
	this.shape.setTransform(0.5,41.5);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-12.5,-12.5,26,108);


(lib.Eye = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#0066FF").ss(1,1,1).p("AHWAAQAADCiKCKQiKCKjCAAQjBAAiKiKQiKiKAAjCQAAjBCKiKQCKiKDBAAQDCAACKCKQCKCKAADBg");
	this.shape.setTransform(-6,-7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF9900").s().p("AlLFLQiJiJgBjCQABjBCJiKQCKiJDBgBQDCABCJCJQCKCKABDBQgBDCiKCJQiJCKjCAAQjBAAiKiKgAj6k2Qg6A7AABSQAABTA6A6QA6A5BTAAQBTAAA5g5QA7g6gBhTQABhSg7g7Qg5g7hTAAQhTAAg6A7g");
	this.shape_1.setTransform(-6,-7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AiMCNQg6g6AAhTQAAhRA6g7QA6g7BSABQBSgBA7A7QA7A7gBBRQABBTg7A6Qg7A6hSAAQhSAAg6g6g");
	this.shape_2.setTransform(-17,-24);

	this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-54,-55,96,96);


(lib.LimbB = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Armature_67
	this.instance = new lib.Bottom("synched",0);
	this.instance.setTransform(46.8,-7,0.999,0.999,0.7);

	this.instance_1 = new lib.Top("synched",0);
	this.instance_1.setTransform(47,-96.6,0.999,0.999,0.7,0,0,-0.7,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1,p:{rotation:0.7,y:-96.6,x:47,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:0.7,x:46.8,y:-7}}]}).to({state:[{t:this.instance_1,p:{rotation:4.7,y:-96.6,x:47,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:14,x:40.5,y:-7.3}}]},1).to({state:[{t:this.instance_1,p:{rotation:8.7,y:-96.6,x:47,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:27.3,x:34.2,y:-8}}]},1).to({state:[{t:this.instance_1,p:{rotation:12.8,y:-96.7,x:47,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:40.6,x:28,y:-9.1}}]},1).to({state:[{t:this.instance_1,p:{rotation:16.8,y:-96.7,x:46.9,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:53.9,x:21.9,y:-10.7}}]},1).to({state:[{t:this.instance_1,p:{rotation:9.7,y:-96.7,x:46.8,regX:-0.8,regY:0.5}},{t:this.instance,p:{rotation:50.9,x:32.6,y:-8.3}}]},1).to({state:[{t:this.instance_1,p:{rotation:2.7,y:-96.7,x:46.9,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:47.8,x:43.6,y:-7.1}}]},1).to({state:[{t:this.instance_1,p:{rotation:-4.4,y:-96.6,x:46.9,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:44.8,x:54.6,y:-7.3}}]},1).to({state:[{t:this.instance_1,p:{rotation:-11.5,y:-96.5,x:47,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:41.7,x:65.5,y:-9}}]},1).to({state:[{t:this.instance_1,p:{rotation:-18.5,y:-96.6,x:47,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:38.7,x:76.2,y:-11.9}}]},1).to({state:[{t:this.instance_1,p:{rotation:-22.8,y:-96.7,x:46.9,regX:-0.7,regY:0.4}},{t:this.instance,p:{rotation:27.6,x:82.4,y:-14.4}}]},1).to({state:[{t:this.instance_1,p:{rotation:-27.1,y:-96.5,x:47,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:16.6,x:88.4,y:-17.3}}]},1).to({state:[{t:this.instance_1,p:{rotation:-31.4,y:-96.5,x:46.9,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:5.5,x:94.3,y:-20.6}}]},1).to({state:[{t:this.instance_1,p:{rotation:-35.7,y:-96.5,x:46.9,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:-5.6,x:99.8,y:-24.3}}]},1).to({state:[{t:this.instance_1,p:{rotation:-40,y:-96.5,x:46.8,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:-16.6,x:105,y:-28.5}}]},1).to({state:[{t:this.instance_1,p:{rotation:-31.4,y:-96.5,x:46.9,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:-12.7,x:94.3,y:-20.6}}]},1).to({state:[{t:this.instance_1,p:{rotation:-22.9,y:-96.7,x:46.8,regX:-0.7,regY:0.4}},{t:this.instance,p:{rotation:-8.7,x:82.5,y:-14.5}}]},1).to({state:[{t:this.instance_1,p:{rotation:-14.4,y:-96.5,x:46.8,regX:-0.8,regY:0.5}},{t:this.instance,p:{rotation:-4.7,x:70.1,y:-10.1}}]},1).to({state:[{t:this.instance_1,p:{rotation:-5.9,y:-96.6,x:46.9,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:-0.8,x:56.9,y:-7.6}}]},1).to({state:[{t:this.instance_1,p:{rotation:2.6,y:-96.5,x:46.9,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:3.2,x:43.7,y:-7.1}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(21.7,-123.1,52,211.5);


(lib.LimbA = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Armature_67
	this.instance = new lib.Bottom("synched",0);
	this.instance.setTransform(46.8,-7,0.999,0.999,0.7);

	this.instance_1 = new lib.Top("synched",0);
	this.instance_1.setTransform(47,-96.6,0.999,0.999,0.7,0,0,-0.7,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1,p:{rotation:0.7,y:-96.6,x:47,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:0.7,x:46.8,y:-7}}]}).to({state:[{t:this.instance_1,p:{rotation:4.7,y:-96.6,x:47,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:14,x:40.5,y:-7.3}}]},1).to({state:[{t:this.instance_1,p:{rotation:8.7,y:-96.6,x:47,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:27.3,x:34.2,y:-8}}]},1).to({state:[{t:this.instance_1,p:{rotation:12.8,y:-96.7,x:47,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:40.6,x:28,y:-9.1}}]},1).to({state:[{t:this.instance_1,p:{rotation:16.8,y:-96.7,x:46.9,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:53.9,x:21.9,y:-10.7}}]},1).to({state:[{t:this.instance_1,p:{rotation:9.7,y:-96.7,x:46.8,regX:-0.8,regY:0.5}},{t:this.instance,p:{rotation:50.9,x:32.6,y:-8.3}}]},1).to({state:[{t:this.instance_1,p:{rotation:2.7,y:-96.7,x:46.9,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:47.8,x:43.6,y:-7.1}}]},1).to({state:[{t:this.instance_1,p:{rotation:-4.4,y:-96.6,x:46.9,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:44.8,x:54.6,y:-7.3}}]},1).to({state:[{t:this.instance_1,p:{rotation:-11.5,y:-96.5,x:47,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:41.7,x:65.5,y:-9}}]},1).to({state:[{t:this.instance_1,p:{rotation:-18.5,y:-96.6,x:47,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:38.7,x:76.2,y:-11.9}}]},1).to({state:[{t:this.instance_1,p:{rotation:-22.8,y:-96.7,x:46.9,regX:-0.7,regY:0.4}},{t:this.instance,p:{rotation:27.6,x:82.4,y:-14.4}}]},1).to({state:[{t:this.instance_1,p:{rotation:-27.1,y:-96.5,x:47,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:16.6,x:88.4,y:-17.3}}]},1).to({state:[{t:this.instance_1,p:{rotation:-31.4,y:-96.5,x:46.9,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:5.5,x:94.3,y:-20.6}}]},1).to({state:[{t:this.instance_1,p:{rotation:-35.7,y:-96.5,x:46.9,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:-5.6,x:99.8,y:-24.3}}]},1).to({state:[{t:this.instance_1,p:{rotation:-40,y:-96.5,x:46.8,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:-16.6,x:105,y:-28.5}}]},1).to({state:[{t:this.instance_1,p:{rotation:-31.4,y:-96.5,x:46.9,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:-12.7,x:94.3,y:-20.6}}]},1).to({state:[{t:this.instance_1,p:{rotation:-22.9,y:-96.7,x:46.8,regX:-0.7,regY:0.4}},{t:this.instance,p:{rotation:-8.7,x:82.5,y:-14.5}}]},1).to({state:[{t:this.instance_1,p:{rotation:-14.4,y:-96.5,x:46.8,regX:-0.8,regY:0.5}},{t:this.instance,p:{rotation:-4.7,x:70.1,y:-10.1}}]},1).to({state:[{t:this.instance_1,p:{rotation:-5.9,y:-96.6,x:46.9,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:-0.8,x:56.9,y:-7.6}}]},1).to({state:[{t:this.instance_1,p:{rotation:2.6,y:-96.5,x:46.9,regX:-0.7,regY:0.5}},{t:this.instance,p:{rotation:3.2,x:43.7,y:-7.1}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(21.7,-123.1,52,211.5);


(lib.Body = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Eye
	this.instance = new lib.Eye("synched",0);
	this.instance.setTransform(30,-52,0.447,0.426,0,0,0,-6,-7);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:-28},9).to({y:-52},10).to({_off:true},1).wait(1));

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CC6600").ss(0.3,1,1).p("AMWAAQAAHNjoFHQiWDUi/BLQgnAPgoAJQhDAQhHAAQhGAAhDgQQgogJgngPQi/hLiWjUQjolHAAnNQAAnNDolGQDnlHFGAAQFHAADnFHQDoFGAAHNg");
	this.shape.setTransform(0,2.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AiIRLQgpgJgmgQQi/hKiXjUQjolGAAnOQAAnNDolGQDolHFFABQFGgBDoFHQDoFGAAHNQAAHOjoFGQiXDUi+BKQgnAQgpAJQhCAPhHABQhGgBhCgPg");
	this.shape_1.setTransform(0,2.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#BF6600").ss(0.3,1,1).p("AsVAAQAAmpDOk0QAOgVAPgUQDlk6FCgCQFIABDmE7QAOATANATQDQE1AAGrQAAGpjOEzQgOAWgPAVQiKC8iqBMQgRAHgQAGQgmAPgmAIQhBAPhCABQhNAAhBgPQgogJgmgPQgMgEgLgEQiwhLiMjAQgQgVgNgUQjPk0gBmrg");
	this.shape_2.setTransform(0,7.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AiGQ0QgpgJgmgPIgWgJQixhKiMjAIgdgpQjPk1gBmqIAAgBQABmpDNkzIAdgqQDlk6FCgBQFIAADmE7IAbAmQDQE2AAGqQAAGpjOE0QgOAVgPAUQiLC9iqBMIggANQgmAOgnAJQhAAOhCABQhNAAhAgOg");
	this.shape_3.setTransform(0,7.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#B36600").ss(0.3,1,1).p("AsVAAQAAmiDSkuQAOgVAPgUQDjkvFAgCQFGACDlEvQAOATANATQDTEvAAGkQAAGijQEuQgPAVgPAUQiLC3ipBJQgRAHgRAHQglANgmAIQhAAOhCABQhMgBg/gOQgogIglgOQgLgEgLgEQiwhJiMi6QgQgVgNgTQjSkugBmkg");
	this.shape_4.setTransform(0,12.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AiGQcQgogIglgOIgWgIQiwhJiMi6IgdgoQjSkugBmkIAAgBQAAmiDSkuIAdgpQDjkvFBgCQFFACDkEvIAcAmQDSEvABGkQgBGijPEuIgfApQiKC3iqBJIghAOQglANgmAIQhBAOhBABQhMgBg/gOg");
	this.shape_5.setTransform(0,12.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#A66600").ss(0.3,1,1).p("AsVAAQAAmcDVkpQAOgUAPgTQDjkkE+gCQFEACDiEkQAPATANASQDVEpABGdQgBGcjSEoQgPAVgQAUQiKCxiqBHQgRAGgRAGQgkANgnAIQg/ANhAABQhLgBg+gNQgngJgkgNQgMgEgLgEQivhGiNi0QgPgUgNgTQjWkpAAmdg");
	this.shape_6.setTransform(0,17.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AiFQFQgmgJglgNIgXgIQivhGiNi0IgcgnQjVkpgBmdIAAAAQABmcDUkpIAdgnQDjkkE+gCQFEACDiEkIAbAlQDWEpABGdQgBGcjTEoIgeApQiKCxiqBHIgiAMQgkANgnAIQg/ANhAABQhLgBg+gNg");
	this.shape_7.setTransform(0,17.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#996600").ss(0.3,1,1).p("AsVAAQAAmVDYkkQAOgTAPgTQDikaE8gBQFBABDjEbQAOASANARQDYEkABGVQgBGXjVEiQgQAVgRAVQiJCpipBEQgRAHgRAGQglALgmAIQg8AMhBABQhIgBg/gMQgmgIglgNQgLgEgLgEQivhDiMivQgPgSgOgUQjYkjAAmWg");
	this.shape_8.setTransform(0,22);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AiEPuQgmgJgkgMIgXgIQiuhEiNiuIgdgmQjYkjAAmWIAAAAQAAmVDYkkIAdgmQDikaE9gBQFAABDjEbIAbAjQDYEkABGWQgBGWjWEhQgPAWgRAVQiJCpiqBEIghANQglALgmAIQg9ANhBAAQhHAAg/gNg");
	this.shape_9.setTransform(0,22);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#996600").ss(0.3,1,1).p("AsVAAQAAmODbkeQAPgTAPgSQDhkQE5gBQE/ABDiERQANAQANAQQDbEfACGMQgBGRjWEbQgTAagRATQiICjioBBQgTAHgRAGQgkALglAHQg7AMhAAAQhHAAg/gMQgmgIgkgMQgLgEgLgEQithAiMipQgPgRgOgTQjckfAAmPg");
	this.shape_10.setTransform(0,17.6);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AiDPWQglgHglgNIgVgHQiuhBiMioQgPgSgOgTQjbkfgBmOIAAAAQAAmODckeIAdglQDhkQE6gBQE+ABDhESIAbAfQDbEfACGLQgBGSjWEbIgkAtQiICiioBCIgkAMQgkAMglAHQg8AMhAAAQhGAAg/gNg");
	this.shape_11.setTransform(0,17.6);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#996600").ss(0.3,1,1).p("AsVAAQAAmHDekZQAPgSAPgSQDgkFE4gBQE8AADhEIQAOAQAMAQQDfEZABGFQgBGKjaEWQgUAZgQATQiICcioA/QgTAGgRAFQgjALgkAHQg7ALg+AAQhGAAg/gMQglgIgkgLQgKgDgLgEQitg+iMiiQgOgRgOgSQjgkaAAmIg");
	this.shape_12.setTransform(0,13.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AiCO/QglgIgkgLIgVgHQitg+iMiiIgcgjQjgkaAAmIIAAAAQAAmHDfkZIAdgkQDgkFE4gBQE8AADhEIIAaAgQDfEZABGFQgBGKjaEWIglAsQiICcinA/IgkALQgjALgkAHQg7ALg/AAQhFAAg/gMg");
	this.shape_13.setTransform(0,13.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#996600").ss(0.3,1,1).p("AsVAAQAAmBDikTQAOgSAPgRQDgj7E2AAQE4AADhD+QAOAPANAQQDhETABGAQgBGDjeEQQgUAYgQASQiJCXioA7QgTAHgPAFQgiAJgkAHQg6AKg9AAQhFAAg/gLQglgHgjgLQgKgEgKgDQitg7iLicQgPgQgOgSQjjkUAAmCg");
	this.shape_14.setTransform(0,8.8);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AiAOoQglgHgkgLIgUgHQitg7iKicIgegiQjikUgBmCQAAmBDikTIAegjQDfj7E2AAQE4AADhD+IAbAfQDgETACGAQgCGDjdEQQgUAYgRASQiICXioA7IgjAMQghAJgkAHQg6AKg+AAQhEAAg+gLg");
	this.shape_15.setTransform(0,8.8);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#996600").ss(0.3,1,1).p("AsVAAQAAl6DlkOQAOgRAPgRQDgjwEzgBQE2AADhD1QANAOANAQQDkEOABF6QgCF8jhEKQgUAYgRARQiICRioA4QgTAGgPAFQghAJgjAGQg5AJg8ABQhEgBg+gLQglgGgkgLQgJgDgJgDQitg5iKiVQgPgQgOgQQjnkQAAl7g");
	this.shape_16.setTransform(0,4.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("Ah/OQQglgHgjgKIgTgGQitg5iKiVIgcghQjnkPgBl7QAAl6DlkNIAegjQDfjwEzgBQE2ABDgD0IAaAeQDlEOABF6QgCF7jhEMIglAoQiJCRinA4IgiALQgiAIgiAGQg5AKg9ABQhDgBg+gLg");
	this.shape_17.setTransform(0,4.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#996600").ss(0.3,1,1).p("AMWAAQAAF1joEHQiWCri/A8QhnAhhyAAQhxAAhnghQi/g8iWirQjokHAAl1QAAl0DokHQDnkIFGAAQFHAADnEIQDoEHAAF0g");

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AjXNjQi/g8iXirQjokHAAl1QAAl0DokHQDokIFFAAQFGAADoEIQDoEHAAF0QAAF1joEHQiXCri+A8QhnAghyABQhxgBhmggg");

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#996600").ss(0.3,1,1).p("AsVAAQAAmaDWknQAOgUAPgTQDjkhE9gBQFDACDjEhQAOASANASQDWEnABGaQgBGbjTEmQgPAUgQAUQiKCviqBGQgRAHgRAGQgkAMgnAIQg+ANhAABQhLgBg+gNQgmgIgkgNQgMgEgMgEQivhFiMizQgPgTgOgTQjWkoAAmag");
	this.shape_20.setTransform(0,18.7);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AiFP9QgmgJgkgMIgYgIQiuhGiNiyIgdgnQjWkmAAmbIAAAAQABmaDVknIAdgnQDjkgE9gCQFDACDjEhIAbAkQDWEnABGaQgBGbjUEmIgeAoQiKCviqBHIgiAMQgkAMgnAIQg/ANhAABQhKgBg+gNg");
	this.shape_21.setTransform(0,18.7);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#996600").ss(0.3,1,1).p("AsVAAQAAmeDUkqQAOgVAPgTQDjkoE/gCQFEACDkEpQAOASANASQDUErABGfQgBGfjREqQgPAUgQAUQiKCziqBIQgRAHgQAGQglANgnAIQg/ANhBABQhLgBg+gNQgogJgkgNQgMgEgLgEQivhHiNi2QgPgVgNgSQjVkrAAmfg");
	this.shape_22.setTransform(0,15.4);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AiFQNQgngJglgNIgXgIQivhHiNi2IgcgnQjUkrgBmfIAAgBQABmeDTkqQAOgVAPgTQDjkoE/gCQFEACDjEpIAbAkQDVErABGfQgBGfjSEqIgeAoQiLCzipBIIgiANQglANgmAIQg/ANhBABQhLgBg+gNg");
	this.shape_23.setTransform(0,15.4);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#996600").ss(0.3,1,1).p("AsVAAQAAmiDSkuQAOgVAPgUQDjkvFAgCQFHACDkEwQAOASANATQDTEvAAGkQAAGijQEuQgPAVgPAUQiLC3ipBJQgRAHgRAHQglANgmAIQhAAOhCABQhMgBg/gOQgogIglgOQgLgEgLgEQiwhJiMi6QgQgVgNgTQjSkugBmkg");
	this.shape_24.setTransform(0,12.2);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AiGQcQgogIglgOIgWgIQiwhJiMi6IgdgoQjSkugBmkIAAgBQAAmiDSkuIAdgpQDjkvFBgCQFFACDlEwIAbAlQDSEvABGkQgBGijPEuIgfApQiKC3iqBJIghAOQglANgmAIQhBAOhBABQhMgBg/gOg");
	this.shape_25.setTransform(0,12.2);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#996600").ss(0.3,1,1).p("AsVAAQAAmmDPkzQAOgUAPgVQDlk2FBgCQFIABDlE4QAOATANATQDREzAAGoQAAGnjPExQgOAWgPAUQiKC7iqBLQgRAHgRAGQglAOgmAIQhBAPhCABQhMgBhBgOQgogJglgOQgMgEgLgFQiwhKiMi+QgQgVgNgTQjQkzgBmog");
	this.shape_26.setTransform(0,8.9);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AiGQsQgogJgmgOIgWgJQixhKiMi+IgdgoQjQkzgBmoIAAgBQABmmDOkzIAdgpQDlk2FBgCQFHABDmE4IAbAmQDREzAAGoQAAGnjPExQgOAWgPAUQiLC7iqBLIghANQglAOgnAIQhBAPhBABQhMgBhAgOg");
	this.shape_27.setTransform(0,8.9);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#996600").ss(0.3,1,1).p("AsVAAQAAmrDNk2QAOgVAPgUQDlk9FDgDQFJABDmE/QAOATANAUQDPE2AAGtQAAGsjNE1QgOAWgPAUQiKC/iqBMQgRAIgQAGQgmAOgmAJQhCAPhCABQhNAAhBgPQgpgJgmgPQgMgEgKgEQixhMiMjCQgQgWgNgTQjOk2gBmtg");
	this.shape_28.setTransform(0,5.7);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AiHQ7QgpgIgmgPIgWgIQixhMiMjCIgdgpQjOk2gBmuIAAgBQABmqDMk2IAdgqQDlk9FDgCQFIAADnE/IAbAnQDPE2AAGtQAAGrjNE2QgOAVgPAVQiKC+iqBNIghAOQgmAOgnAJQhBAPhCABQhNgBhBgPg");
	this.shape_29.setTransform(0,5.7);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#996600").ss(0.3,1,1).p("AMWAAQAAHNjoFHQiWDUi/BLQgnAPgoAJQhDAQhHAAQhGAAhDgQQgogJgngPQi/hLiWjUQjolHAAnNQAAnNDolGQDnlHFGAAQFHAADnFHQDoFGAAHNg");
	this.shape_30.setTransform(0,2.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},1).to({state:[{t:this.shape_13},{t:this.shape_12}]},1).to({state:[{t:this.shape_15},{t:this.shape_14}]},1).to({state:[{t:this.shape_17},{t:this.shape_16}]},1).to({state:[{t:this.shape_19},{t:this.shape_18}]},1).to({state:[{t:this.shape_17},{t:this.shape_16}]},1).to({state:[{t:this.shape_15},{t:this.shape_14}]},1).to({state:[{t:this.shape_13},{t:this.shape_12}]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_21},{t:this.shape_20}]},1).to({state:[{t:this.shape_23},{t:this.shape_22}]},1).to({state:[{t:this.shape_25},{t:this.shape_24}]},1).to({state:[{t:this.shape_27},{t:this.shape_26}]},1).to({state:[{t:this.shape_29},{t:this.shape_28}]},1).to({state:[{t:this.shape_1},{t:this.shape_30}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-80,-110.1,160,225);


(lib.Man = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.LimbB("synched",9);
	this.instance.setTransform(18.5,77.2,1,1,0,0,0,64.2,-33);

	this.instance_1 = new lib.Body("synched",0);
	this.instance_1.setTransform(-1,-48.9,1,1,0,0,0,0,2.4);

	this.instance_2 = new lib.LimbA("synched",0);
	this.instance_2.setTransform(18.5,77.2,1,1,0,0,0,64.2,-33);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[]},39).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-81,-161.4,160,360);


// stage content:



(lib.EggManWalking = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Man("synched",0);
	this.instance.setTransform(253.5,245.6,1,1,0,0,0,18.5,16.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(404,317.8,160,360);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;