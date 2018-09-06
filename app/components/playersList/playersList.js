const Observables = require('../../assets/scripts/util/observables');

const playersList = (() => {

    const $playersList = $('.playersList');
    const $playersListPanel = $playersList.find('#players-list-panel');
    const $totalPlayersCountDisplay = $playersList.find('#total-players');

    const selectedPlayersData = {
        data: {},
        get () {
            return Object.values(this.data);
        },
        toggle (playerData) {
            const playersId = playerData._id;
            if (this.data[playersId]) delete this.data[playersId];
            else this.data[playersId] = playerData;
        }
    };

    const init = () => {
        eventHandlers();
    };

    const eventHandlers = () => {
        $playersListPanel.on('click', '.list-group-item-player', e => {
            const $selectedPlayer = $(e.currentTarget);
            const selectedPlayerData = $selectedPlayer.data('player');

            updateUI($selectedPlayer);
            selectedPlayersData.toggle(selectedPlayerData);

            Observables.selectedPlayersData$.next(selectedPlayersData.get());

            e.preventDefault();
        });

        Observables.newGuestData$.subscribe(guestData => {
            addGuestToList(guestData);
        });
    };

    const addGuestToList = (guestData) => {
        $playersListPanel.append(`
            <a href="#" class="list-group-item d-flex justify-content-between align-items-center list-group-item-player" data-player=${JSON.stringify(guestData)}>
                ${guestData.name} (Guest)
                <span class="badge badge-primary badge-pill">${guestData.rating}</span>
            </a>`);
    };

    const updateUI = ($selectedPlayer) => {
        $selectedPlayer.toggleClass('active');
        updateTotalPlayersCount($playersListPanel.find('.active').length);
    };

    const updateTotalPlayersCount = (totalPlayers) => {
        $totalPlayersCountDisplay.html(totalPlayers);
    };

    return {
        init
    };

})();

playersList.init();
