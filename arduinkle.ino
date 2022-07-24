const int RELAY_PIN = 3;
const int ML_PER_SECOND = 15;
const int sensorPin = A0;
float sensorValue = 0;
float start = 0;
float t = 0;
boolean started = false;

void setup() {
  Serial.begin(115200);
  //begins communication with serial monitor
  pinMode(RELAY_PIN, OUTPUT);
  //sets pin 2 to output
  pinMode(sensorPin, INPUT);
  //sets pin A0 to input
  digitalWrite(RELAY_PIN, LOW);
  //turns on relay, in turn turning on pump
  delay(500);
  //runs pump for 1/2 second
}

void loop() {
  sensorValue = analogRead(sensorPin);

  if (sensorValue > 500) //Once the moisture level is above 500, turns off pump
  {
    digitalWrite(RELAY_PIN, LOW);
  }
  else //Otherwise, turns on pump
  {
    digitalWrite(RELAY_PIN, HIGH);
  }

  if (Serial.available() > 0) {
    int b = Serial.read();

    if (b == 49) { // Turns pump on manually
      digitalWrite(RELAY_PIN, LOW);
      start = millis();
      started = true;
    }
    else if (b == 48) { // Turns pump off manually
      digitalWrite(RELAY_PIN, HIGH);
      if (started) {
        t = millis() - start;
        Serial.print("ml:"); // Communicates with server
        Serial.print((float)t / 1000.0f * ML_PER_SECOND); // Calculates ML dispensed
        Serial.println();
        started = false;
      }
    }
  }
  delay(1000);
}
