function getLabyrinthes(size, difficulty) {
    return data[size][difficulty];
}

let lab = $("<div></div>").attr("id", "labyrinthe")

function initCases(size) {
    let cases = $("<div></div>").addClass("cases")
    if (c.entrance) {
        cases.addClass("start")
    }
    if (c.exit) {
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
    $("body").append(lab)
    lab.css("width", size * 100)
}

function initLabyrinthe(size, difficulty) {
    for (c of data[size][difficulty]) {
        initCases(size)
    }
}

initLabyrinthe("10", "ex-0")