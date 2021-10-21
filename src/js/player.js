


let player;
const playerContainer = $(".player");

let eventsInint = () => {
    $(".player__start").click(e=> {
        e.preventDefault();
        

        if(playerContainer.hasClass("paused") ) {
            
            
            
            player.pauseVideo()

        }else {
            
            
            player.playVideo()
            

        }
        
        
    });

    $(".player__playback").click(e => {
        const bar = $(e.currentTarget);
        const clickedPosistion = e.originalEvent.layerX;
        const newButtonPositionPercent = (clickedPosistion/bar.width())*100;
        const newPlaybackPosistionSec = (player.getDuration()/100)*newButtonPositionPercent;
        
        $(".player__playback-button").css ({
            left: `${newButtonPositionPercent}%`
        });

        player.seekTo(newPlaybackPosistionSec);

        
    });
    $(".player__splash").click (e => {
        player.playVideo();
    }) 

}

const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);

    const minutes = addZero(Math.floor(roundTime/60));
    const seconds = addZero(roundTime - minutes*60);

    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }

    return `${minutes} : ${seconds}`;
}

const onPlayerReady = () => {

    let interval;

    const durationSec = player.getDuration();
    $(".player__duration-estimate").text(formatTime(durationSec));

    if(typeof interval != 'undefined') {
        clearInterval(interval);
    }
    interval = setInterval(() => {

        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec/durationSec)*100;

        $(".player__playback-button").css({
            left: `${completedPercent}%`
        });

        $(".player__duration-completed").text(formatTime(completedSec)); 


        

        
    }, 1000);

}

const onPlayerStateChange = event => {


    switch (event.data) {
        case 1:
            playerContainer.addClass('active');
            playerContainer.addClass("paused");
            
            break;
    
        case 2:
            playerContainer.removeClass('active');
            playerContainer.removeClass("paused");
            break;
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '100%',
        width: '100%',
        videoId: '7qBfdcI-d1Q',
        events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
        }, 
        playerVars: {
            controls: 0,
            disablekb: 0,
            showinfo: 0,
            rel:0,
            autoplay: 0,
            modestbranding:0

        }
    });
}
eventsInint();

