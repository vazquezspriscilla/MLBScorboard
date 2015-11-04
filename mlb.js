var app = angular.module('myApp',[]);
app.controller('mlbCtrl', function ($scope, $http){
	
	//function to populate table
	$scope.displayTable = function(){
		//calling JSON file
		$http({method: 'GET', url: 'mlb.json'}).success(function(data, status) {
			//initalizing $scope variables
			$scope.games = null;
			$scope.linksList = null;
			$scope.sport = data.sports[0].leagues[0].name;

			//looping through data
			for (var i = 0; i < data.sports[0].leagues[0].events.length; i++){

				//setting variables to current values for given game
				var currentGame = data.sports[0].leagues[0].events[i];
				var currStatus = currentGame.competitions[0].status.description;
				var currLink = null;

				//gathering link data based off status of game
				if (currStatus == 'FINAL'){
					currLink = currentGame.links.web.recap.href;
				}else if (currStatus == 'IN PROGRESS'){
					currLink = currentGame.links.web.boxscore.href;
				}else if (currStatus =="SCHEDULED"){
					currLink = currentGame.links.web.conversation.href;
				}

				//either creating or pushing data into array which contains useful information I will need for populating the table
				if (i == 0){
						$scope.games = [{
							homeTeam: currentGame.competitions[0].competitors[0].team.name,
							homeLoc: currentGame.competitions[0].competitors[0].team.location,
							homeScore: currentGame.competitions[0].competitors[0].score,
							homeRec:currentGame.competitions[0].competitors[0].team.record.summary,
							homeColor:currentGame.competitions[0].competitors[0].team.color,
							awayTeam: currentGame.competitions[0].competitors[1].team.name,
							awayLoc: currentGame.competitions[0].competitors[1].team.location,
							awayScore: currentGame.competitions[0].competitors[1].score,
							awayRec:currentGame.competitions[0].competitors[1].team.record.summary,
							awayColor:currentGame.competitions[0].competitors[1].team.color,
							status:currStatus,
							link: currLink
						}];
					
				}else{
						$scope.games.push ({
							homeTeam: currentGame.competitions[0].competitors[0].team.name,						
							homeLoc: currentGame.competitions[0].competitors[0].team.location,
							homeScore: currentGame.competitions[0].competitors[0].score,
							homeRec:currentGame.competitions[0].competitors[0].team.record.summary,
							homeColor:currentGame.competitions[0].competitors[0].team.color,
							awayTeam: currentGame.competitions[0].competitors[1].team.name,
							awayLoc: currentGame.competitions[0].competitors[1].team.location,
							awayScore: currentGame.competitions[0].competitors[1].score,
							awayRec:currentGame.competitions[0].competitors[1].team.record.summary,
							awayColor:currentGame.competitions[0].competitors[1].team.color,
							status: currStatus,
							link: currLink	
						});
				}
			}
        });
	};

	//Capturing what color the Team name should be
	$scope.getAwayColor = function(game){
		var aColor = "#" + game.awayColor ;
		console.log(aColor);
		return {"color": aColor};
	};

	$scope.getHomeColor = function(game){
		var color = "#" + game.homeColor;
		return {"color": color};
	};

	
});
