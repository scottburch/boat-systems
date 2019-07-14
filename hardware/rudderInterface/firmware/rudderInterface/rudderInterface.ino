#include <Wire.h>

#define TEST_MODE false

// Digitial pins
int MOTOR_DIRECTION_PIN = 10;
int MOTOR_SPEED_PIN = 11;

// Analog pins
int MOTOR_TACH_PIN = A0;

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
    byte command = Wire.read();

    if(command == SET_RUDDER_CMD) {
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

void setRudder(int s) {
    speed = s;
    Serial.println(speed);
    digitalWrite(MOTOR_DIRECTION_PIN, speed > 0 ? LOW : HIGH);
    if(speed == 0) {
        analogWrite(MOTOR_SPEED_PIN, 0);
    }
    base = 0;
}


// callback for sending data
void sendData(){
  Wire.write(cmdResponse);
}


/******************
** Real work stuff
*******************/



void setup() {
    Serial.begin(57600);
    setupComms();
    // Set PCM frequency
//  TCCR1B = (TCCR1B & 0b11111000) | 0x01;
  TCCR2B = (TCCR2B & 0b11111000) | 0x01;

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
            base = min(base + 5, 255);
        }  else {
            base = max(base - 5, 0);
        }
        if (!TEST_MODE) {
            analogWrite(MOTOR_SPEED_PIN, base);
        }
    } else {
        tachRef = analogRead(MOTOR_TACH_PIN);
    }
}


