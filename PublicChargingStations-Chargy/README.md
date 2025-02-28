# Description
This describe the chargy (KML file) structural model.

The DataModelChargyIllustration is providing a graphical mapping on the file and the metamodel elements. Note that the structural file is removing graphical elements (like icons) and providing an unified view either the data are in XML or in JSON objects (both are in the KML file).
It takes a specific view on the data; implementing specific heuristic on how to represent information contained in the files.

## Structure and Files
Different implementation in modelling framework are (or will be) available in subfolders.
the .plantuml file contains the UML representation in plant UML used to specific the file format.
chargykml.png is the graphical representation as provided by plantUML.
The .pdf file shows how structure is linked to the data.

## Current implementation

### JSMF
To install JSMF-core and dependencies to process files
``` npm install ``` 

The ` chargykml.js ` contains the JSMF metamodel (structure) and an example of JSMF instanciation

To import a jsmf model from a KML file conforms to the JSMF metamodel :
```node transform.js ```
Replace the path to the kml file with your data file.

### B-UML
To install necessary component to B-UML refers to [BESSER documentation](https://besser.readthedocs.io/en/latest/installation.html)
