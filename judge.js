let itext = document.getElementById('text');
function median(arr, fn){
    var half = (arr.length/2)|0;
    var temp = arr.toSorted(fn);

    if (temp.length%2) {
        return temp[half];
    }

    return (temp[half-1] + temp[half])/2;
};
function show(t){
	itext.innerHTML = t;
}
function sgm(x){
	return 1/(1 + Math.exp(-x))*100
}
function angle(pos1, pos2){
    delta_x = pos2.x - pos1.x
    delta_y = pos2.y - pos1.y
    return Math.atan2(delta_y, delta_x) * 180 / Math.PI;
}
function distance(pos1, pos2){
	return Math.sqrt((pos1.x-pos2.x)*(pos1.x-pos2.x)+(pos1.y-pos2.y)*(pos1.y-pos2.y))
}
function avg(pos1, pos2){
	return {"x": (pos1.x+pos2.x)/2, "y": (pos1.y+pos2.y)/2};
}
let history = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let ncount = 0;
function judge(){
	if(pose['score'] < 0.01){
		show('人がいないかも?')
		return;
	}
	let s = distance(points[5], points[6]);
	let shoulder = 100-sgm(s/distance(points[1], points[2])-3);
	let neck = sgm((s/distance(avg(points[5], points[6]), avg(points[1], points[2]))-1.5)*3);
	let sc = (shoulder + neck) / 2;
	history.shift();
	history.push(sc);
	let score = median(history);
	let message = "健康的な姿勢です！";
	if(score > 35){
		message = "少し危険です";
	}
	if(score > 45){
		message = "猫背です！"
	}
	if(score > 70){
		message = "今すぐ姿勢を正しましょう！";
	}
	if(score > 45){
		tcount.innerHTML = '通知まであと'+ (45-ncount ) +'/45';
		ncount++;
	}else{
		tcount.innerHTML = null;
		ncount = 0;
	}
	if(ncount > 45){
		notifyPosture();
		ncount = 0;
	}
	show("あなたの猫背度は.... "+Math.round(score) + "%<br>" + message)
}