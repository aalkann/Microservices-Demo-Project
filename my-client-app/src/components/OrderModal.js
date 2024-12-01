import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function OrderModal({ show, onClose, onSubmit, product }) {
  const [formData, setFormData] = useState({
    skuCode: product.skuCode,
    price: product.price,
    quantity: 1,
    userDetails:{
      email: "ahmetalkan17@hotmail.com",
      firstName: "Ahmet",
      lastName: "Alkan"
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ ...formData});
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Product: {product?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="skuCode">
            <Form.Label>SkuCode</Form.Label>
            <Form.Control
              type="text"
              name="skuCode"
              value={formData.skuCode}
              placeholder="Enter SkuCode..."
              required
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              placeholder="Enter Price..."
              required
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="quantity" className="mt-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </Form.Group>
          <Button type="submit" className="mt-3" variant="primary">
            Submit Order
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default OrderModal;
