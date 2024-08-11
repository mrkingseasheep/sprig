/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: cow-thief
@author: Xinyang Wang
@tags: []
@addedOn: 2024-08-10
*/

const player = "p"
const ground = "g"
const doggo = "d"
const cow = "c"
const goal = "w"

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
....w
dgggg
ggggg`,
]

setMap(levels[level])

setPushables({
  [player]: []
})

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

  if (!isSolid(getTile(dog.x, dog.y + 1))) {
    dog.y += 1;
  }

  if (!isSolid(getTile(dog.x + 1, dog.y))) {
    dog.x += 1;
  }

  if (getTile(dog.x, dog.y) == "w") {
    ++level;
  }
})













