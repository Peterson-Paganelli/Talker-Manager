const rand = () => Math.random().toString(32).substr(2, 8);
const token = () => rand() + rand();

module.exports = token;