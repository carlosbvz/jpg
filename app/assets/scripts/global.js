import algorithm from '../scripts/util/algorithm';

var playersData;

const Match = (() => {
  const $playersList = $('#players-list');
  const $totalPlayersCountDisplay = $('#total-players');
  const $generateTeams = $('#generate-teams');
  const $teamAGrid = $('#team-A-grid');
  const $teamBGrid = $('#team-B-grid');
  const $alertPlayers = $('#alert-players');

  let totalPlayers = [];

  const init = () => {
    $.ajax({
      url: '/players',
      method: 'GET'
    }).done(data => {
      playersData = data;
      bindEvents();
    });
  };

  const displayTeamsInUI = (teamA, teamB) => {
    $teamAGrid.html('');
    $teamBGrid.html('');
    teamA.playersData.forEach(player => {
      $teamAGrid.append(`
              <p>${player.name}</p>
          `);
    });
    teamB.playersData.forEach(player => {
      $teamBGrid.append(`
              <p>${player.name}</p>
          `);
    });
  };

  const message = {
    show(msg) {
      $alertPlayers.find('.plert-players-text').html(msg);
      $alertPlayers.show();
    },
    hide() {
      $alertPlayers.hide();
    }
  };

  const createTeams = () => {
    const teamsPerMatchCount = 2; // 2 teams per match
    const playersInMatch = totalPlayers;
    const matchSize = playersInMatch.length;
    const teamSize = matchSize / 2;

    const teamInput = algorithm.getInputArrayFromInt(matchSize);

    let msg = '';
    if (matchSize === 0) msg = 'Please select an even number of players.';
    else if (algorithm.isEven(matchSize) && matchSize > 12) {
      msg = 'We only support matches of 12 players maximum.';
    } else if (algorithm.isEven(matchSize)) {
      const teamsCombinationsArray = algorithm.getCombinationIndexes(
        teamInput,
        teamSize
      );
      const teamsCombinationsCount = teamsCombinationsArray.length;

      const matchInput = algorithm.getInputArrayFromInt(teamsCombinationsCount);
      const matchCombinationsArray = algorithm.getCombinationIndexes(
        matchInput,
        teamsPerMatchCount
      );

      const validMatches = algorithm.getValidMatches(
        matchCombinationsArray,
        teamsCombinationsArray
      );

      let bestMatch = {};
      validMatches.forEach(teams => {

        const pointsTeamA = algorithm.getAllPointsInTeam(
          teamsCombinationsArray[teams[0]],
          playersInMatch
        );
        const pointsTeamB = algorithm.getAllPointsInTeam(
          teamsCombinationsArray[teams[1]],
          playersInMatch
        );
        const difference = Math.abs(pointsTeamA - pointsTeamB);
        if (!bestMatch.difference || bestMatch.difference > difference) {
          bestMatch.difference = difference;
          bestMatch.teams = {
            teamA: {
              playersIndexes: teamsCombinationsArray[teams[0]],
              points: pointsTeamA
            },
            teamB: {
              playersIndexes: teamsCombinationsArray[teams[1]],
              points: pointsTeamB
            }
          };
        }
      });

      bestMatch.teams.teamA.playersData = [];
      bestMatch.teams.teamB.playersData = [];
      bestMatch.teams.teamA.playersIndexes.forEach(playerIndex => {
        bestMatch.teams.teamA.playersData.push(playersInMatch[playerIndex]);
      });
      bestMatch.teams.teamB.playersIndexes.forEach(playerIndex => {
        bestMatch.teams.teamB.playersData.push(playersInMatch[playerIndex]);
      });

      displayTeamsInUI(bestMatch.teams.teamA, bestMatch.teams.teamB);
    } else {
      msg = `Cannot play with an Odd number of players: ${matchSize}`;
    }
    if (msg) message.show(msg);
    else message.hide();
  };

  const bindEvents = () => {
    $playersList.find('.list-group-item-player').on('click', e => {
      const playerID = $(e.currentTarget).data('player-id');
      const player = playersData.filter(player => player._id === playerID)[0];
      // Removing
      if ($(e.currentTarget).hasClass('active')) {
        $(e.currentTarget).removeClass('active');
        totalPlayers = totalPlayers.filter(player => {
          if (playerID !== player._id) return player;
        });
        // Adding
      } else {
        $(e.currentTarget).addClass('active');
        totalPlayers.push(player);
      }
      updateTotalPlayersCount();
      e.preventDefault();
    });
    $generateTeams.on('click', e => {
      createTeams();
    });
  };

  const updateTotalPlayersCount = () => {
    $totalPlayersCountDisplay.html(totalPlayers.length);
  }

  return {
    init
  };
})();

Match.init();
