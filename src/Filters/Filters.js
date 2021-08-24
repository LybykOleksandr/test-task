import React, { useState, useEffect } from "react";
import styles from "./Filters.module.css";

const Filters = (props) => {
	const applyFilter = (criteria, value) => {
		const applied = { ...props.appliedFilters };
		const newFilterSection = props.appliedFilters[criteria]
			? [...props.appliedFilters[criteria]]
			: [];
		newFilterSection.push(value);
		applied[criteria] = newFilterSection;
		props.setAppliedFilters(applied);
		console.log(applied);
	};

	const removeFilter = (criteria, value) => {
		const applied = { ...props.appliedFilters };
		const newFilterSection = props.appliedFilters[criteria]
			? [...props.appliedFilters[criteria]]
			: [];
		newFilterSection.splice(newFilterSection.indexOf(value), 1);
		applied[criteria] = newFilterSection;
		props.setAppliedFilters(applied);
	};

	return props.filters.films && props.filters.species ? (
		<div className={styles.Filters}>
			<div className={styles.filterSection}>
				{/* <button
					onClick={() => {
						console.log(props.filters.films);
					}}>
					dcdwcdwcwc
				</button> */}
				Films:
				<div style={{ marginLeft: "20px" }}>
					{props.filters.films.map((film, index) => {
						const checked = props.appliedFilters.films?.some(
							(item) => item.url === film.url
						);
						return (
							<div
								onClick={
									checked
										? () => removeFilter("films", film)
										: () => applyFilter("films", film)
								}>
								<input type="checkbox" checked={checked} />
								{film.episode_id} {film.title}
							</div>
						);
					})}
				</div>
			</div>
			<div className={styles.filterSection}>
				Species:
				<div style={{ marginLeft: "20px" }}>
					{props.filters.species.map((specie, index) => {
						const checked = props.appliedFilters.species?.some(
							(item) => item.url === specie.url
						);
						return (
							<div
								onClick={
									checked
										? () => removeFilter("species", specie)
										: () => applyFilter("species", specie)
								}>
								<input
									type="checkbox"
									checked={props.appliedFilters.species?.some(
										(item) => item.url === specie.url
									)}
								/>
								{specie.name}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	) : null;
};

export default Filters;
