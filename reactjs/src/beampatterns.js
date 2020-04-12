import {range, exp, complex, subtract, multiply, dotMultiply, pi, zeros} from "mathjs"

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

function expi(x){
  return(exp(complex(0, x)))
}

class AntennaArray{
  constructor(n_antennas, lambda_ratio){
    this.n_antennas = n_antennas;
    this.lambda_ratio = lambda_ratio;
    this.antenna_index = range(0, n_antennas)
  }
  // Angle conversions
  ang_rel2abs(ang){
    const my_const = 2*this.lambda_ratio*pi
    var my_ang = ang
    var output = 0
    while (my_ang > my_const) {
      output += my_const
      my_ang -= 2*pi
    }
    while (my_ang < -my_const) {
      output -= my_const
      my_ang += 2*pi
    }
    return(output + my_const*Math.sin(my_ang))
  }
  ang_abs2rel(ang){
    const my_const = 2*this.lambda_ratio*pi
    var my_ang = ang
    var output = 0
    while (my_ang > my_const) {
      output += pi
      my_ang -= 2*my_const
    }
    while (my_ang < -my_const) {
      output -= pi
      my_ang += 2*my_const
    }
    return(output + Math.asin(my_ang/my_const))
  }
  // Steering function
  bp_steer(bp, ang){
    const steering_vector = multiply(this.antenna_index, ang).map(element => expi(element));
    return(dotMultiply(bp, steering_vector));
  }
  // Beam-pattern creation
  bp_sinc(width){
    const sinc_index = multiply(subtract(this.antenna_index, (this.n_antennas-1)/2), width/(2*pi))
    return(sinc_index.map(item => sinc(item)))
  }
  // Array response
  set_ang_domaing_rel(x){
    this.ang_domain_rel = x;
    const exp_index = x.map(item => multiply(this.antenna_index, item))
    this.response_domain_rel = exp_index.map(item => expi(item))
  }
  array_response_rel(bp){
    return(multiply(this.response_domain_rel, bp))
  }
  set_ang_domaing_abs(x){
    this.ang_domain_abs = x;
    const exp_index = x.map(item => multiply(this.antenna_index, this.ang_abs2rel(item)))
    this.response_domain_abs = exp_index.map(item => expi(item))
  }
  array_response_abs(bp){
    return(multiply(this.response_domain_abs, bp))
  }
}

export default AntennaArray
