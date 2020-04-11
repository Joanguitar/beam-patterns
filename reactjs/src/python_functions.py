import sys
sys.path.insert(0, '../..')
import beampatterns
import numpy as np

Antenna = beampatterns.AntennaArray(256, 0.5)
angle_domain_rel = np.linspace(-np.pi, np.pi, 1024)
Antenna.set_ang_domain_rel(angle_domain_rel)

X_rel = np.cos(angle_domain_rel)
Y_rel = np.sin(angle_domain_rel)

def test(width):
    bp_sinc = Antenna.bp_sinc(width)
    R_sinc = np.power(np.abs(Antenna.array_response_rel(bp_sinc)), 2)
    r_max = np.max(R_sinc)
    XX_rel = X_rel*R_sinc/r_max
    YY_rel = Y_rel*R_sinc/r_max
    document.getElementById("scatter-rel").data.datasets.data = [{"x": x, "y": y} for x, y in zip(XX_rel, YY_rel)]
    #print([{"x": x, "y": y} for x, y in zip(XX_rel, YY_rel)])
