import React from "react";
import styles from "./Searchbar.module.css";
import PropTypes from "prop-types";

export default function Searchbar({ searchCountry }) {
  return (
    <div className={styles.searchbar}>
      <label
        htmlFor="search"
        style={{
          display: "none",
        }}
      />
      <input
        type="text"
        onChange={(e) => searchCountry(e.target.value)}
        placeholder="Search for a country.."
      ></input>
    </div>
  );
}
Searchbar.propTypes = {
  searchCountry: PropTypes.func,
};
