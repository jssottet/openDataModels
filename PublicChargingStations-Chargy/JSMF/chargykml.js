var JSMF = require('jsmf-core'); var Model = JSMF.Model; var Class = JSMF.Class; var Enum = JSMF.Enum;


// Définition de l'énumération ChargingStatus
const ChargingStatus =  new Enum('ChargingStatus', ['CHARGING', 'AVAILABLE', 'OFFLINE']);

// Définition de l'énumération AltitudeMode
const AltitudeMode =  new Enum('AltitudeMode', ['clampToGround']);

// Modèle Coordinates
const Coordinates = Class.newInstance('Coordinates')
    Coordinates.addAttribute('latitude', Number)
    Coordinates.addAttribute('longitude', Number)
    Coordinates.addAttribute('altitude', Number);

// Modèle Point
const Point = Class.newInstance('Point')
    Point.addAttribute('altitudeMode', AltitudeMode)
    //Point.addAttribute('coordinates', Coordinates);

// Modèle Station
const Station = Class.newInstance('Station')
    Station.addAttribute('name', String)
    Station.addAttribute('visibility', Boolean)
    Station.addAttribute('address', String)
    Station.addAttribute('description', String);

// Modèle Data
const Data = Class.newInstance('Data')
    Data.addAttribute('displayName', String);

// Modèle CPnumData (hérite de Data)
const CPnumData = Class.newInstance('CPnumData', Data)
    CPnumData.addAttribute('value', Number);

// Modèle ChargingDeviceData (hérite de Data)
const ChargingDeviceData = Class.newInstance('ChargingDeviceData', Data);

// Modèle ChargingDevice
const ChargingDevice = Class.newInstance('ChargingDevice')
    ChargingDevice.addAttribute('id', Number)
    ChargingDevice.addAttribute('name', String)
    ChargingDevice.addAttribute('numberOfConnectors', Number);

// Modèle Connector
const Connector = Class.newInstance('Connector')
    Connector.addAttribute('id', Number)
    Connector.addAttribute('name', String)
    Connector.addAttribute('maxchspeed', Number)
    Connector.addAttribute('connector', Number)
    Connector.addAttribute('description', ChargingStatus);

// Relations
Station.addReference('extendedData', Data,2);
Station.addReference('location', Point, 1);
ChargingDeviceData.addReference('value', ChargingDevice, 1);
ChargingDevice.addReference('connectorList', Connector, -1 );
Point.addReference('coordinates', Coordinates, 1);

// Export des modèles
module.exports = {
    Station,
    Data,
    CPnumData,
    ChargingDeviceData,
    Point,
    ChargingDevice,
    Connector,
    ChargingStatus,
    AltitudeMode
};


// Exemple de création d'une instance
const stationInstance = Station.newInstance({
    name: "Station A",
    visibility: true,
    address: "123 Avenue, Paris",
    description: "Station de recharge rapide",
    //point: Point.newInstance({
     //   altitudeMode: AltitudeMode.clampToGround
   // })
});

var point = Point.newInstance({
        altitudeMode: AltitudeMode.clampToGround
 });

console.log(point.coordinates);
var coordinates = Coordinates.newInstance({ 
	latitude: 48.8566, longitude: 2.3522, altitude: 35 
});

point.coordinates =coordinates;

stationInstance.location = point;


console.log(JSON.stringify(stationInstance, null, 2));

