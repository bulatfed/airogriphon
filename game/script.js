document.addEventListener("DOMContentLoaded", () => {
    const gameField = document.getElementById("gameField");
    const mainSquare = document.getElementById("mainSquare");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const laser = document.getElementById("laser");
    const saw = document.getElementById("saw");
    const sawWarning = document.getElementById("sawWarning");

    let isMoving = false;
    let greenSquares = [];
    let score = 0;
    let timeLeft = 180;
    let gameInterval;
    let laserInterval;
    let sawInterval;
    let blackSquareInterval;
    let specialSquareInterval;

    function resetGame() {
        clearInterval(gameInterval);
        clearInterval(laserInterval);
        clearInterval(sawInterval);
        clearInterval(blackSquareInterval);
        clearInterval(specialSquareInterval);

        // Reset score and timer
        score = 0;
        timeLeft = 180;
        scoreDisplay.textContent = `Счет: ${score}`;
        timerDisplay.textContent = `Таймер: ${timeLeft}`;

        // Reset main square position
        mainSquare.style.left = '50%';
        mainSquare.style.top = '50%';

        // Remove all green, black, and special squares
        greenSquares.forEach(square => square.remove());
        document.querySelectorAll('.blackSquare').forEach(square => square.remove());
        document.querySelectorAll('.specialSquare').forEach(square => square.remove());
        greenSquares = [];

        // Hide laser, saw, and warnings
        laser.classList.add('hidden');
        saw.classList.add('hidden');
        sawWarning.classList.add('hidden');

        // Schedule laser, saw, black square, and special square activations
        scheduleLaser();
        scheduleSaw();
        scheduleBlackSquare();
        scheduleSpecialSquare();

        // Start the game timer
        startTimer();
    }

    function generateInitialGreenSquares() {
        for (let i = 0; i < 4; i++) {
            createGreenSquare();
        }
    }

    function createGreenSquare() {
        const greenSquare = document.createElement('div');
        greenSquare.classList.add('greenSquare');

        const randomX = Math.random() * (gameField.clientWidth - 30);
        const randomY = Math.random() * (gameField.clientHeight - 30);

        greenSquare.style.left = `${randomX}px`;
        greenSquare.style.top = `${randomY}px`;

        gameField.appendChild(greenSquare);
        greenSquares.push(greenSquare);

        setTimeout(() => {
            if (greenSquare.parentElement) {
                greenSquare.remove();
                greenSquares = greenSquares.filter(sq => sq !== greenSquare);
                if (greenSquares.length < 4) {
                    createGreenSquare();
                }
            }
        }, 5000);
    }

    function createBlackSquare() {
        const blackSquare = document.createElement('div');
        blackSquare.classList.add('blackSquare');

        const randomX = Math.random() * (gameField.clientWidth - 30);
        const randomY = Math.random() * (gameField.clientHeight - 30);

        blackSquare.style.left = `${randomX}px`;
        blackSquare.style.top = `${randomY}px`;

        gameField.appendChild(blackSquare);

        setTimeout(() => {
            if (blackSquare.parentElement) {
                blackSquare.remove();
            }
        }, 5000);
    }

    function createSpecialSquare() {
        const specialSquare = document.createElement('div');
        specialSquare.classList.add('specialSquare');

        const randomX = Math.random() * (gameField.clientWidth - 30);
        const randomY = Math.random() * (gameField.clientHeight - 30);

        specialSquare.style.left = `${randomX}px`;
        specialSquare.style.top = `${randomY}px`;

        gameField.appendChild(specialSquare);

        setTimeout(() => {
            if (specialSquare.parentElement) {
                specialSquare.remove();
            }
        }, 5000);
    }

    gameField.addEventListener("click", (event) => {
        const target = event.target;

        if (target.classList.contains('greenSquare') && !isMoving) {
            isMoving = true;

            const targetX = target.style.left;
            const targetY = target.style.top;

            mainSquare.style.left = targetX;
            mainSquare.style.top = targetY;

            setTimeout(() => {
                target.remove();
                greenSquares = greenSquares.filter(sq => sq !== target);

                score++;
                scoreDisplay.textContent = `Счет: ${score}`;

                if (greenSquares.length < 4) {
                    createGreenSquare();
                }

                isMoving = false;
            }, 600);
        }

        if (target.classList.contains('specialSquare') && !isMoving) {
            isMoving = true;

            const targetX = target.style.left;
            const targetY = target.style.top;

            mainSquare.style.left = targetX;
            mainSquare.style.top = targetY;

            setTimeout(() => {
                target.remove();

                score += 10;
                scoreDisplay.textContent = `Счет: ${score}`;

                isMoving = false;
            }, 10);
        }

        if (target.classList.contains('blackSquare')) {
            alert('Игра окончена! Ваш счет: ' + score);
            resetGame();
        }
    });

    setInterval(() => {
        if (greenSquares.length < 4) {
            createGreenSquare();
        }
    }, 1000);

    function scheduleLaser() {
        const delay = Math.random() * 10000 + 10000;
        laserInterval = setTimeout(() => {
            activateLaser();
            scheduleLaser();
        }, delay);
    }

    function activateLaser() {
        const direction = Math.floor(Math.random() * 3);
        const laserSize = gameField.clientHeight * 0.25;

        if (direction === 0) { // Left
            laser.style.width = '5px';
            laser.style.height = `${laserSize}px`;
            laser.style.left = '0';
            laser.style.right = '';
            laser.style.top = `${Math.random() * (gameField.clientHeight - laserSize)}px`;
            laser.style.bottom = '';
        } else if (direction === 1) { // Right
            laser.style.width = '5px';
            laser.style.height = `${laserSize}px`;
            laser.style.right = '0';
            laser.style.left = '';
            laser.style.top = `${Math.random() * (gameField.clientHeight - laserSize)}px`;
            laser.style.bottom = '';
        } else { // Top
            laser.style.width = `${laserSize}px`;
            laser.style.height = '5px';
            laser.style.top = '0';
            laser.style.bottom = '';
            laser.style.left = `${Math.random() * (gameField.clientWidth - laserSize)}px`;
            laser.style.right = '';
        }

        laser.classList.remove('hidden');

        setTimeout(() => {
            laser.style.transition = 'all 2s ease';
            if (direction === 0 || direction === 1) { // Move from left or right
                laser.style.width = '100%';
            } else { // Move from top or bottom
                laser.style.height = '100%';
            }

            const checkCollisionInterval = setInterval(() => {
                if (checkCollision(mainSquare, laser)) {
                    clearInterval(checkCollisionInterval);
                    alert('Игра окончена! Ваш счет: ' + score);
                    resetGame();
                }
            }, 10);

            setTimeout(() => {
                clearInterval(checkCollisionInterval);
                laser.classList.add('hidden');
                laser.style.transition = 'none';
                laser.style.left = '0';
                laser.style.right = '0';
                laser.style.top = '0';
                laser.style.bottom = '0';
            }, 2000);
        }, 2000);
    }

    function scheduleSaw() {
        const delay = Math.random() * 20000 + 10000;
        sawInterval = setTimeout(() => {
            activateSaw();
            scheduleSaw();
        }, delay);
    }

    function activateSaw() {
        const direction = Math.floor(Math.random() * 4);
        const sawWidth = gameField.clientWidth * 0.35;
        const sawHeight = gameField.clientHeight * 0.45;

        sawWarning.style.opacity = '1';
        setTimeout(() => {
            sawWarning.style.opacity = '0';
        }, 1500);

        setTimeout(() => {
            if (direction === 0) { // Left
                sawWarning.style.width = '10px';
                sawWarning.style.height = `${sawHeight}px`;
                sawWarning.style.left = '0';
                sawWarning.style.right = '';
                sawWarning.style.top = `${Math.random() * (gameField.clientHeight - sawHeight)}px`;
                sawWarning.style.bottom = '';
            } else if (direction === 1) { // Right
                sawWarning.style.width = '10px';
                sawWarning.style.height = `${sawHeight}px`;
                sawWarning.style.right = '0';
                sawWarning.style.left = '';
                sawWarning.style.top = `${Math.random() * (gameField.clientHeight - sawHeight)}px`;
                sawWarning.style.bottom = '';
            } else if (direction === 2) { // Top
                sawWarning.style.height = '10px';
                sawWarning.style.width = `${sawWidth}px`;
                sawWarning.style.top = '0';
                sawWarning.style.bottom = '';
                sawWarning.style.left = `${Math.random() * (gameField.clientWidth - sawWidth)}px`;
                sawWarning.style.right = '';
            } else { // Bottom
                sawWarning.style.height = '10px';
                sawWarning.style.width = `${sawWidth}px`;
                sawWarning.style.bottom = '0';
                sawWarning.style.top = '';
                sawWarning.style.left = `${Math.random() * (gameField.clientWidth - sawWidth)}px`;
                sawWarning.style.right = '';
            }

            sawWarning.classList.remove('hidden');

            setTimeout(() => {
                sawWarning.classList.add('hidden');

                if (direction === 0) { // Left
                    saw.style.width = '0';
                    saw.style.height = `${sawHeight}px`;
                    saw.style.left = '0';
                    saw.style.right = '';
                    saw.style.top = sawWarning.style.top;
                    saw.style.bottom = '';
                } else if (direction === 1) { // Right
                    saw.style.width = '0';
                    saw.style.height = `${sawHeight}px`;
                    saw.style.right = '0';
                    saw.style.left = '';
                    saw.style.top = sawWarning.style.top;
                    saw.style.bottom = '';
                } else if (direction === 2) { // Top
                    saw.style.height = '0';
                    saw.style.width = `${sawWidth}px`;
                    saw.style.top = '0';
                    saw.style.bottom = '';
                    saw.style.left = sawWarning.style.left;
                    saw.style.right = '';
                } else { // Bottom
                    saw.style.height = '0';
                    saw.style.width = `${sawWidth}px`;
                    saw.style.bottom = '0';
                    saw.style.top = '';
                    saw.style.left = sawWarning.style.left;
                    saw.style.right = '';
                }

                saw.classList.remove('hidden');

                setTimeout(() => {
                    saw.style.transition = 'all 2s ease';
                    if (direction === 0 || direction === 1) { // Move from left or right
                        saw.style.width = `${sawWidth}px`;
                    } else { // Move from top or bottom
                        saw.style.height = `${sawHeight}px`;
                    }

                    const checkCollisionInterval = setInterval(() => {
                        if (checkCollision(mainSquare, saw)) {
                            clearInterval(checkCollisionInterval);
                            alert('Игра окончена! Ваш счет: ' + score);
                            resetGame();
                        }
                    }, 10);

                    setTimeout(() => {
                        clearInterval(checkCollisionInterval);
                        saw.classList.add('hidden');
                        saw.style.transition = 'none';
                        if (direction === 0 || direction === 1) {
                            saw.style.width = '0';
                        } else {
                            saw.style.height = '0';
                        }
                    }, 2000);
                }, 2000);
            }, 2000);
        }, 2000);
    }

    function scheduleBlackSquare() {
        const delay = Math.random() * 3000 + 2000; // Random delay between 2 to 5 seconds
        blackSquareInterval = setTimeout(() => {
            createBlackSquare();
            scheduleBlackSquare();
        }, delay);
    }

    function scheduleSpecialSquare() {
        const delay = Math.random() * 6000 + 7000; // Random delay between 7 to 13 seconds
        specialSquareInterval = setTimeout(() => {
            createSpecialSquare();
            scheduleSpecialSquare();
        }, delay);
    }

    function checkCollision(square, obstacle) {
        const squareRect = square.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        return !(
            squareRect.top > obstacleRect.bottom ||
            squareRect.bottom < obstacleRect.top ||
            squareRect.left > obstacleRect.right ||
            squareRect.right < obstacleRect.left
        );
    }

    function startTimer() {
        gameInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Таймер: ${timeLeft}`;

            if (timeLeft <= 0) {
                clearInterval(gameInterval);
                alert('Время вышло! Ваш счет: ' + score);
                resetGame();
            }
        }, 1000);
    }

    setTimeout(() => {
        mainSquare.style.display = 'block';
        generateInitialGreenSquares();
        scheduleLaser();
        scheduleSaw();
        scheduleBlackSquare();
        scheduleSpecialSquare();
        startTimer();
    }, 3000);
});
