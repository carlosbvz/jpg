const Observables = require('../../assets/scripts/util/observables');

const addGuestForm = (() => {

    const $addGuestForm = $('.addGuestForm');
    const $addGuestBtn = $addGuestForm.find('#add-guest');
    const $guestNameInput = $addGuestForm.find('#guest-name');

    const init = () => {
        eventHandlers();
    };

    const eventHandlers = () => {
        $addGuestBtn.on('click', (e) => {
            const guestName = $guestNameInput.val();
            let id = new Date();
            id.toString(36).slice(-8);
            if (guestName) {
                const guestData = {
                    '_id': id,
                    name: guestName,
                    nickname: '',
                    rating: 0,
                    updated_at: new Date(),
                    __v: 0
                };
                Observables.newGuestData$.next(guestData);
            }
        });
    };

    return {
        init
    };

})();

addGuestForm.init();
