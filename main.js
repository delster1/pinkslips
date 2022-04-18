var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};
var game = new Phaser.Game(config);

var car;
var leftpressed;
function preload() {
    this.load.image('background', 'src/background.png');
    this.load.image('car', 'src/racecar.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
}

function create() {
    car = this.add.sprite(400, 100, 'car');

    leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    this.add.image(400, 300, 'background');

    var leftPressed = this.input.keyboard.addKey;
    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD',
    });

    emitter.startFollow(car);

    const vec = this.physics.velocityFromAngle(car.angle, 1);

    const dx = vec.x * 50;
    const dy = vec.y * 50;
}

function update() {
    const vec = this.physics.velocityFromAngle(car.angle, 1);

    car.x += car.body.velocity.copyFrom(
        game.physics.arcade.velocityFromAngle(game.global.car.angle, 200)
    );
    if (leftKey.isDown) {
        console.log('left');
        car.angle -= 1;
    }
    if (rightKey.isDown) {
        console.log('right');
        car.angle += 1;
    }
}
