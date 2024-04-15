'use strict';

var DEFAULT_MAX_ORDER_QUANTITY = 9;

module.exports = function (object, product, quantity) {

    var attributeModel = product.getAttributeModel();
    var attributeDefinition = attributeModel.getAttributeDefinition('maxQtyAll');
    var maxQtyAll = attributeModel.getValue(attributeDefinition);

    var currentCustomer = customer;
    if (currentCustomer && currentCustomer.authenticated) {
        var attributeDefinition = attributeModel.getAttributeDefinition('maxQtyRegister');
        var maxQtyAll = attributeModel.getValue(attributeDefinition);
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
