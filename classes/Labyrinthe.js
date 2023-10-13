class Labyrinthe {
    constructor(size, difficulty) {
        this.cells = []
        this.size = size
        for (let i = 0; i < data[size][difficulty].length; i++) {
            let cell = new Case(data[size][difficulty][i])
            this.cells.push(cell)
        }
        this.posPlayerX = 0
        this.posPlayerY = 0
        this.waitingList = []
    }
    initLabyrinthe() {
        // créa du laby au niveau du DOM
        let lab = $("<div></div>").attr("id", "labyrinthe")
        lab.css("width", this.size * 100)
        for (let c of this.cells) {
            let cases = $("<div></div>").addClass("case").attr("id", c.posX + "-" + c.posY)
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
    getStart() {
        let start = this.cells.find(cell => cell.details.entrance);
        start.visited = true
        return start
    }
    getExit() {
        return this.cells.find(cell => cell.details.exit);
    }
    getPosition(x, y) {
        return this.cells.find(element => element.posX === x && element.posY === y);
    }
    // getUnvisitedNeighbors(cell) { // DFS
    //     console.log('Infos disponibles')
    //     console.log('cell"s walls :', cell.walls)
    //     console.log('actual cell visited :', cell.visited)
    //     if (!cell.walls[0] && !this.getPosition(cell.posX - 1, cell.posY).visited) {
    //         this.waitingList.push(this.getPosition(cell.posX - 1, cell.posY));
    //     }
    //     if (!cell.walls[1] && !this.getPosition(cell.posX, cell.posY + 1).visited) {
    //         this.waitingList.push(this.getPosition(cell.posX, cell.posY + 1));
    //     }
    //     if (!cell.walls[2] && !this.getPosition(cell.posX + 1, cell.posY).visited) {
    //         this.waitingList.push(this.getPosition(cell.posX + 1, cell.posY));
    //     }
    //     if (!cell.walls[3] && !this.getPosition(cell.posX, cell.posY - 1).visited) {
    //         this.waitingList.push(this.getPosition(cell.posX, cell.posY - 1));
    //     }
    //     console.log("waiting list : ", this.waitingList)
    // }
    getUnvisitedNeighbors(cell) { // BFS
        console.log('Infos disponibles')
        console.log('cell"s walls :', cell.walls)
        console.log('actual cell visited :', cell.visited)
        if (!cell.walls[0] && !this.getPosition(cell.posX - 1, cell.posY).visited) {
            this.waitingList.unshift(this.getPosition(cell.posX - 1, cell.posY));
        }
        if (!cell.walls[1] && !this.getPosition(cell.posX, cell.posY + 1).visited) {
            this.waitingList.unshift(this.getPosition(cell.posX, cell.posY + 1));
        }
        if (!cell.walls[2] && !this.getPosition(cell.posX + 1, cell.posY).visited) {
            this.waitingList.unshift(this.getPosition(cell.posX + 1, cell.posY));
        }
        if (!cell.walls[3] && !this.getPosition(cell.posX, cell.posY - 1).visited) {
            this.waitingList.unshift(this.getPosition(cell.posX, cell.posY - 1));
        }
        console.log("waiting list : ", this.waitingList)
    }
    setPlayer() {
        this.posPlayerX = this.getStart().posX
        this.posPlayerY = this.getStart().posY
    }
    displayPlayer(){
        let pion = document.createElement("img")
        $(pion).attr("src", "https://png.pngtree.com/png-clipart/20220124/ourlarge/pngtree-hand-drawn-cartoon-earthquake-characters-fear-elements-png-image_4261505.png")
        document.getElementById(this.posPlayerX + "-" + this.posPlayerY).append(pion)
    }
    erasePlayer(){
        document.getElementById(this.posPlayerX + "-" + this.posPlayerY).setHTML("")
    }
    pingVisited(){
        let t = this.cells.find(element => element.posX === this.posPlayerX && element.posY === this.posPlayerY);
        return t.visited = true
    }
    movePlayer() {
         // recherche les voisins non visités de la case où le joueur se situe
        this.getUnvisitedNeighbors(this.getPosition(this.posPlayerX, this.posPlayerY))
        // get des nouvelles coordonnées du joueur
        this.posPlayerX = this.waitingList[this.waitingList.length-1].posX
        this.posPlayerY = this.waitingList[this.waitingList.length-1].posY
        // ping de la case visitée
        this.pingVisited()
        // pop de la waiting list de la case visitée
        this.waitingList.pop()
        console.log("player position after move : ", this.posPlayerX, this.posPlayerY)
        console.log("----------------------------------------------")
    }
    solve() {
        // while(!(this.posPlayerX === this.getExit().posX && this.posPlayerY === this.getExit().posY)){
        //     this.erasePlayer()
        //     this.movePlayer()
        //     this.displayPlayer()
        // }
        if(!(this.posPlayerX === this.getExit().posX && this.posPlayerY === this.getExit().posY)){
            this.erasePlayer()
            this.movePlayer()
            this.displayPlayer()
        }
        else{alert("BRAVO T'ES SORTI !!!!!!!!!")}
    }
}