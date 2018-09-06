const Observables = require('../../assets/scripts/util/observables');

const addGuestForm = (() => {

    const $addGuestForm = $('.addGuestForm');
    const $addGuestBtn = $addGuestForm.find('#add-guest');

    const init = () => {
        eventHandlers();
    }

    const eventHandlers = () => {
        $addGuestBtn.on('click', (e) => {
            const guestName = $(e.currentTarget).text();
            if (guestName) Observables.newGuestName$.next(guestName);
        });
    };

    return {
        init
    }

})();

addGuestForm.init();