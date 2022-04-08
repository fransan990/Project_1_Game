class Background {
    constructor(ctx, backgroundWidth, backgroundHeight, imageSource) {
        this.ctx = ctx
        this.background = { w: backgroundWidth, h: backgroundHeight };
        this.image = new Image()
        this.image.src = imageSource;
        this.image2 = new Image()
        this.image2.src = '../images/backgroundSnow.png'
        this.image3 = new Image()
        this.image3.src = '../images/backgroundmountain.png'
        this.image4 = new Image()
        this.image4.src = '../images/backgroundForestFinal.png'
        this.backgroundPos = { x: 0, y: 0 }
        this.velX = 1;
        this.draw()
    }
    draw(brain) {
        if (brain > 4 && brain < 10) {
            this.ctx.drawImage(this.image2, this.backgroundPos.x, this.backgroundPos.y, this.background.w, this.background.h)
            this.ctx.drawImage(this.image2, this.backgroundPos.x + this.background.w, this.backgroundPos.y, this.background.w, this.background.h)
            document.querySelector('.counter').classList.add("snow")

        } else if (brain >= 10 && brain < 15) {
            this.ctx.drawImage(this.image3, this.backgroundPos.x, this.backgroundPos.y, this.background.w, this.background.h)
            this.ctx.drawImage(this.image3, this.backgroundPos.x + this.background.w, this.backgroundPos.y, this.background.w, this.background.h)
            document.querySelector('.counter').classList.add("mountain")

        } else if (brain >= 15) {
            this.ctx.drawImage(this.image4, this.backgroundPos.x, this.backgroundPos.y, this.background.w, this.background.h)
            this.ctx.drawImage(this.image4, this.backgroundPos.x + this.background.w, this.backgroundPos.y, this.background.w, this.background.h)
            document.querySelector('.counter').classList.add("forest")

        } else {
            this.ctx.drawImage(this.image, this.backgroundPos.x, this.backgroundPos.y, this.background.w, this.background.h)
            this.ctx.drawImage(this.image, this.backgroundPos.x + this.background.w, this.backgroundPos.y, this.background.w, this.background.h)

        }

        this.move()
    }
    
    move() {
        if (this.backgroundPos.x <= -this.background.w) {
            this.backgroundPos.x = 0
        }
        this.backgroundPos.x -= this.velX
    }
}