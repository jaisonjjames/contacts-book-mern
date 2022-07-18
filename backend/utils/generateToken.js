import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, 'jj@2022', {
    expiresIn: '30d',
  });
};

export default generateToken;