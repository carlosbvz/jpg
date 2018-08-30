/**
 * @method sortByRating
 * @param {*} playersData
 */
const sortByRating = (playersData) => {
    return playersData.sort((a, b) => { return b.rating - a.rating; });
};

const roundRatingToTwo = (playersData) => {
    return playersData.map(player => {
        player.rating = roundToTwo(player.rating);
        return player;
    });
};

const round = (decimals) => {
    return (num) => parseFloat(num).toFixed(decimals);
};

const roundToTwo = round(2);
// const roundToThree = round(3);

module.exports = {
    sortByRating,
    roundRatingToTwo
};
