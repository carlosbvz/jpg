const Observables = require('../../assets/scripts/util/observables');

const playersList = (() => {

    const $playersList = $('.playersList')
    const $playersListPanel = $playersList.find('#players-list-panel');
    const $totalPlayersCountDisplay = $playersList.find('#total-players');

    const selectedPlayersData= {
        data: {},
        get() {
            return Object.values(this.data);
        },
        toggle(playerData) {
            const playersId = playerData._id;
            if (this.data[playersId]) delete this.data[playersId];
            else this.data[playersId] = playerData;
        }
    };

    const init = () => {
        eventHandlers();
    };

    const eventHandlers = () => {
        $playersListPanel.find('.list-group-item-player').on('click', e => {
            const $selectedPlayer = $(e.currentTarget);
            const selectedPlayerData = $selectedPlayer.data('player');

            updateUI($selectedPlayer);
            selectedPlayersData.toggle(selectedPlayerData);

            Observables.selectedPlayersData$.next(selectedPlayersData.get());

            e.preventDefault();
        });
    };

    const updateUI = ($selectedPlayer) => {
        $selectedPlayer.toggleClass('active');
        updateTotalPlayersCount($playersListPanel.find('.active').length );
    };

    const updateTotalPlayersCount = (totalPlayers) => {
        $totalPlayersCountDisplay.html(totalPlayers);
    };

    return {
        init
    }

})();

playersList.init();