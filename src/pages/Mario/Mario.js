kaboom({
	global: true,
	fullscreen: true,
	scale: 2,
	debug: true,
	clearColor: [0, 0, 100, 1],
});

// import supermat from "./supermat_d";
{
	/* <a href="https://imgbb.com/"><img src="https://i.ibb.co/MSYv0sW/supermat-d.png" alt="supermat-d" border="0"></a> 
	REACT blue<a href="https://imgbb.com/"><img src="https://i.ibb.co/PTQStFY/reactjs-logo.png" alt="reactjs-logo" border="0"></a>
	REACT RED <a href="https://imgbb.com/"><img src="https://i.ibb.co/tmMjn9S/1-JSFjofdj-IH5-RDVf-q-OODGw.png" alt="1-JSFjofdj-IH5-RDVf-q-OODGw" border="0"></a>
	REDUX <a href="https://ibb.co/X43ffQ8"><img src="https://i.ibb.co/QcC77gd/redux-logo.png" alt="redux-logo" border="0"></a>
	CODAISSEUR LOGO<a href="https://imgbb.com/"><img src="https://i.ibb.co/LZBZBdQ/codaisseur-square.png" alt="codaisseur-square" border="0"></a>
	JS LOGO <a href="https://imgbb.com/"><img src="https://i.ibb.co/9gKw5x1/js-logo.png" alt="js-logo" border="0"></a>
	DB LOGO <a href="https://ibb.co/Zhv72T0"><img src="https://i.ibb.co/FBcCH7F/database-logo.png" alt="database-logo" border="0"></a>
	*/
}

const MOVE_SPEED = 120;
const JUMP_FORCE = 360;
const BIG_JUMP_FORCE = 550;
let CURRENT_JUMP_FORCE = JUMP_FORCE;
let isJumping = true;
const FALL_DEATH = 400;

const ENEMY_SPEED = 20;

loadSprite("supermat", "https://i.ibb.co/MSYv0sW/supermat-d.png");
loadSprite(
	"evil-react",
	"https://i.ibb.co/tmMjn9S/1-JSFjofdj-IH5-RDVf-q-OODGw.png"
);
loadSprite("codaisseur-logo", "https://i.ibb.co/LZBZBdQ/codaisseur-square.png");
loadSprite("evil-redux", "https://i.ibb.co/QcC77gd/redux-logo.png");
loadSprite("good-react", "https://i.ibb.co/PTQStFY/reactjs-logo.png");
loadSprite("block", "https://i.ibb.co/9gKw5x1/js-logo.png");
loadSprite("DB-pipe", "https://i.ibb.co/FBcCH7F/database-logo.png");

loadRoot("https://i.imgur.com/");
loadSprite("brick", "pogC9x5.png");

loadSprite("surprise", "gesQ1KP.png");
loadSprite("unboxed", "bdrLpi6.png");
loadSprite("pipe-top-left", "ReTPiWY.png");
loadSprite("pipe-top-right", "hj2GK4n.png");
loadSprite("pipe-bottom-left", "c1cYSbt.png");
loadSprite("pipe-bottom-right", "nqQ79eI.png");

loadSprite("blue-block", "fVscIbn.png");
loadSprite("blue-brick", "3e5YRQd.png");
loadSprite("blue-steel", "gqVoI2b.png");
loadSprite("blue-surprise", "RMqCc1G.png");
// loadSprite("evil-react", "KPO3fR9.png");
// loadSprite("blue-evil-react", "SvV4ueD.png");

