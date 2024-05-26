document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.clickable-coin').addEventListener('click', function(event) {
        const x = event.clientX;
        const y = event.clientY

        const img = document.createElement('img');
        img.src = 'static/plus1.png'; // Путь к вашей картинке
        img.style.position = 'absolute';
        img.style.width = '50px';
        img.style.height = '50px';
        img.style.left = (x - 10) + 'px'; // Установка координаты X картинки
        img.style.top = (y - 10) + 'px'; // Установка координаты Y картинки

        // Добавление картинки в документ
        document.body.appendChild(img);

        // Анимация перемещения картинки
        const interval = setInterval(function() {
            img.style.top = (parseInt(img.style.top) - 2) + 'px'; // Уменьшение координаты Y картинки для движения вверх
            if (parseInt(img.style.top) <= y - 50) { // Проверка достижения заданной высоты
                clearInterval(interval); // Остановка анимации
                document.body.removeChild(img); // Удаление картинки из документа
            }
        }, 10); // Интервал анимации (10 миллисекунд)
    });
});







