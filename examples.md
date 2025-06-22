# Example synths

Since we don't have a UI for saving/loading multiple synths yet, you'll have to copy the JSON from here, paste it into the local storage item `imageSynthState`, then reload the app.

## Minimal setup

```json
{
  "transform": {
    "scale": 1.6399999999999932,
    "x": 158.40000000000032,
    "y": -182.11999999999648
  },
  "modules": [
    {
      "id": "coordinate-1749906537447",
      "definitionId": "coordinate",
      "position": {
        "x": 48,
        "y": 314
      },
      "inputValues": {}
    },
    {
      "id": "rgbcolor-1749906543232",
      "definitionId": "rgbcolor",
      "position": {
        "x": 301,
        "y": 299
      },
      "inputValues": {
        "G": 0
      }
    },
    {
      "id": "output",
      "definitionId": "output",
      "position": {
        "x": 551,
        "y": 258
      },
      "inputValues": {}
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
  "lastUpdated": 1750615875455,
  "moduleMap": {},
  "connectionMap": {},
  "connectionsByInput": {},
  "definitionMap": {}
}
```

## Circle

```json
{
  "transform": {
    "scale": 1.3949999999999925,
    "x": -15.24250660938037,
    "y": -132.9771761401165
  },
  "modules": [
    {
      "id": "coordinate-1750445449239",
      "definitionId": "coordinate",
      "position": {
        "x": 37,
        "y": 357
      },
      "inputValues": {}
    },
    {
      "id": "length-1750445455689",
      "definitionId": "length",
      "position": {
        "x": 218,
        "y": 315
      },
      "inputValues": {
        "X1": 0,
        "Y1": 0,
        "X2": 0.5,
        "Y2": 0.5
      }
    },
    {
      "id": "subtract-1750445483775",
      "definitionId": "subtract",
      "position": {
        "x": 635,
        "y": 345
      },
      "inputValues": {
        "B": 0,
        "A": 1
      }
    },
    {
      "id": "rgbcolor-1750445533227",
      "definitionId": "rgbcolor",
      "position": {
        "x": 821,
        "y": 330
      },
      "inputValues": {
        "R": 0,
        "G": 0,
        "B": 0
      }
    },
    {
      "id": "output",
      "definitionId": "output",
      "position": {
        "x": 1007,
        "y": 281
      },
      "inputValues": {}
    },
    {
      "id": "clip-1750445613332",
      "definitionId": "clip",
      "position": {
        "x": 409,
        "y": 346
      },
      "inputValues": {
        "Threshold": 0.44999999999999996
      }
    }
  ],
  "connections": [
    {
      "id": "coordinate-1750445449239-X-length-1750445455689-X1",
      "fromModuleId": "coordinate-1750445449239",
      "fromOutputName": "X",
      "toModuleId": "length-1750445455689",
      "toInputName": "X1"
    },
    {
      "id": "coordinate-1750445449239-Y-length-1750445455689-Y1",
      "fromModuleId": "coordinate-1750445449239",
      "fromOutputName": "Y",
      "toModuleId": "length-1750445455689",
      "toInputName": "Y1"
    },
    {
      "id": "rgbcolor-1750445533227-Color-output-Image",
      "fromModuleId": "rgbcolor-1750445533227",
      "fromOutputName": "Color",
      "toModuleId": "output",
      "toInputName": "Image"
    },
    {
      "id": "length-1750445455689-Length-clip-1750445613332-Value",
      "fromModuleId": "length-1750445455689",
      "fromOutputName": "Length",
      "toModuleId": "clip-1750445613332",
      "toInputName": "Value"
    },
    {
      "id": "subtract-1750445483775-Result-rgbcolor-1750445533227-G",
      "fromModuleId": "subtract-1750445483775",
      "fromOutputName": "Result",
      "toModuleId": "rgbcolor-1750445533227",
      "toInputName": "G"
    },
    {
      "id": "clip-1750445613332-Result-subtract-1750445483775-B",
      "fromModuleId": "clip-1750445613332",
      "fromOutputName": "Result",
      "toModuleId": "subtract-1750445483775",
      "toInputName": "B"
    }
  ],
  "lastUpdated": 1750445710456,
  "moduleMap": {},
  "connectionMap": {},
  "connectionsByInput": {},
  "definitionMap": {}
}
```

