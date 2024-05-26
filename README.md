<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Griffon Clicker</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Gemunu+Libre:wght@500&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Geo&display=swap" rel="stylesheet">

</head>
<body>
    <div class="container">
        <div class="score">
            <img src="static/coin.png" alt="Coin" class="icon coin-icon">
            <span class="score-text">1000</span>
        </div>
        <div class="level">
            <img src="static/trophy.png" alt="Trophy" class="icon trophy-icon">
            <span class="level-text">Bronze ></span>
        </div>
        <div class="clickable-coin">
            <img src="static/big-coin.png" alt="Big Coin">
        </div>
        <div class="energy">
            <img src="static/lightning.png" alt="Energy" class="icon energy-icon">
            <span class="energy-text">1000 / 1000</span>
        </div>
        <div class="energy-bar">
            <div class="energy-fill" style="width: 100%;"></div>
        </div>
        <div class="buttons">
            <div class="button">
                <img src="static/boost.png" alt="Boost">
                <span>Boost</span>
            </div>
            <div class="button active">
                <img src="static/tap.png" alt="Tap">
                <span>Tap</span>
            </div>
            <div class="button">
                <img src="static/friends.png" alt="Friends">
                <span>Friends</span>
            </div>
        </div>
    </div>
     <!-- JavaScript скрипт -->
     <script src="script.js"></script>
</body>
</html>
