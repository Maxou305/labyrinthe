

let laby = new Labyrinthe("21", "ex-0")
laby.initLabyrinthe()
laby.setPlayer()

$("body").on("click", () => laby.solve());

// ----------------- console log ----------------- 
console.log("labyrinthe : ", laby)
console.log("start position : ", laby.getStart().posX, laby.getStart().posY)
console.log("exit position : ", laby.getExit().posX, laby.getExit().posY)
console.log("----------------------------------------------")