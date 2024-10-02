const { expect } = require('chai');
let { getDB } = require('../dbConnection'); // Make sure this path is correct
const { fetchTopChallenge } = require('../models/topChallengeModel'); // Adjust this path to your actual module

describe('fetchTopChallenge', function () {
  let originalGetDB; // Change const to let

  beforeEach(function () {
    originalGetDB = getDB; // Store the original getDB function
    getDB = () => ({
      collection: () => ({
        aggregate: () => ({
          next: () => Promise.resolve(mockTopChallenge), // Mock successful response
        }),
      }),
    });
  });

  afterEach(function () {
    getDB = originalGetDB; // Restore the original getDB function
  });

  it('should fetch the top challenge successfully', async function () {
    const mockTopChallenge = {
      _id: 'challengeId',
      title: 'Top Challenge',
      description: 'Description of top challenge',
      category: 'Fitness',
      steps: 5,
      totalUsers: 10,
    };

    const result = await fetchTopChallenge();
    expect(result).to.deep.equal(mockTopChallenge);
  });

  it('should throw an error when there is a database error', async function () {
    getDB = () => ({
      collection: () => ({
        aggregate: () => {
          throw new Error('Database error');
        },
      }),
    });

    try {
      await fetchTopChallenge();
      expect.fail('Expected error not thrown');
    } catch (error) {
      expect(error.message).to.equal('Database error');
    }
  });
});
