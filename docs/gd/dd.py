def first_experiment():
    def problem(x):
        e = 2.71828182845904590
        return x**3 + 2*x + e**x - 3

    def error(x):
        return (problem(x)-0)**2

    def derivative_descent(x):
        delta = 0.00000001
        derivative = (error(x + delta) - error(x - delta)) / (delta * 2)

        alpha = 0.01
        x = x - derivative * alpha
        return x

    x = 0.0
    for i in range(50):
        x = derivative_descent(x)
        print('x = {:6f}, problem(x) = {:6f}'.format(x,problem(x)))

first_experiment()

def second_experiment():
    def problem(x):
        e = 2.71828182845904590
        return x[0]**5 + e**x[1] + x[0]**3 + x[0] + x[1] - 5

    def error(x):
        return (problem(x)-0)**2

    def gradient_descent(x):
        delta = 0.00000001

        derivative_x0 = (error([x[0] + delta, x[1]]) - error([x[0] - delta, x[1]])) / (delta * 2)
        derivative_x1 = (error([x[0], x[1] + delta]) - error([x[0], x[1] - delta])) / (delta * 2)

        alpha = 0.01
        x[0] = x[0] - derivative_x0 * alpha
        x[1] = x[1] - derivative_x1 * alpha
        return [x[0],x[1]]

    x = [0.0, 0.0]
    for i in range(50):
        x = gradient_descent(x)
        print('x = {:6f}, {:6f}, problem(x) = {:6f}'.format(x[0],x[1],problem(x)))

second_experiment()

def third_experiment():
    import numpy as np
    def problem(x):
        return x[0]*x[1] + x[0]*(x[2]**2) + x[1] + x[1]**3 + x[2] + x[2]**5 + x[3] + x[3]**7 - 15

    def error(x):
        return (problem(x)-0)**2

    def gradient_descent(x):
        delta = 0.00000001
        gradient = np.zeros(x.shape)

        for i in range(len(gradient)):
            deltavector = np.zeros(x.shape)
            deltavector[i] = delta

            gradient[i] = (error(x+deltavector)-error(x-deltavector)) / (delta*2)

        alpha = 0.001
        x = x - gradient * alpha
        return x

    x = np.array([0.0, 0.0, 0.0, 0.0])
    for i in range(50):
        x = gradient_descent(x)
        print('x = {}, problem(x) = {:6f}'.format(x,problem(x)))

third_experiment()
