// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const server = require('../app.js'); 
// const Film = require('../filmModel'); 
// const expect = chai.expect;

// chai.use(chaiHttp);

// describe('Film API', () => {
  
//   // Before each test, make sure the films collection is empty
//   beforeEach(async () => {
//     await Film.deleteMany({});
//   });

//   // Test the POST route for creating a film
//   it('should create a new film', (done) => {
//     const newFilm = {
//       title: "Inception",
//       description: "A mind-bending thriller by Christopher Nolan.",
//       genre: "modhik", 
//       duration: "148 minutes",
//       language: "English"
//     };

//     chai.request(server)
//       .post('/api/film/create') 
//       .send(newFilm)
//       .end((err, res) => {
//         expect(res).to.have.status(201); 
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.have.property('_id');
//         expect(res.body).to.have.property('title').eql('Inception');
//         expect(res.body).to.have.property('description').eql('A mind-bending thriller by Christopher Nolan.');
//         expect(res.body).to.have.property('genre').eql('modhik');
//         expect(res.body).to.have.property('duration').eql('148 minutes');
//         expect(res.body).to.have.property('language').eql('English');
//         done();
//       });
//   });

  
//   it('should return 500 when required fields are missing', (done) => {
//     const incompleteFilm = {
//       description: "Missing required fields",
//       genre: "romantic",
//       duration: "120 minutes"
//     };

//     chai.request(server)
//       .post('/api/film/create') 
//       .send(incompleteFilm)
//       .end((err, res) => {
//         expect(res).to.have.status(500);
//         expect(res.body).to.have.property('message').eql('Error creating film');
//         expect(res.body).to.have.property('error');
//         done();
//       });
//   });
// });
