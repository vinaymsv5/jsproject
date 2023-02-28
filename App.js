let clickedValue = null;
const btnIntraday = document.querySelector('#btn-intraday')

const btnDaily = document.querySelector('#btn-daily')
const btnWeekly = document.querySelector('#btn-weekly')
const btnMonthly = document.querySelector('#btn-monthly')

const watchlistName = document.getElementById('watchlist-name1')
const watchlistScore = document.getElementById('watchlist-score1')
const watchlistSelect = document.getElementById('watchlist-select1')
//console.log(watchlistSelect)
const holderDomElement = document.getElementById('container-single')
console.log(holderDomElement)
const containerWatchListDetails = document.querySelectorAll('#watchlist-details')
const btnCross = document.getElementById("btncross")
console.log(btnCross)

let counter = 0;

const clickedFunc = (e) => {
    //console.log(e.target.innerText);
    if (e.target.innerText == btnIntraday.innerText) {
        clickedValue = e.target.innerText
        console.log(clickedValue);

    } else if (e.target.innerText == btnDaily.innerText) {
        clickedValue = e.target.innerText;
        console.log(clickedValue);
    } else if (e.target.innerText == btnWeekly.innerText) {
        clickedValue = e.target.innerText;
        console.log(clickedValue);
    } else if (e.target.innerText == btnMonthly.innerText) {
        clickedValue = e.target.innerText;
        console.log(clickedValue);
    } else {
        clickedValue = btnIntraday.innerText;
        console.log(clickedValue);
    }
    return clickedValue;
}

btnIntraday.addEventListener('click', clickedFunc)
btnDaily.addEventListener('click', clickedFunc)
btnWeekly.addEventListener('click', clickedFunc)
btnMonthly.addEventListener('click', clickedFunc)

console.log(clickedValue)
let arr = [];
const convertToHTML = (htmlInStringFormat, responseLatestOpen, clickedValue) => {
    let className = responseLatestOpen + clickedValue;
    const element = document.createElement("div");
    element.setAttribute('id', className)
    // element.classList.add(className);

    element.innerHTML = htmlInStringFormat;
    return element;
}

let domData;
function createDomElement(responseLatestOpen, responseSymbol, clickedValue) {
    console.log(responseLatestOpen)
            console.log(responseSymbol)
            console.log(clickedValue)
    const domData = convertToHTML(`
<div id="watchlist-details" data-symbol-${responseSymbol} class="watchlist-details ${responseLatestOpen} ${clickedValue}">

    <p id="watchlist-name1"  class="watchlist-name">${responseSymbol}</p>
    <p id="watchlist-score1" class="watchlist-score">${responseLatestOpen}</p>
    <button type="button" id="watchlist-select1" class="watchlist-select">${clickedValue}</button>
    <button id="btn-cross" class="btn-cross"><i class="fa-solid fa-xmark"></i></button>
    
</div>`, responseLatestOpen, clickedValue
    )



    console.log(responseLatestOpen, responseSymbol, clickedValue);
   // arr.push({ responseLatestOpen, responseSymbol, clickedValue })
    holderDomElement.appendChild(domData)

    console.log(arr)


}

// Add eventlistner 


