import serial
import datetime
ser = serial.Serial('/dev/ttyACM1')  # open serial port
#print(ser.name)         # check which port was really used
humidity = []
temperature = []
light = []
while 1:
    line = ser.readline()
    line = str(line)
    # print(line)    
    line_split = line.split(' ')[1]
    line_split1 = line.split(' ')[0]
    # print(line.split(' '))
    line_split = line_split.split('\\r')
    value = float(line_split[0])
    name = str(line_split1[len(line_split1)-2])

    time = str(datetime.datetime.now())
    if name == 'L':
        value /= 10
    obj = (time, value)
    print(obj)

    if name == 'H':
        humidity.append(obj)
    if name == 'T':
        temperature.append(obj)
    if name == 'L':
        light.append(obj)