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
    //get all countries from restcountries API
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });

    //get currency data from fixer.io API
    fetch(
      "http://data.fixer.io/api/latest?access_key=b872f3b7a4fefeb94a3a03e1a9896258"
    ) //since I wasnt able to use "&base=SEK" without paying for the API, I convert it in Country.js
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(data);
      });
  }, []);

  useEffect(() => {
    //make sure search results are up to date
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
                country //limited to 8 results at first for cleanliness
              ) => (
                <Country
                  key={country.name}
                  sek={currencies.rates ? currencies.rates.SEK : 10.62} //get the rate for sek
                  country={country}
                  //use country-code to find its currency in currency object
                  countryCurrency={
                    currencies.rates[country?.currencies[0]?.code]
                  }
                />
              ))}
            </div>
          )}

          <button
            className={styles.showMore}
            //add 8 more results, could do a separate func for this, but felt redundant
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
