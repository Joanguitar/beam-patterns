import numpy as np

class AntennaArray:
    def __init__(self, N_antennas=16, lambda_ratio=0.5):
        self.N_antennas = N_antennas
        self.lambda_ratio = lambda_ratio
    # Angle transformations (abs from -pi to pi, rel from -2*pi*lambda_ratio to 2*pi*lambda_ratio)
    def ang_rel2abs(self, ang):
        return (2*self.lambda_ratio*np.pi)*np.sin(ang)
    def ang_abs2rel(self, ang):
        return np.asin(np.array(ang)/(2*self.lambda_ratio*np.pi))
    # Steering function
    def bp_steer(self, b, ang):
        return [b_ii*np.exp(2j*ii*self.lambda_ratio*np.pi*ang) for b_ii, ii in zip(b, range(len(b)))]
    # Beam-pattern creation (relative angle)
    def bp_sinc(self, width):
        half_antennas = (self.N_antennas-1)/2
        return [np.sinc((width/(2*np.pi))*(ii-half_antennas)) for ii in range(self.N_antennas)]
    # Array response
    def set_ang_domain_rel(self, x):
        self.ang_domain_rel = x
        self.response_domain_rel = np.exp(1j*np.arange(self.N_antennas)[:, np.newaxis]*np.array(x)[np.newaxis, :])
    def array_response_rel(self, bp):
        return np.dot(bp, self.response_domain_rel)
