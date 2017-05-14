/************************************************/
/*                                              */
/*        Pomodoro Clock by HeebieGeeBee        */  
/*                                              */
/*             for FreeCodeCamp.com             */
/*                14th May 2017                 */
/*                                              */
/*______________________________________________*/

/********************/
/*  Window On load  */
/*__________________*/

window.onload = ()=> {

/**********************/
/*  Global Variables  */
/*____________________*/

//set timer variable
let setTime = 1;
//current timer variable
let current = ("0" + setTime).slice(-2) + ':00.000';
//milliseconds variable
let millis;
//set break timer variable
let setBreakTime = 1;
//current break timer variable
let currentBreak = ("0" + setBreakTime).slice(-2) + ':00.000';
//set break miiliseconds variable
let millisBreak;
let reset = false;
let paused = false;
let alerts = true;
let start = false;
let breakComing = true;
//create Alarm sound
const alarm = new Audio();
alarm.src = "sounds/alarm.wav"
//create new tock for timer 
const countdown = new Tock({
	countdown: true,
	interval: 10,
	callback: function() {
    	current = countdown.msToTime(countdown.lap());
    	millis = countdown.lap();
  	},
  	complete: function() {
  	} 
});
//create new tock for break
const breakCountdown = new Tock({
  	countdown:true,
  	interval: 10,
  	callback: function() {
    	currentBreak = breakCountdown.msToTime(breakCountdown.lap());
    	millisBreak = breakCountdown.lap();
  	},
  	complete: function() {
  	} 
});


setInterval(()=>{
	document.getElementById('timer').innerHTML = current;
	document.getElementById('break-timer').innerHTML = currentBreak;
	if( start && countdown.lap() === 0 && breakComing) {
		breakCountdown.start(setBreakTime*60000);
		countdown.reset();
		current = ("0" + setTime).slice(-2) + ':00.000';
		breakComing = false;		
	}
	if( start && breakCountdown.lap() === 0) {
		countdown.start(setTime*60000);
		breakCountdown.reset();
		currentBreak = ("0" + setBreakTime).slice(-2) + ':00.000';	
		breakComing = true;
	}
	
	
}, 10)

document.getElementById('timer-plus').addEventListener("click", ()=>{
		if (!start) {
			setTime < 60 ? setTime++ : setTime;	
			current = ("0" + setTime).slice(-2) + ':00.000';
		}
})		

document.getElementById('timer-neg').addEventListener("click", ()=>{
		if (!start) {
			setTime > 1 ? setTime-- : setTime;	
			current = ("0" + setTime).slice(-2) + ':00.000';
		}
})	

document.getElementById('break-plus').addEventListener("click", ()=>{
		if (!start) {
			setBreakTime < 60 ? setBreakTime++ : setBreakTime;	
			currentBreak = ("0" + setBreakTime).slice(-2) + ':00.000';
		}
})	

document.getElementById('break-neg').addEventListener("click", ()=>{
		if (!start) {
			setBreakTime > 1 ? setBreakTime-- : setBreakTime;	
			currentBreak = ("0" + setBreakTime).slice(-2) + ':00.000';
		}
})	

document.getElementById('start').addEventListener("click", ()=>{
	countdown.go ? countdown.pause() : countdown.pause_time ? countdown.pause() : countdown.start(setTime * 60000); start=true;
	countdown.go ? document.getElementById('start').innerHTML = "Pause" : document.getElementById('start').innerHTML = "Start";
	console.log(start);
})









}  // end of window onload function