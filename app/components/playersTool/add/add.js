const addForm = (() => {

    const $playerAddForm = $('#playerAdd');

    const init = () => {
        formSubmit();
    };

    const formSubmit = () => {
        $playerAddForm.on('submit', (e) => {

            const nameVal = $playerAddForm.find('input[name="name"]').val();
            const nicknameVal = $playerAddForm.find('input[name="nickname"]').val();

            if(nameVal && nicknameVal){
                $.ajax({
                    url: '/players',
                    method: 'POST',
                    data: {
                        name: $playerAddForm.find('input[name="name"]').val(),
                        nickname: $playerAddForm.find('input[name="nickname"]').val(),
                        rating: 0
                    }
                })
                .done(() => {
                    window.location.href = '/playersTool';
                });
            } else {
                alert('All fields are required');
            }
            e.preventDefault();
        })
    };

    return {
        init
    };

})();

addForm.init();
