import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ProductModal({ show, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    skuCode: "",
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
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter name..."
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              placeholder="Enter description..."
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="skuCode">
            <Form.Label>SkuCode</Form.Label>
            <Form.Control
              type="text"
              name="skuCode"
              value={formData.skuCode}
              placeholder="Enter skuCode..."
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              placeholder="Enter price..."
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" className="mt-3" variant="primary">
            Save Product
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ProductModal;
