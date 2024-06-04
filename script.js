document.addEventListener("DOMContentLoaded", () => {
    const gameField = document.getElementById("gameField");
    const mainSquare = document.getElementById("mainSquare");
    const scoreDisplay = document.getElementById("score");

    let isMoving = false;
    let greenSquares = [];
    let score = 0;

    // Появление главного квадрата в центре через 3 секунды
    setTimeout(() => {
        mainSquare.style.display = 'block';
        generateInitialGreenSquares();
    }, 3000);

    // Генерация начальных зеленых квадратов
    function generateInitialGreenSquares() {
        for (let i = 0; i < 4; i++) {
            createGreenSquare();
        }
    }

    // Генерация зеленых квадратов по очереди
    function createGreenSquare() {
        const greenSquare = document.createElement('div');
        greenSquare.classList.add('greenSquare');

        // Генерация случайной позиции
        const randomX = Math.random() * (gameField.clientWidth - 30);
        const randomY = Math.random() * (gameField.clientHeight - 30);

        greenSquare.style.left = `${randomX}px`;
        greenSquare.style.top = `${randomY}px`;

        gameField.appendChild(greenSquare);
        greenSquares.push(greenSquare);

        // Удаление зеленого квадрата через 5 секунд (с миганием)
        setTimeout(() => {
            if (greenSquare.parentElement) {
                greenSquare.remove();
                greenSquares = greenSquares.filter(sq => sq !== greenSquare);

                // Проверка, нужно ли создать новый квадрат
                if (greenSquares.length < 4) {
                    createGreenSquare();
                }
            }
        }, 5000);
    }

    gameField.addEventListener("click", (event) => {
        if (isMoving) return;

        const target = event.target;
        if (!target.classList.contains('greenSquare')) return;

        isMoving = true;

        // Перемещение главного квадрата к зеленому квадрату
        const targetX = target.style.left;
        const targetY = target.style.top;

        mainSquare.style.left = targetX;
        mainSquare.style.top = targetY;

        // Ожидание завершения перемещения, затем удаление зеленого квадрата и увеличение счета
        setTimeout(() => {
            target.remove();
            greenSquares = greenSquares.filter(sq => sq !== target);

            score++;
            scoreDisplay.textContent = `Счет: ${score}`;

            // Проверка, нужно ли создать новый квадрат
            if (greenSquares.length < 4) {
                createGreenSquare();
            }

            isMoving = false;
        }, 1000); // Убедимся, что это соответствует времени перехода
    });

    // Запуск создания зеленых квадратов с интервалом
    setInterval(() => {
        if (greenSquares.length < 4) {
            createGreenSquare();
        }
    }, 1000); // Проверка каждые 1 секунду
});







