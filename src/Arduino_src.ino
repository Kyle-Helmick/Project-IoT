// include the library code:
#include "DHT.h"

// set the DHT Pin
#define DHTPIN 8

// initialize the library with the numbers of the interface pins
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// set the light sensor pin
int lightSensorPin = A0;   // select the analog input pin for the photoresistor

void setup() {
  delay(500);
  Serial.begin(9600);
  dht.begin();
  pinMode(lightSensorPin, INPUT);
}

void loop() {
  delay(500);
  // set the cursor to column 0, line 1
  // (note: line 1 is the second row, since counting begins with 0):
  // read humidity
  float h = dht.readHumidity();
  //read temperature in Fahrenheit
  float f = dht.readTemperature(true);
  Serial.print("T: ");
  Serial.println(f);
  Serial.print("H: ");
  Serial.println(h);
  Serial.print("L: ");
  Serial.println(analogRead(lightSensorPin));
  
  delay(5000);
}
