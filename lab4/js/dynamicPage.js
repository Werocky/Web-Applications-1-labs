'use strict';

function updateTable(films){
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = '';
    films.films.forEach( film => {
        const tr = document.createElement('tr');
        const td0 = document.createElement('td');
        td0.textContent = film.title;

        const td1 = document.createElement('td');
        if(film.favorite == true){
            td0.classList.add("text-danger");
            td1.innerHTML =
            '<div class="form-check form-switch">' + 
                '<input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>' +
                '<label class="form-check-label" for="flexSwitchCheckChecked">Favorite</label>' +
            '</div>';
        }else{
            td1.innerHTML =
            '<div class="form-check form-switch">' + 
                '<input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked">' +
                '<label class="form-check-label" for="flexSwitchCheckChecked">Favorite</label>' +
            '</div>';
        }

        const td2 = document.createElement('td');
        if(film.date.isValid()){
            td2.textContent = film.date.format('DD-MM-YYYY');
        }

        const td3 = document.createElement('td');
        for(let i = 0; i < film.rating; i++){
            td3.innerHTML += '<i class="bi bi-star-fill"></i>';
        }
        for(let i = 0; i < 5-film.rating; i++){
            td3.innerHTML += '<i class="bi bi-star"></i>';
        }

        const td4 = document.createElement('td');
        td4.innerHTML = '<button type="button" class="btn btn-danger">' +
        '<i class="bi bi-trash3-fill"></i>' +
        '</button';

        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tbody.appendChild(tr);

        const deleteButton = td4.querySelector('button');
        deleteButton.addEventListener('click', (event) => {
            films.films = films.films.filter( e => e.id != film.id);
            updateTable(films);
        })
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    let films = new FilmLibrary();
    films = generateData();
    updateTable(films);

    document.getElementById('all').addEventListener('click', (event) =>{
        event.preventDefault();
        document.getElementsByName('filter').forEach( element => {
            if(element.classList.contains('active'))
                element.classList.remove('active');
            if(element.id == 'all'){
                element.classList.add('active');
            }
        })
        let films = new FilmLibrary();
        films = generateData();
        updateTable(films);
        document.getElementById('tableTitle').textContent = 'All';
    });

    document.getElementById('favorite').addEventListener('click', (event) =>{
        event.preventDefault();
        document.getElementsByName('filter').forEach( element => {
            if(element.classList.contains('active'))
                element.classList.remove('active');
            if(element.id == 'favorite'){
                element.classList.add('active');
            }
        })
        let films = new FilmLibrary();
        films = generateData();
        films.films = films.films.filter( e => e.favorite == true);
        updateTable(films);
        document.getElementById('tableTitle').textContent = 'Favorites';
    });

    document.getElementById('best').addEventListener('click', (event) =>{
        event.preventDefault();
        document.getElementsByName('filter').forEach( element => {
            if(element.classList.contains('active'))
                element.classList.remove('active');
            if(element.id == 'best'){
                element.classList.add('active');
            }
        })
        let films = new FilmLibrary();
        films = generateData();
        films.films = films.films.filter( e => e.rating == 5);
        updateTable(films);
        document.getElementById('tableTitle').textContent = 'Best Rated';
    });

    document.getElementById('last').addEventListener('click', (event) =>{
        event.preventDefault();
        document.getElementsByName('filter').forEach( element => {
            if(element.classList.contains('active'))
                element.classList.remove('active');
            if(element.id == 'last'){
                element.classList.add('active');
            }
        })
        let films = new FilmLibrary();
        films = generateData();
        films.films = films.films.filter(e => e.date >= dayjs().subtract(30, 'day'));
        updateTable(films);
        document.getElementById('tableTitle').textContent = 'Seen Last Month';
    });

    document.getElementById('unseen').addEventListener('click', (event) =>{
        event.preventDefault();
        document.getElementsByName('filter').forEach( element => {
            if(element.classList.contains('active'))
                element.classList.remove('active');
            if(element.id == 'unseen'){
                element.classList.add('active');
            }
        })
        let films = new FilmLibrary();
        films = generateData();
        films.films = films.films.filter(e => !(e.date.isValid()));
        updateTable(films);
        document.getElementById('tableTitle').textContent = 'Unseen';
    });
});

