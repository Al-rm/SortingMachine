//RESULTS RELATED
const container = document.querySelector('#board');
var allResults = [];
clearResults();

//INPUTS && cap max user input
//max sorting number 
const maxInput = document.querySelector('#max-input');
maxInput.addEventListener('change', setValues);
maxInput.max = 100;
maxInput.min = 1;
var numbers = maxInput.value = 60;
//number of results per sorting
const resultCountInput = document.querySelector('#result-input');
resultCountInput.addEventListener('change', setValues);
resultCountInput.max = 15;
resultCountInput.min = 1;
var resultCount = resultCountInput.value = 6;
//times sorting results
const timesSortingInput = document.querySelector('#times-input');
timesSortingInput.addEventListener('change', setValues);
timesSortingInput.max = 10000;
timesSortingInput.min = 1;
var timesSorting = timesSortingInput.value = 1;
//toggle set dice mode
var diceModeBox = document.querySelector('#dice-mode');
var isDiceMode = diceModeBox.checked = false;
diceModeBox.addEventListener('change', () => {
    isDiceMode = diceModeBox.checked;
});
//toggle show sum of results
var showSumBox = document.querySelector('#show-sum');
var isShowSum = showSumBox.checked = false;
showSumBox.addEventListener('change', () => {
    isShowSum = showSumBox.checked;
});

//update input values
function setValues() {
    if (resultCountInput.value > parseInt(resultCountInput.max)) {
        resultCountInput.value = parseInt(resultCountInput.max);
    } else if (resultCountInput.value < parseInt(resultCountInput.min) || resultCountInput.value == '') {
        resultCountInput.value = parseInt(resultCountInput.min);
    };
    resultCount = resultCountInput.value;

    if ((maxInput.value > parseInt(maxInput.max))) {
        maxInput.value = parseInt(maxInput.max);
    }; 
    if ((maxInput.value < parseInt(resultCountInput.value) || maxInput.value == '') && !isDiceMode ) {
        maxInput.value = parseInt(resultCountInput.value);
    } else if (maxInput.value < parseInt(maxInput.min)) {
        maxInput.value = parseInt(maxInput.min);
    };
    numbers = maxInput.value;

    if (timesSortingInput.value > parseInt(timesSortingInput.max)) {
        timesSortingInput.value = parseInt(timesSortingInput.max);
    } else if (timesSortingInput.value < parseInt(timesSortingInput.min) || timesSortingInput.value == '') {
        timesSortingInput.value = parseInt(timesSortingInput.min);
    };
    timesSorting = timesSortingInput.value;
}
//methods
//get random integer in max input value range
function getRandomInt(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};
//create array for each number to be sort
function createNumbersArray(max) {
    var numbersArray = [];
    for (let i = 1; i <= max; i++) {
        numbersArray.push(i);
    };
    return numbersArray;
};
//get random numbers for each results count between 1 - max value
function getResults() {
    let numbersArray = createNumbersArray(numbers);
    let balls = [];
    for (let n = resultCount; n > 0; n--) {
        let random = getRandomInt(0, numbersArray.length);
        balls.push(numbersArray[random]);
        if (!isDiceMode) {
            numbersArray.splice(random, 1);
        }
    };
    return balls;
};
//create html elements (p) for each result
function createResultEl(result) {
    let resultEl = document.createElement('p');
    resultEl.classList.add('result-p');
    if (result == numbers && isDiceMode) {
        resultEl.classList.add('max');
    }
    if (result < 10) {
        resultEl.innerHTML = `${'0'+result}`;    
    } else {
        resultEl.innerHTML = `${result}`;
    }
    if (result == 100) {
        resultEl.innerHTML = '00';
    }
    return resultEl;
}
//show n times sorting results numbers
function showResults() {
    setValues();
    for (let t = 0; t < timesSorting; t++) {
        let divResults = document.createElement('div');
        divResults.id = 'results';
        var results = getResults();
        allResults.push(results);
        let indexResultEl = document.createElement('p');
        indexResultEl.id = 'result-index'
        indexResultEl.innerHTML = `${allResults.indexOf(results)+1 + ": "}`;
        divResults.append(indexResultEl);
        let sumOfResults = 0;
        for (r = 0; r < results.length; r++) {
            var result = createResultEl(results[r]);
            divResults.append(result);
            if (isShowSum) {
                sumOfResults += parseInt(result.innerHTML);
            }
        }

        if (isShowSum) {
            let sumResultsEl = document.createElement('p');
            sumResultsEl.innerHTML = " | " + sumOfResults;
            divResults.append(sumResultsEl)
        }
        container.append(divResults);
    }
};

function clearResults() {
    container.innerHTML = '';
    allResults = [];
}


// const canvasEl = document.querySelector('#canvas')
