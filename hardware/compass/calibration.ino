// This was copied from internet.  Has not been tested yet and he claimed it did not work,
// but I think this is the code I copied before and it worked.

#include <Wire.h>

#define CMPS14_ADDRESS 0x60

void setup()
{
  Serial.begin(9600);
  Wire.begin();

  Wire.beginTransmission(CMPS14_ADDRESS);
  Wire.write(0x00);
  Wire.write(0x98);
  Wire.endTransmission();
  delay(20);

  Wire.beginTransmission(CMPS14_ADDRESS);
  Wire.write(0x00);
  Wire.write(0x95);
  Wire.endTransmission();
  delay(20);

  Wire.beginTransmission(CMPS14_ADDRESS);
  Wire.write(0x00);
  Wire.write(0x99);
  Wire.endTransmission();
  delay(20);

  byte sendbyte;
  bitWrite(sendbyte, 0, 1);
  bitWrite(sendbyte, 1, 1);
  bitWrite(sendbyte, 2, 1);
  bitWrite(sendbyte, 4, 1);
  Wire.beginTransmission(CMPS14_ADDRESS);
  Wire.write(0x00);
  Wire.write(sendbyte);
  Wire.endTransmission();
}

void loop()
{
  Wire.beginTransmission(CMPS14_ADDRESS);
  Wire.write(0x1E);
  Wire.endTransmission();

  Wire.requestFrom(CMPS14_ADDRESS, 1);
  while (Wire.available() < 1);
  byte calState = Wire.read();
  Serial.print(bitRead(calState, 0));
  Serial.print(bitRead(calState, 1));
  Serial.print(bitRead(calState, 2));
  Serial.print(bitRead(calState, 3));
  Serial.print(bitRead(calState, 4));
  Serial.print(bitRead(calState, 5));
  Serial.print(bitRead(calState, 6));
  Serial.println(bitRead(calState, 7));

  delay(100);
}