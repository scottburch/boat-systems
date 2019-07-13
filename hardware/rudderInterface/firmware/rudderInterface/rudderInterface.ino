#include <Wire.h>


// Digitial pins
int MOTOR_DIRECTION_PIN = 10;
int MOTOR_SPEED_PIN = 11;

// Analog pins
int MOTOR_TACH_PIN = 0;

int speed = 0;
int base;
int tachRef;


/**************
** I2C stuff
****************/

#define SLAVE_ADDRESS 0x04
/********************
** COMMANDS
*********************/
#define SET_RUDDER_CMD 0
#define GET_BASE_CMD 1

byte cmdResponse;


void setupComms() {
    Wire.begin(SLAVE_ADDRESS);
    Wire.onReceive(receiveData);
    Wire.onRequest(sendData);
}

void receiveData(int byteCount){
    Serial.print("received ");
    Serial.print(byteCount);
    Serial.println(" bytes");

    byte command = Wire.read();

    Serial.print("cmd: ");
    Serial.println(command);

    if(command == SET_RUDDER_CMD) {
            Serial.println("SET_RUDDER_CMD");
            byte low = Wire.read();
            byte high = Wire.read();
            setRudder(low | (high << 8));
            cmdResponse = 0x00;
    }

    if(command == GET_BASE_CMD) {
            Serial.println("GET_BASE_CMD");
            cmdResponse = 20;
    }

    while(Wire.available()) {
        Serial.print("extra read");
        Serial.println(Wire.read());
    }
}

void setRudder(int speed) {
    Serial.println(speed);
    digitalWrite(MOTOR_DIRECTION_PIN, speed > 0 ? LOW : HIGH);
    if(speed == 0) {
        analogWrite(MOTOR_SPEED_PIN, 0);
    }
    base = 100;
}


// callback for sending data
void sendData(){
    Serial.print("sending: ");
    Serial.println(cmdResponse);
  Wire.write(cmdResponse);
}


/******************
** Real work stuff
*******************/



void setup() {
    Serial.begin(9600);
    setupComms();
    // Set PCM frequency
  TCCR1B = (TCCR1B & 0b11111000) | 0x01;

  pinMode(MOTOR_SPEED_PIN, OUTPUT);
  pinMode(MOTOR_DIRECTION_PIN, OUTPUT);
}


void loop() {
    motorDriveLoop();
    delay(1);
}




void motorDriveLoop() {
    if(speed != 0) {
        if(abs(analogRead(MOTOR_TACH_PIN) - tachRef) < abs(speed)) {
            base = base + 5;
            base = base > 255 ? 255 : base;
        }  else {
            base = base - 5;
            base = base < 0 ? 0 : base;
        }
        analogWrite(MOTOR_SPEED_PIN, base);
    } else {
        tachRef = analogRead(MOTOR_TACH_PIN);
    }
}


