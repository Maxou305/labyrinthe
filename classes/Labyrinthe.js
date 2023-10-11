class Labyrinthe {
    constructor(size, difficulty) {
        this.cells = []
        this.size = size
        for (let i = 0; i < data[size][difficulty].length; i++) {
            let cell = new Case(data[size][difficulty][i])
            this.cells.push(cell)
        }
    }
    initLabyrinthe() {
        let lab = $("<div></div>").attr("id", "labyrinthe")
        lab.css("width", this.size * 100)
        for (let c of this.cells) {
            let cases = $("<div></div>").addClass("cases")
            if (c.details.entrance) {
                cases.addClass("start")
            }
            if (c.details.exit) {
                cases.addClass("exit")
            }
            if (c.walls[0]) {
                cases.css("border-top", "solid red 1px")
            }
            if (c.walls[1]) {
                cases.css("border-right", "solid red 1px")
            }
            if (c.walls[2]) {
                cases.css("border-bottom", "solid red 1px")
            }
            if (c.walls[3]) {
                cases.css("border-left", "solid red 1px")
            }
            lab.append(cases)
        }
        $("body").append(lab)
    }
    getStart(){
        return this.cells.find(cell => cell.details.entrance);
    }
    getExit(){
        return this.cells.find(cell => cell.details.exit);
    }
    getPosition(x, y){
        return this.cells.find(element => element.posX === x && element.posY === y);
    }
    getUnvisitedNeighbors(cell){
        console.log('Infos disponibles')
        console.log('posX', cell.posX)
        console.log('posY', cell.posY)
        console.log('walls', cell.walls)
        console.log('visited', cell.visited)

        let neighbors = []
        if (!cell.walls[0]){
            neighbors.push(this.getPosition(cell.posX-1, cell.posY)); 
        }
        if (!cell.walls[1]){
            neighbors.push(this.getPosition(cell.posX, cell.posY+1)); 
        }
        if (!cell.walls[2]){
            neighbors.push(this.getPosition(cell.posX+1, cell.posY)); 
        }
        if (!cell.walls[3]){
            neighbors.push(this.getPosition(cell.posX, cell.posY-1)); 
        }
        return neighbors
    }
    setPlayer(){
        this.posPlayerX = this.getStart().posX
        this.posPlayerY = this.getStart().posY
    }
    movePlayer(){

    }
    solve() {
        // if (posPlayerX != getExit(laby).posX && posPlayerY != getExit(laby).posY) {
        //     this.isVisited()
        //     this.isCroisement()
        //     if(isWalls(getPosition()) === false && checkVisited() === false){
        //         movePlayer()
        //     }
        // }
    }
}