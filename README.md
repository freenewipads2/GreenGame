# GreenGame
Gamification lib to greensock, create a scene and add your gameObjects easily!


Example script

window.onload = function() {
mainScene = new Scene({
debug: false, //optional
wrapper: "wrapper" //Must require
});

obj_01 = mainScene.addObject({
state: "start",
rotate: true,
draggable: true,
position: new Position({
  preset: 'centercenter'
}),
texture: new Texture({
  sizeY: 20,
  sizeX: 20,
  image: 'https://cdn2.iconfinder.com/data/icons/pix-glyph-set/50/520518-registration_mark_3-512.png'
})
});
}
