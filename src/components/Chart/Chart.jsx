import React, { useState, useEffect } from "react";
import { fetchDataDaily } from "../../api";
import { Line, Bar } from "react-chartjs-2";

import styles from "./Chart.module.css";

class Chart extends React.Component {
  state = {
    dailyData: [],
  };

  async componentDidMount() {
    const initialDailyDate = await fetchDataDaily();
    this.setState({
      dailyData: initialDailyDate,
    });
  }

  render() {
    const lineChart = this.state.dailyData.length ? (
      <Line
        data={{
          labels: this.state.dailyData.map(({ date }) =>
            new Date(date).toLocaleDateString()
          ),
          datasets: [
            {
              data: this.state.dailyData.map((data) => data.positive),
              label: "Infected",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: this.state.dailyData.map((data) => data.deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              fill: true,
            },
          ],
        }}
      />
    ) : null;

    const { data, country } = this.props;

    const barChart = data.confirmed ? (
      <Bar
        data={{
          labels: ["Infected", "Recovered", "Deaths"],
          datasets: [
            {
              label: "People",
              backgroundColor: [
                "rgba(243, 0, 0, 0.5)",
                "rgba(9, 190, 18, 0.5)",
                "rgba(0, 0, 0, 0.897)",
              ],
              data: [
                data.confirmed.value,
                data.recovered.value,
                data.deaths.value,
              ],
            },
          ],
        }}
        options={{
          legend: {
            display: false,
          },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null;
    return (
      <div className={styles.container}>{country ? barChart : lineChart}</div>
    );
  }
}

export default Chart;
