const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const project0ListingSchema = new Schema({
    displayListing: {
        image: {
            type: String
        },
        age: {
            type: String
            // New, moderate, old listing.
        },
        typeOfResidence: {
            type: String
        },
        price: {
            type: Number
        },
        address: {
            type: String
        },
        cityTownProvince: {
            type: String
        },
        bedroom: {
            type: Number
        },
        bathroom: {
            type: Number
        }
    },
    gallery: {
        image0: {
            type: String
        }
    },
    detailHeader: {
        mls: {
            type: String
        }
    },
    tab: {
        overview: {
            description: {
                type: String
            },
            propertyType: {
                type: String
                // Ex. single family.
            },
            buildingType: {
                type: String
                // house, apartment, etc.
            },
            squareFeet: {
                type: String
            },
            storeys: {
                type: Number
                // 1, 2, 3...
            },
            builtIn: {
                type: Number
                // Ex. 1999.
            },
            parkingType: {
                type: String
            },
            architectureStyle: {
                type: String
            },
            structures: {
                type: String
            },
            flooringType: {
                type: String
            },
            basementType: {
                type: String
            },
            heatingType: {
                type: String
            },
            coolingType: {
                type: String
            }
        },
        neighborhood: {
            carFriendly: {
                type: Number,
                // All neighborhood are from 0 - 10.
            },
            quiet: {
                type: Number
            },
            elementarySchool: {
                type: Number
            },
            highschool: {
                type: Number
            },
            groceryStore: {
                type: Number
            },
            cafe: {
                type: Number
            },
            daycare: {
                type: Number
            },
            pedestrianFriendly: {
                type: Number
            },
            vibrant: {
                type: Number
                // How much is going on around the neighborhood/location at all times of day.
            },
            night: {
                type: Number
            },
            restaurant: {
                type: Number
            },
            shopping: {
                type: Number
            }
        }
    }
});

const project0Listing = mongoose.model("project-0", project0ListingSchema);

module.exports = project0Listing;