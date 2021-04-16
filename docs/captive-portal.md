@startuml
actor user
participant QRCode
boundary accessPoint
entity captivePortal
collections dynamicFAS

user -> QRCode : scan
user <- QRCode : provide wifi ssid/pass
user -> accessPoint : connect to wifi and check captive portal url
accessPoint -> captivePortal : forward http traffic
captivePortal -> dynamicFAS : show pre-auth page
user -> dynamicFAS : authenticate
user <- captivePortal : redirect to 3rd party url that immedately close
@enduml