class Labyrinthe {
    // ----------------------------------------- INITIALISATION -----------------------------------------
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
    setPlayer() {
        this.posPlayerX = this.getStart().posX
        this.posPlayerY = this.getStart().posY
    }


    // ----------------------------------------- GETTERS -----------------------------------------
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
    getUnvisitedNeighbors(cell) {
        console.log('Infos disponibles')
        console.log('cell"s walls :', cell.walls)
        if (!cell.walls[0] && !this.getPosition(cell.posX - 1, cell.posY).visited) {
            this.waitingList.push(this.getPosition(cell.posX - 1, cell.posY));
        }
        if (!cell.walls[1] && !this.getPosition(cell.posX, cell.posY + 1).visited) {
            this.waitingList.push(this.getPosition(cell.posX, cell.posY + 1));
        }
        if (!cell.walls[2] && !this.getPosition(cell.posX + 1, cell.posY).visited) {
            this.waitingList.push(this.getPosition(cell.posX + 1, cell.posY));
        }
        if (!cell.walls[3] && !this.getPosition(cell.posX, cell.posY - 1).visited) {
            this.waitingList.push(this.getPosition(cell.posX, cell.posY - 1));
        }
        console.log("waiting list : ", this.waitingList)
    }


    // ----------------------------------------- GRAPHIQUE -----------------------------------------
    displayPlayer() {
        let pion = document.createElement("img")
        $(pion).attr("src", "https://png.pngtree.com/png-clipart/20220124/ourlarge/pngtree-hand-drawn-cartoon-earthquake-characters-fear-elements-png-image_4261505.png")
        document.getElementById(this.posPlayerX + "-" + this.posPlayerY).append(pion)
    }
    erasePlayer() {
        document.getElementById(this.posPlayerX + "-" + this.posPlayerY).setHTML("")
    }
    pingVisited() {
        let t = this.cells.find(element => element.posX === this.posPlayerX && element.posY === this.posPlayerY);
        return t.visited = true
    }

    
    // ----------------------------------------- RESOLUTION -----------------------------------------
    movePlayer() {
        // récupération des cases où l'on peut se déplacer (waiting list)
        this.getUnvisitedNeighbors(this.getPosition(this.posPlayerX, this.posPlayerY))
        // sauvegarde de la position actuelle du joueur
        let tempX = this.posPlayerX
        let tempY = this.posPlayerY
        // déplacement du joueur sur la dernière case dispo de la waiting list
        this.posPlayerX = this.waitingList[this.waitingList.length - 1].posX
        this.posPlayerY = this.waitingList[this.waitingList.length - 1].posY
        //  ping de la case comme étant visitée
        this.pingVisited()
        // ajout de la case dans le parent
        let posAfterMove = this.cells.find(element => element.posX === this.posPlayerX && element.posY === this.posPlayerY)
        posAfterMove.parent = this.getPosition(tempX, tempY)
        // suppression de la case visitée (en l'occurrence la dernière de la liste)
        this.waitingList.pop()

        console.log("cell after move : ", posAfterMove)
        console.log("player position after move : ", this.posPlayerX, this.posPlayerY)
        console.log("parents : ", posAfterMove.parent)
        console.log("----------------------------------------------")
    }
    solve() {
        // while(!(this.posPlayerX === this.getExit().posX && this.posPlayerY === this.getExit().posY)){
        //     this.erasePlayer()
        //     this.movePlayer()
        //     this.displayPlayer()
        // }
        if (!(this.posPlayerX === this.getExit().posX && this.posPlayerY === this.getExit().posY)) {
            this.erasePlayer()
            this.movePlayer()
            this.displayPlayer()
        }
        else { alert("BRAVO T'ES SORTI !!!!!!!!!") }
    }
}