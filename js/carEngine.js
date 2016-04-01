var racingManiac = {
        position: 0,
        positionCar1: 0,
        positionCar2: 0,
        positionCar3: 0,
        score: 0,
        attempt: 3,
        windowHeight: null,
        init: function () {
            racingManiac.windowHeight = $(document).height();
            racingManiac.randomLeftFor1stObstacle(86, 130);
            racingManiac.randomLeftFor2ndObstacle(140, 185);
            racingManiac.setIntervalofTrack = setInterval(racingManiac.trackMove, 1);
            racingManiac.setIntervalofObstacleCar1 = setInterval(racingManiac.obstacleCar1Move, 10);
            racingManiac.setIntervalofObstacleCar2 = setInterval(racingManiac.obstacleCar2Move, 1);
            $(document).keydown(racingManiac.moveCarOnKeypress);
        },
        randomLeftFor1stObstacle: function (min, max) {
            var randomLeftPosition, createCar;
            randomLeftPosition = Math.floor(Math.random() * (max - min + 1) + min);
            createCar = '<button class="obstacleCar1"></button>';
            $(".track").append(createCar);
            $(".obstacleCar1").css({
                left: randomLeftPosition + "px"
            })
        },
        randomLeftFor2ndObstacle: function (min, max) {
            var randomLeftPosition = Math.floor(Math.random() * (max - min + 1) + min),
                createCar;
            createCar = '<button class="obstacleCar2"></button>';
            $(".track").append(createCar);
            $(".obstacleCar2").css({
                left: randomLeftPosition + "px"
            })
        },
        trackMove: function () {
            racingManiac.position += 2;
            $(".track").css({
                "background-position": "0px " + racingManiac.position + "px"
            });
            racingManiac.score += 1;
            var scoreAppend = "Score:" + racingManiac.score;
            $(".score").html(scoreAppend);
            if ($('.obstacleCar1').length) {
                racingManiac.collision($(".obstacleCar1"), $(".car"));
            }
            if ($('.obstacleCar2').length) {
                racingManiac.collision($(".obstacleCar2"), $(".car"));
            }


        },


        obstacleCar1Move: function () {
            racingManiac.positionCar1 -= 1;
            $(".obstacleCar1").css({
                "bottom": racingManiac.positionCar1 + "px"
            });
            if (racingManiac.positionCar1 === -racingManiac.windowHeight) {
                racingManiac.positionCar1 = 0;
                $(".obstacleCar1").remove();
                racingManiac.randomLeftFor1stObstacle(86, 120);
                return;
            }
        },


        obstacleCar2Move: function () {
            racingManiac.positionCar2 -= 1;
            $(".obstacleCar2").css({
                "bottom": racingManiac.positionCar2 + "px"
            });
            if (racingManiac.positionCar2 === -racingManiac.windowHeight) {

                $(".obstacleCar2").remove();
                racingManiac.positionCar2 = 0;
                racingManiac.randomLeftFor2ndObstacle(150, 185);
            }
        },

        carReset: function () {
            $(".car").css({
                left: "145px",
                bottom: "10px"
            })
        },
        collision: function ($div1, $div2) {
            //$(".car").removeClass("accidentAnimation");
            var obsCarLeft = $div1.position().left;
            var obsCarTop = $div1.position().top;
            var obsCarHeight = $div1.outerHeight(true);
            var obsCarWidth = $div1.outerWidth(true);
            var totalHeight = obsCarTop + obsCarHeight;
            var totalWidth = obsCarLeft + obsCarWidth;
            var carLeft = $div2.offset().left;
            var carTop = $div2.offset().top;
            var carHeight = $div2.outerHeight(true);
            var carWidth = $div2.outerWidth(true);
            var totalCarHeight = carTop + carHeight;
            var totalCarWidth = carLeft + carWidth;
            if (totalHeight < carTop || obsCarTop > totalCarHeight || totalWidth < carLeft || obsCarLeft > totalCarWidth) {
                return false;
            } else {
                racingManiac.attempt -= 1;
                alert("Busted." + racingManiac.attempt + " chances left");
                $(".life").children().eq(0).remove();
                racingManiac.gameOver();
                racingManiac.carReset();
                $(".car").addClass("blink");
                $(".car").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                    function (e) {

                        $div1.remove();
                        $(".car").removeClass("blink");

                    });


                $div1.remove();
            }

        },
        gameOver: function () {
            if (racingManiac.attempt <= 0) {
                $(document).off('keydown');
                clearInterval(racingManiac.setIntervalofTrack);
                clearInterval(racingManiac.setIntervalofObstacleCar1);
                clearInterval(racingManiac.setIntervalofObstacleCar2);

            }
        },
        moveCarOnKeypress: function (e) {
            var carPosition = $('.car').position(),
                upArrow = 37

            switch (e.which) {
            case upArrow:
                //left arrow key
                $('.car').css({
                    left: Math.max(84, carPosition.left - 3)
                }, 1, racingManiac.collision($(".obstacleCar1"), $(".car")));
                if (carPosition.left === 84) {
                    racingManiac.attempt -= 1;
                    alert("Busted." + racingManiac.attempt + " chances left");
                    $(".life").children().eq(0).remove();
                    racingManiac.carReset();
                    racingManiac.gameOver();
                    $(".life").children().eq(0).remove();
                }
                break;
            case 38:
                //up arrow key
                position += 10;

                break;
            case 39:
                //right arrow key
                $('.car').css({
                    left: Math.min(210, carPosition.left + 3)
                }, 1, racingManiac.collision($(".obstacleCar2"), $(".car")));
                if (carPosition.left === 210) {
                    racingManiac.attempt -= 1;
                    alert("Busted." + racingManiac.attempt + " chances left");
                    $(".life").children().eq(0).remove();
                    racingManiac.carReset();
                    racingManiac.gameOver();

                }
                break;
            }
        }
    }
    //
    //$(document).keydown(function (e) {
    //        var carPosition = $('.car').position();
    //        switch (e.which) {
    //        case 37:
    //            //left arrow key
    //            $('.car').css({
    //                left: Math.max(84, carPosition.left - 3)
    //            }, 1, collision($(".obstacleCar1"), $(".car")));
    //            if (carPosition.left === 84) {
    //                alert("game over")
    //                carReset();
    //            }
    //            break;
    //        case 38:
    //            //up arrow key
    //            position += 10;
    //
    //            break;
    //        case 39:
    //            //right arrow key
    //            $('.car').css({
    //                left: Math.min(210, carPosition.left + 3)
    //            }, 1, collision($(".obstacleCar2"), $(".car")));
    //            if (carPosition.left === 210) {
    //                alert("game over")
    //                carReset();
    //            }
    //            break;
    //        }
    //    })

$(document).ready(racingManiac.init);

$('*').off('keyup keydown keypress');