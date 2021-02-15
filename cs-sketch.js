// cs-sketch.js; P5 key animation fcns.  // CF p5js.org/reference
// Time-stamp: <2020-02-02 15:58:23 Chuck Siska>

// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas = { cell_size:10, wid:60, hgt:40 }; // JS Global var, w canvas size info.
var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 24; // Update ever 'mod' frames.
var g_stop = 0; // Go by default.
// black = 3, red = 2, yellow = 1, and blue = 0
// (0,0,0,255), (255,0,0,255), (0,255,255,255), (0,0,255,255)
var colorArray = {0: [0,0,255,255], 1: [255,255,0,255], 2: [255,0,0,255], 3: [0,0,0,0]};

// function preload() {
//     img = loadImage('assets/panda.png');
//     image(img,x2 * 10,y2 * 10,10,10); //panda :D
//     img.set(color);
// }
function setup() // P5 Setup Fcn
{
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = sz * g_canvas.hgt;
    createCanvas( width, height );  // Make a P5 canvas.
    draw_grid( 10, 50, 'white', 'yellow' );
}

var g_bot = { dir:0, x:30, y:20, oldx:0, oldy:0, color: [0,0,0,0] }; // Dir is 0..7 clock, w 0 up.
var g_box = { t:1, hgt:47, l:1, wid:63 }; // Box in which bot can move.

// function to compare arrays
// returns true if they are the same, false otherwise
function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
}


function move_bot( )
{
    // get current coord of bot
    let sz = g_canvas.cell_size;
    let sz2 = sz / 2;
    let x = 1+ g_bot.x*sz; // Set x one pixel inside the sz-by-sz cell.
    let y = 1+ g_bot.y*sz;
    let acolors = get( x + sz2, y + sz2 ); // Get cell interior pixel color [RGBA] array.
    let dir = 0;
    let botDir  = g_bot.dir;
    let colorIndex = 0;

    console.log("Color: " + acolors);

    if (arrayEquals(colorArray[3], acolors)) // check black
    {
        dir = 6;
        colorIndex = 3;
    }
    else if (arrayEquals(colorArray[2], acolors)) // check red
    {
        dir = 2;
        colorIndex = 2;
    }
    else if (arrayEquals(colorArray[1], acolors)) // check yellow
    {
        dir = 0;
        colorIndex = 1;
    }
    else if (arrayEquals(colorArray[0], acolors)) // check blue
    {
        dir = 6;
        colorIndex = 0;
    }
    else
    {
        console.log("Error");
    }
         

    // let dir = (round (8 * random( ))) // Change direction at random; brownian motion. // dir = color
    let dx = 0;
    let dy = 0;
    
    // Convert dir to x,y deltas: dir = clock w 0=Up,2=Rt,4=Dn,6=Left.
    
    switch(botDir)
    {
        case 0: // if bot is facing up
            {
                switch(dir) {
                    case 0:  { dy = -1; botDir = 0; break; } // straight
                    case 2 : { dx = 1; botDir = 2; break; } //right
                    case 6 : { dx = -1; botDir = 6; break; } //left
                }
            break;
            }
        case 2: // if bot is facing right
        {
            switch(dir) {
                case 0:  { dx = 1; botDir = 2; break; } // straight
                case 2 : { dy = 1; botDir = 4; break; } // right
                case 6 : { dy = -1; botDir = 0; break; } //left
            }
            break;
        }
        case 6: // if bot is facing left
        {
            switch(dir) {
                case 0:  { dx = -1; botDir = 6; break; } // straight
                case 2 : { dy = -1; botDir = 0; break; } // right
                case 6 : { dy = 1; botDir = 4; break; } //left
            }
            break;
        }
        case 4: // if bot is facing down
        {
            switch(dir) {
                case 0:  { dy = 1; botDir = 4; break; } // straight
                case 2 : { dx = -1; botDir = 6; break; } // right
                case 6 : { dx = 1; botDir = 2; break; } //left
            }
            break;
        }
            
    }
    
    // switch(dir)
    // {
    // case 0 : {         dy = -1; break; } //up
    // case 1 : { dx = 1; dy = -1; break; } // right-up
    // case 2 : { dx = 1; break; } //right
    // case 3 : { dx = 1; dy = 1; break; } // right-dn
    // case 4 : {         dy = 1; break; }//dn
    // case 5 : { dx = -1; dy = 1; break; }//left-dn
    // case 6 : { dx = -1; break; } //left
    // case 7 : { dx = -1; dy = -1; break; }//left-up
    // }
    
    let x2 = (dx + g_bot.x + g_box.wid) % g_box.wid; // Move-x.  Ensure positive b4 mod.
    let y2 = (dy + g_bot.y + g_box.hgt) % g_box.hgt; // Ditto y.

    // increment the color
    if (colorIndex == 3)
    {
        colorIndex = 0;
    }
    else
    {
        colorIndex = colorIndex + 1;
    }
    let color =  colorArray[colorIndex]; // Incr color in nice range.
    g_bot.oldx = g_bot.x;
    g_bot.oldy = g_bot.y;
    g_bot.x = x2; // Update bot x.
    g_bot.y = y2;
    g_bot.dir = botDir;
    g_bot.color = color;
    // console.log( "bot x,y,dir,clr = " + x + "," + y + "," + dir + "," +  color );
}

