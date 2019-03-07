/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const ListingState = {
    FOR_SALE: 'FOR_SALE',
    RESERVE_NOT_MET: 'RESERVE_NOT_MET',
    SOLD: 'SOLD'
}

/**
 * Close the bidding for a Company listing and choose the
 * highest bid that is over the asking price
 * @param {com.origami.platform.CloseBidding} closeBidding closeBidding - the closeBidding transaction
 * @transaction
 */
async function closeBidding(closeBidding) { // eslint-disable-line no-unused-vars
    const listing = closeBidding.listing;
    if (listing.state !== ListingState.FOR_SALE) {
        throw new Error('Listing is not FOR SALE');
    }
    // by default we mark the listing as RESERVE_NOT_MET
    listing.state = ListingState.RESERVE_NOT_MET;
    let highestOffer = null;
    let buyer = null;
    let seller = null;
    if (listing.offers && listing.offers.length > 0) {
        // sort the bids by bidPrice
        listing.offers.sort(function (a, b) {
            return (b.bidPrice - a.bidPrice);
        });
        highestOffer = listing.offers[0];
        if (highestOffer.bidPrice >= listing.reservePrice) {
            // mark the listing as SOLD
            listing.state = ListingState.SOLD;
            buyer = highestOffer.offeror;
            seller = listing.company.owner;

            listing.company.owner = buyer;
            // clear the offers
            listing.offers = null;
        }
    }

    if (highestOffer) {
        const companyRegistry = await getAssetRegistry('com.origami.platform.Company');
        await companyRegistry.update(listing.company);
    }

    const companyListingRegistry = await getAssetRegistry('com.origami.platform.CompanyListing');
    await companyListingRegistry.update(listing);

    if (listing.state === ListingState.SOLD) {
        const userRegistry = await getParticipantRegistry('com.origami.platform.User');
        await userRegistry.updateAll([buyer, seller]);
    }
}

/**
 * Make an Offer for a CompanyListing
 * @param {com.origami.platform.Offer} offer - the offer
 * @transaction
 */
async function makeOffer(offer) { // eslint-disable-line no-unused-vars
    let listing = offer.listing;
    if (listing.state !== ListingState.FOR_SALE) {
        throw new Error('Listing is not FOR SALE');
    }
    if (!listing.offers) {
        listing.offers = [];
    }
    listing.offers.push(offer);

    // save the vehicle listing
    const companyListingRegistry = await getAssetRegistry('com.origami.platform.CompanyListing');
    await companyListingRegistry.update(listing);
}
