import React from 'react';
import { Line, Bar, Scatter } from 'react-chartjs-2';
import logo from './logo.svg';
import './App.css';

import {abs, range, pi, max} from 'mathjs'
import AntennaArray from './beampatterns.js'

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: 0,
      width: 0,
    };
    const ang_domain_rel = range(-pi, pi, 0.01)
    this.circle = ang_domain_rel.map(ang => {return({x: Math.cos(ang), y: Math.sin(ang)})}).toArray()
    this.antenna = new AntennaArray(16, 0.5);
    this.antenna.set_ang_domaing_rel(ang_domain_rel)
  }
  render() {
    var bp = this.antenna.bp_sinc(this.state.width);
    bp = this.antenna.bp_steer(bp, this.state.center);
    const rad = this.antenna.array_response_rel(bp).map(rr => abs(rr)**2).toArray();
    const r_max = max(rad)
    const beampattern = this.circle.map((cc, ii) => {
      return({
      x: cc.x*rad[ii]/r_max,
      y: cc.y*rad[ii]/r_max,
    })})
    return (
      <div className="App">
        <Row>
        <Col md="6">
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
                  data: beampattern,
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
                        display: true,
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
                        display: true,
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
        </Col>
        </Row>
      </div>
    );
  }
}

export default App;
