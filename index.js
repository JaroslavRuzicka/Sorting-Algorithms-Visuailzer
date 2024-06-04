//Sorting algorithms to implement:
//Buble sort: Done
//Insertion sort: Done
//Selection sort: Done
//Merge sort: Done
//Quick Sort
//Heap sort
//Radix sort
//Shell sort -- maybe
//Bogo sort -- maybe

/*******************Global Variables **************************/
let elementsOrdering = []
let speedOfSorting = 20
let backgroundColor = "linear-gradient( rgb(232, 93, 7) 35%, rgb(224, 19, 12) 100%)"
let soritngBackgroundColor = "linear-gradient( rgb(41, 241, 6) 35%, rgb(2, 239, 93) 100%)"

/*******************DOM Selectors *****************************/
// let elements = document.getElementById("algoBox").childNodes
let elements = document.getElementById("algoBox").children
let parentElement = document.getElementById("algoBox")

/*******************Functions  *******************************/


//shuffle while soritng breaks algo


function populateSortingBox(){
    let tempNumber = Number(document.querySelector("#numberOfElementsInput").value)
    let numberOfChildren
    deleteAllElements()
    
    //sanitizing input
    if(Number.isInteger(tempNumber) && tempNumber > 0 && tempNumber < 100){
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

        let tempElement = {
            element: elements[i],
            height: elements[i].style.height
        }
        elementsOrdering[i] = tempElement
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
    
    elementsOrdering = []
    let numberOfChildren = elements.length
    let spacing = 100 / numberOfChildren
    let shuffledArrayList = shuffledArray(numberOfChildren)

    //console.log(shuffledArrayList);
    for(let i = 0; i < numberOfChildren; i++){
        let left = `${shuffledArrayList[i] * spacing}%`
        elements[i].style.left = left

        let tempElement = {
            element: elements[i],
            height: elements[i].style.height,
            left: left
        }
        elementsOrdering[shuffledArrayList[i]] = tempElement
    }
    //console.log(elementsOrdering);
}

function selectionSort(startingIndex){
    // shuffleBtn.disabled = true
    // generateElementsBtn.disabled = true

    i = startingIndex
    let smallestElement = elementsOrdering[i]
    let smallestElementPosition = i

    function loop(i){
        let temp2 = elementsOrdering[i]
        
        smallestElement.element.style.background = soritngBackgroundColor
        temp2.element.style.background = soritngBackgroundColor

        setTimeout(function(){
            
            let height1 = getHeightOfElement(smallestElement)
            let height2 = getHeightOfElement(temp2)

            
            temp2.element.style.background = backgroundColor
            
            if(height1 > height2){
                smallestElement.element.style.background = backgroundColor
                smallestElement = temp2
                smallestElementPosition = i
                smallestElement.element.style.background = soritngBackgroundColor
            }

            if(i < elementsOrdering.length - 1){
                loop(i + 1)
            }else{
                let left1 = smallestElement.element.style.left
                let left2 = elementsOrdering[startingIndex].element.style.left
                
                smallestElement.element.style.left = left2
                elementsOrdering[startingIndex].element.style.left = left1

                elementsOrdering[smallestElementPosition] = elementsOrdering[startingIndex]
                elementsOrdering[startingIndex] = smallestElement
                setTimeout(function(){
                    smallestElement.element.style.background = backgroundColor

                },speedOfSorting)
               if(startingIndex < elementsOrdering.length - 2){
                   selectionSort(startingIndex + 1)
               }else{
                    enableBtns()
                    setTimeout(function(){
                        smallestElement.element.style.background = backgroundColor
                        temp2.element.style.background = backgroundColor
                    },speedOfSorting)
               }
            }
        },speedOfSorting)
    }
    loop(i + 1)

}

function bubleSort(lengthOfLoop){ 
    let lengthOfLoopTemp = lengthOfLoop
    let numOfSorts = 0

    let i = 0
    function loop(){
        let temp1 = elementsOrdering[i]
        let temp2 = elementsOrdering[i + 1]
        
        temp1.element.style.background = soritngBackgroundColor
        temp2.element.style.background = soritngBackgroundColor

        setTimeout( function() {

            let height1 = getHeightOfElement(temp1)
            let height2 = getHeightOfElement(temp2)

            temp1.element.style.background = backgroundColor
            temp2.element.style.background = backgroundColor
            if(height1 > height2){
                let left1 = temp1.element.style.left
                let left2 = temp2.element.style.left
                
                elementsOrdering[i].element.style.left = left2
                elementsOrdering[i + 1].element.style.left = left1

                elementsOrdering[i] = temp2
                elementsOrdering[i + 1] = temp1
                //console.log(elementsOrdering);

                numOfSorts++
            }
            i++
            if(i < lengthOfLoopTemp - 1){
                loop()
            }else{
                if(numOfSorts === 0){
                    enableBtns()
                    return
                }else{
                    if(lengthOfLoopTemp > 1){
                        i = 0
                        bubleSort(lengthOfLoopTemp - 1)
                    }
                }
            }
        }, speedOfSorting)
    }
    loop()    //console.log(elementsOrdering);
}

function insertionSort(startingIndex){
    let temp = elementsOrdering[startingIndex + 1]
    let tempHeight =getHeightOfElement(temp)

    function sort(i){
        let prev = elementsOrdering[i]
        prev.element.style.background = soritngBackgroundColor

        let prevHeight = getHeightOfElement(prev)
        if(prevHeight > tempHeight){
            //let tempLeft = elementsOrdering[i + 1].element.style.left
            //currentLeft = prev.element.style.left
    
            elementsOrdering[i + 1] = prev
            elementsOrdering[i + 1].element.style.left = `${100 / elementsOrdering.length * (i + 1)}%`
        }
        else{
            elementsOrdering[i + 1] = temp
            elementsOrdering[i + 1].element.style.left = `${100 / elementsOrdering.length * (i + 1)}%`
            setTimeout(() => {
                prev.element.style.background = backgroundColor
            }, speedOfSorting);

            if(startingIndex < elementsOrdering.length - 2){
                setTimeout(() => {
                    insertionSort(startingIndex + 1)
                }, speedOfSorting);
            }else{
                enableBtns()
            }
            return
        }
        if(i == 0){
            prev.element.style.background = backgroundColor
            elementsOrdering[i] = temp
            elementsOrdering[i].element.style.left = `${100 / elementsOrdering.length * (i)}%`
        }
        
        if(i > 0){
            setTimeout(() => {
                prev.element.style.background = backgroundColor
                
                sort(i - 1)
            }, speedOfSorting);
        }else{
            if(startingIndex < elementsOrdering.length - 2){
                setTimeout(() => {
                    insertionSort(startingIndex + 1)
                }, speedOfSorting);
            }else{
                enableBtns()
            }
        }
    }
    sort(startingIndex)
}

function mergeSort(){

    let sortingVisualizationOrder = []
    
    function sort(previousArray){
        
        let length = previousArray.length

        if(length <= 1) return

        let middleIndex = parseInt(length/2)

        let fistArray = []
        let secondArray = []

        //console.log(fistArray, secondArray);
        let i = 0
        let j = 0

        for(; i < length; i++){
            if(i < middleIndex){
                fistArray[i] = previousArray[i]
            }else{
                secondArray[j] = previousArray[i]
                j++
            }
        }


        sort(fistArray)
        sort(secondArray)
        merge(fistArray, secondArray, previousArray)
        
    }



    function merge(firstArray, secondArray, previousArray){
        
        let sortingVisualizationOrderTemp = []
        
        let length = previousArray.length
        let firstSize = parseInt(length / 2)
        let secondSize = length - firstSize 

        let i = 0
        let l = 0
        let r = 0

        let leftLIst = []
        previousArray.forEach(element => {
            left = element.left
            leftLIst.push(left)
        })

        // firstArray.forEach(element => {
        //     left = element.left
        //     leftLIst.push(left)
        // })

        // secondArray.forEach(element => {
        //     left = element.left
        //     leftLIst.push(left)
        // })

        while(l < firstSize && r < secondSize) {
            let fistHeight = getHeightOfElement(firstArray[l])
            let secondHeight = getHeightOfElement(secondArray[r])
            
            if(fistHeight < secondHeight) {
                let tempLeft = leftLIst[i]

                previousArray[i] = firstArray[l];

                let tempItem = {
                    item: firstArray[l],
                    left: tempLeft
                }

                sortingVisualizationOrderTemp.push(tempItem)
                // previousArray[i].element.style.left = tempLeft
                i++
                l++
            }
            else {
                let tempLeft = leftLIst[i]

                previousArray[i] = secondArray[r];
                let tempItem = {
                    item: secondArray[r],
                    left: tempLeft
                }

                sortingVisualizationOrderTemp.push(tempItem)
                // previousArray[i].element.style.left = tempLeft
                i++
                r++
            }
        }
        while(l < firstSize) {
            let tempLeft = leftLIst[i]   

            previousArray[i] = firstArray[l];
            let tempItem = {
                item: firstArray[l],
                left: tempLeft
            }

            sortingVisualizationOrderTemp.push(tempItem)
            // previousArray[i].element.style.left = tempLeft
            i++
            l++
        }
        while(r < secondSize) {
            let tempLeft = leftLIst[i]

            previousArray[i] = secondArray[r];
            let tempItem = {
                    item: secondArray[r],
                    left: tempLeft
                }
            sortingVisualizationOrderTemp.push(tempItem)
            // previousArray[i].element.style.left = tempLeft
            i++
            r++
        }
        //console.log(previousArray)
        sortingVisualizationOrder.push(sortingVisualizationOrderTemp)
    }

    sort(elementsOrdering)
    

    console.log(sortingVisualizationOrder)

    function sortArrayWithDelayAnimation(index){
        let length = sortingVisualizationOrder.length

        if(index >= length){
            enableBtns()
            return
        } 

        let currentArray = sortingVisualizationOrder[index]

        currentArray.forEach((element)=>{
            element.item.element.style.background = soritngBackgroundColor
        })
        
        loopWithDelay(currentArray)


        setTimeout(() => {
            currentArray.forEach((element)=>{
                element.item.element.style.background = backgroundColor
            })   
            sortArrayWithDelayAnimation(index + 1)
        }, speedOfSorting * 10);

        
    }
    
    function loopWithDelay(array){
        console.log(array)
        array.forEach(element => {
            //console.log(element.item.element)    
            element.item.element.style.left = element.left
 
        })
    }


    sortArrayWithDelayAnimation(0)

}


function callSortingAlgorithm(){
    let selection = document.querySelector("#sortingAlgorithmsSelection").value
    disabledBtns()
    switch (selection){
        case "bubbleSort":
            let tempNumber = Number(document.querySelector("#numberOfElementsInput").value)    
            bubleSort(tempNumber)
            break
        case "selectionSort":
            selectionSort(0)
            break
        case "insertionSort":
            insertionSort(0)
            break
        case "mergeSort":
            mergeSort()
            break
        default:
            break
    }
}

function disabledBtns(){
    btn.disabled = true
    shuffleBtn.disabled = true
    generateElementsBtn.disabled = true
}

function enableBtns(){
    generateElementsBtn.disabled = false
    shuffleBtn.disabled = false 
    btn.disabled = false
}

function getHeightOfElement(elementHeight){
    return Number(elementHeight.height.slice(0, -2))
}


//*******************Funciton Calls *******************************/
populateSortingBox()


/**********************Event Listeners ***************************/
let tempNumber = Number(document.querySelector("#numberOfElementsInput").value)    

let btn = document.querySelector("#sortBtn")
btn.addEventListener("click", callSortingAlgorithm)

let shuffleBtn = document.querySelector("#shuffleBtn")
shuffleBtn.addEventListener("click", shuffleElements)

let generateElementsBtn = document.querySelector("#changeNumberOfElementsBtn")
generateElementsBtn.addEventListener("click", populateSortingBox)

addEventListener("resize", shuffleElements);

