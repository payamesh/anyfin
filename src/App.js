import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Country from "./components/Country/Country";
import Searchbar from "./components/Searchbar/Searchbar";
function App() {
  const [countries, setCountries] = useState();
  const [currencies, setCurrencies] = useState();
  const [searchWord, setSearchWord] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loadMore, setLoadMore] = useState(8);

  const searchCountry = (value) => {
    setSearchWord(value);
  };

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });

    fetch(
      "http://data.fixer.io/api/latest?access_key=b872f3b7a4fefeb94a3a03e1a9896258"
    ) //since I wasnt able to use "&base=SEK" without paying for the API, I convert it in Country.js
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(data);
      });
  }, []);

  useEffect(() => {
    if (countries) {
      const results = countries.filter((countries) =>
        countries.name.toLowerCase().includes(searchWord.toLowerCase())
      );
      setSearchResult(results);
    }
  }, [searchWord, countries]);
  return (
    <div className={styles.wrapperBody}>
      {countries && currencies ? (
        <React.Fragment>
          <Searchbar value={searchWord} searchCountry={searchCountry} />
          {searchResult && (
            <div className={styles.countryContainer}>
              {searchResult.slice(0, loadMore).map((
                country //limited to 8 results
              ) => (
                <Country
                  key={country.name}
                  sek={currencies.rates.SEK} //get the rate for sek
                  country={country}
                  countryCurrency={
                    currencies.rates[country?.currencies[0]?.code]
                  } //use country-code to find its currency in currency object
                />
              ))}
            </div>
          )}

          <button
            className={styles.showMore}
            onClick={() => setLoadMore(loadMore + 8)}
          >
            Load more
          </button>
        </React.Fragment>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
}

export default App;
