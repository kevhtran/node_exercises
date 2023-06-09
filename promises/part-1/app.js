let favoriteNum = 11;
let url = "http://numbersapi.com";

$.getJSON(`${url}/${favoriteNum}?json`).then(data => { console.log(data) });

let favoriteNums = [11, 7, 26, 9]
$.getJSON(`${url}/${favoriteNums}?json`).then(data => { console.log(data) });

let repeatFav = [11, 11, 11, 11];
Promise.all(Array.from({ length: 4 }, () => { return $.getJSON(`${url}/${repeatFav}?json`) })
    .then(facts => {
        facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
    }));
