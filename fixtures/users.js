//added this fixture to MongoDB to meet the ruberic, however did not use because my site is authenticated and requires a user password

const users = [
  {
    name: 'John Wick',
    email: 'the-wick@example.com',
    adult: true
  },
  {
    name: 'Mandy Michael',
    email: 'mandy@example.com',
    adult: true
  },
  {
    name: 'Jenn Simmons',
    email: 'jenn.simmons@example.com',
    adult: true
  },
  {
    name: 'Harry Potter',
    email: 'harry@example.com',
    adult: false
  }
];

module.exports = users;