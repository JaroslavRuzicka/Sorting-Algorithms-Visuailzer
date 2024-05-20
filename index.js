/*******************Global Variables **************************/
let elementsOrdering = []


/*******************DOM Selectors *****************************/
// let elements = document.getElementById("algoBox").childNodes
let elements = document.getElementById("algoBox").children
let parentElement = document.getElementById("algoBox")

/*******************Functions  *******************************/


//finish function that is gonna sanitize input and only allow whole numbers between 5 and 100
//shuffle while soritng breaks algo


function populateSortingBox(){
    let tempNumber = document.querySelector("#numberOfElementsInput").value
    let numberOfChildren
    deleteAllElements()

    if(tempNumber){
        //sanitize input
        numberOfChildren =  tempNumber
    } else{
        document.querySelector("#numberOfElementsInput").value = 20
        numberOfChildren = 20
    }   
    let spacing = 100 / numberOfChildren
    for(let i = 0; i < numberOfChildren; i++){
        let div = document.createElement("div")
        div.className = "collumn" + (i + 1)
        
        let heightOfElement = 60 / numberOfChildren * (i + 1);
        
        div.style.height = `${heightOfElement}vh`
        div.style.left = `${i * spacing}%`
        div.style.width = `${spacing}%`

        let header = document.getElementById("algoBox")
        header.appendChild(div)
    }
}

function deleteAllElements(){
    let tempElemets = document.getElementById("algoBox").children
    for(let i = tempElemets.length - 1; i >= 0; i--){
        tempElemets[i].remove()
    }
}

function shuffledArray(numOfElements) {
    let positionOfElements = []
    for(let i = 0; i < numOfElements; i++){
        positionOfElements.push((i))
    }
    let currentIndex = positionOfElements.length;

    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [positionOfElements[currentIndex], positionOfElements[randomIndex]] = [
        positionOfElements[randomIndex], positionOfElements[currentIndex]];
    }
    return positionOfElements
}

function shuffleElements(){
    let numberOfChildren = elements.length
    let spacing = 100 / numberOfChildren
    let shuffledArrayList = shuffledArray(numberOfChildren)

    console.log(shuffledArrayList);
    for(let i = 0; i < numberOfChildren; i++){
        elements[i].style.left = `${shuffledArrayList[i] * spacing}%`

        let tempElement = {
            element: elements[i],
            height: elements[i].style.height
        }
        elementsOrdering[shuffledArrayList[i]] = tempElement
    }
    //console.log(elementsOrdering);
}

function bubleSort(lengthOfLoop){

        let lengthOfLoopTemp = lengthOfLoop
        let numOfSorts = 0

        let i = 0
        function loop(){
            let temp1 = elementsOrdering[i]
            let temp2 = elementsOrdering[i + 1]
            
            temp1.element.style.backgroundColor = "lime"
            temp2.element.style.backgroundColor = "lime"

            setTimeout( function() {
    
                let height1 = Number(temp1.height.slice(0, -2))
                let height2 = Number(temp2.height.slice(0, -2))
    
                temp1.element.style.backgroundColor = "red"
                temp2.element.style.backgroundColor = "red"
                if(height1 > height2){
                    let left1 = temp1.element.style.left
                    let left2 = temp2.element.style.left
                    
                    elementsOrdering[i].element.style.left = left2
                    elementsOrdering[i + 1].element.style.left = left1
    
                    elementsOrdering[i] = temp2
                    elementsOrdering[i + 1] = temp1
                    console.log(elementsOrdering);
    
                    numOfSorts++
                }
                i++
                if(i < lengthOfLoopTemp - 1){
                    loop()
                }else{
                    if(numOfSorts === 0){
                        return
                    }else{
                        if(lengthOfLoopTemp > 1){
                            i = 0
                            bubleSort(lengthOfLoopTemp - 1)
                        }
                    }
                }
                
            }, 10)
        }
        loop()    //console.log(elementsOrdering);
}


//*******************Funciton Calls *******************************/
populateSortingBox()


/**********************Event Listeners ***************************/
let btn = document.querySelector("#sortBtn")
btn.addEventListener("click", function(){bubleSort(elementsOrdering.length)})

let shuffleBtn = document.querySelector("#shuffleBtn")
shuffleBtn.addEventListener("click", shuffleElements)

let generateElementsBtn = document.querySelector("#changeNumberOfElementsBtn")
generateElementsBtn.addEventListener("click", populateSortingBox)

