import numpy as np

class AntennaArray:
    def __init__(self, n_antennas=16, lambda_ratio=0.5):
        self.n_antennas = n_antennas
        self.lambda_ratio = lambda_ratio
        self.antenna_index = np.arange(0, n_antennas);
        self.ang_const = 2*lambda_ratio*np.pi;
    # Angle transformations (abs from -pi to np.pi, rel from -2*pi*lambda_ratio to 2*pi*lambda_ratio)
    def ang_abs2rel(self, ang):
        return np.asin(np.array(ang)/(2*self.lambda_ratio*np.pi))
    def ang_abs2rel_2(self, ang):
        my_ang = ang
        output = 0
        while my_ang > np.pi/2:
            output += 2*self.ang_const
            my_ang -= np.pi
        while my_ang < -np.pi/2:
            output -= 2*self.ang_const
            my_ang += np.pi
        return output + self.ang_const*np.sin(my_ang)
    def ang_rel2abs_2(self, ang):
        my_ang = ang
        output = 0
        while my_ang > self.ang_const:
            output += np.pi
            my_ang -= 2*self.ang_const
        while my_ang < -self.ang_const:
            output -= np.pi
            my_ang += 2*self.ang_const
        return output + np.asin(my_ang/self.ang_const)
    # Steering function
    def bp_steer(self, b, ang):
        return [b_ii*np.exp(2j*np.pi*ang) for b_ii, ii in zip(b, range(len(b)))]
    # Beam-pattern creation (relative angle)
    def bp_sinc(self, width):
        half_antennas = (self.n_antennas-1)/2
        return [np.sinc((width/(2*np.pi))*(ii-half_antennas)) for ii in range(self.n_antennas)]
    # Array response
    def set_ang_domain_rel(self, x):
        self.ang_domain_rel = x
        self.response_domain_rel = np.exp(1j*self.antenna_index[:, np.newaxis]*np.array(x)[np.newaxis, :])
    def array_response_rel(self, bp):
        return np.dot(bp, self.response_domain_rel)
    def set_ang_domain_abs(self, x):
        self.ang_domain_rel = x
        self.response_domain_abs = np.exp(1j*self.ang_const*self.antenna_index[:, np.newaxis]*np.sin(x)[np.newaxis, :])
    def array_response_abs(self, bp):
        return np.dot(bp, self.response_domain_abs)
