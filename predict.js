let net = null;
function initPredict(){
    posenet.load().then(function(n){
        net = n;
    });
}
let pose = null;
function predict(){
    const scaleFactor = 0.50;
    const flipHorizontal = false;
    const outputStride = 16;
    if(net === null)return;
    if(!ready)return;
    net.estimateSinglePose(video, scaleFactor, flipHorizontal, outputStride).then(function(p){
        pose = p;
        points = []
        for(po in pose['keypoints']){
            const point = pose['keypoints'][po];
            points.push(point.position)
            context.fillStyle = "blue";
            context.beginPath();
            context.ellipse(point.position.x, point.position.y, 10, 10, 0, 0, Math.PI*2);
            context.fill();
        }
        judge();
    });
    
}