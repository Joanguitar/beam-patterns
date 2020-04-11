import {range, exp, complex, subtract, multiply, dotMultiply, pi, zeros} from "mathjs"

function sinc(ang){
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
  bp_steer(bp, ang){
    const steering_vector = multiply(this.antenna_index, ang).map(element => expi(element));
    return(dotMultiply(bp, steering_vector));
  }
  bp_sinc(width){
    const sinc_index = multiply(subtract(this.antenna_index, (this.n_antennas-1)/2), width/(2*pi))
    return(sinc_index.map(item => sinc(item)))
  }
  set_ang_domaing_rel(x){
    this.ang_domain_rel = x;
    const exp_index = x.map(item => multiply(this.antenna_index, item))
    this.response_domain_rel = exp_index.map(item => exp(complex(0, item)))
  }
  array_response_rel(bp){
    return(multiply(this.response_domain_rel, bp))
  }
}

export default AntennaArray
