/*=============================================
            Clock SCRIPT
=============================================*/
const angle = 6;
const hrTick = document.querySelector('#hr');
const mnTick = document.querySelector('#mn');
const scTick = document.querySelector('#sc');

setInterval(()=>{
    let timeNow = new Date();
    let hour = timeNow.getHours() * 30;
    let min = timeNow.getMinutes() * angle;
    let sec = timeNow.getSeconds() * angle;
    
    hrTick.style.transform = `rotateZ(${(hour)+(min/12)}deg)`;
    mnTick.style.transform = `rotateZ(${min}deg)`;
    scTick.style.transform = `rotateZ(${sec}deg)`;
});