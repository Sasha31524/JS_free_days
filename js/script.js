window.addEventListener('DOMContentLoaded', () =>{
    
    const loadContent = async (url, callback) => {  //async - асинхронная работа
        await fetch(url) //Обещание     await - подожди пока загрузится
            .then(response => response.json()) //Обещание
            .then(json => createElement(json.goods));
    
            callback();
    }
    
        function createElement(arr){
            const goodsWrapper = document.querySelector('.goods__wrapper');
    
            arr.forEach(function(item){
                let card = document.createElement('div');
                card.classList.add('goods__item');
                card.innerHTML = `
                <img class="goods__img" src="${item.url}" alt="phone">
                <div class="goods__colors">Доступно цветов: 4</div>
                <div class="goods__title">
                    ${item.title}
                </div>
                <div class="goods__price">
                    <span>${item.price}</span> руб/шт
                </div>
                <button class="goods__btn">Добавить в корзину</button>
                `;
                goodsWrapper.appendChild(card);
            });
        }
    
    loadContent('js/db.json', () => {
        const cartWrapper = document.querySelector('.cart__wrapper'),
        cart = document.querySelector('.cart'),
        close = document.querySelector('.cart__close'),
        open = document.querySelector('#cart'),
        goodsBtn = document.querySelectorAll('.goods__btn'),
        products = document.querySelectorAll('.goods__item'),
        confirm = document.querySelector('.confirm'),
        badge = document.querySelector('.nav__badge'),
        totalCost = document.querySelector('.cart__total > span'),
        titles = document.querySelectorAll('.goods__title');
        let empty = cartWrapper.querySelector('.empty'); //Добавим переменную глобальную
    
    function openCart() {
        cart.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeCart() {
        cart.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    open.addEventListener('click', openCart);
    close.addEventListener('click', closeCart);
    
    goodsBtn.forEach(function(btn, i){
        btn.addEventListener('click', () =>{
            let item = products[i].cloneNode(true),
                trigger = item.querySelector('button'),
                removeBtn = document.createElement('div');
    
                // empty = cartWrapper.querySelector('.empty')  - удаляем тут переменную, создали как глобальную выше
    
                //удаляем кнопку добавить в корзину
            trigger.remove();
            
            showConfirm(); //Анимация при добавлении в корзину
           
                //добавляем кнопку удаления из корзины
            removeBtn.classList.add('goods__item-remove');
            removeBtn.innerHTML = '&times';
            item.appendChild(removeBtn);
                //показываем элемент в корзине
            cartWrapper.appendChild(item);
    
            // if (empty){
            //     empty.style.display='none'; - не надо уже
            // }
    
            calcGoods(); //Обновление счетчика корзины на сайте
            calcTotal(); //Обновление суммы в корзине
            removeFromCart();//Удаление из корзины
        });
    });
    
        function sliceTitle(){
            titles.forEach(function(item){
                if (item.textContent.length<60){
                    return;
                } else {
                    const str = item.textContent.slice(0, 61) + '...';
                    // sonst str = `{item.textContent.slice(0, 71)}...`;
                    item.textContent = str;
                }
            });
        }
        sliceTitle();
    
        function showConfirm(){
            confirm.style.display = 'block';
            let counter = 100;
            const id = setInterval(frame, 10);
            function frame(){
                if (counter == 10) {
                    clearInterval(id);
                    confirm.style.display = 'none';
                } else {
                    counter--;
                    confirm.style.opacity = '.' + counter;
                   confirm.style.transform = `translateY(-${counter}px)`;
                
                }
            }
        }
        
        function calcGoods() {
            const  items = cartWrapper.querySelectorAll('.goods__item');
            badge.textContent =+ items.length;
            
            //ДЗ 2 Добавляем блок сравнения
            // если у нас пустая корзина, то показываем блок, иначе скрываем
            if (badge.textContent == 0) {
                empty.style.display = 'block'; 
            } else {
                empty.style.display = 'none';
            }
          }
    
        function calcTotal(){
            const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
            let total = 0;
            prices.forEach(function (item) {
                total += +item.textContent; //Превратим строку в число
            });
            totalCost.textContent = total;
        }
    
        function removeFromCart(){
            const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
            removeBtn.forEach(function(btn){
                btn.addEventListener('click', () =>{
                    btn.parentElement.remove();
                    calcGoods(0);
                    calcTotal();             
                });
            });
            }
        });
});
    



//     const example = {username: "Ivan"};
// //Добавление данных на сервер  
// fetch('https://jsonplaceholder.typicode.com/posts',
//     {
//         method: "POST",
//         body: JSON.stringify(example)
//     })
//     .then(response => response.json()) 
//     .then(json => console.log(json))

// //Обещание, которое можно получить при взаимод. с сервисом (Доступ к серверу по опр адресу)
// fetch('https://jsonplaceholder.typicode.com/todos/1') 
//     .then(response => response.json()) //Обещание
//     .then(json => console.log(json))