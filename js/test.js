var racingManiac = {
    position: 0,
    positionCar1: 0,
    positionCar2: 0,
    positionCar3: 0,
    score: 0,
    attempt: 3,
    windowHeight: null,
    leftCarInterval: 5,
    rightCarInterval: 10,
    shiftOnKey: 1,
    obscar1LeftLimit: 80,
    obscar1RightLimit: 103,
    obscar2LeftLimit: 130,
    obscar2RightLimit: 150,
    obscar3LeftLimit: 178,
    obscar3RightLimit: 210,
    obscar1: "obstacleCar1",
    obscar2: "obstacleCar2",
    obscar3: "obstacleCar3",
    counter: 5,

    init: function () {
        racingManiac.carReset();
        racingManiac.windowHeight = $(document).height();
        racingManiac.carPosition = $('.car').position();
        $(".displayWindow > span").remove();
        racingManiac.lifeCreate();
        racingManiac.randomLeftForObstacle(racingManiac.obscar1LeftLimit, racingManiac.obscar1RightLimit, racingManiac.obscar1);
        racingManiac.randomLeftForObstacle(racingManiac.obscar2LeftLimit, racingManiac.obscar2RightLimit, racingManiac.obscar2);
        racingManiac.randomLeftForObstacle(racingManiac.obscar3LeftLimit, racingManiac.obscar3RightLimit, racingManiac.obscar3);
        racingManiac.setIntervalofTrack = setInterval(racingManiac.trackMove, 1);
        racingManiac.setIntervalofObstacleCar1 = setInterval(racingManiac.setIntervalCallForObs1, racingManiac.leftCarInterval);
        racingManiac.setIntervalofObstacleCar2 = setInterval(racingManiac.setIntervalCallForObs2, racingManiac.rightCarInterval);
        racingManiac.setIntervalofObstacleCar3 = setInterval(racingManiac.setIntervalCallForObs3, racingManiac.rightCarInterval);
        racingManiac.setIntervalCollisionDetect = setInterval(racingManiac.collisionCheck, 1);
        $(document).keydown(racingManiac.moveCarOnKeypress);
        $(document).keyup(racingManiac.clearKey);

        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", racingManiac.deviceOrientationListener);
        } else {
            alert("Sorry, your browser doesn't support Device Orientation");
        }
    },
    setIntervalCallForObs1: function () {
        racingManiac.obstacleCarMove(racingManiac.obscar1, 1, racingManiac.obscar1LeftLimit, racingManiac.obscar1RightLimit);
    },
    setIntervalCallForObs2: function () {
        racingManiac.obstacleCarMove(racingManiac.obscar2, 2, racingManiac.obscar2LeftLimit, racingManiac.obscar2RightLimit);
    },
    setIntervalCallForObs3: function () {
        racingManiac.obstacleCarMove(racingManiac.obscar3, 3, racingManiac.obscar3LeftLimit, racingManiac.obscar3RightLimit);
    },
    deviceOrientationListener: function (event) {
        var gammaValue = Math.ceil(event.gamma);
        if (gammaValue < 0) {
            racingManiac.moveCarOnKeypress({
                which: racingManiac.leftArrow
            })
        } else if (gammaValue > 0) {
            racingManiac.moveCarOnKeypress({
                which: racingManiac.rightArrow
            })
        }
    },
    lifeCreate: function () {
        var i, imageAppend;
        $(".life").empty();
        for (i = 0; i < 3; i++) {
            imageAppend = '<img src="image/life.png" height="42" width="42">';
            $(".life").append(imageAppend);
        }
    },
    trackMove: function () {
        if (racingManiac.position < 50000) {
            if (racingManiac.position < 5000) {
                racingManiac.position += 2;
                racingManiac.positionCar1 += 1;
                racingManiac.positionCar2 += 0.5;
                racingManiac.positionCar3 += 0.25;
            } else if (racingManiac.position >= 5000 && racingManiac.position < 10000) {
                racingManiac.position += 2.5;
                racingManiac.positionCar1 += 1.25;
                racingManiac.positionCar2 += 0.75;
                racingManiac.positionCar3 += 0.50;
            } else if (racingManiac.position >= 10000 && racingManiac.position < 20000) {
                racingManiac.position += 3;
                racingManiac.positionCar1 += 1.5;
                racingManiac.positionCar2 += 1;
                racingManiac.positionCar3 += 0.75;
            } else if (racingManiac.position >= 20000 && racingManiac.position < 30000) {
                racingManiac.position += 3.5;
                racingManiac.positionCar1 += 1.75;
                racingManiac.positionCar2 += 1.25;
                racingManiac.positionCar3 += 1;
            } else if (racingManiac.position >= 30000 && racingManiac.position < 40000) {
                racingManiac.position += 4;
                racingManiac.positionCar1 += 2;
                racingManiac.positionCar2 += 1.50;
                racingManiac.positionCar3 += 1.25;
            } else {
                racingManiac.position += 4.5;
                racingManiac.positionCar1 += 2.25;
                racingManiac.positionCar2 += 1.75;
                racingManiac.positionCar3 += 1.50;
            }
        } else {
            $(".displayWindow").css({
                "background-image": "url(../streetFighter/image/winner.jpg)",
                "border": "1px solid black",
                "z-index": 999999
            });
            racingManiac.gameOver();
        }

        $(".track").css({
            "background-position": "0px " + racingManiac.position + "px"
        });
        racingManiac.score += 1;
        var scoreAppend = "Score:<br>" + racingManiac.score;
        $(".score").html(scoreAppend);
    },
    randomLeftForObstacle: function (min, max, obs) {
        var createCar;
        createCar = '<div class="' + obs + '"></div>';
        $(".track").append(createCar);
        $('.' + obs).css({
            left: Math.floor(Math.random() * (max - min + 1) + min) + "px"
        })
    },
    obstacleCarMove: function (obs, number, min, max) {
        var pos = racingManiac["positionCar" + number];
        $('.' + obs).css({
            "top": pos + "px"
        });
        console.log(pos)
        if (pos >= racingManiac.windowHeight) {
            racingManiac["positionCar" + number] = 0;
            $('.' + obs).remove();
            racingManiac.randomLeftForObstacle(min, max, obs);
        }
    },
    carReset: function () {
        $(".car").css({
            left: "146px",
            bottom: "10px"
        })
    },
    collision: function ($div1, $div2) {
        var obsCarLeft = $div1.position().left,
            obsCarTop = $div1.position().top,
            obsCarHeight = $div1.outerHeight(true),
            obsCarWidth = $div1.outerWidth(true),
            totalHeight = obsCarTop + obsCarHeight,
            totalWidth = obsCarLeft + obsCarWidth,
            carLeft = $div2.position().left,
            carTop = $div2.position().top,
            carHeight = $div2.outerHeight(true),
            carWidth = $div2.outerWidth(true),
            totalCarHeight = carTop + carHeight,
            totalCarWidth = carLeft + carWidth;
        if (totalHeight < carTop || obsCarTop > totalCarHeight || totalWidth < carLeft || obsCarLeft > totalCarWidth) {
            return false;
        } else {
            racingManiac.attempt -= 1;
            $(".life").children().eq(0).remove();
            racingManiac.clearCollision();
            if (racingManiac.attempt <= 0) {
                $(".displayWindow").css({
                    "background-image": "url(../streetFighter/image/gameover.png)"
                });
                racingManiac.gameOver();
            }
            $div1.remove();
        }

    },

    gameOver: function () {
        if (navigator.vibrate) {
            // vibration API supported
            navigator.vibrate(1000);
        }
        $(".displayWindow").show();
        $(document).off('keydown');
        window.removeEventListener("deviceorientation", racingManiac.deviceOrientationListener);
        $(".resetCar").prop("disabled", false);
        clearInterval(racingManiac.setIntervalofTrack);
        clearInterval(racingManiac.setIntervalofObstacleCar1);
        clearInterval(racingManiac.setIntervalofObstacleCar2);
        if ($('.obstacleCar1').length) {
            $('.obstacleCar1').remove();
        }
        if ($('.obstacleCar2').length) {
            $('.obstacleCar2').remove();
        }
        if ($('.obstacleCar3').length) {
            $('.obstacleCar3').remove();
        }
    },
    leftArrow: 37,
    rightArrow: 39,

    leftArrowPress: function () {

        console.log(racingManiac.carPosition.left)
        if (racingManiac.carPosition.left >= 84) {
            racingManiac.carPosition.left -= racingManiac.shiftOnKey;
            $('.car').css({
                left: Math.max(84, racingManiac.carPosition.left)
            }, 1);
        }
    },
    rightArrowPress: function () {
        console.log(racingManiac.carPosition.left)

        if (racingManiac.carPosition.left <= 210) {
            racingManiac.carPosition.left += racingManiac.shiftOnKey;
            $('.car').css({
                left: Math.min(210, racingManiac.carPosition.left)
            }, 1);
        }
    },
    launchIntoFullscreen: function (element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    },
    moveCarOnKeypress: function (e) {
        switch (e.which) {
        case racingManiac.leftArrow:
            //left arrow key
            racingManiac.clearKey();
            racingManiac.interval = setInterval(racingManiac.leftArrowPress, 10);
            break;

        case racingManiac.rightArrow:
            //right arrow key
            racingManiac.clearKey();
            racingManiac.interval = setInterval(racingManiac.rightArrowPress, 10);
            break;
        }
    },
    clearKey: function () {
        clearInterval(racingManiac.interval);
    },
    collisionCheck: function () {
        if ($('.obstacleCar1').length) {
            racingManiac.collision($(".obstacleCar1"), $(".car"));
        }
        if ($('.obstacleCar2').length) {
            racingManiac.collision($(".obstacleCar2"), $(".car"));
        }
        if ($('.obstacleCar3').length) {
            racingManiac.collision($(".obstacleCar3"), $(".car"));
        }


    },
    preventCollision: function () {
        racingManiac.setIntervalCollisionDetect = setInterval(racingManiac.collisionCheck, 1);
    },
    clearCollision: function () {
        clearInterval(racingManiac.setIntervalCollisionDetect);
        setTimeout(racingManiac.preventCollision, 2000);
    },
    startOperation: function () {
        racingManiac.launchIntoFullscreen(document.getElementById("main_window"));
        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
        $('.track').css("background-image", "url(../streetFighter/image/track.jpeg)");
        $(".resetCar").prop("disabled", true);
        $(".displayWindow").hide();
        racingManiac.attempt = 3;
        racingManiac.position = 0;
        racingManiac.positionCar1 = 0;
        racingManiac.positionCar2 = 0;
        racingManiac.positionCar3 = 0;
        racingManiac.score = 0;
        racingManiac.levelCounter = 1;
        setTimeout(racingManiac.countDown, 1);
    },
    countDown: function () {
        racingManiac.interval = setInterval(racingManiac.countDownTimer, 1000);
    },
    countDownTimer: function () {
        $('.countDown').html('<p>' + racingManiac.counter + '</p>');
        racingManiac.counter--;
        if (racingManiac.counter === -1) {
            //Start Game
            racingManiac.counter = 5;
            clearInterval(racingManiac.interval);
            $('.countDown').empty();
            racingManiac.init();
        }
    },
    gameStart: function () {
        $(".displayWindow").show();
        $(".resetCar").prop("disabled", false);
        $(".resetCar").on("click",
            racingManiac.startOperation);

    }
}


$(document).ready(racingManiac.gameStart)