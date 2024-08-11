/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: once,twice,trice
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const player2 = "q"
const wall = "w"
const box = "b"
const end = "e"

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
)

setSolids([player, player2, wall, box])

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
]

setMap(levels[level])

setPushables({
  [ player ]: [box]
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

afterInput(() => {
  let p1 = getFirst(player);
  let p2 = getFirst(player2);
  let finish = getFirst(end);

  if (p2 !== undefined && p1.x == p2.x && p1.y == p2.y) {
    setMap(levels[level]);
  }
  
  if (p1.x == finish.x && p1.y == finish.y) {
    let nxtLvl = level + 1;
    if (nxtLvl < levels.length) {
      setMap(levels[nxtLvl]);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
})






