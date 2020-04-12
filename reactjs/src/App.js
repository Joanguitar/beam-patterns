import React from 'react';
import { Scatter } from 'react-chartjs-2';

import {abs, range, pi, max} from 'mathjs';
import AntennaArray from './beampatterns.js';
import BPlot from './BPlot.js';

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
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col
} from "reactstrap";

import Slider from '@material-ui/core/Slider';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

function valueLabelFormat(value){
  return(Math.round(value*180/pi)+'°')
}

function sinc(ang){
  ang *= pi
  if (Math.abs(ang) < 0.5) {
    // Taylor seris: 1-x^2/3!+x^4/5!-x^6/7!...
    const ang_2 = ang**2;                // x^2
    var curr_term = 1;                   // current term
    var output = 1;                      // the Taylor series result
    for (var ii = 2; ii < 12; ii += 2) {
      curr_term *= -ang_2/(ii*(ii+1))
      output += curr_term
    }
    return output
  } else {
    return Math.sin(ang)/ang
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: 0,
      width: pi,
      beampattern_rel: null,
      beampattern_abs: null,
    };
    const ang_domain = range(-pi, pi, 0.01);
    this.circle = ang_domain.map(ang => {return({x: Math.cos(ang), y: Math.sin(ang)})}).toArray();
    this.antenna = new AntennaArray(15, 0.5);
    this.antenna.set_ang_domain_rel(ang_domain);
    this.antenna.set_ang_domain_abs(ang_domain);
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
    this.update_beampattern_rel()
    this.update_beampattern_abs()
  }
  handle_b_rel = (event, b_rel) => {
    var a_rel = this.state.center - this.state.width/2
    if (a_rel > b_rel) {
      a_rel = b_rel
    }
    this.setState({
      center: (a_rel+b_rel)/2,
      width: b_rel-a_rel,
    })
    this.update_beampattern_rel()
    this.update_beampattern_abs()
  }
  handle_center_rel = (event, center_rel) => {
    this.setState({
      center: center_rel
    })
    this.update_beampattern_rel()
    this.update_beampattern_abs()
  }
  handle_width_rel = (event, width_rel) => {
    this.setState({
      width: width_rel
    })
    this.update_beampattern_rel()
    this.update_beampattern_abs()
  }
  handle_a_abs = (event, a_abs) => {
    const a_rel = this.antenna.ang_abs2rel_2(a_abs)
    var b_rel = this.state.center + this.state.width/2
    if (a_rel > b_rel) {
      b_rel = a_rel
    }
    this.setState({
      center: (a_rel+b_rel)/2,
      width: b_rel-a_rel,
    })
    this.update_beampattern_rel()
    this.update_beampattern_abs()
  }
  handle_b_abs = (event, b_abs) => {
    const b_rel = this.antenna.ang_abs2rel_2(b_abs)
    var a_rel = this.state.center - this.state.width/2;
    if (a_rel > b_rel) {
      a_rel = b_rel;
    }
    this.setState({
      center: (a_rel+b_rel)/2,
      width: b_rel-a_rel,
    })
    this.update_beampattern_rel();
    this.update_beampattern_abs();
  }
  handle_center_abs = (event, center_abs) => {
    // Compute
    var a_rel = this.state.center - this.state.width/2;
    var b_rel = this.state.center + this.state.width/2;
    var a_abs = this.antenna.ang_rel2abs_2(a_rel);
    var b_abs = this.antenna.ang_rel2abs_2(b_rel);
    const width_abs = b_abs - a_abs;
    // Substitute new values
    a_abs = center_abs - width_abs/2
    b_abs = center_abs + width_abs/2
    a_rel = this.antenna.ang_abs2rel_2(a_abs)
    b_rel = this.antenna.ang_abs2rel_2(b_abs)
    this.setState({
      center: (a_rel+b_rel)/2,
      width: b_rel-a_rel,
    })
    this.update_beampattern_rel()
    this.update_beampattern_abs()
  }
  handle_width_abs = (event, width_abs) => {
    // Compute
    var a_rel = this.state.center - this.state.width/2;
    var b_rel = this.state.center + this.state.width/2;
    var a_abs = this.antenna.ang_rel2abs_2(a_rel);
    var b_abs = this.antenna.ang_rel2abs_2(b_rel);
    const center_abs = (a_abs + b_abs)/2;
    // Substitute new values
    a_abs = center_abs - width_abs/2
    b_abs = center_abs + width_abs/2
    a_rel = this.antenna.ang_abs2rel_2(a_abs)
    b_rel = this.antenna.ang_abs2rel_2(b_abs)
    this.setState({
      center: (a_rel+b_rel)/2,
      width: b_rel-a_rel,
    })
    this.update_beampattern_rel()
    this.update_beampattern_abs()
  }
  handle_n_antennas = (event, n_antennas) => {
    this.antenna.set_n_antennas(n_antennas)
    this.update_beampattern_rel()
    this.update_beampattern_abs()
  }
  handle_lambda_ratio = (event, lambda_ratio) => {
    this.antenna.set_lambda_ratio(lambda_ratio)
    this.update_beampattern_abs()
  }
  update_beampattern_rel() {
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
    this.setState({beampattern_rel: beampattern})
  }
  update_beampattern_abs() {
    // Beampattern rendering
    var bp = this.antenna.bp_sinc(this.state.width);
    bp = this.antenna.bp_steer(bp, this.state.center);
    var rad = this.antenna.array_response_abs(bp).map(rr => abs(rr)**2).toArray();
    const r_max = max(rad)
    const beampattern = this.circle.map((cc, ii) => {
      return({
      x: cc.x*rad[ii]/r_max,
      y: cc.y*rad[ii]/r_max,
    })})
    this.setState({beampattern_abs: beampattern})
  }
  componentWillMount() {
    this.update_beampattern_rel()
    this.update_beampattern_abs()
  }
  render() {
    // Angular domain properties
    const a_rel = this.state.center - this.state.width/2;
    const b_rel = this.state.center + this.state.width/2;
    const a_abs = this.antenna.ang_rel2abs_2(a_rel);
    const b_abs = this.antenna.ang_rel2abs_2(b_rel);
    const center_abs = (a_abs + b_abs)/2;
    const width_abs = b_abs - a_abs;

    // Render return
    return (
      <div className="App">
        <Row>
          <Col lg="3">
            <Card>
              <CardHeader>
                <CardTitle>
                  <h3>
                    Beam-pattern coefficients
                  </h3>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Label>
                      Absolute value
                    </Label>
                    <Scatter
                      data={{
                        datasets: [
                          {
                            label: "sinc",
                            fill: true,
                            showLine: false,
                            lineTension: 0,
                            backgroundColor: "rgba(255, 0, 0, 0.1)",
                            borderColor: "#f11e1f",
                            borderWidth: 5,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            pointRadius: 4,//4,
                            data: this.antenna.bp_sinc_index(this.state.width).map(item => {return({x: item, y: sinc(item)})}).toArray(),
                          },{
                            label: "sinc_eval",
                            fill: true,
                            showLine: true,
                            lineTension: 0,
                            backgroundColor: "rgba(0, 0, 255, 0.1)",
                            borderColor: "#1f8ef1",
                            borderWidth: 5,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            pointRadius: 0,//4,
                            data: range(-10, 10, 0.1).map(item => {return({x: item, y: sinc(item)})}).toArray(),
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
                                min: -0.4,
                                max: 1.2,
                                fontColor: "#9a9a9a",
                                stepSize: 2,
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
                                min: -10,
                                max: 10,
                                fontColor: "#9a9a9a",
                                stepSize: 2,
                              }
                            }
                          ]
                        }
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label>
                      Phase argument
                    </Label>
                    <Scatter
                      data={{
                        datasets: [
                          {
                            label: "sinc",
                            fill: true,
                            showLine: false,
                            lineTension: 0,
                            backgroundColor: "rgba(255, 0, 0, 0.1)",
                            borderColor: "#f11e1f",
                            borderWidth: 5,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            pointRadius: 4,//4,
                            data: this.antenna.bp_steer_index(this.state.center).map((item, ii) => {return({x: ii, y: item})}).toArray(),
                          },{
                            label: "sinc_eval",
                            fill: true,
                            showLine: true,
                            lineTension: 0,
                            backgroundColor: "rgba(0, 0, 255, 0.1)",
                            borderColor: "#1f8ef1",
                            borderWidth: 5,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            pointRadius: 0,//4,
                            data: range(0, this.antenna.n_antennas, 0.1).map(item => {return({x: item, y: this.state.center*(item - (this.antenna.n_antennas-1)/2)})}).toArray(),
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
                                min: -pi*this.antenna.n_antennas/2,
                                max: pi*this.antenna.n_antennas/2,
                                fontColor: "#9a9a9a",
                                stepSize: pi*this.antenna.n_antennas/2,
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
                                min: 0,
                                max: this.antenna.n_antennas,
                                fontColor: "#9a9a9a",
                                stepSize: 5,
                              }
                            }
                          ]
                        }
                      }}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3">
            <Card>
              <CardHeader>
                <CardTitle>
                  <h3>
                    Beam-pattern
                  </h3>
                  Relative angle:<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <InlineMath>
                    \phi=2\pi\lambda\sin(\varphi)
                  </InlineMath>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <BPlot
                  circle = {this.circle}
                  beampattern = {this.state.beampattern_rel}
                />
              </CardBody>
              <CardFooter>
                <Row>
                  <Col md="6">
                    <label>Left extreme</label>
                    <Slider
                      value={a_rel}
                      onChange={this.handle_a_rel}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      getAriaValueText={valueLabelFormat}
                      valueLabelFormat={valueLabelFormat}
                      min={-pi}
                      max={pi}
                      step={0.01}
                    />
                  </Col>
                  <Col md="6">
                    <label>Center</label>
                    <Slider
                      value={this.state.center}
                      onChange={this.handle_center_rel}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      getAriaValueText={valueLabelFormat}
                      valueLabelFormat={valueLabelFormat}
                      min={-pi}
                      max={pi}
                      step={0.01}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <label>Right extreme</label>
                    <Slider
                      value={b_rel}
                      onChange={this.handle_b_rel}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      getAriaValueText={valueLabelFormat}
                      valueLabelFormat={valueLabelFormat}
                      min={-pi}
                      max={pi}
                      step={0.01}
                    />
                  </Col>
                  <Col md="6">
                    <label>Width</label>
                    <Slider
                      value={this.state.width}
                      onChange={this.handle_width_rel}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      getAriaValueText={valueLabelFormat}
                      valueLabelFormat={valueLabelFormat}
                      min={0}
                      max={2*pi}
                      step={0.01}
                    />
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3">
            <Card>
              <CardHeader>
                <CardTitle>
                  <h3>
                    Beam-pattern
                  </h3>
                  Real angle:<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <InlineMath>
                    \varphi
                  </InlineMath>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <BPlot
                  circle = {this.circle}
                  beampattern = {this.state.beampattern_abs}
                />
              </CardBody>
              <CardFooter>
                <Row>
                  <Col md="6">
                    <label>Left extreme</label>
                    <Slider
                      value={a_abs}
                      onChange={this.handle_a_abs}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      getAriaValueText={valueLabelFormat}
                      valueLabelFormat={valueLabelFormat}
                      min={-this.antenna.ang_const/2}
                      max={this.antenna.ang_const/2}
                      step={0.01}
                    />
                  </Col>
                  <Col md="6">
                    <label>Center</label>
                    <Slider
                      value={center_abs}
                      onChange={this.handle_center_abs}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      getAriaValueText={valueLabelFormat}
                      valueLabelFormat={valueLabelFormat}
                      min={-this.antenna.ang_const/2}
                      max={this.antenna.ang_const/2}
                      step={0.01}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <label>Right extreme</label>
                    <Slider
                      value={b_abs}
                      onChange={this.handle_b_abs}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      getAriaValueText={valueLabelFormat}
                      valueLabelFormat={valueLabelFormat}
                      min={-this.antenna.ang_const/2}
                      max={this.antenna.ang_const/2}
                      step={0.01}
                    />
                  </Col>
                  <Col md="6">
                    <label>Width</label>
                    <Slider
                      value={width_abs}
                      onChange={this.handle_width_abs}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      getAriaValueText={valueLabelFormat}
                      valueLabelFormat={valueLabelFormat}
                      min={0}
                      max={this.antenna.ang_const}
                      step={0.01}
                    />
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3">
            <Card>
              <CardHeader>
                <CardTitle>
                  <h3>
                    Antenna array properties
                  </h3>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="12">
                    <label>Number of antennas</label>
                    <Slider
                      value={this.antenna.n_antennas}
                      onChange={this.handle_n_antennas}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      min={2}
                      max={64}
                      step={1}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <label>
                      <InlineMath math="\frac{d}{\lambda}"/>
                    </label>
                    <Slider
                      value={this.antenna.lambda_ratio}
                      onChange={this.handle_lambda_ratio}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      min={0.1}
                      max={2}
                      step={0.05}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
