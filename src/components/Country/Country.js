import React, { useState } from "react";
import styles from "./Country.module.css";
import PropTypes from "prop-types";
export default function Country({ country, sek, countryCurrency }) {
  const { name, capital, population, currencies } = country;
  const [currencyNumber, setCurrencyNumber] = useState(0);

  //break out current currency since we didnt have access to &base API-call , and don't want to waste 250 API calls on every render (if we were to use &from and &to)
  const sekToCurrency = (1 / countryCurrency) * sek;
  //Calculate the currency of specific country
  const handleCurrency = (val) => {
    setCurrencyNumber(val / sekToCurrency);
  };
  return (
    <div className={styles.country}>
      <h2 className={styles.countryHeader}>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <p>Currency: {currencies[0]?.code}</p>
      <input
        onChange={(e) => handleCurrency(e.target.value)}
        type="number"
        placeholder="Enter value in SEK"
        style={{ width: "100%" }}
      />
      <p style={{ fontSize: "18px" }}>{currencyNumber.toFixed(3)}</p>
      <p>
        {currencies[0]?.name}&nbsp;&#9679;&nbsp;({currencies[0]?.code})
      </p>
    </div>
  );
}
Country.propTypes = {
  country: PropTypes.object.isRequired,
  sek: PropTypes.number.isRequired,
  countryCurrency: PropTypes.number,
};
