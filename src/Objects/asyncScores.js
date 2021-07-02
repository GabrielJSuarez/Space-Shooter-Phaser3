import 'core-js/stable';
import 'regenerator-runtime/runtime';

const asyncData = (() => {
  const postGameScore = async (data = {}) => {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ZKPC9fEkBBQMfUSFenKV/scores/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const getAllScores = async () => {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ZKPC9fEkBBQMfUSFenKV/scores/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  };

  return {
    postGameScore, getAllScores,
  };
})();

export default asyncData;
