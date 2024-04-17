'use strict';

var server = require('server');
server.extend(module.superModule);

server.prepend('UpdateQuantity', function (req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');
    var collections = require('*/cartridge/scripts/util/collections');
    var cartHelper = require('*/cartridge/scripts/cart/cartHelpers');
    var Resource = require('dw/web/Resource');
    var currentBasket = BasketMgr.getCurrentBasket();

    if (!currentBasket) {
        res.setStatusCode(500);
        res.json({
            error: true,
            redirectUrl: URLUtils.url('Cart-Show').toString()
        });

        return next();
    }

    var productId = req.querystring.pid;
    var updateQuantity = parseInt(req.querystring.quantity, 10);
    var uuid = req.querystring.uuid;
    var productLineItems = currentBasket.productLineItems;
    var matchingLineItem = collections.find(productLineItems, function (item) {
        return item.productID === productId && item.UUID === uuid;
    });
    var availableToSell = 0;

    var totalQtyRequested = 0;
    var qtyAlreadyInCart = 0;
    var minOrderQuantity = 0;
    var perpetual = false;
    var canBeUpdated = false;
    if (matchingLineItem) {
        availableToSell = matchingLineItem.product.availabilityModel.inventoryRecord.ATS.value;
        qtyAlreadyInCart = cartHelper.getQtyAlreadyInCart(
            productId,
            productLineItems,
            matchingLineItem.UUID
        );
        totalQtyRequested = updateQuantity + qtyAlreadyInCart;
        var maxQtyAll = matchingLineItem.product.custom.maxQtyAll;
        if (totalQtyRequested > maxQtyAll) {
            res.setStatusCode(500);
            res.json({
                errorMessage: Resource.msgf('error.limit.product.quantity', 'cart', null, maxQtyAll)
            });
        }

        minOrderQuantity = matchingLineItem.product.minOrderQuantity.value;
        canBeUpdated = (totalQtyRequested <= availableToSell || perpetual)
            && (updateQuantity >= minOrderQuantity);
    }

    next();
});

module.exports = server.exports();
