'use strict';

var maxBuyHelder = require('*/cartridge/scripts/maxBuyQty/maxBuyQtyHelpers');

module.exports = function (object, product, quantity) {

    var maxQty = maxBuyHelder.getMaxBuyQty(product, customer);

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
        value: maxQty
    });
};
