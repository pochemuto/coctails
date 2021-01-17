const names = [
    ['Авиация', '01'],
    ['Американо', '02'],
    ['Апероль спритц', '03'],
    ['Б-52', '04'],
    ['Бакарди коктейль', '05'],
    ['Белая леди', '06'],
    ['Беллини', '07'],
    ['Белый русский', '08'],
    ['Бренди Александр', '09'],
    ['Виски сауэр', 10],
    ['Дайкири', 11],
    ['Джин физ', 12],
    ['Джон коллинз', 13],
    ['Ирландский кофе', 14],
    ['Камикадзе', 15],
    ['Кир', 16],
    ['Клевер клуб', 17],
    ['Космополитан', 18],
    ['Кровавая мэри', 19],
    ['Кузнечик', 20],
    ['Лонг Айленд айс ти', 21],
    ['Май-тай', 22],
    ['Манхэттен', 23],
    ['Маргарита', 24],
    ['Между простынями', 25],
    ['Мотоциклетная коляска', 26],
    ['Мохито', 27],
    ['Негрони', 28],
    ['Олд фешен', 29],
    ['Пина колада', 30],
    ['Роб рой', 31],
    ['Свободная Куба', 32],
    ['Секс на пляже', 33],
    ['Сухой мартини', 34],
    ['Текила санрайз', 35],
    ['Французская связь', 36],
    ['Французский 75', 37],
    ['Френч мартини', 38],
    ['Черный русский', 39],
    ['Эспрессо мартини', 40],
];

const tags = 'yeah,congratulations,you are the best'.split(',');

var values = [...names];
var trainerMode = false;
var gif = null;

async function getRandomGif() {
    let tag = tags[Math.floor(Math.random() * tags.length)];
    let response = await fetch('https://api.giphy.com/v1/gifs/random?api_key=XbpPSafZMPZrqfXaJm7iAZ10o72z0QVQ&tag=' + tag);
    let data = await response.json();
    return data.data.image_url;
}

function preloadImage(url) {
    let img = new Image();
    img.src = url;
}

function show(text, image) {
    let imageElement = document.querySelector('#img')
    let textElement = document.querySelector('#coctail')
    console.log('Show text:', text, '; image: ', image);
    if (text) {
        imageElement.style.display = 'none';
        textElement.innerText = text;
    } else {
        imageElement.style.display = 'initial';
        imageElement.src = image;
        textElement.innerText = '';
    }
}

async function next() {
    if (values === null) {
        return;
    }
    let element = document.querySelector('#coctail')
    let img = document.querySelector('#img')
    if (!values.length) {
        let gifUrl = await getRandomGif();
        show(null, gif);
        values = null;
    } else {
        nextValue = values.pop();

        if (trainerMode) {
            show(null, imageUrl(nextValue[1]))
        } else {
            show(nextValue[0], null);
        }
    }
}

function imageUrl(name) {
    return 'images/' + name + '.png';
}

function preset(event) {
    event.preventDefault();
    let trainerMode = event.srcElement.dataset.train;
    let maxValue = parseInt(event.srcElement.innerText);
    start(0, maxValue, trainerMode);
}

function go(trainerMode) {
    const pattern = document.querySelector('#max').value;
    var min = 0;
    var max = 0;
    if (pattern.includes('-')) {
        let parts = pattern.split('-');
        min = parseInt(parts[0].trim());
        max = parseInt(parts[1].trim());
        console.log('select', min, max);
    } else {
        max = parseInt(pattern);
    }
    if (max <= 0) {
        return;
    }
    start(min, max, trainerMode);
}

async function start(from, end, trainerMode) {
    values = names.slice(from, end);
    values.sort(() => 0.5 - Math.random());

    window.trainerMode = trainerMode;

    console.log('Selected: ' + values)
    let gifUrl = await getRandomGif();
    preloadImage(gifUrl);
    gif = gifUrl

    next();
}

function main() {
    document.querySelector('#coctail-wrapper').addEventListener('click', next);
    document.querySelector('#go').addEventListener('click', () => go(false));
    document.querySelector('#train').addEventListener('click', () => go(true));

    document.querySelectorAll('.presets a').forEach(element =>
        element.addEventListener('click', preset)
    );

    document.querySelectorAll('.train-presets a').forEach(element =>
        element.addEventListener('click', preset)
    );

    values.forEach(value => preloadImage(imageUrl(value[1])));
}

window.onload = main
