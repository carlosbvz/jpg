const algorithm = require('./util/algorithm');
const Observables = require('./util/observables');

var playersData;

const Match = (() => {

    const $generateTeams = $('#generate-teams');
    const $teamAGrid = $('#team-A-grid');
    const $teamBGrid = $('#team-B-grid');
    const $alertPlayers = $('#alert-players');

    const matchLevel = Observables.level$.getValue();


    let totalPlayers = [];

    const init = () => {

        // TODO: Avoid this call and get data from markup since is already there form hbs/node
        $.ajax({
            url: '/players',
            method: 'GET'
        }).done(data => {
            playersData = data;
            eventHandlers();
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
        show (msg) {
            $alertPlayers.find('.plert-players-text').html(msg);
            $alertPlayers.show();
        },
        hide () {
            $alertPlayers.hide();
        }
    };

    const createTeams = () => {

        const matchLevel = Observables.level$.getValue();
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
            const validMatchesByTeamIndex = algorithm.getValidMatches(
                matchCombinationsArray,
                teamsCombinationsArray
            );

            let bestMatch = '';
            switch(matchLevel) {
                case 'b': // balanced
                    bestMatch = getBalancedMatch(validMatchesByTeamIndex, teamsCombinationsArray, playersInMatch);
                    break;

                case 'r': // random
                    bestMatch = getRandomMatch(validMatchesByTeamIndex, teamsCombinationsArray, playersInMatch);
                    break;
            
                default:
                    break;
            }

            if (bestMatch) displayTeamsInUI(bestMatch.teams.teamA, bestMatch.teams.teamB);
            else alert('feature for this level not supported');
        } else {
            msg = `Cannot play with an Odd number of players: ${matchSize}`;
        }
        if (msg) message.show(msg);
        else message.hide();
    };

    const getRandomMatch = (validMatchesByTeamIndex, teamsCombinationsArray, playersInMatch) => {
        const randomMatchTeams = validMatchesByTeamIndex[Math.floor(Math.random() * validMatchesByTeamIndex.length)];
        const pointsTeamA = algorithm.getAllPointsInTeam(
            teamsCombinationsArray[randomMatchTeams[0]],
            playersInMatch
        );
        const pointsTeamB = algorithm.getAllPointsInTeam(
            teamsCombinationsArray[randomMatchTeams[1]],
            playersInMatch
        );

        let randomMatch = {};
        randomMatch.teams = addTeamsDataToMatch(teamsCombinationsArray, randomMatchTeams, pointsTeamA, pointsTeamB, playersInMatch);
        
        return randomMatch;

    }

    const getBalancedMatch = (validMatchesByTeamIndex, teamsCombinationsArray, playersInMatch) => {
        // Find best (balanced) match
        let bestMatch = {};
        validMatchesByTeamIndex.forEach(teams => {
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
                bestMatch.teams = addTeamsDataToMatch(teamsCombinationsArray, teams, pointsTeamA, pointsTeamB, playersInMatch);
            }
        });

        

        return bestMatch;
    }

    const addTeamsDataToMatch = (teamsCombinationsArray, teams, pointsTeamA, pointsTeamB, playersInMatch) => {
        const teamsData = {};
        teamsData.teamA = {
            playersIndexes: teamsCombinationsArray[teams[0]],
            points: pointsTeamA
        }
        teamsData.teamB = {
            playersIndexes: teamsCombinationsArray[teams[1]],
            points: pointsTeamB
        }
        
        teamsData.teamA.playersData = [];
        teamsData.teamB.playersData = [];
        teamsData.teamA.playersIndexes.forEach(playerIndex => {
            teamsData.teamA.playersData.push(playersInMatch[playerIndex]);
        });
        teamsData.teamB.playersIndexes.forEach(playerIndex => {
            teamsData.teamB.playersData.push(playersInMatch[playerIndex]);
        });
        return teamsData;
    }

    const eventHandlers = () => {
        
        $generateTeams.on('click', e => {
            createTeams();
        });
    };

    return {
        init
    };
})();

Match.init();
