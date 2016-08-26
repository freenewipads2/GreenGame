/*jshint esversion: 6 */
function Texture(e) {
  this.image = e.image;
  this.position = e.poisition;
  this.sizeX = e.sizeX;
  this.sizeY = e.sizeY;
}

function Position(e) {
  this.id = e.id;
  this.x = e.x;
  this.y = e.y;
  this.preset = e.preset;
  if (this.preset !== false) {
    if (this.preset == 'topleft') {
      this.x = 0;
      this.y = 0;
    }
    if (this.preset == 'topright') {
      this.x = 100;
      this.y = 0;
    }
    if (this.preset == 'bottomleft') {
      this.x = 0;
      this.y = 100;
    }
    if (this.preset == 'bottomright') {
      this.x = 100;
      this.y = 100;
    }
    if (this.preset == 'centercenter') {
      this.x = 50;
      this.y = 50;
    }
  }
}

function Target(e) {
  this.id = e.id;
  this.bounds = e.bounds;
}


function GameObject(e) {
  this.state = e.state;
  this.position = e.position;
  this.texture = e.texture;
  this.wrapper = e.wrapper;
  this.rotate = e.rotate;
  this.id = e.id;
  this.setStats();
  this.setObject();
  if (e.rotate) {
    this.addRotate();
  }
  if (e.draggable) {
    this.generateDraggable(e.target);
  }
}

function Scene(e) {
  this.debug = e.debug;
  this.wrapper = e.wrapper;
  this.GameObjects = [];
}
Scene.prototype.addObject = function(e, gameObject = this) {
  e.id = 'gameObject_' + Math.floor((Math.random() * 100000) + 1);
  document.getElementById(this.wrapper).innerHTML += "<div id='" + e.id + "'></div>";
  setTimeout(function() {
    gameObject.GameObjects.push(new GameObject(e));
  }, 10);
  return e.id;
};

GameObject.prototype.setStats = function() {
  document.getElementById(this.id).style.width = this.texture.sizeX + "vh";
  document.getElementById(this.id).style.height = this.texture.sizeY + "vh";
  document.getElementById(this.id).style.background = "url(" + this.texture.image + ") center center no-repeat";
  document.getElementById(this.id).style.backgroundSize = "cover";

};

GameObject.prototype.setObject = function() {
  origin = this.position;
  var w = document.getElementById(this.id).offsetWidth;
  var h = document.getElementById(this.id).offsetHeight;
  var containerW = document.getElementById(this.id).parentElement.offsetWidth;
  var containerH = document.getElementById(this.id).parentElement.offsetHeight;

  var setPosX = 0;
  var setPosY = 0;

  //Precentage of the relation to its parent.
  var offsetPrecentW = (w / containerW) * 100;
  var offsetPrecentY = (h / containerH) * 100;
  if (origin.preset == "centercenter") {
    setPosX = (origin.x - (offsetPrecentW / 2));
    setPosY = (origin.y - (offsetPrecentY / 2));
  } else if (origin.preset == "topleft") {
    setPosX = 0;
    setPosY = 0;
  } else if (origin.preset == "topright") {
    setPosX = 100 - (offsetPrecentW);
    setPosY = 0;
  } else {
    setPosX = origin.x;
    setPosY = origin.y;
  }

  document.getElementById(this.id).style.position = "absolute";
  document.getElementById(this.id).style.left = setPosX + "%";
  document.getElementById(this.id).style.top = setPosY + "%";
  //  console.log("#" + this.id + " set to position[" + setPosX + "," + setPosY + "]");

};

GameObject.prototype.addRotate = function(thisRepeat = -1, time = 5) {
  TweenMax.fromTo("#" + this.id, time, {
    rotationZ: 0,
    ease: Linear.easeNone
  }, {
    rotationZ: 360,
    repeat: thisRepeat,
    ease: Linear.easeNone
  });
};

GameObject.prototype.generateDraggable = function(target, gameObject = this) {
  console.log(this.id + " is now draggable.");
  if (typeof target !== "undefined") {
    console.log("with target: " + target);
  }
  Draggable.create("#" + this.id, {
    type: "x,y",
    bounds: document.getElementById("wrapper"),
    throwProps: true,
    onClick: function() {
      //GreenObj.debug(draggable + " clicked.");
    },
    /*onDragEnd: function() {
    },*/
    onDragStart: function() {},
    onDrag: function() {
      if (typeof target !== "undefined") {
        if (this.hitTest("#" + target, 0)) {
          //if (dieOnHit) {
          //this.disable();
          //GreenObj.removeObj(draggable);
          //}
          console.log(gameObject.id + " collided with " + target);

        }
      }
    }
  });
};


function myRequire(url) {
  var ajax = new XMLHttpRequest();
  ajax.open('GET', url, false);
  ajax.onreadystatechange = function() {
    var script = ajax.response || ajax.responseText;
    if (ajax.readyState === 4) {
      switch (ajax.status) {
        case 200:
          eval.apply(window, [script]);
          console.log("Script Loaded: ", url);
          break;
        default:
          console.log("ERROR: script not loaded: ", url);
      }
    }
  };
  ajax.send(null);
}

myRequire("http://code.jquery.com/jquery-latest.min.js");
myRequire("http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/utils/Draggable.min.js");
myRequire("http://cdn2-studio.widespace.com/widespace/js/greensock/throwpropsplugin.0.9.9.min.js");
myRequire("http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js");
