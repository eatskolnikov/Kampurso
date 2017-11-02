console.log( "language_tools.js" );

LANGUAGE_TOOLS = {
    text : {},
    
    AddLanguage: function( language ) {
        if ( LANGUAGE_TOOLS.text[ language ] == null ) {
            LANGUAGE_TOOLS.text[ language ] = {}
        }
    },

    AddText: function( language, key, text )
    {
        LANGUAGE_TOOLS.AddLanguage( language );
        LANGUAGE_TOOLS.text[ language ][ key ] = text;
    },

    GetText: function( language, key ) {
        if ( LANGUAGE_TOOLS.text[ language ] == null ) {
            return "LANGUAGE NOT FOUND";
        }
        else if ( LANGUAGE_TOOLS.text[ language ][ key ] == null ) {
            return "TEXT NOT FOUND";
        }
        return LANGUAGE_TOOLS.text[ language ][ key ];
    }
};
