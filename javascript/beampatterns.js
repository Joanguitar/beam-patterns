import {abs, range, exp, complex, concat, subtract, multiply, dotMultiply, pi, sum, sqrt, zeros} from "mathjs"

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
    this.antenna_index = range(0, n_antennas);
    this.ang_const = 2*lambda_ratio*pi;
  }
  // Angle conversions
  ang_abs2rel(ang){
    return(this.ang_const*Math.sin(ang))
  }
  ang_abs2rel_2(ang){
    var my_ang = ang
    var output = 0
    while (my_ang > pi/2) {
      output += 2*this.ang_const
      my_ang -= pi
    }
    while (my_ang < -pi/2) {
      output -= 2*this.ang_const
      my_ang += pi
    }
    return(output + this.ang_const*Math.sin(my_ang))
  }
  ang_rel2abs_2(ang){
    var my_ang = ang
    var output = 0
    while (my_ang > this.ang_const) {
      output += pi
      my_ang -= 2*this.ang_const
    }
    while (my_ang < -this.ang_const) {
      output -= pi
      my_ang += 2*this.ang_const
    }
    return(output + Math.asin(my_ang/this.ang_const))
  }
  // Steering function
  bp_steer_index(ang){
    return(multiply(subtract(this.antenna_index, (this.n_antennas-1)/2), ang));
  }
  bp_steer(bp, ang){
    const steering_vector = this.bp_steer_index(ang).map(element => expi(element));
    return(dotMultiply(bp, steering_vector));
  }
  // Beam-pattern creation
  bp_sinc_index(width){
    return(multiply(subtract(this.antenna_index, (this.n_antennas-1)/2), width/(2*pi)))
  }
  bp_sinc(width){
    const sinc_index = this.bp_sinc_index(width)
    var bp = sinc_index.map(item => sinc(item))
    const bp_norm = sqrt(sum(bp.map(cc => abs(cc)**2)))
    bp = bp.map(cc => cc/bp_norm)
    return(sinc_index.map(item => sinc(item)))
  }
  // Array response
  set_ang_domain_rel(x){
    this.ang_domain_rel = x;
    const exp_index = x.map(item => multiply(this.antenna_index, item));
    this.response_domain_rel = exp_index.map(item => expi(item));
  }
  array_response_rel(bp){
    return(multiply(this.response_domain_rel, bp));
  }
  set_ang_domain_abs(x){
    this.ang_domain_abs = x;
    const exp_index = x.map(item => multiply(this.antenna_index, this.ang_abs2rel(item)));
    console.log(exp_index);
    this.response_domain_abs = exp_index.map(item => expi(item))
  }
  array_response_abs(bp){
    return(multiply(this.response_domain_abs, bp))
  }
  // Setters
  set_n_antennas(n_antennas){
    this.n_antennas = n_antennas;
    this.antenna_index = range(0, n_antennas);
    if (this.ang_domain_rel) {
      this.set_ang_domain_rel(this.ang_domain_rel)
    }
    if (this.ang_domain_abs) {
      this.set_ang_domain_abs(this.ang_domain_abs)
    }
  }
  set_lambda_ratio(lambda_ratio){
    this.lambda_ratio = lambda_ratio;
    this.ang_const = 2*lambda_ratio*pi;
    if (this.ang_domain_abs) {
      this.set_ang_domain_abs(this.ang_domain_abs)
    }
  }
}

export default AntennaArray
