import React from 'react';
import { Scatter } from 'react-chartjs-2';

function filter_int(value) {
  return 2*value === Math.round(2*value) ? value : null;
}

class BPlot extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Scatter
        height={null}
        width={null}
        id = "scatter-rel"
        oneToOne={true}
        data = {{
          datasets: [
          {
            label: "sinc",
            fill: true,
            showLine: true,
            lineTension: 0,
            backgroundColor: "rgba(0, 0, 255, 0.1)",
            borderColor: "#1f8ef1",
            borderWidth: 5,
            borderDash: [],
            borderDashOffset: 0.0,
            pointRadius: 0,//4,
            data: this.props.beampattern,
          },
          {
            label: "outer_circ",
            fill: true,
            showLine: true,
            lineTension: 0,
            borderColor: "#000000",
            borderWidth: 1,
            borderDash: [],
            borderDashOffset: 0.0,
            pointRadius: 0,//4,
            data: this.props.circle,
          },
          {
              label: "circ_025",
              fill: false,
              showLine: true,
              lineTension: 0,
              borderColor: "#000000",
              borderWidth: 1,
              borderDash: [],
              borderDashOffset: 0.0,
              pointRadius: 0,//4,
              data: this.props.circle.map(point => {return({x: 0.25*point.x, y: 0.25*point.y})}),
          },
          {
              label: "circ_050",
              fill: false,
              showLine: true,
              lineTension: 0,
              borderColor: "#000000",
              borderWidth: 1,
              borderDash: [],
              borderDashOffset: 0.0,
              pointRadius: 0,//4,
              data: this.props.circle.map(point => {return({x: 0.5*point.x, y: 0.5*point.y})}),
          },
          {
              label: "circ_075",
              fill: false,
              showLine: true,
              lineTension: 0,
              borderColor: "#000000",
              borderWidth: 1,
              borderDash: [],
              borderDashOffset: 0.0,
              pointRadius: 0,//4,
              data: this.props.circle.map(point => {return({x: 0.75*point.x, y: 0.75*point.y})}),
          }
        ]
        }}
        options = {{
          animation: {
              duration: 0
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: false,
          },
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1,
          scales: {
            yAxes: [
              {
                gridLines: {
                  display: true,
                  drawBorder: false,
                  color: "rgba(255,255,255,0.1)",
                  zeroLineColor: "transparent"
                },
                ticks: {
                  min: -1.2,
                  max: 1.2,
                  fontColor: "#9a9a9a",
                  stepSize: 2,
                  callback: filter_int
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  display: true,
                  drawBorder: false,
                  color: "rgba(255,255,255,0.1)",
                  zeroLineColor: "transparent"
                },
                ticks: {
                  enabled: false,
                  min: -1.2,
                  max: 1.2,
                  fontColor: "#9a9a9a",
                  stepSize: 2,
                  callback: filter_int
                }
              }
            ]
          }
        }}
      />
    )
  }
}

export default BPlot
