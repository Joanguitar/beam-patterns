import numpy as np
import matplotlib.pyplot as plt
import time

class AntennaArray(object):
    def __init__(self, N_antennas=16, lambda_ratio=0.5):
        self.N_antennas = N_antennas
        self.lambda_ratio = lambda_ratio
    # Angle transformations (abs from -pi to pi, rel from -2*pi*lambda_ratio to 2*pi*lambda_ratio)
    def ang_rel2abs(self, ang):
        return 2*self.lambda_ratio*np.pi*np.sin(ang)
    def ang_abs2rel(self, ang):
        return np.asin(ang/(2*self.lambda_ratio*np.pi))
    # Steering function
    def bp_steer(self, b, ang):
        return [b_ii*np.exp(2j*ii*self.lambda_ratio*np.pi*ang) for b_ii, ii in zip(b, range(len(b)))]
    # Beam-pattern creation (relative angle)
    def bp_sinc(self, width):
        half_antennas = (self.N_antennas-1)/2
        return [np.sinc((width/(2*np.pi))*(ii-half_antennas)) for ii in range(self.N_antennas)]
    def bp_roots(self, roots):
        bp_mat = [np.fft.fft(np.concatenate([[root], [1], np.zeros(len(roots)-1)])) for root in roots]
        return np.fft.ifft(np.prod(bp_mat, axis=0))
    def bp_cheby(self, width):
        roots=[np.cos(np.pi*(ii+0.5)/(self.N_antennas-1)) for ii in range(self.N_antennas-1)];
        roots=2*np.arccos(np.array(roots)*np.cos(width/2));
        return self.bp_roots(roots)
    # Array response
    def array_response(self, bp, x):
        return np.dot(bp, np.exp(1j*np.arange(self.N_antennas)[:, np.newaxis]*np.array(x)[np.newaxis, :]))

Antenna = AntennaArray(256, 0.25)

width = np.pi

angle_domain = np.linspace(-np.pi, np.pi, 1024)

X = np.cos(angle_domain)
Y = np.sin(angle_domain)

bp_sinc = Antenna.bp_sinc(width)
bp_cheby = Antenna.bp_cheby(width)

R_sinc = np.abs(Antenna.array_response(bp_sinc, angle_domain))
R_cheby = np.abs(Antenna.array_response(bp_cheby, angle_domain))
r_max = np.max([R_sinc])

plt.plot(X*R_sinc/r_max, Y*R_sinc/r_max)
plt.xlim([-1, 1])
plt.ylim([-1, 1])
plt.show()

time.sleep(10)
