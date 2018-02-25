# Imports
import serial
import datetime
from pymongo import MongoClient
from pprint import pprint
# Set up serial
ser = serial.Serial('/dev/ttyACM0')  # open serial port

client = MongoClient('mongodb://raspberry:HackCUIV@52.90.252.23:27017/Project-IoT')
#client = MongoClient('mongodb://localhost:27017/')

db = client['Project-IoT']

humidity = db.Humidity
temperature = db.Temperature
light = db.Light

# Get the data
while 1:
    line = ser.readline()
    line = str(line) 
    line_split = line.split(' ')[1]
    line_split1 = line.split(' ')[0]
    line_split = line_split.split('\\r')
    value = float(line_split[0])
    name = str(line_split1[len(line_split1)-2])

    time = str(datetime.datetime.now())

    if name == 'L':
        value /= 10

    obj = {"time": time, "val": value}
    print(obj)

    if name == 'H':
        humidity.insert(obj)
    if name == 'T':
        temperature.insert(obj)
    if name == 'L':
        light.insert(obj)
    