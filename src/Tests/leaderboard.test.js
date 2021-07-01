import "core-js/stable";
import "regenerator-runtime/runtime";
import asyncScores from "../Objects/asyncScores";

it('Test connection with Leaderboard API with game URL', async () => {
    asyncScores.getAllScores()
        .then(data => {
            expect(data.status).toEqual(200);
        })
});

it('Test if a new score can be sent to the leaderboard API', async () => {
    asyncScores.postGameScore({ "user": "Gabriel", "score": 30})
        .then(data => {
            expect(data.user).toEqual("Gabriel");
            expect(data.score).toEqual(30);
        })
});
