# Imports
import beampatterns
import numpy as np
import matplotlib.pyplot as plt
import time

# Antenna parameters
n_antennas = 15
lambda_ratio = 0.5

# Antenna definition
antenna = beampatterns.AntennaArray(n_antennas, lambda_ratio)

# Angle domain for plots
angle_domain = np.linspace(-np.pi, np.pi, 1024)
antenna.set_ang_domain_rel(angle_domain)
antenna.set_ang_domain_abs(angle_domain)

# Circumference (for the polar plot)
X = np.cos(angle_domain)
Y = np.sin(angle_domain)

# Actual beam-pattern calculation
center = 0      # Center in relative angle
width = np.pi   # Width in relative angle
####
#       center, width can be computed from the relative angle sector
#       extremes [a, b] as:
#           center = (a + b)/2, width = b-a
#
#       a, b can be computed from the absolute angle sector extremes
#       [aa, bb] as:
#           a = antenna.ang_abs2rel_2(aa), b = antenna.ang_abs2rel_2(bb)
####
bp = antenna.bp_sinc(width)    # Unsteered sector of givend width
bp = antenna.bp_steer(bp, center)  # Steer beam-pattern

# Power per angle
R_rel = np.power(np.abs(antenna.array_response_rel(bp)), 2)
R_abs = np.power(np.abs(antenna.array_response_abs(bp)), 2)
# Maximum of this power
r_max = np.max([R_rel, R_abs])
# Normalization
R_rel /= r_max
R_abs /= r_max

# Plots
fig = plt.figure(figsize=(8, 8))
##### Natural
ax1 = fig.add_subplot(2, 2, 1)
ax2 = fig.add_subplot(2, 2, 2)
fig.suptitle('Beam-pattern')
ax1.plot(X, Y, 'k', lw=1)
ax2.plot(X, Y, 'k', lw=1)
for k in [0.25, 0.5, 0.75]:
    ax1.plot(k*X, k*Y, 'k', lw=0.5)
    ax2.plot(k*X, k*Y, 'k', lw=0.5)
ax1.plot(X*R_rel, Y*R_rel, lw=3)
ax2.plot(X*R_abs, Y*R_abs, lw=3)
ax1.set_xlim([-1, 1])
ax1.set_ylim([-1, 1])
ax1.set_aspect('equal')
ax2.set_xlim([-1, 1])
ax2.set_ylim([-1, 1])
ax2.set_aspect('equal')
#####  Logarithmic
ax3 = fig.add_subplot(2, 2, 3)
ax4 = fig.add_subplot(2, 2, 4)
fig.suptitle('Beam-pattern')
ax3.plot(X, Y, 'k', lw=1)
ax4.plot(X, Y, 'k', lw=1)
for k in [0.25, 0.5, 0.75]:
    ax3.plot(k*X, k*Y, 'k', lw=0.5)
    ax4.plot(k*X, k*Y, 'k', lw=0.5)
######  Normalized to map [-40, 0] to [0, 1]
R_rel = np.maximum(0.25*np.log10(R_rel)+1, 0)
R_abs = np.maximum(0.25*np.log10(R_abs)+1, 0)
ax3.plot(X*R_rel, Y*R_rel, lw=3)
ax4.plot(X*R_abs, Y*R_abs, lw=3)
ax3.set_xlim([-1, 1])
ax3.set_ylim([-1, 1])
ax3.set_aspect('equal')
ax4.set_xlim([-1, 1])
ax4.set_ylim([-1, 1])
ax4.set_aspect('equal')
# Titles
ax1.set_title('Relative angle (Natural)')
ax2.set_title('Absolute angle (Natural)')
ax3.set_title('Relative angle (Logarithmic)')
ax4.set_title('Absolute angle (Logarithmic)')
# Show
plt.show()

time.sleep()
