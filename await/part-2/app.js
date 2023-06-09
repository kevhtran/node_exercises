let baseURL = "https://deckofcardsapi.com/api/deck/"

async function randomCard() {
    let draw = await axios.get(`${baseURL}/new/draw/?count=1`)
    console.log(`value: ${draw.data.cards[0].value}, suit: ${draw.data.cards[0].suit}`)
}

async function random2Card() {
    let draw = await axios.get(`${baseURL}/new/draw/?count=1`);
    let deck_id = draw.data.deck_id;
    console.log(draw)
    console.log(`first draw. value: ${draw.data.cards[0].value}, suit: ${draw.data.cards[0].suit}, cards remaining: ${draw.data.remaining}`);

    let secDraw = await axios.get(`${baseURL}/${deck_id}/draw/?count=1`);
    console.log(`second draw. value: ${secDraw.data.cards[0].value}, suit: ${secDraw.data.cards[0].suit}, cards remaining: ${secDraw.data.remaining}`);
}

let deckId = null;
let $btn = $('button');
let $cardArea = $('#card-area');

async function deckPull() {
    let initial = await axios.get(`${baseURL}/new/shuffle/`)
    deckId = initial.data.deck_id;
    let deckData = await $.getJSON(`${baseURL}/${deckId}/draw/`)
    $btn.show().on('click', async function () {
        let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
        let cardSrc = cardData.cards[0].image;
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
        if (cardData.remaining === 0) $btn.remove();
    });
}
deckPull();