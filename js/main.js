console.log( "main.js" );

main = {
    settings : null,
    canvasWindow : null,
    states : {},
    currentState : null,
    
    init : function( pSettings, pCanvasWindow ) {
        // Initialize settings
        main.settings = pSettings;
        main.settings.width = $( "canvas" ).width();
        main.settings.height = $( "canvas" ).height();
        console.log( "Canvas window size: " + main.settings.width + "x" + main.settings.height );
        main.canvasWindow = pCanvasWindow;

        // Initialize languages
        main.initText();

        // Initialize event listeners
        window.addEventListener( "mousedown",   main.click, false );
        window.addEventListener( "keydown",     main.keydown, false );
        window.addEventListener( "keyup",       main.keyup, false );

        // Initialize states
        main.initStates();
        main.changeState( "titleState" );
        
        main.image = new Image();
        main.image.src = "catship.png";
    },

    initStates : function() {
        main.states.titleState = titleState;
    },

    initText : function() {
        LANGUAGE_TOOLS.AddLanguage( "English" );
        LANGUAGE_TOOLS.AddLanguage( "Esperanto" );
        
        LANGUAGE_TOOLS.AddText( "English",      "play", "Play" );
        LANGUAGE_TOOLS.AddText( "Esperanto",    "play", "Ludi" );
        
        LANGUAGE_TOOLS.AddText( "English",      "help", "Help" );
        LANGUAGE_TOOLS.AddText( "Esperanto",    "help", "Helpi" );
    },

    changeState : function( name ) {
        console.log( "Switch to state \"" + name + "\"..." );
        if ( main.currentState != null )
        {
            main.currentState.Clear();
        }
        UI_TOOLS.ClearUI();
        main.currentState = main.states[ name ];
        main.currentState.Init( main.canvasWindow, main.settings );
    },
    
    update : function() {
    },
    
    draw : function() {
        // Fill background
        main.canvasWindow.fillStyle = "#333333";
        main.canvasWindow.fillRect( 0, 0, main.settings.width, main.settings.height );
        
        // Draw current state
        if ( main.currentState != null )
        {
            main.currentState.Draw();
        }
    },
    
    // Events
    click : function( event )
    {
        console.log( event );
    },
    
    keydown : function( event )
    {
        console.log( event );
    },
    
    keyup : function( event )
    {
        console.log( event );
    }
};