## Checkerboard

```json
{
  "transform": {
    "scale": 0.9449999999999978,
    "x": 78.82558823529371,
    "y": 46.775294117646695
  },
  "modules": [
    {
      "id": "coordinate-1750459523467",
      "definitionId": "coordinate",
      "position": {
        "x": 238,
        "y": 212
      },
      "inputValues": {}
    },
    {
      "id": "divide-1750459526269",
      "definitionId": "divide",
      "position": {
        "x": 484,
        "y": 91
      },
      "inputValues": {
        "B": 1
      }
    },
    {
      "id": "number-1750459540138",
      "definitionId": "number",
      "position": {
        "x": -51,
        "y": 335
      },
      "inputValues": {
        "Number": 4
      }
    },
    {
      "id": "divide-1750459561570",
      "definitionId": "divide",
      "position": {
        "x": 479,
        "y": 515
      },
      "inputValues": {
        "B": 1
      }
    },
    {
      "id": "rgbcolor-1750459597410",
      "definitionId": "rgbcolor",
      "position": {
        "x": 1345,
        "y": 321
      },
      "inputValues": {
        "R": 0,
        "G": 0,
        "B": 0
      }
    },
    {
      "id": "output",
      "definitionId": "output",
      "position": {
        "x": 1487,
        "y": 256
      },
      "inputValues": {}
    },
    {
      "id": "divide-1750459687202",
      "definitionId": "divide",
      "position": {
        "x": 640,
        "y": 198
      },
      "inputValues": {
        "B": 1
      }
    },
    {
      "id": "clip-1750459767735",
      "definitionId": "clip",
      "position": {
        "x": 798,
        "y": 236
      },
      "inputValues": {
        "Threshold": 0.49999999999999956
      }
    },
    {
      "id": "divide-1750459845276",
      "definitionId": "divide",
      "position": {
        "x": 638,
        "y": 394
      },
      "inputValues": {
        "B": 1
      }
    },
    {
      "id": "clip-1750459864508",
      "definitionId": "clip",
      "position": {
        "x": 795,
        "y": 399
      },
      "inputValues": {
        "Threshold": 0.5
      }
    },
    {
      "id": "add-1750460238978",
      "definitionId": "add",
      "position": {
        "x": 1204,
        "y": 331
      },
      "inputValues": {
        "B": 0
      }
    },
    {
      "id": "mix-1750460298004",
      "definitionId": "mix",
      "position": {
        "x": 1030,
        "y": 218
      },
      "inputValues": {
        "A": 0,
        "B": 0,
        "Factor": 0.5
      }
    },
    {
      "id": "mix-1750460313610",
      "definitionId": "mix",
      "position": {
        "x": 1031,
        "y": 399
      },
      "inputValues": {
        "A": 0,
        "B": 0,
        "Factor": 0.5
      }
    },
    {
      "id": "divide-1750460723048",
      "definitionId": "divide",
      "position": {
        "x": 230,
        "y": 337
      },
      "inputValues": {
        "B": 1,
        "A": 2
      }
    }
  ],
  "connections": [
    {
      "id": "coordinate-1750459523467-X-divide-1750459526269-A",
      "fromModuleId": "coordinate-1750459523467",
      "fromOutputName": "X",
      "toModuleId": "divide-1750459526269",
      "toInputName": "A"
    },
    {
      "id": "coordinate-1750459523467-Y-divide-1750459561570-A",
      "fromModuleId": "coordinate-1750459523467",
      "fromOutputName": "Y",
      "toModuleId": "divide-1750459561570",
      "toInputName": "A"
    },
    {
      "id": "rgbcolor-1750459597410-Color-output-Image",
      "fromModuleId": "rgbcolor-1750459597410",
      "fromOutputName": "Color",
      "toModuleId": "output",
      "toInputName": "Image"
    },
    {
      "id": "divide-1750460723048-Quotient-divide-1750459687202-B",
      "fromModuleId": "divide-1750460723048",
      "fromOutputName": "Quotient",
      "toModuleId": "divide-1750459687202",
      "toInputName": "B"
    },
    {
      "id": "divide-1750459526269-Remainder-divide-1750459687202-A",
      "fromModuleId": "divide-1750459526269",
      "fromOutputName": "Remainder",
      "toModuleId": "divide-1750459687202",
      "toInputName": "A"
    },
    {
      "id": "divide-1750459687202-Quotient-clip-1750459767735-Value",
      "fromModuleId": "divide-1750459687202",
      "fromOutputName": "Quotient",
      "toModuleId": "clip-1750459767735",
      "toInputName": "Value"
    },
    {
      "id": "divide-1750460723048-Quotient-divide-1750459845276-B",
      "fromModuleId": "divide-1750460723048",
      "fromOutputName": "Quotient",
      "toModuleId": "divide-1750459845276",
      "toInputName": "B"
    },
    {
      "id": "divide-1750459561570-Remainder-divide-1750459845276-A",
      "fromModuleId": "divide-1750459561570",
      "fromOutputName": "Remainder",
      "toModuleId": "divide-1750459845276",
      "toInputName": "A"
    },
    {
      "id": "divide-1750459845276-Quotient-clip-1750459864508-Value",
      "fromModuleId": "divide-1750459845276",
      "fromOutputName": "Quotient",
      "toModuleId": "clip-1750459864508",
      "toInputName": "Value"
    },
    {
      "id": "divide-1750460723048-Quotient-divide-1750459561570-B",
      "fromModuleId": "divide-1750460723048",
      "fromOutputName": "Quotient",
      "toModuleId": "divide-1750459561570",
      "toInputName": "B"
    },
    {
      "id": "clip-1750459767735-Result-mix-1750460298004-A",
      "fromModuleId": "clip-1750459767735",
      "fromOutputName": "Result",
      "toModuleId": "mix-1750460298004",
      "toInputName": "A"
    },
    {
      "id": "clip-1750459864508-Result-mix-1750460298004-Factor",
      "fromModuleId": "clip-1750459864508",
      "fromOutputName": "Result",
      "toModuleId": "mix-1750460298004",
      "toInputName": "Factor"
    },
    {
      "id": "clip-1750459767735-Result-mix-1750460313610-Factor",
      "fromModuleId": "clip-1750459767735",
      "fromOutputName": "Result",
      "toModuleId": "mix-1750460313610",
      "toInputName": "Factor"
    },
    {
      "id": "clip-1750459864508-Result-mix-1750460313610-A",
      "fromModuleId": "clip-1750459864508",
      "fromOutputName": "Result",
      "toModuleId": "mix-1750460313610",
      "toInputName": "A"
    },
    {
      "id": "mix-1750460298004-Result-add-1750460238978-A",
      "fromModuleId": "mix-1750460298004",
      "fromOutputName": "Result",
      "toModuleId": "add-1750460238978",
      "toInputName": "A"
    },
    {
      "id": "mix-1750460313610-Result-add-1750460238978-B",
      "fromModuleId": "mix-1750460313610",
      "fromOutputName": "Result",
      "toModuleId": "add-1750460238978",
      "toInputName": "B"
    },
    {
      "id": "add-1750460238978-Result-rgbcolor-1750459597410-R",
      "fromModuleId": "add-1750460238978",
      "fromOutputName": "Result",
      "toModuleId": "rgbcolor-1750459597410",
      "toInputName": "R"
    },
    {
      "id": "add-1750460238978-Result-rgbcolor-1750459597410-G",
      "fromModuleId": "add-1750460238978",
      "fromOutputName": "Result",
      "toModuleId": "rgbcolor-1750459597410",
      "toInputName": "G"
    },
    {
      "id": "add-1750460238978-Result-rgbcolor-1750459597410-B",
      "fromModuleId": "add-1750460238978",
      "fromOutputName": "Result",
      "toModuleId": "rgbcolor-1750459597410",
      "toInputName": "B"
    },
    {
      "id": "number-1750459540138-Result-divide-1750460723048-B",
      "fromModuleId": "number-1750459540138",
      "fromOutputName": "Result",
      "toModuleId": "divide-1750460723048",
      "toInputName": "B"
    },
    {
      "id": "divide-1750460723048-Quotient-divide-1750459526269-B",
      "fromModuleId": "divide-1750460723048",
      "fromOutputName": "Quotient",
      "toModuleId": "divide-1750459526269",
      "toInputName": "B"
    }
  ],
  "lastUpdated": 1750461521655,
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
    "scale": 0.8322323801403385,
    "x": 71.98651196642777,
    "y": 130.87534625649562
  },
  "modules": [
    {
      "id": "coordinate-1749819397323",
      "definitionId": "coordinate",
      "position": {
        "x": -15,
        "y": 468
      },
      "inputValues": {}
    },
    {
      "id": "length-1749819404701",
      "definitionId": "length",
      "position": {
        "x": 203,
        "y": 189
      },
      "inputValues": {}
    },
    {
      "id": "number-1749819409200",
      "definitionId": "number",
      "position": {
        "x": -47,
        "y": 166
      },
      "inputValues": {
        "Value": 0.5,
        "Number": 0.5
      }
    },
    {
      "id": "angle-1749819441403",
      "definitionId": "angle",
      "position": {
        "x": 202,
        "y": 426
      },
      "inputValues": {}
    },
    {
      "id": "output",
      "definitionId": "output",
      "position": {
        "x": 1729,
        "y": 285
      },
      "inputValues": {}
    },
    {
      "id": "rgbcolor-1749819468222",
      "definitionId": "rgbcolor",
      "position": {
        "x": 1573,
        "y": 386
      },
      "inputValues": {}
    },
    {
      "id": "divide-1749819528088",
      "definitionId": "divide",
      "position": {
        "x": 350,
        "y": 430
      },
      "inputValues": {
        "B": 6.28
      }
    },
    {
      "id": "add-1749820259684",
      "definitionId": "add",
      "position": {
        "x": 502,
        "y": 452
      },
      "inputValues": {
        "B": 0.5
      }
    },
    {
      "id": "multiply-1749820346738",
      "definitionId": "multiply",
      "position": {
        "x": 687,
        "y": 461
      },
      "inputValues": {}
    },
    {
      "id": "number-1749820358239",
      "definitionId": "number",
      "position": {
        "x": 481,
        "y": 646
      },
      "inputValues": {
        "Value": 0.3,
        "Number": 0.3
      }
    },
    {
      "id": "add-1749820383758",
      "definitionId": "add",
      "position": {
        "x": 829,
        "y": 387
      },
      "inputValues": {}
    },
    {
      "id": "divide-1749820410026",
      "definitionId": "divide",
      "position": {
        "x": 960,
        "y": 448
      },
      "inputValues": {}
    },
    {
      "id": "clip-1749821536820",
      "definitionId": "clip",
      "position": {
        "x": 1121,
        "y": 471
      },
      "inputValues": {
        "Threshold": 0.15
      }
    },
    {
      "id": "number-1749821871295",
      "definitionId": "number",
      "position": {
        "x": -46,
        "y": 317
      },
      "inputValues": {
        "Value": 0.5,
        "Number": 0.5
      }
    },
    {
      "id": "divide-1749849390459",
      "definitionId": "divide",
      "position": {
        "x": 994,
        "y": 103
      },
      "inputValues": {
        "B": 0.1
      }
    },
    {
      "id": "clip-1749849619576",
      "definitionId": "clip",
      "position": {
        "x": 1162,
        "y": 139
      },
      "inputValues": {
        "Threshold": 0.04
      }
    },
    {
      "id": "multiply-1749849640299",
      "definitionId": "multiply",
      "position": {
        "x": 1392,
        "y": 319
      },
      "inputValues": {}
    },
    {
      "id": "add-1749849896922",
      "definitionId": "add",
      "position": {
        "x": 860,
        "y": 98
      },
      "inputValues": {}
    },
    {
      "id": "multiply-1749850475399",
      "definitionId": "multiply",
      "position": {
        "x": 691,
        "y": 225
      },
      "inputValues": {
        "B": 1.2
      }
    }
  ],
  "connections": [
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
      "id": "number-1749820358239-Result-multiply-1749820346738-B",
      "fromModuleId": "number-1749820358239",
      "fromOutputName": "Result",
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
      "id": "number-1749820358239-Result-divide-1749820410026-B",
      "fromModuleId": "number-1749820358239",
      "fromOutputName": "Result",
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
      "id": "multiply-1749850475399-Result-add-1749849896922-B",
      "fromModuleId": "multiply-1749850475399",
      "fromOutputName": "Result",
      "toModuleId": "add-1749849896922",
      "toInputName": "B"
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
    },
    {
      "id": "number-1749819409200-Result-length-1749819404701-X1",
      "fromModuleId": "number-1749819409200",
      "fromOutputName": "Result",
      "toModuleId": "length-1749819404701",
      "toInputName": "X1"
    },
    {
      "id": "number-1749819409200-Result-angle-1749819441403-X1",
      "fromModuleId": "number-1749819409200",
      "fromOutputName": "Result",
      "toModuleId": "angle-1749819441403",
      "toInputName": "X1"
    },
    {
      "id": "number-1749821871295-Result-length-1749819404701-Y1",
      "fromModuleId": "number-1749821871295",
      "fromOutputName": "Result",
      "toModuleId": "length-1749819404701",
      "toInputName": "Y1"
    },
    {
      "id": "number-1749821871295-Result-angle-1749819441403-Y1",
      "fromModuleId": "number-1749821871295",
      "fromOutputName": "Result",
      "toModuleId": "angle-1749819441403",
      "toInputName": "Y1"
    },
    {
      "id": "add-1749820259684-Result-multiply-1749850475399-A",
      "fromModuleId": "add-1749820259684",
      "fromOutputName": "Result",
      "toModuleId": "multiply-1749850475399",
      "toInputName": "A"
    }
  ],
  "lastUpdated": 1750616044139,
  "moduleMap": {},
  "connectionMap": {},
  "connectionsByInput": {},
  "definitionMap": {}
}
```

