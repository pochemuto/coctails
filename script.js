const names = [
    'Авиация',
    'Американо',
    'Апероль спритц',
    'Б-52',
    'Бакарди коктейль',
    'Белая леди',
    'Беллини',
    'Белый русский',
    'Бренди Александр',
    'Виски сауэр',
    'Дайкири',
    'Джин физ',
    'Джон коллинз',
    'Ирландский кофе',
    'Камикадзе',
    'Кир',
    'Клевер клуб',
    'Космополитан',
    'Кровавая мэри',
    'Кузнечик',
    'Лонг Айленд айс ти',
    'Май-тай',
    'Манхэттен',
    'Маргарита',
    'Между простынями',
    'Мотоциклетная коляска',
    'Мохито',
    'Негрони',
    'Олд фешен',
    'Пина колада',
    'Роб рой',
    'Свободная Куба',
    'Секс на пляже',
    'Сухой мартини',
    'Текила санрайз',
    'Французская связь',
    'Французский 75',
    'Френч мартини',
    'Черный русский',
    'Эспрессо мартини',
];

const tags = 'yeah,congratulations,you are the best'.split(',');

var values = [...names];

async function getRandomGif() {
    let tag = tags[Math.floor(Math.random() * tags.length)];
    let response = await fetch('https://api.giphy.com/v1/gifs/random?api_key=XbpPSafZMPZrqfXaJm7iAZ10o72z0QVQ&tag=' + tag);
    let data = await response.json();
    return data.data.image_url;
}

async function next() {
    if (values === null) {
        return;
    }
    let element = document.querySelector('#coctail')
    let gif = document.querySelector('#gif')
    if (!values.length) {
        let gifUrl = await getRandomGif();
        gif.src = gifUrl
        gif.style.display = 'initial';
        element.innerText = '';
        values = null;
    } else {
        nextValue = values.pop();
        element.innerText = nextValue;
        gif.style.display = 'none';
    }
}

function preset(event) {
    event.preventDefault();
    let maxValue = parseInt(event.srcElement.innerText);
    start(0, maxValue);
}

function go() {
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
    start(min, max);
}

function start(from, end) {
    values = names.slice(from, end);
    values.sort(() => 0.5 - Math.random());

    console.log('Selected: ' + values)

    next();
}

function main() {
    document.querySelector('#coctail-wrapper').addEventListener('click', next);
    document.querySelector('#go').addEventListener('click', go);

    document.querySelectorAll('.presets a').forEach(element =>
        element.addEventListener('click', preset)
    );
}

window.onload = main
