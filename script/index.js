const proxyUrl = 'https://corsproxy.io/?';
let randomQuotes = [];
const colors = ['purple', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black', 'white'];

const generateRandomNumber = (maxValue) => {
    return Math.floor(Math.random() * maxValue);
};

const generateRandomColor = () => colors[generateRandomNumber(colors.length)];

const fetchRandomQuotes = () => {
    const targetUrl = 'https://zenquotes.io/api/quotes';

    $.ajax({
        type: 'GET',
        url: proxyUrl + targetUrl,
        dataType: 'json',
        success: function (data) {
            randomQuotes = data;
        },
        error: function (textStatus, errorThrown) {
            console.error('Error: ', textStatus, errorThrown);
            alert('Failed to fetch quotes. Please reload the app.');
        }
    });
};

const generateRandomQuote = () => {
    if (randomQuotes.length) {
        const randomIndex = generateRandomNumber(randomQuotes.length);
        return randomQuotes[randomIndex].q;
    }
};

const generateRandomImage = () => {
    const targetUrl = 'https://api.api-ninjas.com/v1/randomimage';

    $.ajax({
        type: 'GET',
        url: proxyUrl + targetUrl,
        dataType: 'text',
        success: function (data) {
            $randomImageValue.attr('src', 'data:image/jpeg;base64,' + data).slideDown('slow');
        },
        error: function (textStatus, errorThrown) {
            console.error('Error: ', textStatus, errorThrown);
            alert('Failed to fetch an image. Please try again later.');
        }
    });
};

const generateRandomJoke = () => {
    const targetUrl = 'https://api.api-ninjas.com/v1/jokes';

    $.ajax({
        type: 'GET',
        url: proxyUrl + targetUrl,
        dataType: 'json',
        success: function (data) {
            $randomJokeValue.text(data[0].joke).slideDown('slow');
        },
        error: function (textStatus, errorThrown) {
            console.error('Error: ', textStatus, errorThrown);
            alert(`Failed to fetch a joke (that's not a joke!). Please try again later.`);
        }
    });
};

const generateRandomFact = () => {
    const targetUrl = 'https://api.api-ninjas.com/v1/facts';

    $.ajax({
        type: 'GET',
        url: proxyUrl + targetUrl,
        dataType: 'json',
        success: function (data) {
            $randomFactValue.text(data[0].fact).slideDown('slow');
        },
        error: function (textStatus, errorThrown) {
            console.error('Error: ', textStatus, errorThrown);
            alert(`Failed to fetch a fact (that's a fact!). Please try again later.`);
        }
    });
};

const checkElementsStyle = (element, style) => {
    return $(element).css(style);
};

const toggleTheme = () => {
    const currentTheme = checkElementsStyle('body', 'color');
    if (currentTheme === 'rgb(0, 0, 0)') {
        $body.css('color', 'white');
    } else {
        $body.css('color', 'rgb(0, 0, 0)');
    }
};

$(document).ready(function () {
    console.log('DOM is ready');
    fetchRandomQuotes();

    $body = $('#body');
    $randomColorButton = $('#random-color-button');
    $randomNumberButton = $('#random-number-button');
    $randomQuoteButton = $('#random-quote-button');
    $randomImageButton = $('#random-image-button');
    $randomJokeButton = $('#random-joke-button');
    $randomFactButton = $('#random-fact-button');
    $switchThemeButton = $('#switch-theme-button');
    $fadeoutButton = $('#fadeout-button');
    $hiddenText = $('#hidden-text');

    $randomNumberValue = $('#random-number-value');
    $randomQuoteValue = $('#random-quote-value');
    $randomImageValue = $('#random-image-value');
    $randomJokeValue = $('#random-joke-value');
    $randomFactValue = $('#random-fact-value');

    $randomColorButton.on('click', function () {
        $body.css('background-color', generateRandomColor());
    });

    $randomNumberButton.click(function () {
        const currentValue = $randomNumberValue.text();
        const newValue = generateRandomNumber(10);
        if (newValue !== currentValue) {
            $randomNumberValue.text(newValue);
        } else {
            $randomNumberValue.text(generateRandomNumber(10));
        }
    });

    $randomQuoteButton.click(function () {
        $randomQuoteValue.text(generateRandomQuote()).slideDown('slow').animate({ opacity: 0.5 }, 500);
    });

    $randomImageButton.click(function () {
        generateRandomImage();
    });

    $randomJokeButton.click(function () {
        generateRandomJoke();
    });

    $randomFactButton.click(function () {
        generateRandomFact();
    });

    $switchThemeButton.click(function () {
        toggleTheme();
    });

    $fadeoutButton.click(function () {
        $(this).fadeOut();
    });

    $hiddenText
        .mouseenter(function () {
            $(this).css('color', 'red');
        })
        .mouseleave(function () {
            $(this).hide();
        });
});
