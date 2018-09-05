
const Observables = require('../../assets/scripts/util/observables');

const difficultyBar = (() => {

  const $difficultyBar = $('.difficultyBar');
  const $levelsBtns = $difficultyBar.find('button');
  const activeBtnCssClass = 'btn-secondary active';
  const defaultBtnCssClass = 'btn-light';
  

  const init = () => {
    eventHandlers();
  };

  const eventHandlers = () => {
    $levelsBtns.on('click', (e) => {
      if ($(e.currentTarget).hasClass('active')) return false;
      broadcastLevel($(e.currentTarget).data('level'));
      updateUI($(e.currentTarget));
    })
  };

  const updateUI = ($activeBtn) => {
    $levelsBtns.removeClass(activeBtnCssClass);
    $levelsBtns.addClass(defaultBtnCssClass);

    $activeBtn.removeClass(defaultBtnCssClass);
    $activeBtn.addClass(activeBtnCssClass);
  };

  const broadcastLevel = (level) => {
    Observables.level$.next(level);
  };

  return {
    init
  }
})();

difficultyBar.init();