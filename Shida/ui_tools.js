console.log( "ui_tools.js" );

UI_TOOLS = {
    images: [],
    buttons: [],
    texts: [],

    ClearUI: function() {
        while ( UI_TOOLS.images.length > 0 )    { UI_TOOLS.images.pop(); }
        while ( UI_TOOLS.buttons.length > 0 )   { UI_TOOLS.buttons.pop(); }
        while ( UI_TOOLS.texts.length > 0 )     { UI_TOOLS.texts.pop(); }
    },

    CreateImage: function( options ) {
        var image = {};
        image.title = options.title;
        image.image = new Image();
        image.image.src = options.src;
        image.x = options.x;
        image.y = options.y;
        image.width = options.width;
        image.height = options.height;
        image.fullWidth = options.fullWidth;
        image.fullHeight = options.fullHeight;

        UI_TOOLS.images.push( image );
    },

    CreateButton: function( options ) {
        var button = {};
        button.title = options.title;
        button.image = new Image();
        button.image.src = options.src;
        button.x = options.x;
        button.y = options.y;
        button.width = options.width;
        button.height = options.height;
        button.fullWidth = options.fullWidth;
        button.fullHeight = options.fullHeight;
        button.words = options.words;
        button.font = options.font;
        button.color = options.color;
        button.textX = options.x + options.textX;
        button.textY = options.y + options.textY;
        button.Click = options.Click; // funkcio

        UI_TOOLS.buttons.push( button );
    },

    CreateText: function( options ) {
        var text = {};
        text.title = options.title;
        text.words = options.words;
        text.x = options.x;
        text.y = options.y;
        text.font = options.font;
        text.color = options.color;

        UI_TOOLS.texts.push( text );
    },

    UpdateText: function( title, text ) {
        for ( var i = 0; i < UI_TOOLS.texts.length; i++ ) {
            if ( UI_TOOLS.texts[i].title == title ) {
                UI_TOOLS.texts[i].words = text;
            }
        }
    },

    Click: function( ev ) {
        var mouseX = ev.clientX - $( "canvas" ).offset().left;
        var mouseY = ev.clientY - $( "canvas" ).offset().top;

        for ( var i = 0; i < UI_TOOLS.buttons.length; i++ ) {
            if ( mouseX > UI_TOOLS.buttons[i].x &&
                 mouseX < UI_TOOLS.buttons[i].x + UI_TOOLS.buttons[i].width &&
                 mouseY > UI_TOOLS.buttons[i].y &&
                 mouseY < UI_TOOLS.buttons[i].y + UI_TOOLS.buttons[i].height ) {

                 ASSET_TOOLS.PlaySound( "button" );
                 UI_TOOLS.buttons[i].Click();
             }
        }
    },

    Draw: function( canvas ) {
        for ( var i = 0; i < UI_TOOLS.images.length; i++ ) {
            canvas.drawImage(
                UI_TOOLS.images[i].image,
                0, 0, UI_TOOLS.images[i].width, UI_TOOLS.images[i].height,
                UI_TOOLS.images[i].x, UI_TOOLS.images[i].y,
                UI_TOOLS.images[i].fullWidth, UI_TOOLS.images[i].fullHeight );
        }

        for ( var i = 0; i < UI_TOOLS.texts.length; i++ ) {
            canvas.fillStyle = UI_TOOLS.texts[i].color;
            canvas.font = UI_TOOLS.texts[i].font;
            canvas.fillText(
                UI_TOOLS.texts[i].words,
                UI_TOOLS.texts[i].x, UI_TOOLS.texts[i].y );
        }

        for ( var i = 0; i < UI_TOOLS.buttons.length; i++ ) {
            canvas.drawImage(
                UI_TOOLS.buttons[i].image,
                0, 0, UI_TOOLS.buttons[i].width, UI_TOOLS.buttons[i].height,
                UI_TOOLS.buttons[i].x, UI_TOOLS.buttons[i].y,
                UI_TOOLS.buttons[i].fullWidth, UI_TOOLS.buttons[i].fullHeight );

            canvas.fillStyle = UI_TOOLS.buttons[i].color;
            canvas.font = UI_TOOLS.buttons[i].font;
            canvas.fillText(
                UI_TOOLS.buttons[i].words,
                UI_TOOLS.buttons[i].textX, UI_TOOLS.buttons[i].textY );
        }
    },
};
