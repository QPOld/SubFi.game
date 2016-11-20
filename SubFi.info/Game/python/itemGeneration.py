import random
import math
import matplotlib.pyplot as plt
exampleHelmet = 'A'
characterLevel = 150
alpha = 1
beta = characterLevel 
for i in range(5):
	exampleHelmet += str('{:03}'.format(int(random.gammavariate(alpha, beta))) )

	helmetStats = list(map(''.join, zip(*[iter(exampleHelmet[1:])]*3)))
stat = ['int','dex','str','con','foc']
for i in range(len(helmetStats)):
	print stat[i] + ' : ' + helmetStats[i]
