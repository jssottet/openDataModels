const fs = require('fs');
const { JSDOM } = require('jsdom');
const { XMLParser } = require('fast-xml-parser');
const { Station, Data, CPnumData, ChargingDeviceData, Point, ChargingDevice, Connector, ChargingStatus, AltitudeMode, Coordinates } = require('./chargykml.js'); // Import du métamodèle

// Fonction pour parser le KML et créer les instances JSMF
function parseKML(kmlFilePath) {
    const xmlData = fs.readFileSync(kmlFilePath, 'utf8');
    const parser = new XMLParser({ ignoreAttributes: false, parseAttributeValue: true });
    const kmlJSON = parser.parse(xmlData);

    // Extraire les Placemarks (Stations)
    const placemarks = kmlJSON.kml.Document.Placemark;
    const stations = [];

    placemarks.forEach(placemark => {
        const name = placemark.name;
        const visibility = placemark.visibility === "1";
        const address = placemark.address;
        const description = placemark.description;
        const altitudeMode = placemark.Point?.altitudeMode || "clampToGround";
        const altitudeModeToSet = AltitudeMode.altitudeMode

        // Extraire les coordonnées
        const [longitude, latitude] = placemark.Point?.coordinates.split(',').map(parseFloat);
        const pointInstance = Point.newInstance({ altitudeMode : altitudeModeToSet });

        // Ajouter les coordonnées à Point
        const coordinatesInstance = Coordinates.newInstance({
            latitude : latitude,
            longitude :longitude,
            altitude: 0 // Pas d'altitude dans le fichier KML
        });

        pointInstance.coordinates = coordinatesInstance;

        // Extraire les données étendues (ExtendedData)
        const extendedData = placemark.ExtendedData.Data;
        const dataInstances = [];

        extendedData.forEach(data => {
            if (data.name === "CPnum") {
                const cpnumInstance = CPnumData.newInstance({
                    displayName: data.displayName,
                    value: parseInt(data.value)
                });
                dataInstances.push(cpnumInstance);
            }

            if (data.name === "chargingdevice") {
                const deviceInfo = JSON.parse(data.value);
                const deviceInstance = ChargingDevice.newInstance({
                    id: deviceInfo.id,
                    name: deviceInfo.name,
                    numberOfConnectors: deviceInfo.numberOfConnectors
                });

                // Création des connecteurs
                const connectors = deviceInfo.connectors.map(conn => Connector.newInstance({
                    id: conn.id,
                    name: conn.name,
                    maxchspeed: conn.maxchspeed,
                    connector: conn.connector,
                    description: ChargingStatus[conn.description] || "UNKNOWN"
                }));

                deviceInstance.connectorList = connectors;
                dataInstances.push(deviceInstance);
            }
        });

        // Création de l'instance Station
        const stationInstance = Station.newInstance({
            name,
            visibility,
            address,
            description
        });

        // Associer les objets
        stationInstance.location = pointInstance;
        stationInstance.extendedData = dataInstances;

        // Ajouter à la liste des stations
        stations.push(stationInstance);
    });

    return stations;
}

// Exécution de la transformation
const stationsInstances = parseKML('chargy.kml');

// Afficher les résultats
console.log(JSON.stringify(stationsInstances, null, 2));
