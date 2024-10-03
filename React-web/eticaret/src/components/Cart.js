import React from 'react';
import alertify from 'alertifyjs';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

const Cart = ({ cartItems, onRemoveFromCart, onClearCart }) => {
    // Ürünleri ID'ye göre grupla
    const groupedItems = cartItems.reduce((acc, item) => {
        if (acc[item.id]) {
            acc[item.id].quantity += item.quantity; // Aynı ürünse miktarı artır
        } else {
            acc[item.id] = { ...item }; // Yeni ürün ekle
        }
        return acc;
    }, {});

    const totalPrice = Object.values(groupedItems).reduce((total, item) => total + item.price * item.quantity, 0);

    const handleRemoveFromCart = (item) => {
        onRemoveFromCart(item);
        alertify.error(`${item.name} sepetten çıkarıldı!`);
    };

    const handleClearCart = () => {
        onClearCart();
        alertify.error('Sepet boşaltıldı!');
    };

    return (
        <div>
            <h3>Sepet</h3>
            <ListGroup>
                {Object.values(groupedItems).map((item) => (
                    <ListGroupItem key={item.id}>
                        {item.name} - ${item.price} - Adet {item.quantity}
                        <Button
                            color='warning'
                            onClick={() => handleRemoveFromCart(item)}
                            style={{ float: 'right' }}
                            className='btn btn-sm'
                        >
                            Kaldır
                        </Button>
                    </ListGroupItem>
                ))}
            </ListGroup>
            <h4 className='mt-5'>Toplam: ${totalPrice}</h4>
            <Button color='danger' onClick={handleClearCart}>Sepeti Boşalt</Button>
        </div>
    );
};

export default Cart;
