const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const authController = require('../controllers/authController');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../models/userModel');

describe('Auth Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user and return user object without password', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123',
          nom: 'Doe',
          prenom: 'John'
        }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      const mockUser = {
        _id: 'userId',
        email: 'test@example.com',
        nom: 'Doe',
        prenom: 'John',
        save: jest.fn().mockResolvedValue({
          _id: 'userId',
          email: 'test@example.com',
          nom: 'Doe',
          prenom: 'John'
        })
      };

      bcrypt.hashSync.mockReturnValue('hashedPassword');
      User.mockImplementation(() => mockUser);

      await authController.register(req, res);

      expect(User).toHaveBeenCalledWith(req.body);
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        _id: 'userId',
        email: 'test@example.com',
        nom: 'Doe',
        prenom: 'John'
      });
    });

    it('should return 400 if registration fails', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      User.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('Registration error'))
      }));

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: 'Registration error' });
    });
  });

  describe('login', () => {
    it('should login a user and return a JWT token', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123'
        }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      const mockUser = {
        _id: 'userId',
        email: 'test@example.com',
        nom: 'Doe',
        prenom: 'John',
        comparePassword: jest.fn().mockReturnValue(true)
      };

      User.findOne.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('mockToken');

      await authController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(mockUser.comparePassword).toHaveBeenCalledWith('password123');
      expect(jwt.sign).toHaveBeenCalledWith(
        { email: 'test@example.com', nom: 'Doe', prenom: 'John', _id: 'userId' },
        process.env.JWT_SECRET || 'RESTFULAPIs'
      );
      expect(res.json).toHaveBeenCalledWith({ token: 'mockToken' });
    });

    it('should return 401 if authentication fails', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'wrongpassword'
        }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      const mockUser = {
        _id: 'userId',
        email: 'test@example.com',
        comparePassword: jest.fn().mockReturnValue(false)
      };

      User.findOne.mockResolvedValue(mockUser);

      await authController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(mockUser.comparePassword).toHaveBeenCalledWith('wrongpassword');
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Authentication failed. Invalid user or password.' });
    });

    it('should return 500 if an error occurs during authentication', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123'
        }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      User.findOne.mockRejectedValue(new Error('Login error'));

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Error in authentication' });
    });
  });
});
