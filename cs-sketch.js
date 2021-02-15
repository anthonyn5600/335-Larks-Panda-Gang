// cs-sketch.js; P5 key animation fcns.  // CF p5js.org/reference
// Time-stamp: <2020-02-02 15:58:23 Chuck Siska>

// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas = { cell_size:10, wid:60, hgt:40 }; // JS Global var, w canvas size info.
var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 1; // Update ever 'mod' frames.
var g_stop = 0; // Go by default.
// black = 3, red = 2, yellow = 1, and blue = 0
// (0,0,0,0), (255,0,0,255), (0,255,255,255), (0,0,255,255)
var colorArray = {0: [0,0,255,255], 1: [255,255,0,255], 2: [255,0,0,255], 3: [0,0,0,255]};
var mode = "LR";
var counter = 0;
var move = 0;

function setup() // P5 Setup Fcn
{
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = sz * g_canvas.hgt;
    createCanvas( width, height );  // Make a P5 canvas.
    draw_grid( 10, 50, 'white', 'yellow' );
}
//30 , 20
var g_bot = { dir:0, x:30, y:20, oldx:0, oldy:0, color: [0,0,0,0] }; // Dir is 0..7 clock, w 0 up.
var g_box = { t:1, hgt:40, l:1, wid:60 }; // Box in which bot can move.

// function to compare arrays
// returns true if they are the same, false otherwise
function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
}

function currentColor(acolors){
    if (arrayEquals(acolors, [0,0,0,0]))
    {
        acolors = [0,0,0,255];
    }
    
    if (arrayEquals(colorArray[3], acolors)) // check black
        {
            return '3K';
        }
        else if (arrayEquals(colorArray[2], acolors)) // check red
        {
            return '2R';
        }
        else if (arrayEquals(colorArray[1], acolors)) // check yellow
        {
            return '1Y';
        }
        else if (arrayEquals(colorArray[0], acolors)) // check blue
        {
            return '0B';
        }
        else
        {
            return 'color error';
        }
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
    let dx = 0;
    let dy = 0;
    move += 1;

    // console.log("# " + move);
    // console.log(currentColor(acolors));
    // console.log(mode);
    console.log("y, x " + (g_bot.y) + ", " + (g_bot.x));
    if (mode === "LR")
    {
        // default first box color is 0,0,0,0 and needs to change to 0,0,0,255
        if (arrayEquals(acolors, [0,0,0,0]))
        {
            acolors = [0,0,0,255];
        }

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
            mode = "SetCount";
        }
        else if (arrayEquals(colorArray[0], acolors)) // check blue
        {
            dir = 6;
            colorIndex = 0;
        }
        else
        {
            console.log("Color Error");
        }

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
    }
    else if (mode === "SetCount")
    {
        // default first box color is 0,0,0,0 and needs to change to 0,0,0,255
        if (arrayEquals(acolors, [0,0,0,0]))
        {
            acolors = [0,0,0,255];
        }

        if (arrayEquals(colorArray[3], acolors)) // check black
        {
            counter = 3;
        }
        else if (arrayEquals(colorArray[2], acolors)) // check red
        {
            counter = 2;
        }
        else if (arrayEquals(colorArray[1], acolors)) // check yellow
        {
            counter = 1;
        }
        else if (arrayEquals(colorArray[0], acolors)) // check blue
        {
            counter = 0;
        }
        else
        {
            console.log("Color Error");
        }

        switch(botDir)
        {
            case 0: // if bot is facing up
            {
                dy = -1;
                break;
            }
            case 2: // if bot is facing right
            {
                dx = 1;
                break;
            }
            case 6: // if bot is facing left
            {
                dx = -1;
                break;
            }
            case 4: // if bot is facing down
            {
                dy = 1;
                break;
            }     
        }

        // go to countdown modee
        mode = "Countdown";
    }  
    else if (mode === "Countdown")
    {
        console.log("Counter: " + counter);
        if(counter === 0)
            mode = "LR";
        
        switch(botDir)
        {
            case 0: // if bot is facing up
            {
                dy = -1;
                break;
            }
            case 2: // if bot is facing right
            {
                dx = 1;
                break;
            }
            case 6: // if bot is facing left
            {
                dx = -1;
                break;
            }
            case 4: // if bot is facing down
            {
                dy = 1;
                break;
            }     
        }
        
        // default first box color is 0,0,0,0 and needs to change to 0,0,0,255
        if (arrayEquals(acolors, [0,0,0,0]))
        {
            acolors = [0,0,0,255];
        }

        if (arrayEquals(colorArray[3], acolors)) // check black
        {
            colorIndex = 3;
        }
        else if (arrayEquals(colorArray[2], acolors)) // check red
        {
            colorIndex = 2;
        }
        else if (arrayEquals(colorArray[1], acolors)) // check yellow
        {
            colorIndex = 1;
        }
        else if (arrayEquals(colorArray[0], acolors)) // check blue
        {
            colorIndex = 0;
        }
        else
        {
            console.log("Color Error");
        }

        counter--;
    }
    else 
    {
        console.log("Mode Error");
    }

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
    // console.log(currentDir(g_bot.dir));
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
    if(move < 2000)
    {
        move_bot( );
        draw_bot( );
    }
    else {
        g_stop = ! g_stop;
    }

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