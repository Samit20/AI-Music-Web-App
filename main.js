right_wrist_x = 0;
right_wrist_y = 0;

left_wrist_x = 0;
left_wrist_y = 0;

score_right_wrist = 0;
score_left_wrist = 0;

song_1 = "";
song_2 = "";

song_1_status = "";
song_2_status = "";

function preload() {
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet has been initiated ✔ ");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        score_right_wrist = results[0].pose.keypoints[10].score;
        score_left_wrist = results[0].pose.keypoints[9].score;

        console.log("Score Right Wrist = " + score_right_wrist + "Score Left Wrist = " + score_left_wrist);

        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;

        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;

        console.log("Right Wrist X = " + right_wrist_x + "Right Wrist Y = " + right_wrist_y);
        console.log("Left Wrist X = " + left_wrist_x + "Left Wrist Y = " + left_wrist_y);
    }
}

function play() {
    song_1.play();
    song_1.setVolume(0.5);
    song_1.rate(1);

    song_2.play();
    song_2.setVolume(0.5);
    song_2.rate(1);
}

function draw() {
    image(video, 0, 0, 600, 500);
    song_1_status = song_1.isPlaying();
    song_2_status = song_2.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if (score_left_wrist > 0.2) {
        circle(left_wrist_x, left_wrist_y, 30);
        song_1.stop();
        if (song_2_status == false) {
            song_2.play();
            document.getElementById("song_display").innerHTML = "Peter Pan Theme";
        }
    }
    if (score_right_wrist > 0.2) {
        circle(right_wrist_x, right_wrist_y, 30);
        song_2.stop();
        if (song_1_status == false) {
            song_1.play();
            document.getElementById("song_display").innerHTML = "Harry Potter Theme Remix";
        }
    }
}