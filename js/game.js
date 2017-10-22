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
    hunger: 0,

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

        if ( bear.x < 0 ) {
            bear.x = 0;
        }
        else if ( bear.x + bear.width > 640 ) {
            bear.x = 640 - bear.width;
        }

        if ( bear.y < gameState.minObjectY ) {
            bear.y = gameState.minObjectY;
        }
        else if ( bear.y + bear.height > 480 ) {
            bear.y = 480 - bear.height;
        }
    },

    Update: function() {
        this.hunger += 0.1;
    },

    Draw: function( canvas ) {
        canvas.drawImage(
            bear.image,
            0, 0, bear.width, bear.height,
            bear.x, bear.y,
            bear.fullWidth, bear.fullHeight );
    },

    Eat: function( value ) {
        this.hunger -= value;
        if ( this.hunger < 0 ) { this.hunger = 0; }
    }
};

gameState = {
    canvas: null,
    options: {},
    images: {},
    isDone: false,
    time: 6,
    dropFrequency: 100,
    minObjectY: 110,

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

        gameState.images.sky = new Image();
        gameState.images.sky.src = "assets/images/sky.png";

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
        
        UI_TOOLS.CreateText( { title: "Time", words: gameState.time + ":00",
                            color: "#000000", font: "bold 20px Sans-serif", x: 10, y: 30 } );
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

        // Update bear
        gameState.objBear.Update();

        // Update people
        for ( var i = 0; i < gameState.people.length; i++ ) {
            gameState.people[i].Update();
        }

        var drop = Math.floor( Math.random() * gameState.dropFrequency );
        if ( drop == 0 )
        {
            gameState.DropItem();
        }

        // Check collision
        var removeMe = [];
        for ( var i = 0; i < gameState.items.length; i++ ) {
            if ( gameState.IsCollision( gameState.objBear, gameState.items[i] )
                    && gameState.items[i].type == "food" ) {
                gameState.objBear.Eat( gameState.items[i].value );
                gameState.items[i].eaten = true;
                removeMe.push( i );
            }
        }

        // Remove any eaten foods
        for ( var i = 0; i < removeMe.length; i++ )
        {
            gameState.items.splice( removeMe[i], 1 );
        }
        

        // Update timer
        gameState.time += 0.01;
        if ( gameState.time >= 24.0 ) {
            gameState.time = 0.0;
        }

        UI_TOOLS.UpdateText( "Time", Math.floor( gameState.time ) + ":00" );
    },

    Draw: function() {
        // Draw grass 9cc978
        var skyY = 0;
        if ( gameState.time <= 6 ) {
            main.canvasWindow.fillStyle = "#0b5a6b";
            skyY = 200;
        }
        else if ( gameState.time <= 8 ) {
            main.canvasWindow.fillStyle = "#258e34";
            skyY = 100;
        }
        else if ( gameState.time <= 18 ) {
            main.canvasWindow.fillStyle = "#9cc978";
            skyY = 0;
        }
        else if ( gameState.time <= 20 ) {
            main.canvasWindow.fillStyle = "#258e34";
            skyY = 100;
        }
        else {
            main.canvasWindow.fillStyle = "#0b5a6b";
            skyY = 200;
        }
        
        main.canvasWindow.fillRect( 0, 0, main.settings.width, main.settings.height );

        // Draw sky
        main.canvasWindow.drawImage( gameState.images.sky,
            0, skyY, 640, 100, 0, 0, 640, 100 );
        
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

        // Draw UI
        UI_TOOLS.Draw( gameState.canvas );
    },

    GetDistance: function( itemA, itemB ) {
        var xA = itemA.x + itemA.width / 2;
        var xB = itemB.x + itemB.width / 2;
        var yA = itemA.y + itemA.height / 2;
        var yB = itemB.y + itemB.height / 2;
        
        var dX = xA - xB;
        var dY = yA - yB;
        
        var dist = Math.sqrt( dX*dX + dY*dY );
        return dist;
    },

    DropItem: function() {
        // Random food type
        var itemType = Math.floor(Math.random() * 6);
        var itemWidthHeight = 32;

        // This food belongs to somebody...
        var personIndex = Math.floor(Math.random() * gameState.people.length);

        var food = {
            x: gameState.people[personIndex].x,
            y: gameState.people[personIndex].y,
            width: itemWidthHeight,
            height: itemWidthHeight,
            fullWidth: itemWidthHeight,
            fullHeight: itemWidthHeight,
            image: gameState.images.foods,
            foodType: itemType,
            value: 5,
            eaten: false,
            type: "food",

            Draw: function( canvas ) {
                canvas.drawImage(
                    this.image,
                    this.foodType * this.width, 0, this.width, this.height,
                    this.x, this.y,
                    this.fullWidth, this.fullHeight );
            }
        }
        
        gameState.items.push( food );
    },

    CreatePeople: function() {
        for ( var i = 0; i < 5; i++ )
        {
            var person = {
                x: Math.floor(Math.random() * 640),
                y: Math.floor(Math.random() * 380) + gameState.minObjectY,
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

                    if ( this.y < gameState.minObjectY ) {
                        this.y = gameState.minObjectY;
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
                y: Math.floor(Math.random() * 380) + gameState.minObjectY,
                width: 32,
                height: 32,
                fullWidth: 32,
                fullHeight: 32,
                image: gameState.images.campfire,
                type: "campfire",

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
    },

    IsCollision: function( obj1, obj2 ) {
        return ( gameState.GetDistance( obj1, obj2 ) < 10 );
    }
};
