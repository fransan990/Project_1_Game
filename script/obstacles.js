class Obstacles {

    constructor(ctx, gameSizeW, gameSizeH) {
        this.ctx = ctx
        this.gameSize = { w: gameSizeW, h: gameSizeH }
        this.obsPosition = { x: undefined }
        this.obsVel = 10
        this.obsSize = { w: 150, h: 145 }
        this.random = undefined

        this.randomPosX()

    }

    randomPosX() {
        this.obsPosition.x = Math.random() * (this.gameSize.w - 300) + this.gameSize.w
    }
}

class ObstacleBomb extends Obstacles {

    constructor(ctx, gameSizeW, gameSizeH, obsPositionY,image) {
        super(ctx, gameSizeW, gameSizeH)
        this.bombPosition = { y: obsPositionY }
        this.bombFramesIndex = 0
        this.imageSrc = image
        
        this.init()
    }
    
    init() {
        
        this.bombImageInstance = new Image()
        this.bombImageInstance.src = this.imageSrc
      
        this.draw()
    }

    draw() {

        this.ctx.drawImage(this.bombImageInstance, this.obsPosition.x, this.bombPosition.y, this.obsSize.w, this.obsSize.h);
        this.move()
    }

    move() {
        this.obsPosition.x -= this.obsVel;
    }
}

class ObstaclePlane extends Obstacles {
    constructor(ctx, gameSizeW, gameSizeH, image, obsPositionY) {
        super(ctx, gameSizeW, gameSizeH)
        this.image = image
        this.planePosition = { y: obsPositionY }
        this.init()
    }

    init() {
        this.planeImageInstance = new Image()
        this.planeImageInstance.src = '../images/plane1.png'
        this.planeImageInstance.frames = 6 
        this.planeImageInstance.framesIndex = 0
        this.draw()
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.planeImageInstance,
            this.planeImageInstance.framesIndex * (this.planeImageInstance.width / this.planeImageInstance.frames),
            0,
            this.planeImageInstance.width / this.planeImageInstance.frames,
            this.planeImageInstance.height,
            this.obsPosition.x,
            this.planePosition.y,
            this.obsSize.w,
            this.obsSize.h
        )

        this.animate(framesCounter)
        this.move()
    }

    animate(framesCounter) {

        if (framesCounter % 10 == 0) {
            this.planeImageInstance.framesIndex++
        }
        if (this.planeImageInstance.framesIndex >= this.planeImageInstance.frames) {
            this.planeImageInstance.framesIndex = 0
        }
    }

    move() {
        this.obsPosition.x -= this.obsVel;
    }
}