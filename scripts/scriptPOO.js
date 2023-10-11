

let laby = new Labyrinthe("20", "ex-2")
laby.initLabyrinthe()
laby.setPlayer()








// ----------------- console log ----------------- 
console.log("labyrinthe : ", laby)
console.log("start position : ", laby.getStart().posX, laby.getStart().posY)
console.log("exit position : ", laby.getExit().posX, laby.getExit().posY)
console.log("get position : ", laby.getPosition())
console.log("unvisited neighbors : ", laby.getUnvisitedNeighbors(laby.getPosition(0, 1)))