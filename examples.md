# Example synths

Since we don't have a UI for saving/loading multiple synths, you'll have to copy the JSON from here and paste it into the local storage item `imageSynthState`.

## Minimal setup

```json
{
  "modules": [
    {
      "id": "coordinate-1749906537447",
      "definitionId": "coordinate",
      "position": {
        "x": 48,
        "y": 314
      },
      "parameters": {}
    },
    {
      "id": "rgbcolor-1749906543232",
      "definitionId": "rgbcolor",
      "position": {
        "x": 301,
        "y": 299
      },
      "parameters": {}
    },
    {
      "id": "output",
      "definitionId": "output",
      "position": {
        "x": 551,
        "y": 258
      },
      "parameters": {}
    }
  ],
  "connections": [
    {
      "id": "coordinate-1749906537447-X-rgbcolor-1749906543232-R",
      "fromModuleId": "coordinate-1749906537447",
      "fromOutputName": "X",
      "toModuleId": "rgbcolor-1749906543232",
      "toInputName": "R"
    },
    {
      "id": "coordinate-1749906537447-Y-rgbcolor-1749906543232-B",
      "fromModuleId": "coordinate-1749906537447",
      "fromOutputName": "Y",
      "toModuleId": "rgbcolor-1749906543232",
      "toInputName": "B"
    },
    {
      "id": "rgbcolor-1749906543232-Color-output-Image",
      "fromModuleId": "rgbcolor-1749906543232",
      "fromOutputName": "Color",
      "toModuleId": "output",
      "toInputName": "Image"
    }
  ],
  "lastUpdated": 1749906560637,
  "moduleMap": {},
  "connectionMap": {},
  "connectionsByInput": {},
  "definitionMap": {},
  "transform": {
    "scale": 1.6399999999999932,
    "x": -41.59999999999965,
    "y": -245.11999999999648
  }
}
```

## Circle

```json
{
  "transform": {
    "scale": 1.2299999999999969,
    "x": -6.959999999999809,
    "y": -47.73999999999921
  },
  "modules": [
    {
      "id": "coordinate-1749906077596",
      "definitionId": "coordinate",
      "position": {
        "x": 34,
        "y": 423
      },
      "parameters": {}
    },
    {
      "id": "length-1749906088043",
      "definitionId": "length",
      "position": {
        "x": 255,
        "y": 255
      },
      "parameters": {}
    },
    {
      "id": "number-1749906096859",
      "definitionId": "number",
      "position": {
        "x": 50,
        "y": 133
      },
      "parameters": {
        "Value": 0.5
      }
    },
    {
      "id": "number-1749906114163",
      "definitionId": "number",
      "position": {
        "x": 49,
        "y": 278
      },
      "parameters": {
        "Value": 0.5
      }
    },
    {
      "id": "clip-1749906140485",
      "definitionId": "clip",
      "position": {
        "x": 424,
        "y": 310
      },
      "parameters": {
        "Threshold": 0.45
      }
    },
    {
      "id": "rgbcolor-1749906171334",
      "definitionId": "rgbcolor",
      "position": {
        "x": 639,
        "y": 298
      },
      "parameters": {}
    },
    {
      "id": "output",
      "definitionId": "output",
      "position": {
        "x": 821,
        "y": 252
      },
      "parameters": {}
    }
  ],
  "connections": [
    {
      "id": "coordinate-1749906077596-X-length-1749906088043-X2",
      "fromModuleId": "coordinate-1749906077596",
      "fromOutputName": "X",
      "toModuleId": "length-1749906088043",
      "toInputName": "X2"
    },
    {
      "id": "coordinate-1749906077596-Y-length-1749906088043-Y2",
      "fromModuleId": "coordinate-1749906077596",
      "fromOutputName": "Y",
      "toModuleId": "length-1749906088043",
      "toInputName": "Y2"
    },
    {
      "id": "number-1749906096859-Value-length-1749906088043-X1",
      "fromModuleId": "number-1749906096859",
      "fromOutputName": "Value",
      "toModuleId": "length-1749906088043",
      "toInputName": "X1"
    },
    {
      "id": "number-1749906114163-Value-length-1749906088043-Y1",
      "fromModuleId": "number-1749906114163",
      "fromOutputName": "Value",
      "toModuleId": "length-1749906088043",
      "toInputName": "Y1"
    },
    {
      "id": "length-1749906088043-Length-clip-1749906140485-Value",
      "fromModuleId": "length-1749906088043",
      "fromOutputName": "Length",
      "toModuleId": "clip-1749906140485",
      "toInputName": "Value"
    },
    {
      "id": "rgbcolor-1749906171334-Color-output-Image",
      "fromModuleId": "rgbcolor-1749906171334",
      "fromOutputName": "Color",
      "toModuleId": "output",
      "toInputName": "Image"
    },
    {
      "id": "clip-1749906140485-Result-rgbcolor-1749906171334-G",
      "fromModuleId": "clip-1749906140485",
      "fromOutputName": "Result",
      "toModuleId": "rgbcolor-1749906171334",
      "toInputName": "G"
    }
  ],
  "lastUpdated": 1749906244243,
  "moduleMap": {},
  "connectionMap": {},
  "connectionsByInput": {},
  "definitionMap": {}
}
```

