/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: once,twice,trice
@author: Xinyang Wang
@tags: []
@addedOn: 2024-08-11

wasd to move
j to go back a level
l to go forward
k to reset the level
*/

const player = "p"
const player2 = "q"
const wall = "w"
const box = "b"
const end = "e"
const key = "k"
const lock = "l"
const heart = "h"

setLegend(
  [ player, bitmap`
0000000000000000
0099999999999900
0609933333399060
0663333333333660
0663333333333660
0633333333333360
0633333333333360
0633333333333360
0633333333333360
0633333333333360
0633333333333360
0663333333333660
0663333333333660
0609933333399060
0099999999999900
0000000000000000` ],
  [ player2, bitmap`
0000000000000000
00HHHHHHHHHHHH00
080HH555555HH080
0885555555555880
0885555555555880
0855555555555580
0855555555555580
0855555555555580
0855555555555580
0855555555555580
0855555555555580
0885555555555880
0885555555555880
080HH555555HH080
00HHHHHHHHHHHH00
0000000000000000` ],
  [ wall, bitmap`
0000000000000000
00L0L0L0L0L0L000
0L0LLLLLLLLLL010
0LL0L0L0L0L00220
0LLL0LLLLLL01210
0LLLL0L0L0022220
0LLLLL0LL0121210
0LLLLLL002222220
0LLLLLL002121210
0LLLLL0110222220
0LLLL01111021210
0LLL011111102220
0LL0111111110210
0L01111111111020
0011111111111100
0000000000000000` ],
  [ end, bitmap`
2200220022002200
2200220022002200
0022002200220022
0022002200220022
2200220022002200
2200220022002200
0022002200220022
0022002200220022
2200220022002200
2200220022002200
0022002200220022
0022002200220022
2200220022002200
2200220022002200
0022002200220022
0022002200220022` ],
  [ box, bitmap`
0000000000000000
00FFFFFFFFFFFF00
0FFFFFFFFFFFFFF0
0000000000000000
0FF0600FF0060FF0
0FF0060FF0600FF0
0FF0600FF0060FF0
0FF0060FF0600FF0
0FF0600FF0060FF0
0FF0060FF0600FF0
0FF0600FF0060FF0
0FF0060FF0600FF0
0000000000000000
0FFFFFFFFFFFFFF0
00FFFFFFFFFFFF00
0000000000000000`],
  [ key, bitmap`
................
...FFF6.........
..FF.FF6........
..FF...F........
..F...FF........
..FF6.FF........
...FFFFF6.......
.......FF6......
........FF6.....
.........FF6....
........FFFF6...
.......FF..FF6..
...........FFF..
..........FF....
..........F.....
................`],
  [ lock, bitmap`
0000000000000000
0001111111111000
0011100000011100
01110LLLLLL01110
01110LLLLLL01110
0100000000000010
010FFFFFFFFFF010
010FFF000FFFF010
0100FF000FFF0010
0110FFF0FFFF0110
0110FFF0FFFF0110
0110FFF00FFF0110
01100FFFFFF00110
0011000000001100
0001111111111000
0000000000000000`],
  [ heart, bitmap`
................
...333....333...
..333333.33333..
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
..333333333333..
..333333333333..
...3333333333...
....33333333....
....33333333....
.....333333.....
......3333......
.......33.......
................`],
)

setSolids([player, player2, wall, box, lock, heart])

let level = 0
const levels = [
  map`
pw.ww
....w
w.w..
..wwe`,
  map`
pw...
.w.we
.w.ww
.b..w`,
  map`
pwwwe
.b...
w.wb.
b...w`,
  map`
p.q..
ww.w.
ww.w.
e....`,
  map`
p..qk
www..
e.l..
ww...`,
  map`
w...k
...wb
..lwq
pwew.`,
  map`
kbqwe
..bwl
..b..
.p...`,
  map`
bb.bp
.kbbb
l.b..
ebbb.`,
  map`
hhhhhhhhhh
hwww.....h
h.wl.l...h
h.wlllb.bh
h..l.l.b.h
h.....b.bh
h.q.p....h
hhhhhhhhhh`,
]

setMap(levels[level])

setPushables({
  [ player ]: [box],
  [ player2]: [box],
  [box]: [box],
})

function moveAllX(dist) {
  getFirst(player).x += dist;
  if (getFirst(player2) !== undefined) {  
    getFirst(player2).x += dist;
  }
}

function moveAllY(dist) {
  getFirst(player).y += dist;
  if (getFirst(player2) !== undefined) {  
    getFirst(player2).y += dist;
  }
}

onInput("s", () => {
  moveAllY(1);
})
onInput("w", () => {
  moveAllY(-1);
})
onInput("a", () => {
  moveAllX(-1);
})
onInput("d", () => {
  moveAllX(1);
})
onInput("k", () => {
  setMap(levels[level]);
})
onInput("j", () => {
  if (level - 1 >= 0) {
    setMap(levels[--level]);
  }
})
onInput("l", () => {
  if (level + 1 >= 0) {
    setMap(levels[++level]);
  }
})

afterInput(() => {
  if (tilesWith(player, key).length > 0) {
    let key1 = getFirst(key);
    key1.remove();
    getFirst(lock).remove();
  }

  if (tilesWith(player, player2).length > 0) {
    setMap(levels[level]);
  }
  
  if (tilesWith(player, end).length > 0) {
    let nxtLvl = level + 1;
    if (nxtLvl < levels.length) {
      level = nxtLvl;
      setMap(levels[nxtLvl]);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
})






