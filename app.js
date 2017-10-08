const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/embed', {useMongoClient: true});
mongoose.connection
  .once('open', () => console.log('Connected to the database, you are ready :)'))
  .on('error', err => console.log('Error with the database, you are not ready :('));

const Schema = mongoose.Schema;

let postSchema = new Schema({
  title: String,
  content: String
});
const Post = mongoose.model('Post', postSchema);

let userSchema = new Schema({
  name: String,
  email: String,
  posts: [postSchema]
});
const User = mongoose.model('User', userSchema);

User.create({name: 'Germán', email: 'germancutraro@hotmail.com'});
Post.create({title: 'Arrow Functions in Js Es6', content: 'Arrow functions are great...'});

User.findOne({email: 'germancutraro@hotmail.com'}).then(user => {
  user.posts.push({title: 'Template Strings', content: 'I love the new feature...'});
  user.save(); 
});

User.create({name: 'Nick', email: 'nick@gmail.com', posts: [{title: 'Apples', content: 'Apples are...'}]});
