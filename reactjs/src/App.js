import React from 'react';
import { Line, Bar, Scatter } from "react-chartjs-2";
import logo from './logo.svg';
import './App.css';

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

function App() {
  return (
    <div className="App">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>
              Beam-pattern
            </h3>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Scatter
            id = "scatter-rel"
            data = {{
              datasets: [{
                label: "sinc",
                fill: true,
                showLine: true,
                lineTension: 0,
                borderColor: "#1f8ef1",
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: "#1f8ef1",
                pointBorderColor: "rgba(255,255,255,0)",
                pointHoverBackgroundColor: "#1f8ef1",
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: [{x: 0, x: 0}],
              }]
            }}
            options = {{
              maintainAspectRatio: false,
              legend: {
                display: true
              },
              tooltips: {
                backgroundColor: "#f5f5f5",
                titleFontColor: "#333",
                bodyFontColor: "#666",
                bodySpacing: 4,
                xPadding: 12,
                mode: "nearest",
                intersect: 0,
                position: "nearest",
              },
              responsive: true,
              scales: {
                yAxes: [
                  {
                    barPercentage: 1.6,
                    gridLines: {
                      drawBorder: false,
                      color: "rgba(29,140,248,0.0)",
                      zeroLineColor: "transparent"
                    },
                    ticks: {
                      suggestedMin: -1,
                      suggestedMax: 1,
                      display: false,
                      fontColor: "#9a9a9a",
                      stepSize: 1
                    }
                  }
                ],
                xAxes: [
                  {
                    barPercentage: 1.6,
                    gridLines: {
                      display: false,
                      drawBorder: false,
                      color: "rgba(29,140,248,0.1)",
                      zeroLineColor: "transparent"
                    },
                    ticks: {
                      suggestedMin: -1,
                      suggestedMax: 1,
                      display: false,
                      fontColor: "#9a9a9a",
                      stepSize: 1
                    }
                  }
                ]
              }
            }}
          />
        </CardBody>
        <CardFooter>
          <Button onClick="window.python.test(1.5)">
            Width of 0.5
          </Button>
          Controls will go here
        </CardFooter>
      </Card>
      <script type="module">import * as python from './__target__/python_functions.js'; window.python = python;</script>
    </div>
  );
}

export default App;
