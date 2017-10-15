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
        
        gameState.images.campfire = new Image();
        gameState.images.campfire.src = "assets/images/campfire.png";
        
        gameState.CreatePeople();
        gameState.CreateItems();
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
        
        // Draw items
        for ( var i = 0; i < gameState.items.length; i++ ) {
            gameState.items[i].Draw( main.canvasWindow );
        }

        // Draw people
        for ( var i = 0; i < gameState.people.length; i++ ) {
            gameState.people[i].Draw( main.canvasWindow );
        }
        
        // Draw bear
        gameState.objBear.Draw( main.canvasWindow );
    },

    GetDistance: function( itemA, itemB ) {
        var dY = itemA.y - itemB.y;
        var dX = itemA.x - itemB.x;
        var dist = Math.sqrt( dX*dX + dY*dY );
        return dist;
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
                isRunning: false,
                dir: "",
                countdown: 20,
                image: gameState.images.people,
                campfire: null,

                Update: function() {
                    this.Move( this.dir );

                    // Run from bear
                    var dist = gameState.GetDistance( this, gameState.objBear );
                    if ( dist < 100 ) {
                        this.isRunning = true;
                        this.dir = "";
                        
                        if ( gameState.objBear.y < this.y ) {
                            this.dir += "S";
                        }
                        else if ( gameState.objBear.y > this.y ) {
                            this.dir += "N";
                        }
                        if ( gameState.objBear.x < this.x ) {
                            this.dir += "E";
                        }
                        else if ( gameState.objBear.x > this.x ) {
                            this.dir += "W";
                        }
                    }
                    else
                    {
                        this.isRunning = false;
                    }

                    // Or update movement direction
                    this.countdown -= 1;
                    if ( this.countdown == 0 ) {
                        this.ChooseDirection();
                        this.countdown = Math.floor( Math.random() * 10) + 10;
                    }
                },

                ChooseDirection: function() {
                    var direction = Math.floor( Math.random() * 4);
                    
                    if ( this.campfire != null ) {
                        this.dir = "";
                        
                        if ( this.campfire.y < this.y && direction == 2 ) {
                            this.dir += "N";
                        }
                        if ( this.campfire.y > this.y && direction == 3 ) {
                            this.dir += "S";
                        }
                        if ( this.campfire.x < this.x && direction == 0 ) {
                            this.dir += "W";
                        }
                        if ( this.campfire.x > this.x && direction == 1 ) {
                            this.dir += "E";
                        }
                    }
                },

                Move: function( dir ) {
                    var speed = this.speed;
                    if ( this.isRunning ) {
                        speed = this.speed * 2;
                    }
                    
                    if ( dir.includes( "N" ) ) {
                        this.y -= speed;
                    }
                    if ( dir.includes( "S" ) ) {
                        this.y += speed;
                    }
                    if ( dir.includes( "W" ) ) {
                        this.x -= speed;
                    }
                    if ( dir.includes( "E" ) ) {
                        this.x += speed;
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
    },

    CreateItems: function() {
        // Generate campfires
        for ( var c = 0; c < 5; c++ )
        {
            var campfire = {
                x: Math.floor(Math.random() * 640),
                y: Math.floor(Math.random() * 480),
                width: 32,
                height: 32,
                fullWidth: 32,
                fullHeight: 32,
                image: gameState.images.campfire,

                Draw: function( canvas ) {
                    canvas.drawImage(
                        this.image,
                        0, 0, this.width, this.height,
                        this.x, this.y,
                        this.fullWidth, this.fullHeight );
                }
            };

            gameState.items.push( campfire );
        }

        // Assign campfires to people
        for ( var p = 0; p < gameState.people.length; p++ )
        {
            var fire = Math.floor( Math.random() * gameState.items.length);
            gameState.people[p].campfire = gameState.items[ fire ];
        }
    }
};
