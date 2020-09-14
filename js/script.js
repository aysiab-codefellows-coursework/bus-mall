
// object constructor for items
var Item = function(name, img) {
    this.name = name;
    this.img = img;
    this.displayed = 0;
    this.votes = 0;
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
var sweep = new Item('Sweep','images/sweep.jpg');
var tauntaun = new Item('TaunTaun','images/tauntaun.jpg');
var unicorn = new Item('Unicorn','images/unicorn.jpg');
var usb = new Item('USB','images/usb.gif');
var waterCan = new Item('Watering-Can', 'images/water-can.jpg')
var wineGlass = new Item('Wine-Glass','images/wine-glass.jpg');

// stores all item objects in an array 
var catalogue = [bag,banana,bathroom,boots,breakfast,
    bubblegum,chair,cthulhu,dogDuck,dragon,pen,
    petSweep,scissors,shark,sweep,tauntaun,unicorn,usb,waterCan,wineGlass];


// initializing local storage for catalogue items    
var logCatalogue = function(catalogue) {
    for(var i = 0; i < catalogue.length; i++) {
        localStorage.setItem(catalogue[i].name, JSON.stringify(catalogue[i]));
    }
}

// generates 3 (max) random items from catalogue    
var generateItems = function(catalogue, max) {
    var ret = [];
    var count = 0;
    var num = -1;
    do {
        var next = Math.floor(Math.random() * catalogue.length);
        if (num != next) {
            ret[count] = catalogue[next];
            count++;
            num = next;
        }
    } while (count < max);
    return ret;
}

// gets the item image from the object and prints to the page
var printImage = function(randItems) {
    var position = document.getElementById('images')
    for(var i = 0; i < randItems.length; i++) {
        var image = document.createElement('img');
        image.setAttribute('height','200px')
        image.setAttribute('src',randItems[i].img);
        position.appendChild(image);
    }
}

// adds the results for the images listed 
var printResults = function(randItems) {
    var position = document.getElementById('results');
    for(var i = 0; i < randItems.length; i++) {
        var list = document.createElement('li');
        list.textContent = randItems[i].name;
        position.appendChild(list);
    }
}

// takes random items and counts their display 
var displayCount = function(randItems) {
    var local;
    for(var i = 0; i < randItems.length; i++) {
        // get index i from local storage
        local = JSON.parse(localStorage.getItem(randItems[i].name));
        localStorage.removeItem(randItems.name[i]);
        local.displayed += 1;
        localStorage.setItem(local.name, JSON.stringify(local));
    }
}


// testing testing 

logCatalogue(catalogue);

var test = generateItems(catalogue,3);

var img1 = document.querySelector('img:first-child');
var img2 = document.querySelector('img:nth-child(2)');
var img3 = document.querySelector('img:last-child');

printImage(test);
printResults(test);
