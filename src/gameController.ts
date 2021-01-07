class GameController {

    private road: Road;
    private walls: Wall[];
    private character: Character;
    private highScore: HighScore;
    private previousCollision: boolean;
    private levelFactory: LevelFactory;
    private level: Level;

    constructor(totalSections: number) { 
        this.road = new Road();
        this.walls = [];
        this.character = new Character();
        this.highScore = new HighScore();
        this.levelFactory = new LevelFactory();
        this.level = this.levelFactory.getLevel(1);
        this.previousCollision = false;

        this.addWall(totalSections);
        setInterval(() => this.addWall(totalSections), 8000);
    }


    private addWall(totalSections: number) {
        console.log(totalSections)
        this.walls.push(new Wall(3));
    }

    private removeWall() {
        for (const wall of this.walls) {
            if (wall.yWallPosition > height) {
                // Delete wall from array to preserve memory
                const index = this.walls.indexOf(wall);
                this.walls.splice(index, 1);
            } 
        }        
    }

    update() {
        //this.road.update();   Finns inget i road.update.
        for (const wall of this.walls) {
            wall.update();
        }
        this.removeWall();
        this.character.update();
        this.checkWallCollision();
        this.updateHighScore();
        this.updateColor();
        this.levelUp();
        
    }

    draw() {
        this.road.draw();
        for (const wall of this.walls) {
            wall.draw();
        }
        this.character.draw();
        this.highScore.draw();
    }

    // Stoppar väggen från att fortsätta röra sig om väggens färg och gubbens färg inte är
    // samma när de har samma y-position
    private checkWallCollision() {

        // Todo: Skapa loop
        for (const wall of this.walls) {
            if (this.character.y < wall.yWallPosition && wall.color !== this.character.characterColor) {
                wall.yWallPosition = this.character.y;
                noLoop();
            }
        }   
    }

    // Uppdaterar färgen på gubben utifrån highScore
    private updateColor() {
        for (const wall of this.walls) {
        
        let characterImgColors = [characterImgBlue, characterImgGreen, characterImgRed];

        if (this.highScore.score >= 2 && this.highScore.score <= 4 && wall.yWallPosition < 150) {

            characterImgColors.push(characterImgYellow);
            this.character.characterImg = random(characterImgColors)
            this.matchColors();

        } else if (this.highScore.score >= 5 && this.highScore.score <= 7 && wall.yWallPosition < 150) {

            characterImgColors.push(characterImgIndigo);
            this.character.characterImg = random(characterImgColors)
            this.matchColors();

        } else if (this.highScore.score >= 8 && this.highScore.score <= 10 && wall.yWallPosition < 150) {

            characterImgColors.push(characterImgOrange);
            this.character.characterImg = random(characterImgColors)
            this.matchColors();

        } else if (this.highScore.score >= 11 && wall.yWallPosition < 150) {

            characterImgColors.push(characterImgViolet);
            this.character.characterImg = random(characterImgColors)
            this.matchColors();            
        }
    }
}

    // Anger samma färg på characterColor som finns i characterImg
    private matchColors() {
        if (this.character.characterImg == characterImgBlue) {
            this.character.characterColor = 'blue'
        } else if (this.character.characterImg == characterImgRed) {
            this.character.characterColor = 'red'
        } else if (this.character.characterImg == characterImgGreen) {
            this.character.characterColor = 'green'
        } else if (this.character.characterImg == characterImgYellow) {
            this.character.characterColor = 'yellow'
        } else if (this.character.characterImg == characterImgIndigo) {
            this.character.characterColor = 'indigo'
        } else if (this.character.characterImg == characterImgViolet) {
            this.character.characterColor = 'violet'
        } else if (this.character.characterImg == characterImgOrange) {
            this.character.characterColor = 'orange'
        }
    }

    // Uppdaterar score baserat på antal väggar som har passerat gubben
    private updateHighScore() {

        // Todo: Skapa for loop
        
        for (const wall of this.walls) {
        if (this.character.y < wall.yWallPosition) {

            if (!this.previousCollision) {
                this.highScore.score++
                if (this.highScore.score > this.highScore.highScoreLS) {
                    this.highScore.highScoreLS = this.highScore.score;
                    storeItem('highScore', this.highScore.highScoreLS);
                }
                // console.log(this.highScore.score);
            }
             this.previousCollision = true;
             break;

         } else {
             this.previousCollision = false;
         }
         
    }
}

    private levelUp() {
        if (this.highScore.score == 10) {
            this.level = this.levelFactory.getLevel(2);
             
        }
    }
}