## Double spiral

```json
{
  "transform": {
    "scale": 0.8622323801403385,
    "x": 17.866594015822102,
    "y": 77.57022920098393
  },
  "modules": [
    {
      "id": "coordinate-1749819397323",
      "definitionId": "coordinate",
      "position": {
        "x": -6,
        "y": 587
      },
      "parameters": {}
    },
    {
      "id": "length-1749819404701",
      "definitionId": "length",
      "position": {
        "x": 240,
        "y": 120
      },
      "parameters": {}
    },
    {
      "id": "number-1749819409200",
      "definitionId": "number",
      "position": {
        "x": 2,
        "y": 253
      },
      "parameters": {
        "Value": 0.5
      }
    },
    {
      "id": "angle-1749819441403",
      "definitionId": "angle",
      "position": {
        "x": 237,
        "y": 458
      },
      "parameters": {}
    },
    {
      "id": "output",
      "definitionId": "output",
      "position": {
        "x": 1729,
        "y": 356
      },
      "parameters": {}
    },
    {
      "id": "rgbcolor-1749819468222",
      "definitionId": "rgbcolor",
      "position": {
        "x": 1581,
        "y": 438
      },
      "parameters": {}
    },
    {
      "id": "divide-1749819528088",
      "definitionId": "divide",
      "position": {
        "x": 383,
        "y": 458
      },
      "parameters": {}
    },
    {
      "id": "number-1749819545017",
      "definitionId": "number",
      "position": {
        "x": 230,
        "y": 682
      },
      "parameters": {
        "Value": 6.2831853072
      }
    },
    {
      "id": "add-1749820259684",
      "definitionId": "add",
      "position": {
        "x": 551,
        "y": 513
      },
      "parameters": {}
    },
    {
      "id": "number-1749820287907",
      "definitionId": "number",
      "position": {
        "x": 392,
        "y": 682
      },
      "parameters": {
        "Value": 0.5
      }
    },
    {
      "id": "multiply-1749820346738",
      "definitionId": "multiply",
      "position": {
        "x": 702,
        "y": 511
      },
      "parameters": {}
    },
    {
      "id": "number-1749820358239",
      "definitionId": "number",
      "position": {
        "x": 539,
        "y": 809
      },
      "parameters": {
        "Value": 0.3
      }
    },
    {
      "id": "add-1749820383758",
      "definitionId": "add",
      "position": {
        "x": 845,
        "y": 395
      },
      "parameters": {}
    },
    {
      "id": "divide-1749820410026",
      "definitionId": "divide",
      "position": {
        "x": 985,
        "y": 492
      },
      "parameters": {}
    },
    {
      "id": "clip-1749821536820",
      "definitionId": "clip",
      "position": {
        "x": 1142,
        "y": 529
      },
      "parameters": {
        "Threshold": 0.15
      }
    },
    {
      "id": "number-1749821871295",
      "definitionId": "number",
      "position": {
        "x": 1,
        "y": 394
      },
      "parameters": {
        "Value": 0.5
      }
    },
    {
      "id": "divide-1749849390459",
      "definitionId": "divide",
      "position": {
        "x": 1029,
        "y": 117
      },
      "parameters": {}
    },
    {
      "id": "number-1749849410060",
      "definitionId": "number",
      "position": {
        "x": 884,
        "y": 196
      },
      "parameters": {
        "Value": 0.1
      }
    },
    {
      "id": "clip-1749849619576",
      "definitionId": "clip",
      "position": {
        "x": 1187,
        "y": 168
      },
      "parameters": {
        "Threshold": 0.04
      }
    },
    {
      "id": "multiply-1749849640299",
      "definitionId": "multiply",
      "position": {
        "x": 1368,
        "y": 171
      },
      "parameters": {}
    },
    {
      "id": "add-1749849896922",
      "definitionId": "add",
      "position": {
        "x": 886,
        "y": -10
      },
      "parameters": {}
    },
    {
      "id": "multiply-1749850475399",
      "definitionId": "multiply",
      "position": {
        "x": 749,
        "y": 171
      },
      "parameters": {}
    },
    {
      "id": "number-1749850497143",
      "definitionId": "number",
      "position": {
        "x": 605,
        "y": 196
      },
      "parameters": {
        "Value": 1.2
      }
    }
  ],
  "connections": [
    {
      "id": "number-1749819409200-Value-length-1749819404701-X1",
      "fromModuleId": "number-1749819409200",
      "fromOutputName": "Value",
      "toModuleId": "length-1749819404701",
      "toInputName": "X1"
    },
    {
      "id": "number-1749821871295-Value-length-1749819404701-Y1",
      "fromModuleId": "number-1749821871295",
      "fromOutputName": "Value",
      "toModuleId": "length-1749819404701",
      "toInputName": "Y1"
    },
    {
      "id": "coordinate-1749819397323-X-length-1749819404701-X2",
      "fromModuleId": "coordinate-1749819397323",
      "fromOutputName": "X",
      "toModuleId": "length-1749819404701",
      "toInputName": "X2"
    },
    {
      "id": "coordinate-1749819397323-Y-length-1749819404701-Y2",
      "fromModuleId": "coordinate-1749819397323",
      "fromOutputName": "Y",
      "toModuleId": "length-1749819404701",
      "toInputName": "Y2"
    },
    {
      "id": "number-1749819409200-Value-angle-1749819441403-X1",
      "fromModuleId": "number-1749819409200",
      "fromOutputName": "Value",
      "toModuleId": "angle-1749819441403",
      "toInputName": "X1"
    },
    {
      "id": "number-1749821871295-Value-angle-1749819441403-Y1",
      "fromModuleId": "number-1749821871295",
      "fromOutputName": "Value",
      "toModuleId": "angle-1749819441403",
      "toInputName": "Y1"
    },
    {
      "id": "coordinate-1749819397323-X-angle-1749819441403-X2",
      "fromModuleId": "coordinate-1749819397323",
      "fromOutputName": "X",
      "toModuleId": "angle-1749819441403",
      "toInputName": "X2"
    },
    {
      "id": "coordinate-1749819397323-Y-angle-1749819441403-Y2",
      "fromModuleId": "coordinate-1749819397323",
      "fromOutputName": "Y",
      "toModuleId": "angle-1749819441403",
      "toInputName": "Y2"
    },
    {
      "id": "rgbcolor-1749819468222-Color-output-Image",
      "fromModuleId": "rgbcolor-1749819468222",
      "fromOutputName": "Color",
      "toModuleId": "output",
      "toInputName": "Image"
    },
    {
      "id": "number-1749819545017-Value-divide-1749819528088-B",
      "fromModuleId": "number-1749819545017",
      "fromOutputName": "Value",
      "toModuleId": "divide-1749819528088",
      "toInputName": "B"
    },
    {
      "id": "angle-1749819441403-Angle-divide-1749819528088-A",
      "fromModuleId": "angle-1749819441403",
      "fromOutputName": "Angle",
      "toModuleId": "divide-1749819528088",
      "toInputName": "A"
    },
    {
      "id": "divide-1749819528088-Quotient-add-1749820259684-A",
      "fromModuleId": "divide-1749819528088",
      "fromOutputName": "Quotient",
      "toModuleId": "add-1749820259684",
      "toInputName": "A"
    },
    {
      "id": "number-1749820287907-Value-add-1749820259684-B",
      "fromModuleId": "number-1749820287907",
      "fromOutputName": "Value",
      "toModuleId": "add-1749820259684",
      "toInputName": "B"
    },
    {
      "id": "number-1749820358239-Value-multiply-1749820346738-B",
      "fromModuleId": "number-1749820358239",
      "fromOutputName": "Value",
      "toModuleId": "multiply-1749820346738",
      "toInputName": "B"
    },
    {
      "id": "length-1749819404701-Length-add-1749820383758-A",
      "fromModuleId": "length-1749819404701",
      "fromOutputName": "Length",
      "toModuleId": "add-1749820383758",
      "toInputName": "A"
    },
    {
      "id": "multiply-1749820346738-Result-add-1749820383758-B",
      "fromModuleId": "multiply-1749820346738",
      "fromOutputName": "Result",
      "toModuleId": "add-1749820383758",
      "toInputName": "B"
    },
    {
      "id": "add-1749820383758-Result-divide-1749820410026-A",
      "fromModuleId": "add-1749820383758",
      "fromOutputName": "Result",
      "toModuleId": "divide-1749820410026",
      "toInputName": "A"
    },
    {
      "id": "number-1749820358239-Value-divide-1749820410026-B",
      "fromModuleId": "number-1749820358239",
      "fromOutputName": "Value",
      "toModuleId": "divide-1749820410026",
      "toInputName": "B"
    },
    {
      "id": "divide-1749820410026-Remainder-clip-1749821536820-Value",
      "fromModuleId": "divide-1749820410026",
      "fromOutputName": "Remainder",
      "toModuleId": "clip-1749821536820",
      "toInputName": "Value"
    },
    {
      "id": "add-1749820259684-Result-multiply-1749820346738-A",
      "fromModuleId": "add-1749820259684",
      "fromOutputName": "Result",
      "toModuleId": "multiply-1749820346738",
      "toInputName": "A"
    },
    {
      "id": "number-1749849410060-Value-divide-1749849390459-B",
      "fromModuleId": "number-1749849410060",
      "fromOutputName": "Value",
      "toModuleId": "divide-1749849390459",
      "toInputName": "B"
    },
    {
      "id": "divide-1749849390459-Remainder-clip-1749849619576-Value",
      "fromModuleId": "divide-1749849390459",
      "fromOutputName": "Remainder",
      "toModuleId": "clip-1749849619576",
      "toInputName": "Value"
    },
    {
      "id": "clip-1749821536820-Result-multiply-1749849640299-B",
      "fromModuleId": "clip-1749821536820",
      "fromOutputName": "Result",
      "toModuleId": "multiply-1749849640299",
      "toInputName": "B"
    },
    {
      "id": "length-1749819404701-Length-add-1749849896922-A",
      "fromModuleId": "length-1749819404701",
      "fromOutputName": "Length",
      "toModuleId": "add-1749849896922",
      "toInputName": "A"
    },
    {
      "id": "add-1749849896922-Result-divide-1749849390459-A",
      "fromModuleId": "add-1749849896922",
      "fromOutputName": "Result",
      "toModuleId": "divide-1749849390459",
      "toInputName": "A"
    },
    {
      "id": "clip-1749849619576-Result-multiply-1749849640299-A",
      "fromModuleId": "clip-1749849619576",
      "fromOutputName": "Result",
      "toModuleId": "multiply-1749849640299",
      "toInputName": "A"
    },
    {
      "id": "add-1749820259684-Result-multiply-1749850475399-B",
      "fromModuleId": "add-1749820259684",
      "fromOutputName": "Result",
      "toModuleId": "multiply-1749850475399",
      "toInputName": "B"
    },
    {
      "id": "multiply-1749850475399-Result-add-1749849896922-B",
      "fromModuleId": "multiply-1749850475399",
      "fromOutputName": "Result",
      "toModuleId": "add-1749849896922",
      "toInputName": "B"
    },
    {
      "id": "number-1749850497143-Value-multiply-1749850475399-A",
      "fromModuleId": "number-1749850497143",
      "fromOutputName": "Value",
      "toModuleId": "multiply-1749850475399",
      "toInputName": "A"
    },
    {
      "id": "multiply-1749849640299-Result-rgbcolor-1749819468222-B",
      "fromModuleId": "multiply-1749849640299",
      "fromOutputName": "Result",
      "toModuleId": "rgbcolor-1749819468222",
      "toInputName": "B"
    },
    {
      "id": "multiply-1749849640299-Result-rgbcolor-1749819468222-G",
      "fromModuleId": "multiply-1749849640299",
      "fromOutputName": "Result",
      "toModuleId": "rgbcolor-1749819468222",
      "toInputName": "G"
    },
    {
      "id": "clip-1749821536820-Result-rgbcolor-1749819468222-R",
      "fromModuleId": "clip-1749821536820",
      "fromOutputName": "Result",
      "toModuleId": "rgbcolor-1749819468222",
      "toInputName": "R"
    }
  ],
  "lastUpdated": 1749851928377,
  "moduleMap": {},
  "connectionMap": {},
  "connectionsByInput": {},
  "definitionMap": {}
}
```

