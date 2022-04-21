var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 200 },
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};
var game = new Phaser.Game(config);

var velx = 1.0;
var vely = 1.0;
var acc = 1;

var car;
var leftpressed;
function preload() {
    this.load.image('background', 'src/background.png');
    this.load.image('car', 'src/racecar.png');
}

const degrees_to_radians = (deg) => (deg * Math.PI) / 180.0;

function create() {
    this.add.image(400, 300, 'background');
    // create car
    car = this.add.sprite(400, 600, 'car');

    car.setScale(0.3);
    // detect left and right kepress
    leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.add.image(400, 150, 'src/background');

    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD',
    });

    emitter.startFollow(car);
}

function update() {
    console.log(degrees_to_radians(car.angle));
    const velx = Math.cos(car.rotation) * acc;
    const vely = Math.sin(car.rotation) * acc;
    if (leftKey.isDown) {
        car.angle -= 1 * (acc * 0.7);
    }
    if (rightKey.isDown) {
        car.angle += 1 * (acc * 0.7);
    }
    if (wKey.isDown) {
        console.log('w [ressed');
        acc += 0.1;
    }
    if (spaceKey.isDown) {
        console.log('space pressed');
        acc -= 0.2;
    }

    car.x += velx;
    car.y += vely;
    // console.log('VEL (x,y): (' + velx + ', ' + vely + ')');
}
