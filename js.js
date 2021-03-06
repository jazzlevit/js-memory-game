document.addEventListener('DOMContentLoaded', () => {

    const defaultCardPath = 'images/dot.png';

    const grid = document.getElementById('grid');
    const resultDisplay = document.getElementById('result');

    let cardsChosen = [];
    let cardChosenIds = [];
    let cardsWon = 0;
    let attempts = 0;

    const cardArray = [
        {
            name: 'kangaroo',
            image: 'kangaroo.png',
        },
        {
            name: 'bird',
            image: 'bird.png'
        },
        {
            name: 'rabbit',
            image: 'rabbit.png',
        },
        {
            name: 'elephant',
            image: 'elephant.png',
        },
        {
            name: 'duck',
            image: 'duck.png',
        },
        {
            name: 'starfish',
            image: 'starfish.png',
        }
    ];

    const initialQuantity = cardArray.length;

    // duplicate values in array
    for (i = 0; i < initialQuantity; i++) {
        cardArray.push(cardArray[i]);
    }

    function createBoard() {
        cardsChosen = [];
        cardChosenIds = [];
        cardsWon = 0;
        attempts = 0;

        clearGrid();

        // randomize cards
        cardArray.sort(() => 0.5 - Math.random());

        displayResults();

        for (i = 0; i < cardArray.length; i++) {
            let card = document.createElement('img');
            card.setAttribute('src', defaultCardPath);
            card.setAttribute('class', 'col border');
            card.setAttribute('data-id', i);

            card.addEventListener('click', flipCard);

            grid.appendChild(card);
        }

    }

    // check for matches
    function checkMatches() {
        let cards = document.getElementsByTagName('img');

        const chosenOneId = cardChosenIds[0];
        const chosenTwoId = cardChosenIds[1];

        // count all attempts
        attempts++;

        if (cardsChosen[0].name === cardsChosen[1].name && chosenOneId !== chosenTwoId) {
            // alert('Молодец');
            cards[chosenOneId].setAttribute('style', 'visibility:hidden');
            cards[chosenTwoId].setAttribute('style', 'visibility:hidden');

            cardsWon++;
        } else {
            // alert('Подумай еще раз');
            cards[chosenOneId].setAttribute('src', defaultCardPath);
            cards[chosenTwoId].setAttribute('src', defaultCardPath);
        }

        cardsChosen = [];
        cardChosenIds = [];

        displayResults();
    }

    function displayResults() {
        //display result
        let needsToWon = cardArray.length / 2;

        resultDisplay.innerText = cardsWon + ' / ' + needsToWon;

        if (cardArray.length / 2 === cardsWon) {
            finished();
        }
    }

    // flip your card
    function flipCard() {

        // Do not execute again if you already has two open card
        if (cardsChosen.length < 2) {

            const cardId = this.getAttribute('data-id');

            // stop when you flip the same card twice
            if (cardChosenIds.includes(cardId)) {
                return;
            }

            // push to chosen
            cardsChosen.push(cardArray[cardId]);
            cardChosenIds.push(cardId);

            // update image
            this.setAttribute('src', `images/${cardArray[cardId]['image']}`);

            if (cardsChosen.length === 2) {
                setTimeout(() => checkMatches(), 500);
            }
        }
    }


    function finished() {

        const tagButton = document.createElement('btn');
        const tagP = document.createElement('p');

        tagButton.innerText = 'Начать заново';
        tagButton.setAttribute('class', 'btn btn-lg btn-success');
        tagButton.addEventListener('click', createBoard);

        tagP.innerText =`Победа! ${attempts} попыток`;

        // creal previous data
        clearGrid();
        resultDisplay.innerText = '';

        resultDisplay.appendChild(tagP);
        resultDisplay.appendChild(tagButton);
    }

    function clearGrid() {
        // Removed grid child from last t ofirst
        while (grid.firstChild) {
            grid.removeChild(grid.lastChild);
        }
    }


    // Runs first time when page is loaded
    createBoard();
});