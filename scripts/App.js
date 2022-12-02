class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.currentKick = './sounds/kick1.wav';
        this.currentHihat= './sounds/hihat1.wav';
        this.currentSnare = './sounds/snare1.wav';
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
        this.muteBtns = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider');
    }

    activePad() {
        this.classList.toggle('active');
    }

    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        // Loop over the pads
        activeBars.forEach(bar => {
            bar.style.animation = 'playTrack 0.3s alternate ease-in-out 2';
            // checks if pads are active
            if(bar.classList.contains('active')) {
                // check each sound
                if(bar.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                } else if (bar.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                } else if (bar.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
            }
        });
        this.index++;
    }

    start() {
        const interval = (60/this.bpm) * 1000;
        if(!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }

    updateBtn() {
        if(this.isPlaying) {
            this.playBtn.innerText = 'Stop';
            this.playBtn.classList.add('active');
        } else {
            this.playBtn.innerText = 'Start';
            this.playBtn.classList.remove('active')
        }
    }

    changeSound() {
        const selectionName = event.target.name;
        const selectionValue = event.target.value;
        switch(selectionName) {
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
        }
    }

    mute(event) {
        const muteIndex = event.target.getAttribute('data-track');
        event.target.classList.toggle('.active');
        if(event.target.classList.contains('active')) {
            switch(muteIndex) {
                case "0":
                    this.kickAudio.volume = 0;
                case "1":
                    this.hihatAudio.volume = 0;
                case "2":
                    this.snareAudio.volume = 0;
            }
        } else {
            switch(muteIndex) {
                case "0":
                    this.kickAudio.volume = 1;
                case "1":
                    this.hihatAudio.volume = 1;
                case "2":
                    this.snareAudio.volume = 1;
            }
        }
    }

    changeTempo(event) {
        const tempoText = document.querySelector('.tempo-nr');
        tempoText.innerText = event.target.value;
    }

    updateTempo(event) {
        this.bpm = event.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector('.play');
        if(playBtn.classList.contains('active')) {
            this.start();
        }
    }
}

const drumKit = new DrumKit();

// Event Listeners

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function() {
        this.style.animation = "";
    })
})

drumKit.playBtn.addEventListener('click', () => {
    drumKit.start();
    drumKit.updateBtn();
});

drumKit.selects.forEach(select => {
    select.addEventListener('change', (event) => {
        drumKit.changeSound(event)
    });
})

drumKit.muteBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        drumKit.muteBtns(event);
    })
})

drumKit.tempoSlider.addEventListener('input', (event) => {
    drumKit.changeTempo(event);
})

drumKit.tempoSlider.addEventListener('change', (event) => {
    drumKit.updateTempo(event);
})