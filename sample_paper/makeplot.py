import matplotlib.pyplot as plt
import numpy as np

n = 100

x = np.random.normal(5,3, n)
y = np.random.normal(3,5, n)
c = plt.cm.Blues(np.random.normal(2,2, n))

ax = plt.subplot(111)
ax.scatter(x,y, marker='o', color=c, edgecolors='k')
ax.set_title('It was the best of plots, it was the worst of plots.')
ax.set_xlabel('Correlation [doohickeys]')
ax.set_ylabel('Causation? [thingamajigs]')

# Save figure
plt.savefig('plot1.pdf', bbox_inches='tight')
plt.savefig('plot1.png', bbox_inches='tight')
plt.savefig('plot1.jpg', bbox_inches='tight', quality=95)
