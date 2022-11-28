#!/bin/bash

mongoexport --collection=recipes --db=CanYouCookIt --jsonArray --out=./db/exportDB/json/recipes.json
mongoexport --collection=myrecipes --db=CanYouCookIt --jsonArray --out=./db/exportDB/json/myrecipes.json
mongoexport --collection=ingredients --db=CanYouCookIt --jsonArray --out=./db/exportDB/json/ingredients.json
mongoexport --collection=inventory --db=CanYouCookIt --jsonArray --out=./db/exportDB/json/inventory.json
