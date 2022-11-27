const main = document.getElementById('main');
const AddUserBtn = document.getElementById('add-user');
const DoubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calcWealthBtn = document.getElementById('calculate-wealth');


let data = [];

getRandomUser()
getRandomUser()
getRandomUser()

// get random user data
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    
    const user = data.results[0]
    
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
        
    }
    
    addData(newUser)
}


function addData(obj) {
    data.push(obj)
    
    updateDOM();
}

function updateDOM(providedDate = data) {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    
    // array forEach method
    providedDate.forEach((user) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${user.name}</strong>${formatMoney(user.money)}`;
        main.appendChild(element);
    });
}

//  Double money
function doubleMoney() {

    // array map method
    data = data.map( user => {
        return {...user, money:user.money * 2}
    })

    updateDOM()
}

// Show only millionaires
function showMillionaires() {
    // array filter method
    data = data.filter(user => user.money >= 1000000)
    if(data.length == 0) {
        const msg = document.createElement("h4");
        msg.innerHTML = "No Millionaires :(";
        main.appendChild(msg)
    } else {
        updateDOM()
    }
}

// sort by richest
function sortByRichest() {
    // sort method
    // sort takes two arg to perform sort, b-a is  asc a-b is desc sort
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}

// calculate wealth
function calculateWealth() {
    const wealth = data.reduce((acc, currentValue) => acc += currentValue.money,0 );
    const element = document.createElement('div')
    element.innerHTML = `<h3><strong>Wealth</strong>${formatMoney(wealth)}</h3>`
    main.appendChild(element)
}

// format number as money
function formatMoney(number){
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&,');
}

// Event Listeners
AddUserBtn.addEventListener('click', getRandomUser);
DoubleBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortByRichest);
calcWealthBtn.addEventListener('click', calculateWealth);