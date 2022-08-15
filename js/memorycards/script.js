const cards = document.querySelectorAll(".card"),
timeTag = document.querySelector(".time b"),
flipsTag = document.querySelector(".flips b"),
refreshBtn = document.querySelector(".details button");

let maxTime = 2;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;
let samplequestions = {
 "subject": "physics",
 "lesson": "l01",
 "grade": "c8",
 "quests": [
  {
  "id": 1,
  "answer": "J"
  },
  {
  "id": 2,
  "answer": "Jhn"
  },
  {
  "id": 3,
  "answer": "L"
  },
  {
  "id": 4,
  "answer": "Lrd"
  },
  {
  "id": 5,
  "answer": "S"
  },
  {
  "id": 6,
  "answer": "swt"
  },
  {
  "id": 1,
  "answer": "e"
  },
  {
  "id": 2,
  "answer": "sel"
  },
  {
  "id": 3,
  "answer": "r"
  },
  {
  "id": 4,
  "answer": "rej"
  },
  {
  "id": 5,
  "answer": "o"
  },
  {
  "id": 6,
  "answer": "jos"
  }
]
};
//questions = samplequestions.quests;

console.log(questions);

function initTimer() {
    if(timeLeft <= 0) {
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard({target: clickedCard}) {
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if(clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }

        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matchedCard++;
        if(matchedCard == 6 && timeLeft > 0) {
            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard(questions) {
    timeLeft = maxTime;
    flips = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

	console.log(questions);
    //let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    //arr.sort(() => Math.random() > 0.5 ? 1 : -1);

	if (questions && Object.keys(questions).length === 0 && questions.constructor === Object) {
		
	} else {
	  questions.sort(() => Math.random() > 0.5 ? 1 : -1);
	}

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
		let iTag = card.querySelector(".back-view i");
        setTimeout(() => {
				if (questions && Object.keys(questions).length === 0 && questions.constructor === Object) {
		
				} else {
				  imgTag.src = `images/memorycards/img-${questions[index].id}.png`;
				  iTag.setAttribute('data-txt', questions[index].answer);
				}
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

shuffleCard(questions);

const form = document.getElementById('jsonform');

form.addEventListener('submit', callbackFunction);
function callbackFunction(event) {
    event.preventDefault();
    const myFormData = new FormData(event.target);

    const formDataObj = Object.fromEntries(myFormData.entries());
	let selectedquestions = JSON.parse(formDataObj.jsondata);
    console.log(selectedquestions.subject);
	shuffleCard(selectedquestions.quests);
}

//refreshBtn.addEventListener("click", formatjson);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

function formatjson(questions) {
document.getElementById("jsondata").value=JSON.stringify(questions);
questions = questions.quests;
let anLabelsArr = [];
questions.forEach(element => (element.fullform !== undefined) ? anLabelsArr.push(element.answer + " = " + element.fullform) : '');
document.getElementById('ansoptions').appendChild(makeOL(anLabelsArr));
console.log(anLabelsArr);
shuffleCard(questions);
}
