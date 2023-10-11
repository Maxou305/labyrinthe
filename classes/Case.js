class Case {
    constructor(cellData) {
        this.details = cellData
        this.posX = cellData.posX
        this.posY = cellData.posY
        this.walls = cellData.walls
        this.visited = false
        this.croisement = false
    }
    setVisited() {
        this.visited = true
    }
    isVisited(){
        return this.visited
    }
}