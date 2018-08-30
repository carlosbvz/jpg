const deleteForm = (() => {

    const $playerDeleteBtn = $('.playerDeleteBtn');
    const playerId = window.location.href.split('/delete/')[1];

    const init = () => {
        eventHandlers()
    };

    const eventHandlers = () => {
        $playerDeleteBtn.on('click', (e) => {

            $.ajax({
                url: '/players/' + playerId,
                method: 'DELETE'
            })
            .done(() => {
                window.location.href = '/playersTool';
            })
            e.preventDefault();
        })
    };

    return {
        init
    };

})();

deleteForm.init();