## Flower

```json
{
  "transform": {
    "scale": 0.7425000000000007,
    "x": 22.077781665612292,
    "y": 72.29791483724443
  },
  "modules": [
    {
      "id": "coordinate-1750447008602",
      "definitionId": "coordinate",
      "position": {
        "x": -14,
        "y": 395
      },
      "inputValues": {}
    },
    {
      "id": "length-1750447023734",
      "definitionId": "length",
      "position": {
        "x": 159,
        "y": 270
      },
      "inputValues": {
        "X1": 0,
        "Y1": 0,
        "X2": 0.5,
        "Y2": 0.5
      }
    },
    {
      "id": "angle-1750447038168",
      "definitionId": "angle",
      "position": {
        "x": 158,
        "y": 488
      },
      "inputValues": {
        "X1": 0,
        "Y1": 0,
        "X2": 0.5,
        "Y2": 0.5
      }
    },
    {
      "id": "multiply-1750447065271",
      "definitionId": "multiply",
      "position": {
        "x": 616,
        "y": 299
      },
      "inputValues": {
        "B": -1.4
      }
    },
    {
      "id": "multiply-1750447081076",
      "definitionId": "multiply",
      "position": {
        "x": 325,
        "y": 546
      },
      "inputValues": {
        "B": 8
      }
    },
    {
      "id": "trigonometry-1750447102321",
      "definitionId": "trigonometry",
      "position": {
        "x": 545,
        "y": 537
      },
      "inputValues": {}
    },
    {
      "id": "multiply-1750447114856",
      "definitionId": "multiply",
      "position": {
        "x": 718,
        "y": 549
      },
      "inputValues": {
        "B": 0.15
      }
    },
    {
      "id": "add-1750447155326",
      "definitionId": "add",
      "position": {
        "x": 323,
        "y": 784
      },
      "inputValues": {
        "B": 2.85
      }
    },
    {
      "id": "trigonometry-1750447200277",
      "definitionId": "trigonometry",
      "position": {
        "x": 547,
        "y": 778
      },
      "inputValues": {}
    },
    {
      "id": "multiply-1750447214914",
      "definitionId": "multiply",
      "position": {
        "x": 716,
        "y": 790
      },
      "inputValues": {
        "B": 0.25
      }
    },
    {
      "id": "add-1750447234831",
      "definitionId": "add",
      "position": {
        "x": 1052,
        "y": 710
      },
      "inputValues": {
        "B": 0
      }
    },
    {
      "id": "add-1750447285766",
      "definitionId": "add",
      "position": {
        "x": 1051,
        "y": 395
      },
      "inputValues": {
        "B": 0
      }
    },
    {
      "id": "clip-1750447317751",
      "definitionId": "clip",
      "position": {
        "x": 1149,
        "y": 138
      },
      "inputValues": {
        "Threshold": -0.24
      }
    },
    {
      "id": "multiply-1750447345753",
      "definitionId": "multiply",
      "position": {
        "x": 1353,
        "y": 138
      },
      "inputValues": {
        "B": 0.75
      }
    },
    {
      "id": "add-1750447368506",
      "definitionId": "add",
      "position": {
        "x": 1186,
        "y": 395
      },
      "inputValues": {
        "B": 0.15
      }
    },
    {
      "id": "clip-1750447385737",
      "definitionId": "clip",
      "position": {
        "x": 1319,
        "y": 386
      },
      "inputValues": {
        "Threshold": -0.32
      }
    },
    {
      "id": "add-1750447408071",
      "definitionId": "add",
      "position": {
        "x": 1187,
        "y": 710
      },
      "inputValues": {
        "B": 0
      }
    },
    {
      "id": "number-1750447447858",
      "definitionId": "number",
      "position": {
        "x": 963,
        "y": 558
      },
      "inputValues": {
        "Number": 0.15000000000000002
      }
    },
    {
      "id": "clip-1750447580433",
      "definitionId": "clip",
      "position": {
        "x": 1322,
        "y": 701
      },
      "inputValues": {
        "Threshold": -0.28
      }
    },
    {
      "id": "multiply-1750447603450",
      "definitionId": "multiply",
      "position": {
        "x": 1526,
        "y": 700
      },
      "inputValues": {
        "B": 0.6
      }
    },
    {
      "id": "add-1750447621300",
      "definitionId": "add",
      "position": {
        "x": 1722,
        "y": 467
      },
      "inputValues": {
        "B": 0
      }
    },
    {
      "id": "rgbcolor-1750447643069",
      "definitionId": "rgbcolor",
      "position": {
        "x": 1867,
        "y": 379
      },
      "inputValues": {
        "R": 0,
        "G": 0,
        "B": 0
      }
    },
    {
      "id": "output",
      "definitionId": "output",
      "position": {
        "x": 2047,
        "y": 328
      },
      "inputValues": {}
    }
  ],
  "connections": [
    {
      "id": "coordinate-1750447008602-X-length-1750447023734-X1",
      "fromModuleId": "coordinate-1750447008602",
      "fromOutputName": "X",
      "toModuleId": "length-1750447023734",
      "toInputName": "X1"
    },
    {
      "id": "coordinate-1750447008602-Y-length-1750447023734-Y1",
      "fromModuleId": "coordinate-1750447008602",
      "fromOutputName": "Y",
      "toModuleId": "length-1750447023734",
      "toInputName": "Y1"
    },
    {
      "id": "coordinate-1750447008602-X-angle-1750447038168-X1",
      "fromModuleId": "coordinate-1750447008602",
      "fromOutputName": "X",
      "toModuleId": "angle-1750447038168",
      "toInputName": "X1"
    },
    {
      "id": "coordinate-1750447008602-Y-angle-1750447038168-Y1",
      "fromModuleId": "coordinate-1750447008602",
      "fromOutputName": "Y",
      "toModuleId": "angle-1750447038168",
      "toInputName": "Y1"
    },
    {
      "id": "length-1750447023734-Length-multiply-1750447065271-A",
      "fromModuleId": "length-1750447023734",
      "fromOutputName": "Length",
      "toModuleId": "multiply-1750447065271",
      "toInputName": "A"
    },
    {
      "id": "angle-1750447038168-Angle-multiply-1750447081076-A",
      "fromModuleId": "angle-1750447038168",
      "fromOutputName": "Angle",
      "toModuleId": "multiply-1750447081076",
      "toInputName": "A"
    },
    {
      "id": "multiply-1750447081076-Result-trigonometry-1750447102321-Angle",
      "fromModuleId": "multiply-1750447081076",
      "fromOutputName": "Result",
      "toModuleId": "trigonometry-1750447102321",
      "toInputName": "Angle"
    },
    {
      "id": "trigonometry-1750447102321-Cos-multiply-1750447114856-A",
      "fromModuleId": "trigonometry-1750447102321",
      "fromOutputName": "Cos",
      "toModuleId": "multiply-1750447114856",
      "toInputName": "A"
    },
    {
      "id": "multiply-1750447081076-Result-add-1750447155326-A",
      "fromModuleId": "multiply-1750447081076",
      "fromOutputName": "Result",
      "toModuleId": "add-1750447155326",
      "toInputName": "A"
    },
    {
      "id": "add-1750447155326-Result-trigonometry-1750447200277-Angle",
      "fromModuleId": "add-1750447155326",
      "fromOutputName": "Result",
      "toModuleId": "trigonometry-1750447200277",
      "toInputName": "Angle"
    },
    {
      "id": "trigonometry-1750447200277-Cos-multiply-1750447214914-A",
      "fromModuleId": "trigonometry-1750447200277",
      "fromOutputName": "Cos",
      "toModuleId": "multiply-1750447214914",
      "toInputName": "A"
    },
    {
      "id": "multiply-1750447214914-Result-add-1750447234831-B",
      "fromModuleId": "multiply-1750447214914",
      "fromOutputName": "Result",
      "toModuleId": "add-1750447234831",
      "toInputName": "B"
    },
    {
      "id": "multiply-1750447065271-Result-add-1750447234831-A",
      "fromModuleId": "multiply-1750447065271",
      "fromOutputName": "Result",
      "toModuleId": "add-1750447234831",
      "toInputName": "A"
    },
    {
      "id": "multiply-1750447114856-Result-add-1750447285766-B",
      "fromModuleId": "multiply-1750447114856",
      "fromOutputName": "Result",
      "toModuleId": "add-1750447285766",
      "toInputName": "B"
    },
    {
      "id": "multiply-1750447065271-Result-add-1750447285766-A",
      "fromModuleId": "multiply-1750447065271",
      "fromOutputName": "Result",
      "toModuleId": "add-1750447285766",
      "toInputName": "A"
    },
    {
      "id": "multiply-1750447065271-Result-clip-1750447317751-Value",
      "fromModuleId": "multiply-1750447065271",
      "fromOutputName": "Result",
      "toModuleId": "clip-1750447317751",
      "toInputName": "Value"
    },
    {
      "id": "clip-1750447317751-Result-multiply-1750447345753-A",
      "fromModuleId": "clip-1750447317751",
      "fromOutputName": "Result",
      "toModuleId": "multiply-1750447345753",
      "toInputName": "A"
    },
    {
      "id": "add-1750447285766-Result-add-1750447368506-A",
      "fromModuleId": "add-1750447285766",
      "fromOutputName": "Result",
      "toModuleId": "add-1750447368506",
      "toInputName": "A"
    },
    {
      "id": "add-1750447368506-Result-clip-1750447385737-Value",
      "fromModuleId": "add-1750447368506",
      "fromOutputName": "Result",
      "toModuleId": "clip-1750447385737",
      "toInputName": "Value"
    },
    {
      "id": "add-1750447234831-Result-add-1750447408071-B",
      "fromModuleId": "add-1750447234831",
      "fromOutputName": "Result",
      "toModuleId": "add-1750447408071",
      "toInputName": "B"
    },
    {
      "id": "number-1750447447858-Result-add-1750447368506-B",
      "fromModuleId": "number-1750447447858",
      "fromOutputName": "Result",
      "toModuleId": "add-1750447368506",
      "toInputName": "B"
    },
    {
      "id": "number-1750447447858-Result-add-1750447408071-A",
      "fromModuleId": "number-1750447447858",
      "fromOutputName": "Result",
      "toModuleId": "add-1750447408071",
      "toInputName": "A"
    },
    {
      "id": "add-1750447408071-Result-clip-1750447580433-Value",
      "fromModuleId": "add-1750447408071",
      "fromOutputName": "Result",
      "toModuleId": "clip-1750447580433",
      "toInputName": "Value"
    },
    {
      "id": "clip-1750447580433-Result-multiply-1750447603450-A",
      "fromModuleId": "clip-1750447580433",
      "fromOutputName": "Result",
      "toModuleId": "multiply-1750447603450",
      "toInputName": "A"
    },
    {
      "id": "multiply-1750447603450-Result-add-1750447621300-B",
      "fromModuleId": "multiply-1750447603450",
      "fromOutputName": "Result",
      "toModuleId": "add-1750447621300",
      "toInputName": "B"
    },
    {
      "id": "clip-1750447385737-Result-add-1750447621300-A",
      "fromModuleId": "clip-1750447385737",
      "fromOutputName": "Result",
      "toModuleId": "add-1750447621300",
      "toInputName": "A"
    },
    {
      "id": "add-1750447621300-Result-rgbcolor-1750447643069-R",
      "fromModuleId": "add-1750447621300",
      "fromOutputName": "Result",
      "toModuleId": "rgbcolor-1750447643069",
      "toInputName": "R"
    },
    {
      "id": "rgbcolor-1750447643069-Color-output-Image",
      "fromModuleId": "rgbcolor-1750447643069",
      "fromOutputName": "Color",
      "toModuleId": "output",
      "toInputName": "Image"
    },
    {
      "id": "multiply-1750447345753-Result-rgbcolor-1750447643069-G",
      "fromModuleId": "multiply-1750447345753",
      "fromOutputName": "Result",
      "toModuleId": "rgbcolor-1750447643069",
      "toInputName": "G"
    }
  ],
  "lastUpdated": 1750448350650,
  "moduleMap": {},
  "connectionMap": {},
  "connectionsByInput": {},
  "definitionMap": {}
}
```
