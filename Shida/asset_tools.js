console.log( "assets_tools.js" );

ASSET_TOOLS = {
    sounds: {},
    nowPlaying: null,
    
    Init: function() {
        ASSET_TOOLS.AddSound( {
            file : "Shida/button.wav",
            title : "button",
            volume : 1.0,
            loop : false,
            isMusic : false
            } );
    },

    AddSound: function( options )
    {
        sound = new Audio( options.file );
        sound.title = options.title;
        sound.volume = options.volume;
        sound.loop = options.loop;
        sound.isMusic = options.isMusic;
        ASSET_TOOLS.sounds[ sound.title ] = sound;
    },
    
    PlaySound: function( title ) {
        if ( ASSET_TOOLS.sounds[ title ] != null ) {
            if ( ASSET_TOOLS.sounds[ title ].isMusic == false ) {
                ASSET_TOOLS.sounds[ title ].play();
            }
        }
    },
    
    PlayMusic: function( title ) {
        if ( ASSET_TOOLS.sounds[ title ] != null ) {
            if ( ASSET_TOOLS.sounds[ title ].isMusic
                 && ASSET_TOOLS.nowPlaying != title ) {
                ASSET_TOOLS.nowPlaying = title;
                ASSET_TOOLS.StopMusic();
                ASSET_TOOLS.sounds[ title ].play();
            }
        }
    },
    
    StopMusic: function() {
        for ( var i in ASSET_TOOLS.sounds ) {
            // Stop it if this is an Audio item
            if ( ASSET_TOOLS.sounds[ i ].isMusic ) {
                ASSET_TOOLS.sounds[ i ].pause();
                ASSET_TOOLS.nowPlaying = null;
            }
        }
    }
};
