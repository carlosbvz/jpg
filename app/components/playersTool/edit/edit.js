const editForm = (() => {

    const $nameEditBtn = $('.nameEditBtn');
    const $nicknameEditBtn = $('.nicknameEditBtn');
    const $pointsEditBtn = $('.pointsEditBtn');
    const playerId = window.location.href.split('edit/')[1];

    const init = () => {
        eventHandlers();
    };

    const eventHandlers = () => {
        $nameEditBtn.on('click', (e) => {

            $.ajax({
                url: '/players/' + playerId,
                method: 'PUT',
                data: {
                    name: $nameEditBtn.prev().val()
                }
            })
            .done(() => {
                window.location.href = '/playersTool';
            })
            e.preventDefault();
        });

        $nicknameEditBtn.on('click', (e) => {

            $.ajax({
                url: '/players/' + playerId,
                method: 'PUT',
                data: {
                    nickname: $nicknameEditBtn.prev().val()
                }
            })
            .done(() => {
                window.location.href = '/playersTool';
            })
            e.preventDefault();
        });

        $pointsEditBtn.on('click', (e) => {

            $.ajax({
                url: '/players/' + playerId,
                method: 'PUT',
                data: {
                    rating: $pointsEditBtn.prev().val()
                }
            })
            .done(() => {
                window.location.href = '/playersTool';
            })
            e.preventDefault();
        });
    };

    return {
        init
    };

})();

editForm.init();
