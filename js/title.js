console.log( "title.js" );

titleState = {
    canvas: null,
    options: {},
    images: {},
    isDone: false,

    Init: function( canvas, options ) {
        titleState.canvas = canvas;
        titleState.options = options;
        titleState.isDone = false;

        ASSET_TOOLS.AddSound( { title: "title",
                            file: "assets/audio/DancingBunnies_Moosader.ogg",
                            volume: 0.1,
                            loop: true,
                            isMusic: true
                            } );

        UI_TOOLS.CreateImage( { title: "background",
                            src:    "assets/images/background.png",
                            x: 0, y: 0,
                            width: 640, height: 480,
                            fullWidth: 640, fullHeight: 480 } );

        UI_TOOLS.CreateImage( { title: "title",
                            src:    "assets/images/title.png",
                            x: ( titleState.options.width / 2 ) - ( 383 / 2 ),
                            y: 25,
                            width: 336, height: 158,
                            fullWidth: 336, fullHeight: 158 } );


        UI_TOOLS.CreateText( { title: "Version", words: "v1.0", color: "#000000", font: "bold 16px Courier", x: 450, y: 175 } );

        var text = "by Rachel J. Morris (Moosader.com)";
        UI_TOOLS.CreateText( { title: "by", words: text,
                             color: "#000000", font: "bold 16px Courier",
                             x: ( titleState.options.width / 2 ) - ( text.length * 9 ) / 2,
                             y: options.height - 10 } );

        UI_TOOLS.CreateButton( { title: "playButton", words: LANGUAGE_TOOLS.GetText( "English", "play" ),
                             color: "#ffffff", font: "bold 30px Courier",
                             src: "assets/images/button.png",
                             x: 100, y: options.height - 150,
                             textX: 20, textY: 45,
                             width: 125, height: 75,
                             fullWidth: 125, fullHeight: 75,
                             Click: function() {
                                 main.ChangeState( "gameState" );
                                 } } );

        UI_TOOLS.CreateButton( { title: "helpButton", words: LANGUAGE_TOOLS.GetText( "English", "help" ),
                             color: "#ffffff", font: "bold 30px Courier",
                             src: "assets/images/button.png",
                             x: 400, y: options.height - 150,
                             textX: 20, textY: 45,
                             width: 125, height: 75,
                             fullWidth: 125, fullHeight: 75,
                             Click: function() {
                                 main.ChangeState( "helpState" );
                                 } } );

        //SONO_ILO.LudiMuzikon( "menuoMuziko" );
        //ASSET_TOOLS.PlayMusic( "title" );
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
        UI_TOOLS.Draw( titleState.canvas );
    },
};
