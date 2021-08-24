import React, { useEffect } from "react";
import styles from "./Favourites.module.css";

const Favourites = (props) => {
	return (
		<div
			// style={{ backgroundColor: "red" }}
			className={styles.Favourite}
			// style={{ backgroundColor: "black", height: "300px" }}
			// onDragEnd={(e) => dragEndHandler(e)}

			onDrop={(e) => props.dropHandler(e)}
			onDragOver={(e) => props.dragOvertHandler(e)}>
			<span
				style={{
					fontSize: "30px",
					marginLeft: "20px",
					color: "rgb(0, 238, 255)",
				}}>
				Favourite
			</span>
			{props.favourites.map((favourite, index) => {
				return (
					<div
						// onDragStart={(e) => props.dragStartHandler(e)}
						// onDragLeave={(e) => dragLeaveHandler(e)}
						// onDragEnd={(e) => dragEndHandler(e)}
						key={index}
						onDrop={(e) => props.dropHandler(e)}
						style={{ margin: "15px" }}
						draggable={true}>
						{favourite.name}
					</div>
				);
			})}
		</div>
	);
};

export default Favourites;
