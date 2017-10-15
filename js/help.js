console.log( "title.js" );

helpState = {
    canvas: null,
    options: {},
    images: {},
    isDone: false,

    Init: function( canvas, options ) {
        helpState.canvas = canvas;
        helpState.options = options;
        helpState.isDone = false;
                            
        LANGUAGE_TOOLS.AddText( "English",      "how to play", "How to play" );
        LANGUAGE_TOOLS.AddText( "Esperanto",    "how to play", "Kiel ludi" );
        
        UI_TOOLS.CreateImage( { title: "background",
                            src:    "assets/images/background.png",
                            x: 0, y: 0,
                            width: 640, height: 480,
                            fullWidth: 640, fullHeight: 480 } );
                            
        UI_TOOLS.CreateText( { title: "howto", words: LANGUAGE_TOOLS.GetText( "English", "how to play" ),
                            color: "#000000", font: "bold 30px Sans-serif", x: 10, y: 30 } );



        UI_TOOLS.CreateButton( { title: "backButton", words: LANGUAGE_TOOLS.GetText( "English", "back" ),
                             color: "#ffffff", font: "bold 20px Courier",
                             src: "assets/images/button.png",
                             x: 10, y: options.height - 80,
                             textX: 20, textY: 45,
                             width: 125, height: 75,
                             fullWidth: 125, fullHeight: 75,
                             Click: function() {
                                 main.changeState( "titleState" );
                                 } } );
    },

    Clear: function() {
        UI_TOOLS.ClearUI();
    },

    Click: function( ev ) {
        UI_TOOLS.Click( ev );
    },

    KeyPress: function( ev ) {
    },

    KeyRelease: function( ev ) {
    },

    Update: function() {
    },

    Draw: function() {
        UI_TOOLS.Draw( helpState.canvas );
    },
};
