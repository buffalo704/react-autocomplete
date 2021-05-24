import React, { useState, useEffect, useRef } from "react";

const Autocomplete = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountriesListItems, setFilteredCountriesListItems] = useState(
    []
  );
  const [showList, setShowList] = useState(true);
  const inputEl = useRef(null);

  useEffect(() => {
    fetch("http://localhost:8080/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data.countries));
  }, []);

  const debounce = (func, timeout = 500) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const processChange = debounce(() => renderList());

  const handleSelect = (e) => {
    setShowList(false);
    inputEl.current.value = e.target.outerText;
  };

  const renderList = () => {
    const filteredCountries =
      inputEl.current.value &&
      countries.filter((country) => {
        return country.name
          .toLowerCase()
          .includes(inputEl.current.value.toLowerCase());
      });

    filteredCountries &&
      setFilteredCountriesListItems(
        filteredCountries.map((country) => (
          <li
            className="list-group-item"
            key={country.code}
            onClick={handleSelect}
          >
            {country.name}
          </li>
        ))
      );
    inputEl.current.value && setShowList(true);
  };

  return (
    <form>
      <div className="mb-3 control">
        <label htmlFor="autocomplete" className="form-label">
          AutoComplete
        </label>{" "}
        &nbsp;
        <input
          id="autocomplete"
          ref={inputEl}
          className="form-control input"
          onKeyUp={processChange}
        />
      </div>
      {showList && (
        <div className="list">
          <ul className="list-group">{filteredCountriesListItems}</ul>
        </div>
      )}
    </form>
  );
};

export default Autocomplete;