scene("game", ({ level, score, levelNumber }) => {
	layers(["bg", "obj", "ui"], "obj");

	const maps = [
		[
			"                                                                                            ",
			"                                                                                            ",
			"                                                                                            ",
			"                                                                                            ",
			"                                                                                           ",
			"             %*      **                                                                      ",
			"      p       ^                  ^                                                             ",
			"     ===    ====    ====       ==      =   ===    ===    ==%*   =    =  ===                        ",
			"   ==      =    =   =  ==     =  =        =   =  =   =   =      =    =  =  =                       ",
			"   =      =      =  =   =     =  =     =  =      =       =      =    =  =   =                      ",
			"  =       =      =  =    =   =    =    =   =      =      =      =    =  =   =                      ",
			"  =       =      =  =    =   ======    =    ==     ==    =*=%   =    =  ====                       ",
			"  =       =      =  =    =  =      =   =      =      =   =      =  z =  =  =                       ",
			"   = ^    =      =  =   =   =      =   =       =      =  =      =    =  =   =         -+           ",
			"   ==      =  z =   =  ==  =        =  =  =   =   =  =   =       =  =   =   =         ()           ",
			"     ===    ====    ====   =        =  =   ===     ===   =====    ==    =    =  ========           ",
		],
		[
			"                                 ",
			"                                      ",
			"                    ^                 ",
			"                  =====               ",
			"                =                     ",
			"     %   =*=%=                        ",
			"                                      ",
			"                            -+        ",
			"   p                ^   ^   ()        ",
			"=========      ===============   =====",
			"         ====                         ",
		],
		[
			"£                                       £",
			"£                         @@@@@@        £",
			"£                                       £",
			"£                @@@@@@                 £",
			"£                                       £",
			"£        @@@@@@              x x        £",
			"£                          x x x        £",
			"£                        x x x x  x   -+£",
			"£    p           z   z  x x x x x  x   ()£",
			"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
		],
	];

	const levelCfg = {
		width: 20,
		height: 20,
		"=": [sprite("block"), scale(0.05), solid()],
		"^": [sprite("evil-react"), solid(), scale(0.08), "dangerous", body()],
		"#": [sprite("good-react"), solid(), scale(0.05), "good-react", body()],
		z: [sprite("evil-redux"), solid(), scale(0.05), "dangerous", body()],
		$: [sprite("codaisseur-logo"), solid(), scale(0.04), "codaisseur-logo"],
		"%": [sprite("surprise"), solid(), "coin-surprise"],
		"*": [sprite("surprise"), solid(), "react-surprise"],
		"}": [sprite("unboxed"), solid()],
		// "(": [sprite("pipe-bottom-left"), solid(), scale(0.5)],
		// ")": [sprite("pipe-bottom-right"), solid(), scale(0.5)],
		// "-": [sprite("pipe-top-left"), solid(), scale(0.5), "pipe"],
		// "+": [sprite("pipe-top-right"), solid(), scale(0.5), "pipe"],
		"!": [sprite("blue-block"), solid(), scale(0.5)],
		"£": [sprite("blue-brick"), solid(), scale(0.5)],
		"@": [sprite("blue-surprise"), solid(), scale(0.5), "coin-surprise"],
		p: [sprite("DB-pipe"), solid(), scale(0.04), "DB-pipe"],
		x: [sprite("blue-steel"), solid(), scale(0.5)],
	};

	const gameLevel = addLevel(maps[level], levelCfg);

	const scoreLabel = add([
		text(score),
		pos(80, 20),
		layer("ui"),
		{
			value: score,
		},
	]);

	const levelLabel = add([
		text(levelNumber),
		pos(80, 6),
		layer("ui"),
		{
			value: levelNumber,
		},
	]);

	add([text("Score "), pos(30, 20)]);
	add([text("Level "), pos(30, 6)]);

	function big() {
		let timer = 0;
		let isBig = false;
		return {
			update() {
				if (isBig) {
					CURRENT_JUMP_FORCE = BIG_JUMP_FORCE;
					timer -= dt();
					if (timer <= 0) {
						this.smallify();
					}
				}
			},
			isBig() {
				return isBig;
			},
			smallify() {
				this.scale = vec2(0.07);
				CURRENT_JUMP_FORCE = JUMP_FORCE;
				timer = 0;
				isBig = false;
			},
			biggify(time) {
				this.scale = vec2(0.14);
				timer = time;
				isBig = true;
			},
		};
	}

	const player = add([
		sprite("supermat"),
		solid(),
		pos(100, 0),
		body(),
		big(),
		origin("bot"),
		scale(0.07),
	]);

	player.collides("DB-pipe", () => {
		keyPress("down", () => {
			levelLabel.value++;
			levelLabel.text = levelLabel.value;
			go("game", {
				level: (level + 1) % maps.length,
				score: scoreLabel.value,
				levelNumber: levelNumber + 1,
			});
		});
	});

	action("good-react", (m) => {
		m.move(20, 0);
	});

	player.on("headbump", (obj) => {
		if (obj.is("coin-surprise")) {
			gameLevel.spawn("$", obj.gridPos.sub(0, 1));
			destroy(obj);
			gameLevel.spawn("}", obj.gridPos.sub(0, 0));
		}
		if (obj.is("react-surprise")) {
			gameLevel.spawn("#", obj.gridPos.sub(0, 1));
			destroy(obj);
			gameLevel.spawn("}", obj.gridPos.sub(0, 0));
		}
	});

	player.collides("good-react", (m) => {
		destroy(m);
		camShake(25);
		scoreLabel.value++;
		scoreLabel.text = scoreLabel.value;
		player.biggify(6);
	});

	player.collides("codaisseur-logo", (c) => {
		destroy(c);
		scoreLabel.value++;
		scoreLabel.text = scoreLabel.value;
	});

	action("dangerous", (d) => {
		d.move(-ENEMY_SPEED, 0);
	});

	player.collides("dangerous", (d) => {
		if (isJumping) {
			camShake(20);
			destroy(d);
		} else {
			go("lose", { score: scoreLabel.value });
			console.log("scoreLabel.value", scoreLabel.value);
			// console.log("score", score);
		}
	});

	player.action(() => {
		camPos(player.pos);
		if (player.pos.y >= FALL_DEATH) {
			go("lose", { score: scoreLabel.value });
		}
	});

	keyDown("left", () => {
		player.move(-MOVE_SPEED, 0);
	});

	keyDown("right", () => {
		player.move(MOVE_SPEED, 0);
	});

	player.action(() => {
		if (player.grounded()) {
			isJumping = false;
		}
	});

	keyPress("space", () => {
		if (player.grounded()) {
			isJumping = true;
			player.jump(CURRENT_JUMP_FORCE);
		}
	});
});

scene("lose", ({ score }) => {
	add([text(score, 32), origin("center"), pos(width() / 2, height() / 2)]);
});

start("game", { level: 0, score: 0, levelNumber: 0 });
