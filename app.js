                const prompt = require('prompt-sync')();
                const dotenv = require('dotenv');
                dotenv.config();
                const mongoose = require('mongoose');
                const Customer = require('./models/customer');

                // const username = prompt('What is your name? ');

                // console.log(`Your name is ${username}`);


                // connection to MongoDB
                const connect = async () => {
                    await mongoose.connect(process.env.MONGODB_URI);
                    console.log('Connected to MongoDB');
                    await runQueries()
                    await mongoose.disconnect();
                    console.log('Disconnected from MongoDB');
                    process.exit();
                };


                const runQueries = async () => {
                    console.log('Queries running.')
                    //    await displayMessage();
                    await app();
                    
                }; 

                connect()
  /*-------------------------------- Query Functions --------------*/

                const displayMessage = async () => {
                    console.log("Welcome to the CRM\n");
                    console.log("What would you like to do?");
                    console.log("  1. Create a customer");
                    console.log("  2. View all customers");
                    console.log("  3. Update a customer");
                    console.log("  4. Delete a customer");
                    console.log("  5. Quit\n");

                    const action = prompt("Number of action to run: ");
                    return action;
                };

                const createCustomer = async () => {
                    const name = prompt('Enter customer name: ');
                    const age = parseInt(prompt('Enter customer age: '), 10);
                    const customerData = { name, age };
                    const customer = await Customer.create(customerData);
                    console.log("New customer created:", customer);
                };

                const findCustomers = async () => {
                    const customers = await Customer.find({});
                    console.log("All customers:", customers);
                };

                const updateCustomer = async () => {
                    console.log('Below is a list of customers:')
                    await findCustomers();
                    const id = prompt('Enter customer ID to update: ');
                    const name = prompt('What is the customer new name?')
                    const age = parseInt(prompt('What is the customer new age? '), 10);
                    const updatedCustomer = await Customer.findByIdAndUpdate(id, { name,age }, { new: true });
                    console.log("Updated customer:", updatedCustomer);
                };

                const deleteCustomer = async () => {
                    console.log('Below is a list of customers:')
                    await findCustomers();
                    const id = prompt('Enter customer ID to delete: ');
                    const removedCustomer = await Customer.findByIdAndDelete(id);
                    console.log('Removed customer:', removedCustomer);
                };

                const app = async () => {
                    let action;
                  
                        action = await displayMessage();
                        
                        if (action === '1') {
                            await createCustomer();
                        } else if (action === '2') {
                            await findCustomers();
                        } else if (action === '3') {
                            await updateCustomer();
                        } else if (action === '4') {
                            await deleteCustomer();
                        } else if (action === '5') {
                            console.log('Quitting...');
                        } else {
                            console.log('Invalid action. Please try again.');
                        }
                        
                  
                };

                
