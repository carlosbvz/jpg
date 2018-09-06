const playersList = (() => {

    const $playersList = $('.playersList')
    const $playersListPanel = $playersList.find('#players-list-panel');
    const $totalPlayersCountDisplay = $playersList.find('#total-players');

    const init = () => {
        eventHandlers();
    };

    const eventHandlers = () => {
        $playersListPanel.find('.list-group-item-player').on('click', e => {
            const $selectedPlayer = $(e.currentTarget);
            const selectedPlayerId = $selectedPlayer.data('player-id');

            updateUI($selectedPlayer);
            
            // const player = playersData.filter(player => player._id === playerID)[0];
            // Removing
            // if ($(e.currentTarget).hasClass('active')) {
            //     $(e.currentTarget).removeClass('active');
            //     totalPlayers = totalPlayers.filter(player => {
            //         if (playerID !== player._id) return player;
            //     });
            //     // Adding
            // } else {
            //     $(e.currentTarget).addClass('active');
            //     totalPlayers.push(player);
            // }
            // updateTotalPlayersCount();
            e.preventDefault();
        });
    };

    const updateUI = ($selectedPlayer) => {
        $selectedPlayer.toggleClass('active')
    };

    const updateTotalPlayersCount = () => {
        // $totalPlayersCountDisplay.html(totalPlayers.length);
    };

    return {
        init
    }

})();

playersList.init();