

// function getStart(labyrinthe){
//     console.log(labyrinthe)
//     return labyrinthe.find( cell => cell.entrance );
// }

// let labyrinthe = getLabyrinthes('3', 'ex-0'); 
// let start = getStart(labyrinthe);
// console.log(start.posX)

class Case {
    constructor(cellData) {
        this.details = cellData
        this.posX = cellData.posX
        this.posY = cellData.posY
        this.walls = cellData.walls
    }

    isVisited() {

    }

    isCulDeSac() {

    }

    isExit() {

    }
}


class Labyrinthe {
    constructor(taille, difficulte) {
        this.l = []
        this.taille = taille
        for (let i = 0; i < data[taille][difficulte].length; i++) {
            let cell = new Case(data[taille][difficulte][i])
            this.l.push(cell)
        }
    }
    
    initLabyrinthe() {
        let lab = $("<div></div>").attr("id", "labyrinthe")
        lab.css("width", this.taille * 100)
        for (let c of this.l) {
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
}

// console.log(data[3]["ex-0"])

let zob = new Labyrinthe("10", "ex-0")
zob.initLabyrinthe()
console.log(zob)