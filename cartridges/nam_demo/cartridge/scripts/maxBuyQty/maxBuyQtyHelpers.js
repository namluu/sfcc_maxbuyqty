'use strict';

var collections = require('*/cartridge/scripts/util/collections');

/**
 * Retrieve the list of the customer
 * @param {Object} product - object representing a product
 * @param {dw.customer.Customer} customer - current customer
 * */
function getMaxBuyQty(product, customer) {
    var DEFAULT_MAX_ORDER_QUANTITY = 10;
    var maxQtyProductLevel = product.custom.maxQtyAll || DEFAULT_MAX_ORDER_QUANTITY;

    if (customer && customer.authenticated) {
        var registeredCustomer = collections.find(customer.customerGroups, function (group) {
            return group.ID === 'Registered';
        });
        var maxQty = registeredCustomer && Math.min(maxQtyProductLevel, registeredCustomer.custom.maxQtyBuy);
    } else {
        var unregisteredCustomer = collections.find(customer.customerGroups, function (group) {
            return group.ID === 'Unregistered';
        });
        var maxQty = unregisteredCustomer && Math.min(maxQtyProductLevel, unregisteredCustomer.custom.maxQtyBuy);
    }

    return maxQty;
};

module.exports = {
    getMaxBuyQty: getMaxBuyQty
};
