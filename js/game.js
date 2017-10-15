console.log( "game.js" );

gameState = {
    canvas: null,
    options: {},
    images: {},
    isDone: false,

    Init: function( canvas, options ) {
        gameState.canvas = canvas;
        gameState.options = options;
        gameState.isDone = false;
    },

    Clear: function() {
    },

    Click: function( ev ) {
    },

    KeyPress: function( ev ) {
    },

    KeyRelease: function( ev ) {
    },

    Update: function() {
    },

    Draw: function() {
        // Draw grass 9cc978
        main.canvasWindow.fillStyle = "#9cc978";
        main.canvasWindow.fillRect( 0, 0, main.settings.width, main.settings.height );
    },

    ClickPlay: function() {
    }
};
