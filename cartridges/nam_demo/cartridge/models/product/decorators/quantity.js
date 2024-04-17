'use strict';

var DEFAULT_MAX_ORDER_QUANTITY = 9;

module.exports = function (object, product, quantity) {

    var maxQtyAll = product.custom.maxQtyAll;

    var currentCustomer = customer;
    if (currentCustomer && currentCustomer.authenticated) {
        var maxQtyAll = product.custom.maxQtyRegister;
    }

    Object.defineProperty(object, 'selectedQuantity', {
        enumerable: true,
        value: parseInt(quantity, 10) || (product && product.minOrderQuantity ? product.minOrderQuantity.value : 1)
    });
    Object.defineProperty(object, 'minOrderQuantity', {
        enumerable: true,
        value: product && product.minOrderQuantity ? product.minOrderQuantity.value : 1
    });
    Object.defineProperty(object, 'maxOrderQuantity', {
        enumerable: true,
        value: maxQtyAll || DEFAULT_MAX_ORDER_QUANTITY
    });
};
