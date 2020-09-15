'use strict';

// global variables
const max = 3;
var catalogue = [];
var currView = [];
var currRound = 0;
const maxRounds = 25;


// object constructor for items
var Item = function(name, img) {
    this.name = name;
    this.img = img;
    this.displayed = 0;
    this.votes = 0;
    this.total = name + ' had ' +  this.votes + ' votes and was shown ' + this.displayed + ' times';
}

// create new object instances for every catalogue item 
var bag = new Item('Bag', 'images/bag.jpg');
var banana = new Item('Banana','images/banana.jpg');
var bathroom = new Item('Bathroom','images/bathroom.jpg');
var boots = new Item('Boots','images/boots.jpg');
var breakfast = new Item('Breakfast','images/breakfast.jpg');
var bubblegum = new Item('Bubblegum','images/bubblegum.jpg');
var chair = new Item('Chair','images/chair.jpg');
var cthulhu = new Item('Cthulhu','images/cthulhu.jpg');
var dogDuck = new Item('DogDuck','images/dog-duck.jpg');
var dragon = new Item('Dragon','images/dragon.jpg');
var pen = new Item('Pen','images/pen.jpg');
var petSweep = new Item('PetSweep','images/pet-sweep.jpg');
var scissors = new Item('Scissors','images/scissors.jpg')
var shark = new Item('Shark','images/shark.jpg');
var sweep = new Item('Sweep','images/sweep.png');
var tauntaun = new Item('TaunTaun','images/tauntaun.jpg');
var unicorn = new Item('Unicorn','images/unicorn.jpg');
var usb = new Item('USB','images/usb.gif');
var waterCan = new Item('Watering-Can', 'images/water-can.jpg')
var wineGlass = new Item('Wine-Glass','images/wine-glass.jpg');

// stores all item objects in an array 
catalogue = [bag,banana,bathroom,boots,breakfast,
    bubblegum,chair,cthulhu,dogDuck,dragon,pen,
    petSweep,scissors,shark,sweep,tauntaun,unicorn,usb,waterCan,wineGlass];


// initializing local storage for catalogue items    
var logCatalogue = function(catalogue) {
    for(var i = 0; i < catalogue.length; i++) {
        localStorage.setItem(catalogue[i].name, JSON.stringify(catalogue[i]));
    }
}

// generates max number of random items from catalogue    
var generateItems = function(catalogue) {
    var ret = [];
    var count = 0;
    var last = -1;
    var current = -1;
    do {
        var next = Math.floor(Math.random() * catalogue.length);
        if (current != next && last != next && notFromLastRound(catalogue[next])) {
            ret[count] = catalogue[next];
            count++;
            last = current;
            current = next;
        }
    } while (count < max);
    return ret;
}

// checks to see if the image in question was from the last round
var notFromLastRound = function(item) {
    var bool = true;
    if(currView.length > 0) {
        for(var i = 0; i < currView.length; i++) {
            if(item != currView[i]) {
                bool = true;
                console.log(bool);
            } else {
                bool = false;
                break;
            }
        } 
    }
    return bool;
}

// gets the item image from the object and prints to the page
var printImage = function(randItems) {
    var position = document.getElementById('images');
    for(var i = 0; i < randItems.length; i++) {
        var image = document.createElement('img');
        image.setAttribute('id',randItems[i].name)
        image.setAttribute('height','200px')
        image.setAttribute('src',randItems[i].img);
        position.appendChild(image);
    }
    displayCount(randItems);
}

// adds the results for the images listed 
var printResults = function(catalogue) {
    var position = document.getElementById('results');
    for(var i = 0; i < catalogue.length; i++) {
        var list = document.createElement('li');
        var getVotes = JSON.parse(localStorage.getItem(catalogue[i].name));
        list.textContent = catalogue[i].name + ": " + getVotes.votes;
        position.appendChild(list);
    }
}

// takes random items and counts their display 
var displayCount = function(randItems) {
    var local;
    for(var i = 0; i < randItems.length; i++) {
        local = JSON.parse(localStorage.getItem(randItems[i].name));
        localStorage.removeItem(randItems[i].name);
        local.displayed += 1;
        localStorage.setItem(local.name, JSON.stringify(local));
    }
}


// accounts for item image voted for
var refresh = function(item) {
    addVote(item);
    refreshImages();
    var nextView = generateItems(catalogue,max);
    currView = nextView;
    printImage(currView);
    refreshResults();
    printResults(catalogue);
}


// responsible for keeping track of votes
var addVote = function(item) {
    var votedFor = JSON.parse(localStorage.getItem(item));
    localStorage.removeItem(item);
    votedFor.votes += 1;
    localStorage.setItem(item,JSON.stringify(votedFor));
}

// removes old list to be refreshed
var refreshResults = function() {
    var ul = document.querySelector('ul');
    while(ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}

// removes old images to  be refreshed
var refreshImages = function() {
    var div = document.getElementById('images');
    while(div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

// var printResults

// main function 
var main = function() {
    logCatalogue(catalogue);
    currView = generateItems(catalogue, max);
    printImage(currView);
    printResults(catalogue);
}

main();


// event listener
var imageContainer = document.getElementById('images');
imageContainer.addEventListener('click', handler)

function handler(e) {
    if(currRound < maxRounds) {
        for(var i = 0; i < currView.length; i++) {
            if(e.target.id == currView[i].name) {
                currRound++;
                refresh(currView[i].name);
            }
        }
    } else {
        printChart();
        imageContainer.removeEventListener('click', handler);
    }
}



/* // prints results for entire catalogue after 25 rounds
var printTotals = function() {
    for(var i = 0; i < catalogue.length; i++) {
        catalogue[i]= JSON.parse(localStorage.getItem(catalogue[i].name));
        catalogue[i].total = catalogue[i].name + ' had ' +  catalogue[i].votes + ' votes and was shown ' + catalogue[i].displayed + ' times. ';
        var para = document.createElement('p');
        var position = document.getElementById('totals');
        para.textContent = catalogue[i].total;
        position.appendChild(para);
    }
}
 */



 // responsible for resetting catalogue to match local storage 
 // prints out chart accordingly 
 var printChart = function() {
     var itemNames = [];
     var itemVotes = [];
     var itemDisplayed = [];
     for(var i = 0; i < catalogue.length; i++) {
        catalogue[i]= JSON.parse(localStorage.getItem(catalogue[i].name));
        catalogue[i].total = catalogue[i].name + ' had ' +  catalogue[i].votes + ' votes and was shown ' + catalogue[i].displayed + ' times. ';
        itemNames[i] = catalogue[i].name;
        itemVotes[i] = catalogue[i].votes;
        itemDisplayed[i] = catalogue[i].displayed;
     }
     var chartContents = [itemNames,itemVotes,itemDisplayed];
     var chartColors = getColor();
    
     // chart.js prints chart based on catalogue 
    var ctx = document.getElementById('fullreport').getContext('2d');
    var mixedChart = new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Votes',
                data: chartContents[1],
                backgroundColor: chartColors
            }, {
                label: 'Displayed',
                data: chartContents[2],
                backgroundColor: chartColors
            }],
            labels: chartContents[0]
        },

        options: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Catalogue Items: Votes vs Displayed',
                position: 'top'
            }
        }
    });

 }

 // generates random colors for every item, to be used in chart 
 var getColor = function() {
     var colors =[];
     for(var i = 0; i < catalogue.length; i++) {
        colors[i] = '#' + Math.floor(Math.random()*16777215).toString(16);
     }
    return colors;
 }

