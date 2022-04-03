'use strict';

const dayjs = require("dayjs");

// internationalization (i18n) 
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat); // use shortcuts 'LL' for date in U.S. format

function Film(id, title, favorite=false, date='', rating=0){
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    this.date = dayjs(date);
    this.rating = rating;

    this.ToString = () => {
        return `Id: ${this.id}, ` +
        `Title: ${this.title}, Favorite: ${this.favorite}, Score: ${this.rating}, ` +
        `watchDate: ${this.date.format("DD/MM/YYYY")}`;
    }
}

function FilmLibrary(){
    this.films = [];

    this.addNewFilm = (film) => {
        if(!this.films.some( movie => movie.id == film.id))
            this.films.push(film);
        else
            throw new Error('Film id already present');
    }

    this.print = () => {
        console.log("*****MOVIE LIST *****");
        this.films.forEach( (m) => console.log(m.ToString()));
    }
}

function generateData() {
    // Creating some film entries
    const f1 = new Film(1, "Pulp Fiction", true, "2022-03-10", 5);
    const f2 = new Film(2, "21 Grams", true, "2022-03-17", 4);
    const f3 = new Film(3, "Star Wars", false);
    const f4 = new Film(4, "Matrix", false);
    //const f5 = new Film(5, "Shreck", false, "2022-03-21", 3);
  
    // Adding the films to the FilmLibrary
    const library = new FilmLibrary();
    library.addNewFilm(f1);
    library.addNewFilm(f2);
    library.addNewFilm(f3);
    library.addNewFilm(f4);
    library.addNewFilm(f5);
  
    // Print Films
    library.print();

    return library;
  }