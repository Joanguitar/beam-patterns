import sys
sys.path.insert(0, '..')
import beampatterns
import numpy as np
import matplotlib.pyplot as plt
import time

AntennaArray = beampatterns.AntennaArray

Antenna = AntennaArray(256, 0.5)

width = 0.5*np.pi

angle_domain_rel = np.linspace(-np.pi, np.pi, 1024)

X_rel = np.cos(angle_domain_rel)
Y_rel = np.sin(angle_domain_rel)

bp_sinc = Antenna.bp_sinc(width)

R_sinc = np.abs(Antenna.array_response(bp_sinc, angle_domain_rel))
r_max = np.max(R_sinc)

plt.plot(X_rel*R_sinc/r_max, Y_rel*R_sinc/r_max)
plt.xlim([-1, 1])
plt.ylim([-1, 1])
plt.show()

time.sleep(10)
