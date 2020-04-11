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

import Slider from '@material-ui/core/Slider';

function filter_int(value) {
  return 2*value === Math.round(2*value) ? value : null;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: 0,
      width: pi,
    };
    const ang_domain_rel = range(-pi, pi, 0.01)
    this.circle = ang_domain_rel.map(ang => {return({x: Math.cos(ang), y: Math.sin(ang)})}).toArray()
    this.antenna = new AntennaArray(16, 0.5);
    this.antenna.set_ang_domaing_rel(ang_domain_rel)
  }
  handle_a_rel = (event, a_rel) => {
    var b_rel = this.state.center + this.state.width/2
    if (a_rel > b_rel) {
      b_rel = a_rel
    }
    this.setState({
      center: (a_rel+b_rel)/2,
      width: b_rel-a_rel,
    })
  }
  render() {
    // Beampattern rendering
    var bp = this.antenna.bp_sinc(this.state.width);
    bp = this.antenna.bp_steer(bp, this.state.center);
    var rad = this.antenna.array_response_rel(bp).map(rr => abs(rr)**2).toArray();
    const r_max = max(rad)
    const beampattern = this.circle.map((cc, ii) => {
      return({
      x: cc.x*rad[ii]/r_max,
      y: cc.y*rad[ii]/r_max,
    })})

    // Angular domain properties
    const a_rel = this.state.center - this.state.width/2
    const b_rel = this.state.center + this.state.width/2

    // Render
    return (
      <div className="App">
        <Row>
          <Col lg="3">
          </Col>
          <Col lg="3">
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
                  height={null}
                  width={null}
                  id = "scatter-rel"
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
                      //pointBackgroundColor: "#1f8ef1",
                      //pointBorderColor: "rgba(255,255,255,0)",
                      //pointHoverBackgroundColor: "#1f8ef1",
                      //pointBorderWidth: 20,
                      //pointHoverRadius: 4,
                      //pointHoverBorderWidth: 15,
                      pointRadius: 0,//4,
                      data: beampattern,
                    },
                    {
                      label: "sinc",
                      fill: true,
                      showLine: true,
                      lineTension: 0,
                      borderColor: "#000000",
                      borderWidth: 1,
                      borderDash: [],
                      borderDashOffset: 0.0,
                      pointRadius: 0,//4,
                      data: this.circle,
                    }, ...[0.25, 0.5, 0.75].map(rat => {return(
                      {
                        label: "sinc",
                        fill: false,
                        showLine: true,
                        lineTension: 0,
                        borderColor: "#000000",
                        borderWidth: 1,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointRadius: 0,//4,
                        data: this.circle.map(point => {return({x: rat*point.x, y: rat*point.y})}),
                      }
                    )}),
                  ]
                  }}
                  options = {{
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
              </CardBody>
              <CardFooter>
                <Row>
                  <Col md="6">
                    <Slider
                      value={a_rel}
                      onChange={this.handle_a_rel}
                      aria-labelledby="continuous-slider"
                      min={-pi}
                      max={pi}
                      step={0.01}
                    />
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
