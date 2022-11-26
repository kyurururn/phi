let mass = 10;
let gravity = 5000;
let y_speed = 0;
let x_speed = 0;

let shape_x = 0;
let shape_y = 0;

let point = true;
let point_c = 0;
let point_x = 0;
let point_y = 0;

let acce_x = 0;
let acce_y = 0;

const permission_request = () => {
    if(DeviceOrientationEvent && DeviceOrientationEvent.requestPermission && typeof DeviceOrientationEvent.requestPermission === "function"){
        DeviceMotionEvent.requestPermission().then((result) => {
            if(result === "granted"){
                window.addEventListener("devicemotion",gyro,false);
            }
        });
    }

    if(DeviceOrientationEvent && DeviceOrientationEvent.requestPermission && typeof DeviceOrientationEvent.requestPermission === "function"){
        DeviceOrientationEvent.requestPermission().then((result) => {
            if(result === "granted"){
                window.addEventListener("deviceorientation",move,false);
            }
        })
    }
}

const move = (event) => {
    let beta  = Math.floor(event.beta);
    let gamma = Math.floor(event.gamma);
    let alpha = Math.floor(event.alpha);

    if(Math.abs(beta) > 90){
        gamma = -1 * gamma
    }

    x_speed += (gravity * Math.sin(gamma * Math.PI / 180) - acce_x * 5000) * 0.01;

    if(x_speed > 0){
        x_speed -= 0.5;
        if(x_speed < 0){
            x_speed = 0;
        }
    }
    if(x_speed < 0){
        x_speed += 0.5;
        if(x_speed > 0){
            x_speed = 0;
        }
    }

    shape_x += x_speed * 0.01;

    if(window.innerWidth - document.getElementById("shape").getBoundingClientRect().right < 0){
        x_speed = x_speed * -0.8;
        shape_x = (window.innerWidth - 250) / 2 - 1
        if(Math.abs(x_speed) <= 1){
            x_speed = 0
        }
    }
    if(document.getElementById("shape").getBoundingClientRect().left < 0){
        x_speed = x_speed * -0.8
        shape_x = -1 * (window.innerWidth - 250) / 2 + 1
        if(Math.abs(x_speed) <= 1){
            x_speed = 0
        }
    }

    y_speed += (gravity * Math.sin(beta * Math.PI / 180) - acce_y * 5000) * 0.01;

    if(y_speed > 0){
        y_speed -= 0.5;
        if(y_speed < 0){
            y_speed = 0;
        }
    }
    if(y_speed < 0){
        y_speed += 0.5;
        if(y_speed > 0){
            y_speed = 0;
        }
    }
    
    shape_y += y_speed * 0.01;

    if(document.getElementById("shape").getBoundingClientRect().top < 0){
        y_speed = y_speed * -0.8
        shape_y = -1 * (window.innerHeight - 250) / 2 + 1
        if(Math.abs(y_speed) <= 1){
            y_speed = 0
        }
    }
    if(window.innerHeight - document.getElementById("shape").getBoundingClientRect().bottom < 0){
        y_speed = y_speed * -0.8
        shape_y = (window.innerHeight - 250) / 2 - 1
        if(Math.abs(y_speed) <= 1){
            y_speed = 0
        }
    }

    while(point){
        point_x = Math.floor(Math.random() * (document.getElementById("over").clientWidth - 500)) - (document.getElementById("over").clientWidth - 500) / 2;
        point_y = Math.floor(Math.random() * (document.getElementById("over").clientHeight - 500)) - (document.getElementById("over").clientHeight - 500) / 2;
        document.getElementById("point").style.transform = "translate(" + String(point_x) + "px," + String(point_y) + "px)";
        if(Math.sqrt((point_x - shape_x) ** 2 + (point_y - shape_y) ** 2) > 500){
            point = false;
        }
    }

    if(Math.sqrt((point_x - shape_x) ** 2 + (point_y - shape_y) ** 2) <= 162.5){
        point = true;
        point_c += 10;
    }
    
    document.getElementById("shape").style.transform = "translate(" + String(shape_x) + "px," + String(shape_y) + "px)";


}


const gyro = (event) => {
    acce_x = event.acceleration.x;
    acce_y = event.acceleration.y;
}