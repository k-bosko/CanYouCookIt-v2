#!/bin/bash

mongoimport -h localhost:27017 -d CanYouCookIt -c recipes --jsonArray --drop ./db/exportDB/json/recipes.json
mongoimport -h localhost:27017 -d CanYouCookIt -c myrecipes --jsonArray --drop ./db/exportDB/json/myrecipes.json
mongoimport -h localhost:27017 -d CanYouCookIt -c ingredients --jsonArray --drop ./db/exportDB/json/ingredients.json
mongoimport -h localhost:27017 -d CanYouCookIt -c inventory --jsonArray --drop ./db/exportDB/json/inventory.json
mongoimport -h localhost:27017 -d CanYouCookIt -c auto-increments --jsonArray --drop ./db/exportDB/json/auto-increments.json