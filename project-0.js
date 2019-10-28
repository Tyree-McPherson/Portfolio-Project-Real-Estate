const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
let Listing = require("../models/project-0-listing");
const database = require("../models/database");

router.get("/", (req, res) => {
    try {
        res.render("project-0", {
            title: "Real-Estators - Tyree McPherson"
        });
    } catch (error) {
        res.redirect("/");
    };
});

router.get("/listings:price&:location&:residence&:bedroom&:bathroom", (req, res) => {
    try {

        // Generating random information where necessary.
        let randomAge = ["New Listing", "Moderate Listing", "Old Listing", "Open House"];
        let selectRandomAge = randomAge[Math.floor(Math.random() * randomAge.length)];
        let randomPrice = Math.floor((Math.random() * 2000000) + 500000);
        let randomProvince = ["AB", "BC", "MB", "NB", "NL", "NT", "NS", "NU", "ON",
            "PE", "QC", "SK", "YT"];
        let selectRandomProvince = randomProvince[Math.floor(Math.random() * randomProvince.length)];

        function randomBedroomBathroom() {
            let selectRandomBedroomBathroom = Math.floor((Math.random() * 5) + 1);

            return selectRandomBedroomBathroom;
        };

        let randomMls = Math.floor((Math.random() * 99999999) + 1000000);
        let randomBuiltIn = ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997",
            "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005",
            "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013"];
        let selectRandomBuiltIn = randomBuiltIn[Math.floor(Math.random() * randomBuiltIn.length)];

        // Creating a function to randomly select a number between and including 0 and 10 every time
        // the function is called.
        function randomNeighborhoodRating() {
            let selectRandomNeighborhoodRating = Math.floor(Math.random() * 10);

            return selectRandomNeighborhoodRating;
        };

        // Creating a new listing with the mongoose schema.
        const listing = new Listing({
            displayListing: {
                image: "../public/images/project-0/residence-16.jpg",
                age: selectRandomAge,                           // Random.
                typeOfResidence: "Single-Family Residence",
                price: randomPrice,                             // Random.
                address: "2497 Adelaide St",                                // Retrieved form fakeaddressgenerator.com.
                cityTownProvince: "Gimli" + ", " + selectRandomProvince,    // Retrieved form fakeaddressgenerator.com.
                bedroom: randomBedroomBathroom(),               // Random.
                bathroom: randomBedroomBathroom(),              // Random.
            },
            gallery: {
                image0: "../public/images/project-0/residence-16.jpg",
            },
            detailHeader: {
                mls: randomMls,                                 // Random.
            },
            tab: {
                overview: {
                    description: `If you like peace, quiet, and isolation, then this is the residence for you. Not a house from half a kilometer away. Surrounded by nature in all directions and you can take hikes on pathways. Almost the perfect home for nature walks, if that interests you. Right in the backyard, or the actual backyard, is a river with fresh water.`,
                    propertyType: "Single-Family Residence",    // Same as "typeOfResidence" field.
                    buildingType: "House",
                    squareFeet: "2,972 sqft",
                    storeys: 2,
                    builtIn: selectRandomBuiltIn,               // Random.
                    parkingType: "Detached Garage",
                    architectureStyle: "Ranch",
                    structures: "Porch, Railing",
                    flooringType: "Wood, Carpet",
                    basementType: "Unfinished",
                    heatingType: "Electric",
                    coolingType: "Air Conditioning",
                },
                neighborhood: {
                    carFriendly: randomNeighborhoodRating(),
                    quiet: randomNeighborhoodRating(),
                    elementarySchool: randomNeighborhoodRating(),
                    highschool: randomNeighborhoodRating(),
                    groceryStore: randomNeighborhoodRating(),
                    cafe: randomNeighborhoodRating(),
                    daycare: randomNeighborhoodRating(),
                    pedestrianFriendly: randomNeighborhoodRating(),
                    vibrant: randomNeighborhoodRating(),
                    night: randomNeighborhoodRating(),
                    restaurant: randomNeighborhoodRating(),
                    shopping: randomNeighborhoodRating(),
                }
            }
        });

        // Save the new listing schema into the database.
        // listing.save()
        //     .then(item => {
        //         console.log("field inserted!");
        //     })
        //     .catch(err => {
        //         console.log("error!");
        //     })

        // global variables for the query variables.
        let exists = { $exists : true }
        let one = 1;
        let three = 3;

        // Parsing the price from a string to an integer value.
        let parsePrice = parseInt(req.params.price, 10);

        // Query for the price.
        let queryPrice = parsePrice < one ? exists : { $lt: parsePrice };

        // Query for Location.
        let allLocation = "all-location";
        let queryLocation = req.params.location == allLocation ? exists : { $regex : `.*${req.params.location}.*` };

        // Query for Type of Residence.

        // Parsing the JSON object in the URL from the ":residence" parameter.
        let parseResidenceObject = JSON.parse(req.params.residence);

        let residenceManufacturedHome = parseResidenceObject.manufacturedHome === true ? "" : "Manufactured Home";
        let residenceMultiUnitProperty = parseResidenceObject.multiUnitProperty === true ? "" : "Multi-Unit Property";
        let residenceSingleFamilyResidence = parseResidenceObject.singleFamilyResidence === true ? "" : "Single-Family Residence";
        let residenceTownhouse = parseResidenceObject.townhouse === true ? "" : "Townhouse";
        let residenceApartment = parseResidenceObject.apartment === true ? "" : "Apartment";

        let queryTypeOfResidence = { $nin: [residenceManufacturedHome, residenceMultiUnitProperty, residenceSingleFamilyResidence, residenceTownhouse, residenceApartment]};

        // Query for Bedrooms.
        let queryBedroom = req.params.bedroom < one ? exists : req.params.bedroom >= one && req.params.bedroom <= three ? { $eq: req.params.bedroom} : { $gt: three};

        // Query for Bathrooms.
        let queryBathroom = req.params.bathroom < one ? exists : req.params.bathroom >= one && req.params.bathroom <= three ? { $eq: req.params.bathroom} : { $gt: three};

        // Setting the amount of listings per page to 9.
        const pagination = 9;

        // Setting the page number to whatever the query's value is or 1.
        const page = req.query.page ? parseInt(req.query.page) : 1;

        Listing.find({ "displayListing.price": queryPrice, "displayListing.cityTownProvince": queryLocation, "displayListing.typeOfResidence": queryTypeOfResidence, "displayListing.bedroom": queryBedroom, "displayListing.bathroom": queryBathroom }, function (err, document) {

            if (err) {
                res.redirect("/");
            };

            return document;
        })
            .skip((page - 1) * pagination)
            .limit(pagination)
            .then((document) => {

                // Setting a variable to the total amount of documents after the querying/filtering.
                let documentLength = document.length;

                // Rendering the "listings" web page with the passed callback function parameters.
                res.render("project-0-listings", {
                    title: "Real-Estators Listings - Tyree McPherson",
                    listing: documentLength,
                    document: document,
                    filterPrice: req.params.price,
                    filterLocation: req.params.location,
                    filterResidence: req.params.residence,
                    filterBedroom: req.params.bedroom,
                    filterBathroom: req.params.bathroom,
                    pageNumber: req.query.page
                });
            });

    } catch (error) {
        res.redirect("/");
    };
});

router.get("/listing-details:id", (req, res) => {
    try {
        var id = req.params.id;

        // Querying the database to find the one unique document that matches
        // the ID of the passed object ID in the URL.
        Listing.findOne({ _id: id }, (error, object) => {

            if (error) {
                res.redirect("/listings");
            };

            return object;
        })
            .then((data) => {
                res.render("project-0-listing-details", {
                    title: "Real-Estators Listing Details - Tyree McPherson",
                    document: data
                });
            });

    } catch (error) {
        res.redirect("/");
    };
});

module.exports = router;