## Triginometry test

```json
{
  "transform": {
    "scale": 0.7749999999999949,
    "x": -58.987726905235036,
    "y": 111.8541648864063
  },
  "modules": [
    {
      "id": "coordinate-1749579968549",
      "definitionId": "coordinate",
      "position": {
        "x": 101,
        "y": 483
      },
      "parameters": {}
    },
    {
      "id": "angle-1749579971016",
      "definitionId": "angle",
      "position": {
        "x": 385,
        "y": 392
      },
      "parameters": {}
    },
    {
      "id": "number-1749579975202",
      "definitionId": "number",
      "position": {
        "x": 105,
        "y": 129
      },
      "parameters": {
        "Value": 0.45
      }
    },
    {
      "id": "number-1749579987552",
      "definitionId": "number",
      "position": {
        "x": 105,
        "y": 300
      },
      "parameters": {
        "Value": 0.5
      }
    },
    {
      "id": "output",
      "definitionId": "output",
      "position": {
        "x": 1497,
        "y": 278
      },
      "parameters": {}
    },
    {
      "id": "trigonometry-1749580037922",
      "definitionId": "trigonometry",
      "position": {
        "x": 536,
        "y": 411
      },
      "parameters": {}
    },
    {
      "id": "rgbcolor-1749580053007",
      "definitionId": "rgbcolor",
      "position": {
        "x": 1342,
        "y": 379
      },
      "parameters": {}
    },
    {
      "id": "length-1749580282889",
      "definitionId": "length",
      "position": {
        "x": 386,
        "y": 166
      },
      "parameters": {}
    },
    {
      "id": "multiply-1749580351827",
      "definitionId": "multiply",
      "position": {
        "x": 542,
        "y": -6
      },
      "parameters": {}
    },
    {
      "id": "number-1749580359710",
      "definitionId": "number",
      "position": {
        "x": 386,
        "y": -11
      },
      "parameters": {
        "Value": 0.5
      }
    },
    {
      "id": "multiply-1749580378029",
      "definitionId": "multiply",
      "position": {
        "x": 694,
        "y": 149
      },
      "parameters": {}
    },
    {
      "id": "multiply-1749580464499",
      "definitionId": "multiply",
      "position": {
        "x": 859,
        "y": 211
      },
      "parameters": {}
    },
    {
      "id": "add-1749580575108",
      "definitionId": "add",
      "position": {
        "x": 862,
        "y": 398
      },
      "parameters": {}
    },
    {
      "id": "divide-1749580667599",
      "definitionId": "divide",
      "position": {
        "x": 1019,
        "y": 470
      },
      "parameters": {}
    },
    {
      "id": "number-1749580685567",
      "definitionId": "number",
      "position": {
        "x": 376,
        "y": 677
      },
      "parameters": {
        "Value": 0.85
      }
    },
    {
      "id": "mix-1749580865695",
      "definitionId": "mix",
      "position": {
        "x": 1172,
        "y": 486
      },
      "parameters": {
        "Factor": 0.73
      }
    },
    {
      "id": "divide-1749580957398",
      "definitionId": "divide",
      "position": {
        "x": 1161,
        "y": 242
      },
      "parameters": {}
    },
    {
      "id": "number-1749580966782",
      "definitionId": "number",
      "position": {
        "x": 1023,
        "y": 284
      },
      "parameters": {
        "Value": 0.35
      }
    },
    {
      "id": "multiply-1749581247097",
      "definitionId": "multiply",
      "position": {
        "x": 570,
        "y": 612
      },
      "parameters": {}
    }
  ],
  "connections": [
    {
      "id": "coordinate-1749579968549-X-angle-1749579971016-X2",
      "fromModuleId": "coordinate-1749579968549",
      "fromOutputName": "X",
      "toModuleId": "angle-1749579971016",
      "toInputName": "X2"
    },
    {
      "id": "coordinate-1749579968549-Y-angle-1749579971016-Y2",
      "fromModuleId": "coordinate-1749579968549",
      "fromOutputName": "Y",
      "toModuleId": "angle-1749579971016",
      "toInputName": "Y2"
    },
    {
      "id": "number-1749579975202-Value-angle-1749579971016-X1",
      "fromModuleId": "number-1749579975202",
      "fromOutputName": "Value",
      "toModuleId": "angle-1749579971016",
      "toInputName": "X1"
    },
    {
      "id": "number-1749579987552-Value-angle-1749579971016-Y1",
      "fromModuleId": "number-1749579987552",
      "fromOutputName": "Value",
      "toModuleId": "angle-1749579971016",
      "toInputName": "Y1"
    },
    {
      "id": "angle-1749579971016-Angle-trigonometry-1749580037922-Angle",
      "fromModuleId": "angle-1749579971016",
      "fromOutputName": "Angle",
      "toModuleId": "trigonometry-1749580037922",
      "toInputName": "Angle"
    },
    {
      "id": "rgbcolor-1749580053007-Color-output-Image",
      "fromModuleId": "rgbcolor-1749580053007",
      "fromOutputName": "Color",
      "toModuleId": "output",
      "toInputName": "Image"
    },
    {
      "id": "number-1749579975202-Value-length-1749580282889-X1",
      "fromModuleId": "number-1749579975202",
      "fromOutputName": "Value",
      "toModuleId": "length-1749580282889",
      "toInputName": "X1"
    },
    {
      "id": "number-1749579987552-Value-length-1749580282889-Y1",
      "fromModuleId": "number-1749579987552",
      "fromOutputName": "Value",
      "toModuleId": "length-1749580282889",
      "toInputName": "Y1"
    },
    {
      "id": "coordinate-1749579968549-X-length-1749580282889-X2",
      "fromModuleId": "coordinate-1749579968549",
      "fromOutputName": "X",
      "toModuleId": "length-1749580282889",
      "toInputName": "X2"
    },
    {
      "id": "coordinate-1749579968549-Y-length-1749580282889-Y2",
      "fromModuleId": "coordinate-1749579968549",
      "fromOutputName": "Y",
      "toModuleId": "length-1749580282889",
      "toInputName": "Y2"
    },
    {
      "id": "length-1749580282889-Length-multiply-1749580351827-B",
      "fromModuleId": "length-1749580282889",
      "fromOutputName": "Length",
      "toModuleId": "multiply-1749580351827",
      "toInputName": "B"
    },
    {
      "id": "number-1749580359710-Value-multiply-1749580351827-A",
      "fromModuleId": "number-1749580359710",
      "fromOutputName": "Value",
      "toModuleId": "multiply-1749580351827",
      "toInputName": "A"
    },
    {
      "id": "multiply-1749580351827-Result-multiply-1749580378029-A",
      "fromModuleId": "multiply-1749580351827",
      "fromOutputName": "Result",
      "toModuleId": "multiply-1749580378029",
      "toInputName": "A"
    },
    {
      "id": "trigonometry-1749580037922-Tan-multiply-1749580378029-B",
      "fromModuleId": "trigonometry-1749580037922",
      "fromOutputName": "Tan",
      "toModuleId": "multiply-1749580378029",
      "toInputName": "B"
    },
    {
      "id": "multiply-1749580378029-Result-multiply-1749580464499-A",
      "fromModuleId": "multiply-1749580378029",
      "fromOutputName": "Result",
      "toModuleId": "multiply-1749580464499",
      "toInputName": "A"
    },
    {
      "id": "trigonometry-1749580037922-Sin-multiply-1749580464499-B",
      "fromModuleId": "trigonometry-1749580037922",
      "fromOutputName": "Sin",
      "toModuleId": "multiply-1749580464499",
      "toInputName": "B"
    },
    {
      "id": "multiply-1749580378029-Result-add-1749580575108-A",
      "fromModuleId": "multiply-1749580378029",
      "fromOutputName": "Result",
      "toModuleId": "add-1749580575108",
      "toInputName": "A"
    },
    {
      "id": "trigonometry-1749580037922-Sin-add-1749580575108-B",
      "fromModuleId": "trigonometry-1749580037922",
      "fromOutputName": "Sin",
      "toModuleId": "add-1749580575108",
      "toInputName": "B"
    },
    {
      "id": "add-1749580575108-Result-divide-1749580667599-A",
      "fromModuleId": "add-1749580575108",
      "fromOutputName": "Result",
      "toModuleId": "divide-1749580667599",
      "toInputName": "A"
    },
    {
      "id": "divide-1749580667599-Remainder-rgbcolor-1749580053007-G",
      "fromModuleId": "divide-1749580667599",
      "fromOutputName": "Remainder",
      "toModuleId": "rgbcolor-1749580053007",
      "toInputName": "G"
    },
    {
      "id": "divide-1749580667599-Remainder-mix-1749580865695-B",
      "fromModuleId": "divide-1749580667599",
      "fromOutputName": "Remainder",
      "toModuleId": "mix-1749580865695",
      "toInputName": "B"
    },
    {
      "id": "mix-1749580865695-Result-rgbcolor-1749580053007-B",
      "fromModuleId": "mix-1749580865695",
      "fromOutputName": "Result",
      "toModuleId": "rgbcolor-1749580053007",
      "toInputName": "B"
    },
    {
      "id": "divide-1749580667599-Whole-mix-1749580865695-A",
      "fromModuleId": "divide-1749580667599",
      "fromOutputName": "Whole",
      "toModuleId": "mix-1749580865695",
      "toInputName": "A"
    },
    {
      "id": "number-1749580966782-Value-divide-1749580957398-B",
      "fromModuleId": "number-1749580966782",
      "fromOutputName": "Value",
      "toModuleId": "divide-1749580957398",
      "toInputName": "B"
    },
    {
      "id": "divide-1749580957398-Remainder-rgbcolor-1749580053007-R",
      "fromModuleId": "divide-1749580957398",
      "fromOutputName": "Remainder",
      "toModuleId": "rgbcolor-1749580053007",
      "toInputName": "R"
    },
    {
      "id": "multiply-1749580464499-Result-divide-1749580957398-A",
      "fromModuleId": "multiply-1749580464499",
      "fromOutputName": "Result",
      "toModuleId": "divide-1749580957398",
      "toInputName": "A"
    },
    {
      "id": "multiply-1749581247097-Result-divide-1749580667599-B",
      "fromModuleId": "multiply-1749581247097",
      "fromOutputName": "Result",
      "toModuleId": "divide-1749580667599",
      "toInputName": "B"
    },
    {
      "id": "coordinate-1749579968549-X-multiply-1749581247097-A",
      "fromModuleId": "coordinate-1749579968549",
      "fromOutputName": "X",
      "toModuleId": "multiply-1749581247097",
      "toInputName": "A"
    },
    {
      "id": "number-1749580685567-Value-multiply-1749581247097-B",
      "fromModuleId": "number-1749580685567",
      "fromOutputName": "Value",
      "toModuleId": "multiply-1749581247097",
      "toInputName": "B"
    }
  ],
  "lastUpdated": 1749581589810,
  "moduleMap": {},
  "connectionMap": {},
  "connectionsByInput": {},
  "definitionMap": {}
}
```