function draw_bot( ) // Convert bot pox to grid pos & draw bot.
{
    let sz = g_canvas.cell_size;
    let sz2 = sz / 2;
    let x = 1+ g_bot.oldx*sz; // Set x one pixel inside the sz-by-sz cell.
    let y = 1+ g_bot.oldy*sz;
    let big = sz -2; // Stay inside cell walls.
    // Fill 'color': its a keystring, or a hexstring like "#5F", etc.  See P5 docs.
    fill( g_bot.color ); // Concat string, auto-convert the number to string.
    //console.log( "x,y,big = " + x + "," + y + "," + big );
    let acolors = get( x + sz2, y + sz2 ); // Get cell interior pixel color [RGBA] array.
    let pix = acolors[ 0 ] + acolors[ 1 ] + acolors[ 2 ];
    // console.log( "acolors,pix = " + acolors + ", " + pix );

    // (*) Here is how to detect what's at the pixel location.  See P5 docs for fancier...
    // if (0 != pix) { fill( 0 ); stroke( 'white' ); } // Turn off color of prior bot-visited cell.
    // else { stroke( 'white' ); } // Else Bot visiting this cell, so color it.

    // Paint the cell.
    rect( x, y, big, big );
}

function draw_update()  // Update our display.
{
    //console.log( "g_frame_cnt = " + g_frame_cnt )
    move_bot( );
    draw_bot( );
}

function draw()  // P5 Frame Re-draw Fcn, Called for Every Frame.
{
    ++g_frame_cnt;
    if (0 == g_frame_cnt % g_frame_mod)
    {
        if (!g_stop) draw_update();
    }
}

function keyPressed( )
{
    g_stop = ! g_stop;
}

function mousePressed( )
{
    let x = mouseX;
    let y = mouseY;
    //console.log( "mouse x,y = " + x + "," + y );
    let sz = g_canvas.cell_size;
    let gridx = round( (x-0.5) / sz );
    let gridy = round( (y-0.5) / sz );
    //console.log( "grid x,y = " + gridx + "," + gridy );
    //console.log( "box wid,hgt = " + g_box.wid + "," + g_box.hgt );
    g_bot.x = gridx + g_box.wid; // Ensure its positive.
    //console.log( "bot x = " + g_bot.x );
    g_bot.x %= g_box.wid; // Wrap to fit box.
    g_bot.y = gridy + g_box.hgt;
    //console.log( "bot y = " + g_bot.y );
    g_bot.y %= g_box.hgt;
    //console.log( "bot x,y = " + g_bot.x + "," + g_bot.y );
    draw_bot( );
}