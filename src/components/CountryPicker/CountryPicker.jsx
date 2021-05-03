import React from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import { fetchedCountries } from "../../api";

import styles from "./CountryPicker.module.css";

class CountryPicker extends React.Component {
  state = {
    fetchedCountries: [],
  };
  onHandleChange = (e) => {
    this.props.handleChange(e.target.value);
  };
  async componentDidMount() {
    const data = await fetchedCountries();
    this.setState({
      fetchedCountries: data,
    });
  }
  render() {
    return (
      <FormControl className={styles.formControl}>
        <NativeSelect defaultValue="" onChange={this.onHandleChange}>
          <option value="">Global</option>
          {this.state.fetchedCountries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    );
  }
}

export default CountryPicker;
