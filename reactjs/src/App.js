import React from 'react';
import { Scatter } from 'react-chartjs-2';
import logo from './logo.svg';
import './App.css';

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

function valueLabelFormat(value){
  return(Math.round(value*180/pi)+'°')
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: 0,
      width: pi,
      beampattern_rel: null,
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
    this.update_beampattern_rel()
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
  }
  handle_center_rel = (event, center_rel) => {
    this.setState({
      center: center_rel
    })
    this.update_beampattern_rel()
  }
  handle_width_rel = (event, width_rel) => {
    this.setState({
      width: width_rel
    })
    this.update_beampattern_rel()
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
  componentWillMount() {
    this.update_beampattern_rel()
  }
  render() {
    // Angular domain properties
    const a_rel = this.state.center - this.state.width/2
    const b_rel = this.state.center + this.state.width/2
    //const a_abs = this.antenna.ang_rel2abs(a_rel)
    //const b_abs = this.antenna.ang_rel2abs(b_rel)

    // Render return
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
        </Row>
      </div>
    );
  }
}

export default App;
