$(document).ready(function () {
        var position = 0,
            positionCar1 = 0,
            positionCar2 = 0,
            positionCar3 = 0,
            score = 0,
            attempt = 3;
        var windowHeight = $(document).height();

        function carReset() {
            $(".car").css({
                left: "145px",
                bottom: "10px"
            })
        }

        function randomLeftFor1stObstacle(min, max) {
            var randomLeftPosition, createCar;
            randomLeftPosition = Math.floor(Math.random() * (max - min + 1) + min);
            createCar = '<button class="obstacleCar1"></button>';
            $(".track").append(createCar);
            $(".obstacleCar1").css({
                left: randomLeftPosition + "px"
            })
        }

        function randomLeftFor2ndObstacle(min, max) {
            var randomLeftPosition, createCar;
            randomLeftPosition = Math.floor(Math.random() * (max - min + 1) + min);
            createCar = '<button class="obstacleCar2"></button>';
            $(".track").append(createCar);
            $(".obstacleCar2").css({
                left: randomLeftPosition + "px"
            })
        }
        randomLeftFor1stObstacle(86, 130);
        randomLeftFor2ndObstacle(140, 185);
        var interval = setInterval(function () {
            position += 2;
            $(".track").css({
                "background-position": "0px " + position + "px"
            });
            score += 10;
            var scoreAppend = "Score:" + score;
            $(".score").html(scoreAppend);
            if ($('.obstacleCar1').length) {
                collision($(".obstacleCar1"), $(".car"));
            }
            if ($('.obstacleCar2').length) {
                collision($(".obstacleCar2"), $(".car"));
            }


        }, 1);
        var interval1 = setInterval(function () {
            positionCar1 -= 1;
            $(".obstacleCar1").css({
                "bottom": positionCar1 + "px"
            });
            if (positionCar1 === -windowHeight) {
                positionCar1 = 0;
                $(".obstacleCar1").remove();
                randomLeftFor1stObstacle(86, 120);
                return;
            }
        }, 10);
        var interval2 = setInterval(function () {
            positionCar2 -= 1;
            $(".obstacleCar2").css({
                "bottom": positionCar2 + "px"
            });
            if (positionCar2 === -windowHeight) {
                console.log()

                $(".obstacleCar2").remove();
                positionCar2 = 0;
                randomLeftFor2ndObstacle(150, 185);
                return;
            }
        }, 1);




        $(document).keydown(function (e) {
            var carPosition = $('.car').position();
            switch (e.which) {
            case 37:
                //left arrow key
                $('.car').css({
                    left: Math.max(84, carPosition.left - 3)
                }, 1, collision($(".obstacleCar1"), $(".car")));
                if (carPosition.left === 84) {
                    alert("game over")
                    carReset();
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
                }, 1, collision($(".obstacleCar2"), $(".car")));
                if (carPosition.left === 210) {
                    alert("game over")
                    carReset();
                }
                break;
            }
        })


        function collision($div1, $div2) {
            $(".car").removeClass("accidentAnimation");
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
                attempt -= 1;
                alert("Busted." + attempt + " chances left");

                if (attempt <= 0) {
                    clearInterval(interval);
                    clearInterval(interval1);
                    clearInterval(interval2);
                    return;
                }
                $(".car").addClass("accidentAnimation");
                carReset();
                $div1.remove();
                return;
            }

        }




    })
    //            $(".car").addClass("blink");
    //            $(".car").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
    //                function (e) {
    //
    //                    $div1.remove();
    //                    $(".car").removeClass("blink");
    //
    //                });
    //racingManiac.setIntervalKeypress = setInterval(racingManiac.pixelShift, 20);
    //        $(document).keydown(function (e) {
    //            racingManiac.keyobj[e.which] = true;
    //        });
    //        $(document).keyup(function (e) {
    //            racingManiac.keyobj[e.which] = false;
    //        });

//        racingManiac.track = $('.track');
//        racingManiac.car = $('.car');
//        racingManiac.traversalWidth = racingManiac.track.width() - racingManiac.car.width() - 72;
//        racingManiac.keyobj = {};
//        racingManiac.shift = 1;
//    keyPressFunction: function (v, a, b) {
//        var generatedPixel = parseInt(v, 10) - (racingManiac.keyobj[a] ? racingManiac.shift : 0) + (racingManiac.keyobj[b] ? racingManiac.shift : 0);
//        return generatedPixel < 80 ? 80 : generatedPixel > racingManiac.traversalWidth ? racingManiac.traversalWidth : generatedPixel;
//    },
//    pixelShift: function () {
//            racingManiac.car.css({
//                left: function (i, v) {
//                    return racingManiac.keyPressFunction(v, racingManiac.leftArrow, racingManiac.rightArrow);
//                },
//
//            });
//        }

//http://jsfiddle.net/ryanoc/TG2M7/
//function x(){
//        var carPosition = $('.car').position();
//        $('.car').css({
//                left: Math.max(84, carPosition.left - 3)
//            }, 1,collision($(".obstacleCar1"), $(".car")));
//            if (carPosition.left === 84) {
//                alert("game over")
//                carReset();
//            }
//        
//    }
//    function y(){
//        var carPosition = $('.car').position();
//        $('.car').css({
//                left: Math.min(210, carPosition.left + 3)
//            }, 1,collision($(".obstacleCar2"), $(".car")));
//            if (carPosition.left === 210) {
//                alert("game over")
//                carReset();
//            }
//    }

//    $(document).keydown(function (e) {
//        
//        switch (e.which) {
//        case 37:
//            //left arrow key
//            x();
//            break;
//        case 38:
//            //up arrow key
//            position += 10;
//
//            break;
//        case 39:
//            //right arrow key
//            y();
//            break;
//        }
//    })
//.accidentAnimation
//    {
//    height: 40px;
//    width: 25px;
//    -webkit-animation:myfirst 2s; /* Chrome, Safari, Opera */
//    animation:myfirst 2s;
//    }
//
//    /* Chrome, Safari, Opera */
//    @-webkit-keyframes myfirst
//    {
//    0%   { left:0px; bottom: 10px;-webkit-transform:rotate(0deg)}
//    100%  {left:18%; bottom: 10px;-webkit-transform:rotate(360deg)}
//    }
//
//    /* Standard syntax */
//    @keyframes myfirst
//    {
//    0%   { left:0px; bottom: 10px;transform:rotate(0deg)}
//    100%  {left:18%; bottom: 10px;transform:rotate(360deg)}
//    }
//
//collisionCheck: function () {
//        if ($('#obstacleCar1').length) {
//            racingManiac.collision($("#obstacleCar1"), $(".car"));
//        }
//        if ($('#obstacleCar2').length) {
//            racingManiac.collision($("#obstacleCar2"), $(".car"));
//        }
//        if ($('#obstacleCar3').length) {
//            racingManiac.collision($("#obstacleCar3"), $(".car"));
//        }
//
//
//    },
//
//    randomLeftForObstacle: function (min, max) {
//        var createCar, className;
//        className = 'obstacleCar' + racingManiac.arrayCounter;
//        createCar = '<div class=' + className + '></div>';
//        $(".track").append(createCar);
//        $('.' + className).css({
//            left: Math.floor(Math.random() * (max - min + 1) + min) + "px"
//        })
//        racingManiac.arrayCounter++;
//        if (racingManiac.arrayCounter === 4) {
//            racingManiac.arrayCounter = 1;
//        }
//    },