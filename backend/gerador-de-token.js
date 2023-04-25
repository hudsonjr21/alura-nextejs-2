const jwt = require('jsonwebtoken');

const SECRET_KEY = '123456789';

const nossoToken = jwt.sign(
  {
    nome: 'Hudson',
  },
  SECRET_KEY,
  {
    expiresIn: '10y',
    subject:'1'
  }
);

const TOKEN_GERADO = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21lIjoiSHVkc29uIiwiaWF0IjoxNjgyNDI2NjIwLCJleHAiOjE5OTgwMDI2MjAsInN1YiI6IjEifQ.yDs1iCq70Qgce8w5DCq7j-JdMfaYNIHtZIfMNOpIqB0';


// console.log(jwt.verify(TOKEN_GERADO, SECRET_KEY));
console.log(jwt.decode(nossoToken));
