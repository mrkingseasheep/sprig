/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: cow-thief
@author: 
@tags: []
@addedOn: 2024-00-00

I'm too incompetent to do this, also it's not a really fun game
*/

const player = "p"
const ground = "g"
const doggo = "d"
const cow = "c"
const goal = "w"
const beam = "b"

setLegend(
  [player, bitmap`
................
................
................
................
................
.......77.......
......7777......
.....777777.....
....77777777....
....77777777....
....1L1LL1L1....
.1LLLLLLLLLLLL1.
L66LL66LL66LL66L
L66LL66LL66LL66L
.1LLLLLLLLLLLL1.
....11111111....`],
  [ground, bitmap`
DDDDDDDDDD4DDDD4
D4D44DDDD4DDD4DD
44DDDD4DDDDD4DD4
DDDDD4DDDD4DDDCD
44CCD44DC444CCDD
4CDC4DCCDDDCCD4D
CDCCD4CCCDDCCC4D
CDCCCDCCCDCCCC4D
CCCCCDCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [doggo, bitmap`
................
................
......LL....LL..
........LLLLL...
........L515L...
........L1111L..
........L0101L..
...LLLLL3101LL..
..LL1111331LL...
LLL11111133L....
..L11111166.....
..LL111111L.....
.LLLL11111L.....
.L.L.LLLLLL.....
.L.LL..L..L.....
.L..L..LL.LL....`],
  [cow, bitmap`
0.00...0........
.002000.........
0322230.........
0222220.........
02LLL20000000...
00222000000220..
.0000222002220..
...002222222220.
...0220022222000
...02000200000.0
...02222200000.0
...0000000000...
...0..0..0..0...
...0..0..0..0...
..0...00..0.000.
.00...00.00..00.`],
  [goal, bitmap`
................
.....111........
....11211.......
....12221.......
...112221.......
.1122221........
.12222211.......
.122222211......
..111222211.....
.....122221.....
.....112221111..
......11222221..
.......1122221..
........122111..
........1111....
................`],
  [beam, bitmap`
....D444DD......
....D4444D......
...DD4D44DD.....
..DD4444D4D.....
.DD44444444DD...
DD4D444D4444DD..
D444444444D44DD.
D44444D4444444DD
D44D444444D4444D
D44444444444D4DD
DD44D4444D444DD.
.DD444444444D4D.
..D444D444444DD.
..DD444D44444D..
...DDDD444DDDD..
......DDDDD.....`],
)

const solids = [
  doggo,
  ground,
  player,
  cow,
];

setSolids(solids);

let level = 0
const levels = [
  map`
..p..
.....
d...w
ggggg`,
  map`
..p..
.....
d.g.w
ggggg`,
  map`
..p..
.....
d.c.w
ggggg`,
  map`
..p..
.....
dg..w
g...g`,
]

setMap(levels[level])

setPushables({
  [player]: []
})

let beamOn = false;

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("i", () => {
  beamOn = !beamOn;
})

function isSolid(x, y) {
  let tile = getTile(x, y);
  for (let i = 0; i < solids.length; ++i) {
    if (tile == solids[i]) {
      return true;
    }
  }
  return false;
}

afterInput(() => {
  let dog = getFirst(doggo);
  let end = getFirst(goal);
  let tractorBeam = getFirst(beam);
  if (tractorBeam !== undefined) {
    tractorBeam.remove();
  }

  if (beamOn) {
    let p = getFirst(player);
    addSprite(p.x, p.y + 1, "b");
  }

  if (!isSolid(getTile(dog.x, dog.y + 1))) {
    dog.y += 1;
  }

  if (!isSolid(getTile(dog.x + 1, dog.y))) {
    dog.x += 1;
  }

  if (dog.x == end.x && dog.y == end.y) {
    level += 1;
    if (level <= levels.length) {
      setMap(levels[level]);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
})


















