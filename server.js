const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let customers = [
  { id: 1, name: 'ibrahm', email: 'ibrahim@example.com', contactNumber: '1234567890' },
  { id: 2, name: 'ibra', email: 'ibra@example.com', contactNumber: '9876543210' },
  { id: 3, name: 'wassim', email: 'wasssim@example.com', contactNumber: '9876543210' },
  { id: 4, name: 'ahmed', email: 'ahmed@example.com', contactNumber: '9876543210' },

  

];
// Api
// get all customers
app.get('/customers', (req, res) => {
  res.json(customers);
});

// add a new customer
app.post('/customers', (req, res) => {
  const newCustomer = req.body;
  newCustomer.id = customers.length + 1;
  customers.push(newCustomer);
  res.json(newCustomer);
});

//  update a customer 
app.put('/customers/:id', (req, res) => {
  const customerId = parseInt(req.params.id);
  const updatedCustomer = req.body;

  customers = customers.map(customer => {
    if (customer.id === customerId) {
      return { ...customer, ...updatedCustomer };
    }
    return customer;
  });

  res.json({ message: 'Customer updated successfully' });
});

//delete a customer by ID
app.delete('/customers/:id', (req, res) => {
  const customerId = parseInt(req.params.id);
  customers = customers.filter(customer => customer.id !== customerId);
  res.json({ message: 'Customer deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
