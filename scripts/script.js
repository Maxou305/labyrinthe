function insertSort(){
    let sortedData = []
    for (let elmt of data){
        let i = 0
        while(elmt > sortedData[i] && i < sortedData.length){
            i++
        }
        sortedData.splice(i, 0, elmt)
    }
    return sortedData
}
console.log("sortedData :", insertSort())