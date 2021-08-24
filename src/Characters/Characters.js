import React, { useState } from "react";
import styles from "./Characters.module.css";

const Characters = (props) => {
	const [current, setCurrent] = useState(false);

	return (
		<div className={styles.Characters}>
			{current ? (
				<div className={styles.popup}>
					<button
						className={styles.but}
						onClick={() => {
							setCurrent();
							console.log(current);
						}}>
						X
					</button>
					<br />
					<br />
					name: {current.name}
					<br />
					<br />
					birth year: {current.birth_year}
					<br />
					<br />
					eye color: {current.eye_color}
					<br />
					<br />
					gender: {current.gender}
					<br />
					<br />
					<br />
				</div>
			) : null}
			<div className={styles.wrapper}>
				{props.characters.map((character, index) => {
					return (
						<>
							<div
								onClick={() => {
									setCurrent(character);
								}}
								className={styles.element}
								key={index}
								onDragStart={(e) =>
									props.dragStartHandler(e, character)
								}
								style={{ cursor: "grab" }}
								draggable={true}>
								{character.name}
							</div>
						</>
					);
				})}
			</div>
		</div>
	);
};

export default Characters;
