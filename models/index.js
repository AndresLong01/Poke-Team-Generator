const User = require('./User');
const Pokemon = require('./Pokemon');

Pokemon.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

User.hasMany(Pokemon, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Pokemon
};