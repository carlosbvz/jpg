/**
 * @method log - Log a given parameter to the console
 * @param {*} txt
 */
const log = (txt) => {
    console.log(txt);
};

const stringify = (objectData) => {
    return JSON.stringify(objectData);
};

module.exports = {
    log,
    stringify
};
