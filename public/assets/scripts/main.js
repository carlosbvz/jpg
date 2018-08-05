const Match = (() => {
  const $playersList = $("#players-list");
  const $totalPlayersCountDisplay = $("#total-players");
  const $generateTeams = $("#generate-teams");
  const $teamAGrid = $("#team-A-grid");
  const $teamBGrid = $("#team-B-grid");
  const $alertPlayers = $("#alert-players");

  let totalPlayers = [];

  const init = () => {
    // playersData is a global variable (json Data) coming from the data.js file
    
    displayPlayers(playersData.sort((a, b) => {return b.score - a.score}));
    bindEvents();
    // createTeams();
  };

  const displayPlayers = playersData => {
    playersData.forEach(player => {
      $playersList.append(getPlayerListItemSchema(player));
    });
  };

  const getPlayerListItemSchema = playerData => {
    return `<a href="#" class="list-group-item d-flex justify-content-between align-items-center list-group-item-player" data-player-id=${
      playerData.id
    }>
                ${playerData.name}
                <span class="badge badge-primary badge-pill">${roundToTwo(
                  playerData.score
                )}</span>
            </a>`;
  };

  const displayTeamsInUI = (teamA, teamB) => {
    $teamAGrid.html("");
    $teamBGrid.html("");
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
      $alertPlayers.find(".plert-players-text").html(msg);
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
    const teamInput = getInputArrayFromInt(matchSize);

    let msg = "";
    if (matchSize === 0) msg = "Please select an even number of players.";
    else if (isEven(matchSize) && matchSize > 12)
      msg = "We only support matches of 12 players maximum.";
    else if (isEven(matchSize)) {
      const teamsCombinationsArray = getCombinationIndexes(teamInput, teamSize);
      const teamsCombinationsCount = teamsCombinationsArray.length;

      const matchInput = getInputArrayFromInt(teamsCombinationsCount);
      const matchCombinationsArray = getCombinationIndexes(
        matchInput,
        teamsPerMatchCount
      );

      const validMatches = getValidMatches(
        matchCombinationsArray,
        teamsCombinationsArray
      );

      let bestMatch = {};
      validMatches.forEach(teams => {
        const pointsTeamA = getAllPointsInTeam(
          teamsCombinationsArray[teams[0]],
          playersInMatch
        );
        const pointsTeamB = getAllPointsInTeam(
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
    $playersList.find(".list-group-item-player").on("click", e => {
      const playerID = $(e.currentTarget).data("player-id");
      const player = playersData.filter(player => player.id === playerID)[0];
      // Removing
      if ($(e.currentTarget).hasClass("active")) {
        $(e.currentTarget).removeClass("active");
        totalPlayers = totalPlayers.filter(player => {
          if (playerID !== player.id) return player;
        });
        // Adding
      } else {
        $(e.currentTarget).addClass("active");
        totalPlayers.push(player);
      }

      updateTotalPlayersCount();
      e.preventDefault();
    });
    $generateTeams.on("click", e => {
      createTeams();
    });
  };

  const updateTotalPlayersCount = () =>
    $totalPlayersCountDisplay.html(totalPlayers.length);

  return {
    init
  };
})();

Match.init();
