let cardURL = "https://deckofcardsapi.com/api/deck/new/draw/?count=1"


$.getJSON(cardURL).then(data => { console.log(data.cards[0].suit, data.cards[0].value, data.cards[0].image) })

$.getJSON(cardURL).then(data => { console.log(data.cards[0].suit, data.cards[0].value, data.cards[0].image) })


$.getJSON(cardURL)
    .then(data => {
        let deckID = data.deck_id;
        console.log("first draw", data.deck_id, data.cards[0].suit, data.cards[0].value, data.cards[0].image, data.remaining);
        return $.getJSON(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    })
    .then(data => {
        console.log("second draw", data.cards[0].suit, data.cards[0].value, data.cards[0].image, data.remaining)
    })

let baseURL = "https://deckofcardsapi.com/api/deck";
let deckId = null;
let $btn = $('button');
let $cardArea = $('#card-area');



$.getJSON(`${baseURL}/new/shuffle/`).then(data => {
    deckId = data.deck_id;
    $btn.show();
});

$btn.on('click', function () {
    $.getJSON(`${baseURL}/${deckId}/draw/`).then(data => {
        let cardSrc = data.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $cardArea.append(
            $('<img>', {
                src: cardSrc,
                css: {
                    transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }
            })
        );
        if (data.remaining === 0) $btn.remove();
    });
});