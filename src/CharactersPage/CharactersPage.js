import React, { useState, useEffect } from "react";
import styles from "./CharactersPage.module.css";
import axios from "axios";
import Filters from "../Filters/Filters";
import Characters from "../Characters/Characters";
import Favourites from "../Favourites/Favourites";

const CharactersPage = (props) => {
	const [characters, setCharacters] = useState([]);

	const [current, setCurrent] = useState();

	const [species, setSpecies] = useState();

	const [films, setFilms] = useState([]);

	const [favourites, setFavourites] = useState([]);

	const [filters, setFilters] = useState({ films, species });

	const [appliedFilters, setAppliedFilters] = useState([]);

	const charactersFiltered =
		characters.length >= 1
			? characters.filter((item) => {
					console.log(item);
					let speciesMatch = true;
					let filmMatch = true;

					if (appliedFilters.species) {
						speciesMatch = !appliedFilters.species.some((specie) =>
							item.species.includes(specie.url)
						);
					}

					if (appliedFilters.films) {
						filmMatch = !appliedFilters.films.some((film) =>
							item.films.includes(film.url)
						);
					}

					return speciesMatch && filmMatch;
			  })
			: [];

	useEffect(() => {
		setFilters({ films, species });
	}, [films, species]);

	useEffect(() => {
		let favouritesFromStorage = JSON.parse(
			localStorage.getItem("favourite")
		);
		if (favouritesFromStorage !== null) {
			setFavourites(favouritesFromStorage);
		}

		let people = [];

		getAllPeople(people)
			.then((response) => {
				people = response.reduce(
					(acc, data) => [...acc, ...data.data.results],
					people
				);
				setCharacters(people);
			})
			.catch((error) =>
				console.log("Properly handle your exception here")
			);

		let speciesName = [];

		getAllSpeciesName(speciesName)
			.then((response) => {
				speciesName = response.reduce(
					(acc, data) => [...acc, ...data.data.results],
					speciesName
				);
				console.log(species);
				setSpecies(speciesName);
			})
			.catch((error) =>
				console.log("Properly handle your exception here")
			);

		let filmNames = [];

		getAllFilms(filmNames)
			.then((response) => {
				filmNames = response.reduce(
					(acc, data) => [...acc, ...data.data.results],
					filmNames
				);
				setFilms(filmNames);
			})
			.catch((error) =>
				console.log("Properly handle your exception here")
			);
	}, []);

	const getAllSpeciesName = (speciesName) => {
		return axios("https://swapi.dev/api/species/")
			.then((response) => {
				speciesName = response.data.results;
				return response.data.count;
			})
			.then((count) => {
				const numberOfPagesLeft = Math.ceil((count - 1) / 10);
				let promises = [];

				for (let i = 1; i <= numberOfPagesLeft; i++) {
					promises.push(
						axios(`https://swapi.dev/api/species?page=${i}`)
					);
				}

				return Promise.all(promises);
			});
	};

	const getAllPeople = (people) => {
		return axios("https://swapi.dev/api/people/")
			.then((response) => {
				people = response.data.results;
				return response.data.count;
			})
			.then((count) => {
				const numberOfPagesLeft = Math.ceil((count - 1) / 10);
				let promises = [];

				for (let i = 1; i <= numberOfPagesLeft; i++) {
					promises.push(
						axios(`https://swapi.dev/api/people?page=${i}`)
					);
				}
				return Promise.all(promises);
			});
	};

	const getAllFilms = (films) => {
		return axios("https://swapi.dev/api/films/")
			.then((response) => {
				films = response.data.results;
				return response.data.count;
			})
			.then((count) => {
				const numberOfPagesLeft = Math.ceil((count - 1) / 10);
				let promises = [];

				for (let i = 1; i <= numberOfPagesLeft; i++) {
					promises.push(
						axios(`https://swapi.dev/api/films?page=${i}`)
					);
				}
				return Promise.all(promises);
			});
	};

	const dragOvertHandler = (e) => {
		e.preventDefault();
	};

	const dropHandler = (e) => {
		if (!favourites.includes(current)) {
			setFavourites((favourites) => [...favourites, current]);

			localStorage.setItem(
				"favourite",
				JSON.stringify([...favourites, current])
			);
		}
	};

	const dragStartHandler = (e, current) => {
		setCurrent(current);
		console.log(current);
	};

	return (
		<div className={styles.Page}>
			<Favourites
				favourites={favourites}
				dropHandler={dropHandler}
				dragOvertHandler={dragOvertHandler}
			/>
			<Characters
				characters={charactersFiltered}
				dragStartHandler={dragStartHandler}
			/>

			<Filters
				filters={filters}
				appliedFilters={appliedFilters}
				setAppliedFilters={setAppliedFilters}
				species={species}
				films={films}></Filters>

			<button
				onClick={() => {
					console.log(species);
				}}></button>

			<button
				onClick={() => {
					console.log(films);
				}}></button>
		</div>
	);
};

export default CharactersPage;

// var colors = ["red", "blue", "green"];
// localStorage.setItem("my_colors", JSON.stringify(colors)); //store colors
// var storedColors = JSON.parse(localStorage.getItem("my_colors"));
