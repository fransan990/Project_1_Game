class Player {
    constructor(ctx, gamesizeW, gamesizeH, sumX,image) {
        this.ctx = ctx
        this.playerPosition = { x: 100, y: 430 }
        this.gamesize = { w: gamesizeW, h: gamesizeH }
        this.playerSize = { w: 160, h: 200 }
        this.key = { SPACE: 32 }
        this.sumX = sumX

        this.playerImageInstance = undefined
        this.image=image

        this.playerFramesIndex = 0
        this.playerSpeed = 0
        this.playerGravity = 0.4
        this.floor = 430
        this.init()

    }

    init() {
        this.playerImageInstance = new Image()
        this.playerImageInstance.src = this.image
        this.playerImageInstance.frames = 10 
        this.playerImageInstance.framesIndex = 0

        this.playerDraw()
    }

    playerDraw(framesCounter) {

        this.ctx.drawImage(
            this.playerImageInstance,
            this.playerImageInstance.framesIndex * (this.playerImageInstance.width / this.playerImageInstance.frames),
            0,
            this.playerImageInstance.width / this.playerImageInstance.frames,
            this.playerImageInstance.height,
            this.playerPosition.x + this.sumX,
            this.playerPosition.y,
            this.playerSize.w,
            this.playerSize.h
        )

        this.playerDown()
        this.animate(framesCounter)
    }

    animate(framesCounter) {
        
        if (framesCounter % 5 == 0) {
            this.playerImageInstance.framesIndex++
        }
        if (this.playerImageInstance.framesIndex >= this.playerImageInstance.frames) {
            this.playerImageInstance.framesIndex=0
        }
    }


    //@JUMP
    //LO PUTO MEJOR QUE TENEMOS, GRACIAS GUILLE, WE LOVE YOU!!!!! :)
    //------------------------------------------------------------------>

    playerJump(vel) {
        if (this.playerPosition.y + this.playerSize.h >= 630) {
            this.playerSpeed = vel //salto 
            this.playerSpeed += this.playerGravity //que salte mas depacio 
            this.playerPosition.y += this.playerSpeed
            this.playerDown()
        }
    }

    playerDown() {
        if (this.playerPosition.y < 430) {
            this.playerSpeed += this.playerGravity
            this.playerPosition.y += this.playerSpeed
        }
    }
}
