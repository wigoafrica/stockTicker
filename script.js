import getStockData from './data.js'
const sampleData = getStockData()

const feName = document.getElementById("name")
const feSymbol = document.getElementById("symbol")
const fePrice = document.getElementById("price")
const feTime = document.getElementById("time")
const feBtn = document.getElementById("btn")
const feTerminateBtn = document.getElementById("terminateBtn")

feName.innerText = `${Object.keys(sampleData)[0]}:  ${sampleData.Name}`
feSymbol.innerText = `${Object.keys(sampleData)[1]}:  ${sampleData.Symbol}`
fePrice.innerText = `${Object.keys(sampleData)[2]}:  ${sampleData.Price}`
feTime.innerText = setTime()

//////////////////////////////////////////////////////////////////////
//=====================custom alert=================================//
function showCustomAlert(message) {
    document.getElementById('alertMessage').innerText = message;
    document.getElementById('customAlert').style.display = 'block';
}

document.querySelector('.close-button').onclick = function() {
    document.getElementById('customAlert').style.display = 'none';
};

document.getElementById('alertOkButton').onclick = function() {
    document.getElementById('customAlert').style.display = 'none';
};

// Example usage:
// showCustomAlert("This is a custom alert!");



//////////////////////////////////////////////////////////////////////
//==========================price==================================//
const performance = ['🔴', '🟢', '⚫️' ]

const savedContent = localStorage.getItem('history')
const savedHist = JSON.parse(savedContent)
const history = savedHist || []
if (savedContent){
    let i = savedHist.length - 1
    sampleData.Price = savedHist[i]
    fePrice.innerText = `${Object.keys(sampleData)[2]}:  ${sampleData.Price}`
}

feBtn.addEventListener("click", function (){
    mainEntry()
})

function mainEntry(){
    sampleData.Price = randomPrice()
    const saveHist = JSON.stringify(history)
    localStorage.setItem('history', saveHist);

    console.log(saveHist)
    console.log(localStorage.getItem('history'))
    showPerformance()
    setTime()
}

function randomPrice(){
   const randomNumber = Math.floor(Math.random() * 123) + 1;
    history.push(randomNumber)
   return randomNumber;
}

function showPerformance(){
    const initialPrice = history[history.length - 2];
    const newPrice = history[history.length - 1]
    if (history.length < 2){
        return
    }else if (newPrice < initialPrice){
        console.log(`Price has dropped by  ${newPrice - initialPrice}`)
        fePrice.innerText = `${Object.keys(sampleData)[2]}:  ${sampleData.Price} ${performance[0]}`

    }else if (newPrice > initialPrice){
        console.log(`price has increased, ${newPrice - initialPrice} `)
        fePrice.innerText = `${Object.keys(sampleData)[2]}:  ${sampleData.Price} ${performance[1]}`

    }else{
        console.log(`price has increased, ${initialPrice} `)
        fePrice.innerText = `${Object.keys(sampleData)[2]}:  ${sampleData.Price} ${performance[2]}`
    }
}
console.log(localStorage.getItem('history'))



//////////////////////////////////////////////////////////////////////
//===========================Time==================================//
function setTime(){
    const newDate = new Date()
    const setHour = newDate.getHours()
    const setMinutes = newDate.getMinutes()
    const setSeconds = newDate.getSeconds()

    feTime.innerText = `Time:   ${setHour}:${setMinutes}:${setSeconds}`
    console.log(feTime.innerText)
    return feTime.innerText
}

///////////////////////////////////////////////////////////////////////////
//===========Rum main automatically aftre each 5000 seconds=============//
let endIntervalBtn = false
const interval = setInterval(() => {
    if (endIntervalBtn){
        clearInterval(interval);
        
        return showCustomAlert("recussion ended")
    }else{
       mainEntry() 
    }
}, 1000)

///////////////////////////////////////////////////////////////////////////
//============================terminate itteration========================//

feTerminateBtn.addEventListener("click",function(){
    endIntervalBtn = true

    localStorage.clear()
    
    history.length = 0
    
})