"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const initialQuery = searchParams.get("query") || ""; // Read existing query from URL
	const [search, setSearch] = useState(initialQuery);

	const handleSearch = (e) => {
		e.preventDefault();
		const params = new URLSearchParams(searchParams); // Clone existing params
		if (search) {
			params.set("query", search); // Update the "query" parameter
		} else {
			params.delete("query"); // Remove "query" if empty
		}
		router.push(`?${params.toString()}`, { scroll: false }); // Update the URL with new parameters
	};

	return (
		<form onSubmit={handleSearch} className={styles.search}>
			<input
				type="text"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search..."
				className={styles.input}
			/>
			<button type="submit" className={styles.button}>
				<svg className={styles.searchicon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000">
					<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
					<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
					<g id="SVGRepo_iconCarrier">
						<title>search</title>
						<desc>Created with Sketch Beta.</desc>
						<g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
							<g
								id={styles.iconpath}
								transform="translate(-256.000000, -1139.000000)"
							>
								<path
									d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z"
									id="search"
								></path>
							</g>
						</g>
					</g>
				</svg>
			</button>
		</form>
	);
};

export default SearchBar;
