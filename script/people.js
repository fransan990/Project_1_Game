class People {
    constructor(ctx, gameSizeW, gameSizeH) {
        this.ctx = ctx
        this.gameSize = { w: gameSizeW, h: gameSizeH }
        this.peoplePosition = { x: this.gameSize.w, y: 420 }
        this.peopleVel = 10
        this.peopleSize = { w: 250, h: 240 }
        this.peopleImageInstance = undefined
 
        this.init()
    }

    init() {
        this.peopleImageInstance = new Image()
        this.peopleImageInstance.src = '../images/boy2.png'
        this.peopleImageInstance.frames = 8 //numero de fotos spray
        this.peopleImageInstance.framesIndex = 0
        this.draw()

    }

    draw(framesCounter) {

        this.ctx.drawImage(
            this.peopleImageInstance,
            this.peopleImageInstance.framesIndex * (this.peopleImageInstance.width / this.peopleImageInstance.frames),
            0,
            this.peopleImageInstance.width / this.peopleImageInstance.frames,
            this.peopleImageInstance.height,
            this.peoplePosition.x,
            this.peoplePosition.y,
            this.peopleSize.w,
            this.peopleSize.h
        )

        this.move();
        this.animate(framesCounter)
    }

    animate(framesCounter) {

        if (framesCounter % 10 == 0) {
            this.peopleImageInstance.framesIndex++
        }
        if (this.peopleImageInstance.framesIndex >= this.peopleImageInstance.frames) {
            this.peopleImageInstance.framesIndex = 0
        }
    }

    move() {
        this.peoplePosition.x -= this.peopleVel
    }
}