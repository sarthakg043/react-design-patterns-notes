import express, { json } from 'express';

const app = express();

app.use(json());

let currentUser = {
	id: '123',
	name: 'John Doe',
	age: 54,
	hairColor: 'brown',
	hobbies: ['swimming', 'bicycling', 'video games'],
};

let users = [{
	id: '123',
	name: 'John Doe',
	age: 54,
	hairColor: 'brown',
	hobbies: ['swimming', 'bicycling', 'video games'],
}, {
	id: '234',
	name: 'Brenda Smith',
	age: 33,
	hairColor: 'black',
	hobbies: ['golf', 'mathematics'],
}, {
	id: '345',
	name: 'Jane Garcia',
	age: 27,
	hairColor: 'blonde',
	hobbies: ['biology', 'medicine', 'gymnastics'],
}];

let products = [{
	id: '1234',
	name: 'Flat-Screen TV',
	price: '$300',
	description: 'Huge LCD screen, a great deal',
	rating: 4.5,
}, {
	id: '2345',
	name: 'Basketball',
	price: '$10',
	description: 'Just like the pros use',
	rating: 3.8,
}, {
	id: '3456',
	name: 'Running Shoes',
	price: '$120',
	description: 'State-of-the-art technology for optimum running',
	rating: 4.2,
}];

// redirect all requests for '/' to '/api/'
app.get('/', (req, res) => {
	res.redirect('/api/');
});

// Root API endpoint
app.get('/api/', (req, res) => {
	res.json({
		message: "Welcome to the API",
		endpoints: {
			'GET /api/current-user': 'Get the current user details',
			'GET /api/users': 'Get the list of users',
			'GET /api/users/:id': 'Get a single',
			'POST /api/users/:id': 'Update a single user',
			'GET /api/products': 'Get the list of products',
			'GET /api/products/:id': 'Get a single product',
		}
	});
});

// Existing routes for users, products, and current user
app.get('/api/current-user', (req, res) => {
	res.json(currentUser);
});

app.get('/api/users/:id', (req, res) => {
	const { id } = req.params;
	res.json(users.find(user => user.id === id));
});

app.post('/api/users/:id', (req, res) => {
	const { id } = req.params;
	const { user: updatedUser } = req.body;

	users = users.map(user => user.id === id ? updatedUser : user);
	res.json(users.find(user => user.id === id));
});

app.get('/api/users', (req, res) => {
	res.json(users);
});

app.get('/api/products/:id', (req, res) => {
	const { id } = req.params;
	res.json(products.find(product => product.id === id));
});

app.post('/api/products/:id', (req, res) => {
	const { id } = req.params;
	const { product: updatedProduct } = req.body;

	products = products.map(product => product.id === id ? updatedProduct : product);
	res.json(products.find(product => product.id === id));
});

app.get('/api/products', (req, res) => {
	res.json(products);
});

app.listen(8080, () => {
	console.log('Server is listening on port 8080');
});
