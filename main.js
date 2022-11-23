let rr_z = 0;

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
    document.getElementById("shape").style.transform = "rotateX(" + beta + "deg) rotateY(" + gamma + "deg) rotateZ(" + alpha + "deg)";
}


const gyro = (event) => {
    /*
    let rotate_z = event.rotationRate.gamma;
    let interval = event.interval;

    document.getElementById("shape").innerHTML = String(interval);

    rr_z += rotate_z * interval

    document.getElementById("shape").style.transform = "rotateZ(" + String(rr_z) + "deg)";
    */

}