console.log( "base.js" );

/*
 Shida framework
 
 Your page needs a canvas element
 and to include this file and JQuery:
 
<script src="Shida/scripts/external_lib/jquery-1.10.2.min.js"></script>
<script src="Shida/base.js"></script>

You need to create a main.js file and include it as well.
Look at the main_template.js for reference.
 * */

$( document ).ready( function()
{
    var settings = {
        width: 640, 
        height: 480,
        fps: 30
    };
    
    var canvasWindow = $( "canvas" )[0].getContext( "2d" );
    
    setupCanvas();
    createGameLoop();    
    
    function setupCanvas()
    {
		settings.width = $( "canvas" ).attr( "width" );
		settings.height = $( "canvas" ).attr( "height" );
		
        //$( "canvas" ).attr( "width", settings.width );
        //$( "canvas" ).attr( "height", settings.height );
        
        // Start with a "loading..." screen
        canvasWindow.fillStyle = "#398eed";
        canvasWindow.fillRect( 0, 0, settings.width, settings.height );
        canvasWindow.fillStyle = "#ffffff";
        canvasWindow.fillText( "Loading...", settings.width/2, settings.height/2 );

        ASSET_TOOLS.Init();
    }
    
    function createGameLoop()
    {
        main.init( settings, canvasWindow );
        
        setInterval( function() {
            main.update();
            main.draw();
        }, 1000 / settings.fps );
    }    
    
} );
