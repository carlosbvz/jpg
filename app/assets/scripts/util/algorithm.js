const algorithm = (() => {
    const getSubset = (input, subset) => {
        const result = [];
        for (let i = 0; i < subset.length; i++) result[i] = input[subset[i]];
        return result;
    };
    // Gets the combinations
    const getCombinationIndexes = (input, sequenceLength) => {
        const subsets = [];
        const buffer = [];
        if (sequenceLength <= input.length) {
            // first index sequence: 0, 1, 2, ...
            for (let i = 0; (buffer[i] = i) < sequenceLength - 1; i++);
            subsets.push(getSubset(input, buffer));
            for (; ;) {
                let i;
                for (
                    i = sequenceLength - 1;
                    i >= 0 && buffer[i] == input.length - sequenceLength + i;
                    i--
                );
                if (i < 0) {
                    break;
                }
                buffer[i]++;
                for (++i; i < sequenceLength; i++) {
                    buffer[i] = buffer[i - 1] + 1;
                }
                subsets.push(getSubset(input, buffer));
            }
        }
        return subsets;
    };

    const isEven = number => {
        return number % 2 === 0;
    };

    const isInArray = (value, array) => {
        return array.indexOf(value) > -1;
    };

    const getAllPointsInTeam = (playersArray, playersData) => {
        let totalPoints = 0;
        playersArray.forEach(playerIndex => {
            totalPoints += parseFloat(playersData[playerIndex].rating);
        });
        return totalPoints;
    };

    const round = (decimals) => {
        return (num) => parseFloat(num).toFixed(decimals);
    };

    const roundToTwo = round(2);
    const roundToThree = round(3);
    /**
     *
     * @param {Number} int
     */
    const getInputArrayFromInt = int => {
        const input = [];
        while (int) input.push(int-- - 1);
        return input;
    };
    /**
     * @method getValidMatches - Removes those instances where the same player appears in both teams
     * @param {*} matchCombinationsArray
     * @param {*} teamsCombinationsArray
     */
    const getValidMatches = (matchCombinationsArray, teamsCombinationsArray) => {
        return matchCombinationsArray.filter(teams => {
            let isValidMatch = true;
            teamsCombinationsArray[teams[0]].forEach(player => {
                if (isInArray(player, teamsCombinationsArray[teams[1]])) {
                    isValidMatch = false;
                }
            });
            if (isValidMatch) return teams;
        });
    };

    return {
        getCombinationIndexes,
        isEven,
        getAllPointsInTeam,
        getInputArrayFromInt,
        getValidMatches
    };

})();

export default algorithm;
