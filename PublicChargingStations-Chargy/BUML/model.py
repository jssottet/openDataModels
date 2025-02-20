# Generated B-UML Model
from besser.BUML.metamodel.structural import (
    Class, Property, Method, Parameter,
    BinaryAssociation, Generalization, DomainModel,
    Enumeration, EnumerationLiteral, Multiplicity,
    StringType, IntegerType, FloatType, BooleanType,
    TimeType, DateType, DateTimeType, TimeDeltaType,
    Constraint
)

# Enumerations
AltitudeMode: Enumeration = Enumeration(
    name="AltitudeMode",
    literals={
            EnumerationLiteral(name="clampToGround")
    }
)

ChargingStatus: Enumeration = Enumeration(
    name="ChargingStatus",
    literals={
            EnumerationLiteral(name="AVAILABLE"),
			EnumerationLiteral(name="CHARGING"),
			EnumerationLiteral(name="OFFLINE")
    }
)

# Classes
CPnumData = Class(name="CPnumData")
ChargingDeviceData = Class(name="ChargingDeviceData")
Point = Class(name="Point")
ChargingDevice = Class(name="ChargingDevice")
Station = Class(name="Station")
Coordinates = Class(name="Coordinates")
Data = Class(name="Data")
Connector = Class(name="Connector")

# CPnumData class attributes and methods
CPnumData_value: Property = Property(name="value", type=IntegerType)
CPnumData.attributes={CPnumData_value}

# ChargingDeviceData class attributes and methods

# Point class attributes and methods
Point_altitudeMode: Property = Property(name="altitudeMode", type=AltitudeMode)
Point_coordinates: Property = Property(name="coordinates", type=Coordinates)
Point.attributes={Point_altitudeMode, Point_coordinates}

# ChargingDevice class attributes and methods
ChargingDevice_id: Property = Property(name="id", type=IntegerType)
ChargingDevice_name: Property = Property(name="name", type=StringType)
ChargingDevice_numberOfConnectors: Property = Property(name="numberOfConnectors", type=IntegerType)
ChargingDevice.attributes={ChargingDevice_id, ChargingDevice_name, ChargingDevice_numberOfConnectors}

# Station class attributes and methods
Station_visibility: Property = Property(name="visibility", type=BooleanType)
Station_description: Property = Property(name="description", type=StringType)
Station_name: Property = Property(name="name", type=StringType)
Station_address: Property = Property(name="address", type=StringType)
Station.attributes={Station_visibility, Station_description, Station_name, Station_address}

# Coordinates class attributes and methods
Coordinates_lat: Property = Property(name="lat", type=FloatType)
Coordinates_long: Property = Property(name="long", type=FloatType)
Coordinates.attributes={Coordinates_lat, Coordinates_long}

# Data class attributes and methods
Data_displayName: Property = Property(name="displayName", type=StringType)
Data.attributes={Data_displayName}

# Connector class attributes and methods
Connector_maxchspeed: Property = Property(name="maxchspeed", type=FloatType)
Connector_connector: Property = Property(name="connector", type=IntegerType)
Connector_id: Property = Property(name="id", type=IntegerType)
Connector_name: Property = Property(name="name", type=StringType)
Connector_description: Property = Property(name="description", type=ChargingStatus)
Connector.attributes={Connector_maxchspeed, Connector_connector, Connector_id, Connector_name, Connector_description}

# Relationships
point: BinaryAssociation = BinaryAssociation(
    name="point",
    ends={
        Property(name="Station", type=Station, multiplicity=Multiplicity(1, 1)),
        Property(name="Point", type=Point, multiplicity=Multiplicity(1, 1))
    }
)
connectors: BinaryAssociation = BinaryAssociation(
    name="connectors",
    ends={
        Property(name="ChargingDevice", type=ChargingDevice, multiplicity=Multiplicity(1, 1)),
        Property(name="Connector", type=Connector, multiplicity=Multiplicity(1, 9999))
    }
)
value: BinaryAssociation = BinaryAssociation(
    name="value",
    ends={
        Property(name="ChargingDevice", type=ChargingDevice, multiplicity=Multiplicity(1, 1)),
        Property(name="ChargingDeviceData", type=ChargingDeviceData, multiplicity=Multiplicity(1, 1))
    }
)
ExtendedData: BinaryAssociation = BinaryAssociation(
    name="ExtendedData",
    ends={
        Property(name="Data", type=Data, multiplicity=Multiplicity(2, 2)),
        Property(name="Station", type=Station, multiplicity=Multiplicity(1, 1))
    }
)

# Generalizations
gen_ChargingDeviceData_Data = Generalization(general=Data, specific=ChargingDeviceData)
gen_CPnumData_Data = Generalization(general=Data, specific=CPnumData)

# Domain Model
domain_model = DomainModel(
    name="Domain Model",
    types={CPnumData, ChargingDeviceData, Point, ChargingDevice, Station, Coordinates, Data, Connector, AltitudeMode, ChargingStatus},
    associations={point, connectors, value, ExtendedData},
    generalizations={gen_ChargingDeviceData_Data, gen_CPnumData_Data}
)
