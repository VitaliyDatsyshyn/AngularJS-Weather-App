var app = angular.module('myApp', ['ngCookies']);
app.controller('myCtrl', ['$scope', '$http', '$cookieStore', function($scope, $http, $cookieStore) {
    $scope.citiesName = ["Vienna", "Minsk", "Brussels", "Sofia", "Prague", "Copenhagen", "Helsinki", "Paris", "Berlin", "Athens", "Dublin", "Rome", "Riga", "Monaco", "Amsterdam", "Oslo", "Warsaw", "Lisbon", "Madrid", "Ankara", "Kiev", "London"];
    $scope.myData = [];
    $scope.myDataCookies1 = $cookieStore.get('myDataCookies');
    $scope.constructorMyData = function () {
        if(!$cookieStore.get('myDataCookies')) {
            for (var i = 0; i < $scope.citiesName.length; i++) {
                $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + $scope.citiesName[i] + '&APPID=bbe1de23875e400f5c616cae920c36bf&units=metric')
                    .then(function (response) {
                        $scope.myData.push({
                            cityName: response.data.name,
                            description: response.data.weather[0].description,
                            temperature: Math.round(response.data.main.temp),
                            statusOfPlace: 0,
                            backColor: "#eeeeee"
                        });
                    }).catch(function (response) {
                    console.error('Error occurred:', response.status, response.data);
                });
            }
                var min = $scope.myData[0].temperature;
                for (var i = 0; i < $scope.citiesName.length; i++) {
                    if (min > $scope.myData[i].temperature) {
                        min = $scope.myData[i].temperature;
                    }
                }
                for (var i = 0; i < $scope.citiesName.length; i++) {
                    if (min == $scope.myData[i].temperature) {
                        $scope.myData[i].backColor = "lightblue";
                    }
                }
                var max = $scope.myData[0].temperature;
                for (var i = 0; i < $scope.citiesName.length; i++) {
                    if (max < $scope.myData[i].temperature)
                        max = $scope.myData[i].temperature;
                }
                for (var i = 0; i < $scope.citiesName.length; i++) {
                    if (max == $scope.myData[i].temperature) {
                        $scope.myData[i].backColor = "lightcoral";
                    }
                }
            $cookieStore.put('myDataCookies',  $scope.myData);
        }
        else {
            $scope.myData = $cookieStore.get('myDataCookies');
                var min = $scope.myData[0].temperature;
                for (var i = 0; i < $scope.myData.length; i++) {
                    if (min > $scope.myData[i].temperature) {
                        min = $scope.myData[i].temperature;
                    }
                }
                for (var i = 0; i < $scope.myData.length; i++) {
                    if (min == $scope.myData[i].temperature) {
                        $scope.myData[i].backColor = "lightblue";
                    }
                }
                var max = $scope.myData[0].temperature;
                for (var i = 0; i < $scope.myData.length; i++) {
                    if (max < $scope.myData[i].temperature)
                        max = $scope.myData[i].temperature;
                }
                for (var i = 0; i < $scope.myData.length; i++) {
                    if (max == $scope.myData[i].temperature) {
                        $scope.myData[i].backColor = "lightcoral";
                    }
                }
            $cookieStore.put('myDataCookies',  $scope.myData);
        }
    };
    $scope.myOrderBy = "temperature";
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = x;
    };
    $scope.heigthBack = function () {
        var elm = document.getElementById("weatherItem");
        return elm.offsetHeight;
    };
    $scope.visitedFunc = function (name) {
        for (var i = 0; i < $scope.myData.length; i++) {
            if(name == $scope.myData[i].cityName) {
                $scope.myData[i].statusOfPlace = 1;
                $scope.myData[i].backColor = "silver";
            }
        }
        $cookieStore.put('myDataCookies',  $scope.myData);
    };
    $scope.wishVisitFunc = function (name) {
        for (var i = 0; i < $scope.myData.length; i++) {
            if(name == $scope.myData[i].cityName) {
                $scope.myData[i].statusOfPlace = -1;
                $scope.myData[i].backColor = "darkorchid";
            }
        }
        $cookieStore.put('myDataCookies',  $scope.myData);
    };
    $scope.del = function (name) {
        for (var i = 0; i < $scope.myData.length; i++) {
            if(name == $scope.myData[i].cityName) {
                $scope.myData.splice(i, 1);
            }
        }
        $cookieStore.put('myDataCookies',  $scope.myData);
    };
    $scope.openModal = function () {
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
    };
    $scope.closeModal = function () {
        var modal = document.getElementById('myModal');
        modal.style.display = "none";
    };
    $scope.addedCity = "";
    $scope.addCityFunc = function (added) {
        $scope.citiesName.push(added);
        $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + added + '&APPID=bbe1de23875e400f5c616cae920c36bf&units=metric')
            .then(function (response) {
                $scope.myData.push({
                    cityName: response.data.name,
                    description: response.data.weather[0].description,
                    temperature: Math.round(response.data.main.temp),
                    statusOfPlace: 0,
                    backColor: "#eeeeee"
                });
            }).catch(function (response) {
            console.error('Error occurred:', response.status, response.data);
        });
        $cookieStore.put('myDataCookies',  $scope.myData);
        var modal = document.getElementById('myModal');
        modal.style.display = "none";
    };
    $scope.myDefault = function () {
        $scope.myData = [];
        $cookieStore.remove('myDataCookies');
        $scope.constructorMyData();
    }
}]);
window.onclick = function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
function a() {
    function a1() {
        var im1 = document.getElementById("img1");
        im1.style.width = "0";
        var im2 = document.getElementById("img2");
        im2.style.width = "100%";
        function a2() {
            var im2 = document.getElementById("img2");
            im2.style.width = "0";
            var im3 = document.getElementById("img3");
            im3.style.width = "100%";
            function a3() {
                var im3 = document.getElementById("img3");
                im3.style.width = "0";
                var im4 = document.getElementById("img4");
                im4.style.width = "100%";
                function a4() {
                    var im4 = document.getElementById("img4");
                    im4.style.width = "0";
                    var im5 = document.getElementById("img5");
                    im5.style.width = "100%";
                    function a5() {
                        var im5 = document.getElementById("img5");
                        im5.style.width = "0";
                        var im1 = document.getElementById("img1");
                        im1.style.width = "100%";
                    }
                    setTimeout(a5, 14000);
                }
                setTimeout(a4, 14000);
            }
            setTimeout(a3, 14000);
        }
        setTimeout(a2, 14000);
    }
    setTimeout(a1, 10000);
}
a();
setInterval(a, 66000);