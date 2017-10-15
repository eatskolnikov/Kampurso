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
    }
};

gameState = {
    canvas: null,
    options: {},
    images: {},
    isDone: false,
    
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
    },

    Draw: function() {
        // Draw grass 9cc978
        main.canvasWindow.fillStyle = "#9cc978";
        main.canvasWindow.fillRect( 0, 0, main.settings.width, main.settings.height );

        // Draw bear
        main.canvasWindow.drawImage(
            gameState.objBear.image,
            0, 0, gameState.objBear.width, gameState.objBear.height,
            gameState.objBear.x, gameState.objBear.y,
            gameState.objBear.fullWidth, gameState.objBear.fullHeight );
    },

    ClickPlay: function() {
    }
};
