import math from "math.js"

sinc(ang){
  if (abs(ang) < 0.5) {
    // Taylor seris: 1-x^2/3!+x^4/5!-x^6/7!...
    const ang_2 = ang**2;                // x^2
    var curr_term = 1;                   // current term
    for (var ii = 2; ii < 12; ii += 2) {
      current_term *= -ang_2/(ii*(ii+1))
      output += curr_term
    }
    return output
  } else {
    return sin(ang)/ang
  }
}

class AntennaArray{
  constructor(n_antennas, lambda_ratio){
    this.n_antennas = n_antennas;
    this.lambda_ratio = lambda_ratio;
    this.antenna_index = math.range(0, n_antennas)
  }
  bp_steer(bp, ang){
    const steering_vector = math.exp(math.complex(0, math.multiply(this.antenna_index, ang)))
    math.dotMultiply(bp, steering_vector)
  }
  bp_sinc(width){
    const sinc_index = math.multiply(this.antenna_index-(this.n_antennas-1)/2, width/(2*math.PI))
    return(sinc_index.map(item => sinc(item)))
  }
  set_nag_domaing_rel(x){
    this.ang_domain_rel = x;
    exp_index = x.map(item => math.multiply(this.index, item))
    this.response_domain_rel = math.exp(math.complex(0, exp_index))
  }
}

export default AntennaArray