const getData = async () => {

    let symbol = document.getElementById('symbol-input').value

    try {

        if (clickedValue == "DAILY") {


            console.log(clickedValue)
            console.log(symbol)

            const getAPI = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_${clickedValue}_ADJUSTED&symbol=${symbol}&interval=5min&apikey=P08NZN6MWQ9TE2IX`)
            const res = await getAPI.json();

            console.log(res)
            const response = Object.values(res['Meta Data'])
            const responseSymbol = response[1];

            const responseLatestOpen = Object.values(res['Time Series (Daily)'])[0]['1. open']
            console.log(symbol)
            console.log(responseSymbol)

            createDomElement(responseLatestOpen, responseSymbol, clickedValue);
            arr.push({ responseLatestOpen, responseSymbol, clickedValue })
            console.log(responseLatestOpen)
            console.log(responseSymbol)
            console.log(clickedValue)


        } else {

            console.log(clickedValue)
            console.log(symbol)
            const getAPI = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_${clickedValue}&symbol=${symbol}&interval=5min&apikey=P08NZN6MWQ9TE2IX`)
            const res = await getAPI.json();
            const response = Object.values(res['Meta Data'])
            const responseSymbol = response[1];
            //  createDomElement(responseLatestOpen, symbol)
            if (clickedValue == "INTRADAY") {
                const responseLatestOpen = Object.values(res['Time Series (5min)'])[0]['1. open']
                console.log(responseLatestOpen)
                createDomElement(responseLatestOpen, responseSymbol, clickedValue);
            arr.push({ responseLatestOpen, responseSymbol, clickedValue })
            }
            else if (clickedValue == "WEEKLY") {
                const responseLatestOpen = Object.values(res['Weekly Time Series'])[0]['1. open']
                console.log(responseLatestOpen)
                createDomElement(responseLatestOpen, responseSymbol, clickedValue);
                arr.push({ responseLatestOpen, responseSymbol, clickedValue })
            }
            else if (clickedValue == "MONTHLY") {
                const responseLatestOpen = Object.values(res['Monthly Time Series'])[0]['1. open']
                console.log(responseLatestOpen)
                createDomElement(responseLatestOpen, responseSymbol, clickedValue);
                arr.push({ responseLatestOpen, responseSymbol, clickedValue })

            }
        }
        console.log(holderDomElement)

    }
    catch (err) {
        console.log(err)

    }
};

document.getElementById('btn-search-symbol').addEventListener('click', getData);



function getDataFromWatchlist(e) {

    console.log(document.getElementById('#container-single'))
    console.log(arr)



    // by selecting the root elemnt try to get all the child nodes.
    let filterArray = arr.filter((value) => {
        return String(value.responseSymbol).startsWith(e.target.value)
        //startsWith(e.target.value)

    })
    // (p => String(p.year).startsWith('198'))
    console.log(filterArray)
    let inputLength = e.target.value;
    if (inputLength.length >= 2) {
        //   containerWatchListDetails = ""
        holderDomElement.innerHTML = null;

        // holderDomElement.style.display = "none";
        //containerWatchListDetails.style.display = "none";

        for (let i = 0; i < filterArray.length; i++) {
            //console.log(responseLatestOpen, responseSymbol, clickedValue);
            responseSymbol = filterArray[i].responseSymbol;

            responseLatestOpen = filterArray[i].responseLatestOpen;
            clickedValue = filterArray[i].clickedValue;
            console.log(responseLatestOpen, responseSymbol, clickedValue);
            createDomElement(responseLatestOpen, responseSymbol, clickedValue);
        }
}
else if(inputLength.length == ' ' && inputLength.length == '') {

    holderDomElement.innerHTML = null;

    for (let i = 0; i < arr.length; i++) {
        //console.log(responseLatestOpen, responseSymbol, clickedValue);
        responseSymbol = arr[i].responseSymbol;

        responseLatestOpen = arr[i].responseLatestOpen;
        clickedValue = arr[i].clickedValue;
        console.log(responseLatestOpen, responseSymbol, clickedValue);
        createDomElement(responseLatestOpen, responseSymbol, clickedValue);
    }
 }
// else{
//     if(e.target.value ==''){
//         holderDomElement.innerHTML = null;
//     }
// }

  //iterrating overthat array by filter on basis data attribute.
}
document.querySelector('#input-watchlist').addEventListener('keyup', getDataFromWatchlist)
//add venetlistner on onchange when user clicks outside of list if watchlist is balnk and" " original pass to createdom.


let table;

let responseValues;
let responseKeys;
let tableCounter = 0;
//let clickedValueForTable;

holderDomElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-cross")) {
        const targetedLi = e.target.parentNode.parentNode;
        // targetedLi.remove();
        targetedLi.innerText = '';
        console.log("removeeee")
    }
    if (e.target.classList.contains("fa-xmark")) {
        const targetedLi = e.target.parentNode.parentNode.parentNode;
        // targetedLi.remove();
        targetedLi.innerText = '';
        console.log("removeeee")
    }
    if (e.target.classList.contains("watchlist-select")) {
        let targetedTable = e.target.parentNode.className;
        console.log(targetedTable)

        targetedTable = targetedTable.split(' ');
        console.log(targetedTable)
        let btnParentClassNAme = targetedTable[1] + targetedTable[2];
        console.log(btnParentClassNAme)


        let clickedValueForTable = e.target.innerText;
        //  getTableData(clickedValueForTable, btnParentClassNAme)
        // table.classList.toggle("create-table");
        tableCounter++;
        if (tableCounter == 2) {
            console.log(tableCounter)
            table.classList.toggle("create-table");
            tableCounter = 0;
            return;
        }
        getTableData(clickedValueForTable, btnParentClassNAme)
        console.log(btnParentClassNAme)


        // creatTable();
        // console.log(tableClass)
    }
});

async function getTableData(clickedValueForTable, id) {
    console.log(id)

    console.log(clickedValueForTable)



    let symbolForTable = document.querySelector('#watchlist-name1').innerText
    console.log(symbolForTable)
    try {
        //  let symbol = document.getElementById('symbol-input').value
        if (clickedValueForTable == "DAILY") {

            const getAPI = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_${clickedValueForTable}_ADJUSTED&symbol=${symbolForTable}&interval=5min&apikey=P08NZN6MWQ9TE2IX`)
            const res = await getAPI.json();

            // console.log(res)
            responseValues = Object.values(res['Time Series (Daily)'])
            responseKeys = Object.keys(res['Time Series (Daily)'])

        } else {


            const getAPI = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_${clickedValueForTable}&symbol=${symbolForTable}&interval=5min&apikey=P08NZN6MWQ9TE2IX`)
            const res = await getAPI.json();

            if (clickedValueForTable == "INTRADAY") {
                responseValues = Object.values(res['Time Series (5min)'])
                responseKeys = Object.keys(res['Time Series (5min)'])

            }
            else if (clickedValueForTable == "WEEKLY") {
                responseValues = Object.values(res['Weekly Time Series'])
                responseKeys = Object.keys(res['Weekly Time Series'])

            }
            else if (clickedValueForTable == "MONTHLY") {
                responseValues = Object.values(res['Monthly Time Series'])
                responseKeys = Object.keys(res['Monthly Time Series'])

            }
        }

    }
    catch (err) {
        console.log(err)
    }

    let ccc = responseValues[0];

    function creatTable() {
        // Assume that the API data is stored in an object called "data"
        console.log(clickedValueForTable)
        // Create an HTML table element
        table = document.createElement("table");
        // table.classList.add('create-table');
        table.setAttribute('id', 'tableid')



        for (let i = 0; i < responseValues.length; i++) {
            //     console.log(responseValues[i])

            let row = table.insertRow();
            let cell = row.insertCell();

            if (i === 0) {
                if (clickedValueForTable === 'INTRADAY') {
                    cell.innerHTML = responseKeys[i].split(" ")[0];
                }

                for (let keys in ccc) {
                    let cell = row.insertCell();
                    let spread = keys.split(' ');
                    cell.innerHTML = spread[1];
                    console.log(spread[1])

                }
                //Data for open, high, low , close, Volume

            }

            else {
                if (clickedValueForTable === 'INTRADAY') {
                    cell.innerHTML = responseKeys[i - 1].split(" ")[1]; // Data for time
                }
                for (let key in responseValues[i - 1]) {
                    let cell = row.insertCell();

                    cell.innerHTML = responseValues[i - 1][key];
                    cell.style.padding = "2px";

                }
                //Values of Data of open, high, low , close, Volume
            }

        }

        // Append the table to an existing element on the page (e.g., a div)
        document.getElementById(id).appendChild(table);
        //   table.classList.toggle("create-table");
        // console.log(div)
        // div.appendChild(table);

        // console.log(counter)

    }

    creatTable();

}
//document.getElementById('watchlist-select1').addEventListener('click', creatTable)

//getTableData()
