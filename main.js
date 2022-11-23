let mass = 10;
let gravity = 5000;
let y_speed = 0;
let x_speed = 0;

let shape_x = 0;
let shape_y = 0;
let shape_rotate = 0;

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

    x_speed += gravity * Math.sin(gamma * Math.PI / 180) * 0.01;

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
        x_speed = x_speed * -0.8
    }
    if(shape_x < 0){
        x_speed = x_speed * -0.8
    }




    y_speed += gravity * Math.sin(beta * Math.PI / 180) * 0.01;

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

    if(shape_y < 0){
        y_speed = y_speed * -0.8
    }
    if(window.innerHeight - document.getElementById("shape").getBoundingClientRect().bottom < 0){
        y_speed = y_speed * -0.8
    }
    
    document.getElementById("shape").style.transform = "translate(" + String(shape_x) + "px," + String(shape_y) + "px)";



}


const gyro = (event) => {
    /*
    let rotate_z = event.rotationRate.gamma;
    let interval = event.interval;

    shape_rotate_z += rotate_z * interval

    document.getElementById("shape").style.transform = "rotateZ(" + String(shape_rotate_z) + "deg)";
    */
}