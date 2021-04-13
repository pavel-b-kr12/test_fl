@startuml
actor User_1
collections Flower_1
entity ESP_1
collections LED_1
database MQTT
collections LED_2
entity ESP_2
collections Flower_2
actor User_2

User_1 -> Flower_1 : change colour

MQTT <- Flower_1: publish 'flowers/ESP_LED_1/set'
MQTT -> ESP_1 : subscribe 'flowers/ESP_LED_1/set'
LED_1 <- ESP_1 : change colour
MQTT <- ESP_1 : publish 'flowers/ESP_LED_1'
MQTT -> Flower_1 : 'flowers/ESP_LED_1' subscribe
Flower_1 -> User_2 : change colour

User_2 -> Flower_2 : change colour
MQTT <- Flower_2: publish 'flowers/ESP_LED_2/set'
MQTT -> ESP_2 : subscribe 'flowers/ESP_LED_2/set'
LED_2 <- ESP_2 : change colour
MQTT <- ESP_2 : publish 'flowers/ESP_LED_2'
MQTT -> Flower_2 : 'flowers/ESP_LED_2' subscribe
Flower_2 -> LED_2 : change colour
Flower_2 -> User_1 : change colour
@enduml