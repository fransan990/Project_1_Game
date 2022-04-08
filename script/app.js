window.onload = () => {

    document.querySelector(".counter").style.display = "none"
    document.querySelector("#myCanvas").style.display = "none"
    document.querySelector(".botonDeLosHuevos").style.display = "none"

    document.getElementById('start').onclick = () => {
        updateCounter();
    }
}

var time = 3;

function updateCounter() {
    document.getElementById('start').classList.add("counter23")

    document.getElementById('start').innerHTML = time
    if (time == 0) {
        document.querySelector(".counter").style.display = "block"
        document.querySelector("#myCanvas").style.display = "block"
        document.querySelector(".caja").style.display = "none"

        ZombiesApp.init('myCanvas')

    } else {
        time -= 1;
        setTimeout("updateCounter()", 1000)
    }
}

const ZombiesApp = {
    name: 'Zombies App',
    description: 'Canvas game app',
    version: '1.0.0',
    author: 'Fran & Isaac',
    license: undefined,
    canvasNode: undefined,
    ctx: undefined,
    gameSize: { w: undefined, h: undefined },
    image: undefined,
    background: undefined,
    player: [],
    FPS: 60,
    framesCounter: 0,
    bomb: [],
    contBomb: 0,
    setInter: undefined,
    planeBomb: [],
    people: [],
    coin: 0,
    brain: 0,
    pace: 3000,
    music: undefined,

    init(canvasID) {
        this.canvasNode = document.querySelector(`#${canvasID}`)
        this.ctx = this.canvasNode.getContext('2d')

        this.setDimensions()
        this.start()
        this.reset()

        this.music = new Audio("../music/musica1.mp3")
        this.music.play()
        this.music.loop = true
        this.music.volume = 1
    },

    start() {
        this.setInter = setInterval(() => {
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            this.clearAll()
            this.drawAll()
            this.contBomb++
            this.pace--

            this.isCollisionbomb()
            this.isCollisionPlane()
            this.isCollisionPeople()
            this.setEventListeners()

        }, 1000 / this.FPS)
    },

    setDimensions() {
        this.gameSize = {
            w: window.innerWidth,
            h: window.innerHeight
        }
        this.canvasNode.setAttribute('width', this.gameSize.w)
        this.canvasNode.setAttribute('height', this.gameSize.h)
    },

    reset() {

        this.background = new Background(this.ctx, this.gameSize.w, this.gameSize.h, "../images/fondo2.png")
        this.player.push(new Player(this.ctx, this.gameSize.w, this.gameSize.h, 0, "../images/girlRun.png"))
        this.bomb.push(new ObstacleBomb(this.ctx, this.gameSize.w, this.gameSize.h, 480, './../images/tnt.png'))
        this.planeBomb.push(new ObstaclePlane(this.ctx, this.gameSize.w, this.gameSize.h, 210))
        this.people.push(new People(this.ctx, this.gameSize.w, this.gameSize.h))
    },

    drawAll() {
        this.background.draw(this.brain)
        this.generateBomb();
        this.generatePlaneBomb();
        this.generatePeople();
        this.player.forEach(eachPlayer => eachPlayer.playerDraw(this.framesCounter))
        this.bomb.forEach(obs => obs.draw())
        this.planeBomb.forEach(obplane => obplane.draw(this.framesCounter))
        this.people.forEach(people => people.draw(this.framesCounter))
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
        this.clearObstacles()
    },

    generateBomb() {
        let random = Math.floor(Math.random() * (400 - 100) + 100)

        let arrImagen = ["../images/c4B.png", "../images/tnt.png", "../images/land_mine.png"]

        let rand = arrImagen[Math.floor(Math.random() * arrImagen.length)];

        if (this.framesCounter % random === 0) {
            this.bomb.push(
                new ObstacleBomb(this.ctx, this.gameSize.w, this.gameSize.h, 530, rand)
            )
        }
    },

    generatePlaneBomb() {
        let random = Math.floor(Math.random() * (300 - 200) + 200)

        if (this.framesCounter % random === 0) {
            this.planeBomb.push(
                new ObstaclePlane(this.ctx, this.gameSize.w, this.gameSize.h, "../image/ball.png", 210)
            )

            
        }
    },

    generatePeople() {
        let random = Math.floor(Math.random() * (100 - 700) + 700)

        if (this.framesCounter % random === 0) {
            this.pace = 0
            this.people.push(
                new People(this.ctx, this.gameSize.w, this.gameSize.h)
            )
        }
    },

    clearObstacles() {
        this.bomb = this.bomb.filter(obs => obs.gameSize.w >= 0)
        this.planeBomb = this.planeBomb.filter(obsPlane => obsPlane.gameSize.w >= 0)
    },

    isCollisionbomb() {

        this.bomb.forEach((bomb, i) => {

            if (this.player[0].playerPosition.x < bomb.obsPosition.x + bomb.obsSize.w &&
                this.player[0].playerPosition.x + this.player[0].playerSize.w > bomb.obsPosition.x &&
                this.player[0].playerPosition.y < bomb.bombPosition.y + bomb.obsSize.h &&
                this.player[0].playerPosition.y + this.player[0].playerSize.h > bomb.bombPosition.y) {

                this.music = new Audio("../music/boom.wav")
                this.music.play()
                this.music.loop = false
                this.music.volume = 1

                if (this.player.length === 1) {
                    this.player.pop()
                    this.gameOver()

                } else {

                    this.player.pop()

                    this.bomb.splice(i, 1)
                }
            }
        })
    },

    isCollisionPlane() {

        this.planeBomb.forEach((bombPlane, i) => {

            if (this.player[0].playerPosition.x < bombPlane.obsPosition.x + bombPlane.obsSize.w &&
                this.player[0].playerPosition.x + this.player[0].playerSize.w > bombPlane.obsPosition.x &&
                this.player[0].playerPosition.y < bombPlane.planePosition.y + bombPlane.obsSize.h &&
                this.player[0].playerPosition.y + this.player[0].playerSize.h > bombPlane.planePosition.y) {

                this.music = new Audio("../music/rifleAutomatic.mp3")
                this.music.play()
                this.music.loop = false
                this.music.volume = 1

                if (this.player.length === 1) {
                    this.player.pop()
                    this.gameOver()

                } else {

                    this.player.pop()
                    this.planeBomb.splice(i, 1);
                }
            }
        })
    },

    isCollisionPeople() {
        this.people.forEach((person, i) => {
         
            if (this.player[0].playerPosition.x < person.peoplePosition.x + person.peopleSize.w &&
                this.player[0].playerPosition.x + this.player[0].playerSize.w > person.peoplePosition.x &&
                this.player[0].playerPosition.y < person.peoplePosition.y + person.peopleSize.h &&
                this.player[0].playerPosition.y + this.player[0].playerSize.h > person.peoplePosition.y) {

                if (this.player.length <= 3) {

                    let arrImagen = ["../images/zombieWalk.png", "../images/girlRun.png"]

                    let rand = arrImagen[Math.floor(Math.random() * arrImagen.length)];

                    this.music = new Audio("../music/you_got_it_1.wav")
                    this.music.play()
                    this.music.loop = false
                    this.music.volume = 1

                    this.brain++
                    this.player.push(
                        new Player(this.ctx, this.gameSize.w, this.gameSize.h, 40 * - this.player.length, rand)
                    )
                    this.people.splice(i, 1)
                   
                } else {
                    this.brain++
                    this.coin++
                  
                    this.people.splice(i, 1)
                }

                document.querySelectorAll(".counter div span")[0].innerHTML = this.brain
                document.querySelectorAll(".counter div span")[1].innerHTML = this.coin

            }
        })
    },

    gameOver() {
        if (this.player.length === 0) {

            this.music = new Audio("../music/x2downloadcom-rain-man-krysta-youngs-habit-t-mass-remix-128-kbps_qmMoKFDB.mp3")
            this.music.play()
            this.music.loop = true
            this.music.volume = 1

            document.querySelector(".botonDeLosHuevos").style.display = "block"
            document.querySelector("#myCanvas").remove();
            let contador = document.querySelector(".counter")
            let contenedor = document.querySelector(".contenedor")

            contador.classList.replace('counter', 'back')
            contenedor.classList.replace('contenedor', 'contenedor2')

            let contenedorImagen1 = document.querySelector(".contenedor2 div img")

            contenedorImagen1.classList.add("contenedorImagen1")

            document.querySelector(".contenedorImagen1").classList.replace("contenedorImagen1", "backLogo")
            document.querySelector(".contenedor2").classList.replace("contenedor2", "backContenedor2")
            document.querySelector(".contenedor1").classList.replace("contenedor1", "backContenedor1")
            document.querySelector(".botonDeLosHuevos").classList.replace("botonDeLosHuevos", "backBoton")

            let mountain = document.querySelector(".mountain")
            let beach = document.querySelector(".beach")
            let forest = document.querySelector(".forest")

            if (mountain) {
                document.querySelector(".mountain").remove;
            }
            if (beach) {
                document.querySelector(".beach").remove;
            }
            if (forest) {
                document.querySelector(".forest").remove;
            }
            
            clearInterval(this.setInter)
        }
    },

    setEventListeners() {
        document.onkeydown = event => {

            if (event.code === 'Space') {
                this.music = new Audio("../music/jump.mp3")
                this.music.play()
                this.music.loop = false
                this.music.volume = 1

                let time = 100

                this.player.forEach((eachPlayer, i) => {
                    window.setTimeout(() => eachPlayer.playerJump(-15), i * time)
                })

            } else {
                return null
            }
        }
    },
}













