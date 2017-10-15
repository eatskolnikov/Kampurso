console.log( "game.js" );

bear = {
    x: 0,
    y: 0,
    width: 48,
    height: 48,
    fullWidth: 48,
    fullHeight: 48,
    speed: 5,
    image: null,

    Move: function( dir ) {
        if ( dir == "UP" ) {
            bear.y -= bear.speed;
        }
        else if ( dir == "DOWN" ) {
            bear.y += bear.speed;
        }
        else if ( dir == "LEFT" ) {
            bear.x -= bear.speed;
        }
        else if ( dir == "RIGHT" ) {
            bear.x += bear.speed;
        }
    },

    Draw: function( canvas ) {
        canvas.drawImage(
            bear.image,
            0, 0, bear.width, bear.height,
            bear.x, bear.y,
            bear.fullWidth, bear.fullHeight );
    }
};

gameState = {
    canvas: null,
    options: {},
    images: {},
    isDone: false,

    people: [],
    items: [],
    
    keys: {
        UP:         { code: "w", isDown: false }, 
        DOWN:       { code: "s", isDown: false },
        RIGHT:      { code: "d", isDown: false },
        LEFT:       { code: "a", isDown: false },
        SHOOT:      { code: 32, isDown: false },
    },

    objBear : null,

    Init: function( canvas, options ) {
        gameState.canvas = canvas;
        gameState.options = options;
        gameState.isDone = false;

        gameState.images.bear = new Image();
        gameState.images.bear.src = "assets/images/bear.png";

        gameState.objBear = bear;
        gameState.objBear.image = gameState.images.bear;
        gameState.objBear.x = 640/2 - 48/2;
        gameState.objBear.y = 480/2 - 48/2;

        
        gameState.images.people = new Image();
        gameState.images.people.src = "assets/images/people.png";
        
        gameState.images.tents = new Image();
        gameState.images.tents.src = "assets/images/tents.png";
        
        gameState.images.foods = new Image();
        gameState.images.foods.src = "assets/images/foods.png";
        
        gameState.CreatePeople();
    },

    Clear: function() {
    },

    Click: function( ev ) {
    },

    KeyPress: function( ev ) {
        $.each( gameState.keys, function( i, key ) {
            if ( ev.key == key.code ) {
                key.isDown = true;
            }
        } );
    },

    KeyRelease: function( ev ) {
        $.each( gameState.keys, function( i, key ) {
            if ( ev.key == key.code ) {
                key.isDown = false;
            }
        } );
    },

    Update: function() {
        if ( gameState.keys.UP.isDown ) {
            gameState.objBear.Move( "UP" );
        }
        else if ( gameState.keys.DOWN.isDown ) {
            gameState.objBear.Move( "DOWN" );
        }
        if ( gameState.keys.LEFT.isDown ) {
            gameState.objBear.Move( "LEFT" );
        }
        else if ( gameState.keys.RIGHT.isDown ) {
            gameState.objBear.Move( "RIGHT" );
        }

        // Update people
        for ( var i = 0; i < gameState.people.length; i++ ) {
            gameState.people[i].Update();
        }
    },

    Draw: function() {
        // Draw grass 9cc978
        main.canvasWindow.fillStyle = "#9cc978";
        main.canvasWindow.fillRect( 0, 0, main.settings.width, main.settings.height );

        // Draw bear
        gameState.objBear.Draw( main.canvasWindow );

        // Draw people
        for ( var i = 0; i < gameState.people.length; i++ ) {
            gameState.people[i].Draw( main.canvasWindow );
        }
    },

    CreatePeople: function() {
        for ( var i = 0; i < 5; i++ )
        {
            var person = {
                x: Math.floor(Math.random() * 640),
                y: Math.floor(Math.random() * 480),
                width: 32,
                height: 32,
                fullWidth: 32,
                fullHeight: 32,
                speed: 2,
                dir: "UP",
                countdown: 20,
                image: gameState.images.people,

                Update: function() {
                    this.Move( this.dir );
                    
                    this.countdown -= 1;
                    if ( this.countdown == 0 ) {
                        this.ChooseDirection();
                    }
                },

                ChooseDirection: function() {
                    var rand = Math.floor(Math.random() * 4);
                    if      ( rand == 0 ) { this.dir = "UP"; }
                    else if ( rand == 1 ) { this.dir = "DOWN"; }
                    else if ( rand == 2 ) { this.dir = "LEFT"; }
                    else if ( rand == 3 ) { this.dir = "RIGHT"; }
                },

                Move: function( dir ) {
                    if ( dir == "UP" ) {
                        this.y -= this.speed;
                    }
                    else if ( dir == "DOWN" ) {
                        this.y += this.speed;
                    }
                    else if ( dir == "LEFT" ) {
                        this.x -= this.speed;
                    }
                    else if ( dir == "RIGHT" ) {
                        this.x += this.speed;
                    }

                    if ( this.y < 0 ) {
                        this.y = 0;
                    }
                    else if ( this.y + this.height > 480 ) {
                        this.y = 480 - this.height;
                    }
                    if ( this.x < 0 ) {
                        this.x = 0;
                    }
                    else if ( this.x + this.width > 640 ) {
                        this.x = 640 - this.width;
                    }
                },

                Draw: function( canvas ) {
                    canvas.drawImage(
                        this.image,
                        0, 0, this.width, this.height,
                        this.x, this.y,
                        this.fullWidth, this.fullHeight );
                }
            };
            person.ChooseDirection();
                
            gameState.people.push( person );
        }
    }
};
