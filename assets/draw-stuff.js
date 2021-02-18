// Team:       Panda Gang
// Members:    Stephen Lee, Anthony Ngon, Kris Calma, Nicolas Vasquez
// Contact:    angon@csu.fullerton.edu, stephenjonglee@csu.fullerton.edu, calmakris@csu.fullerton.edu, nickvas67@csu.fullerton.edu
// Github:     https://github.com/anthonyn5600/335-Larks-Panda-Gang
// Project 1:  Cella Larks Ant
// File Description: Draw stuff, with P5 // CF p5js.org/reference
//                   Function that draws the grid.

// ------------------------------------------------------------

// =====================================================  draw_grid ====
// Draw a fancy grid with major & minor lines 
// & major row/col numbers.
function draw_grid( rminor, rmajor, rstroke, rfill  ) 
{
    stroke( rstroke );
    fill( rfill );;
    let sz = g_canvas.cell_size;
    let width = g_canvas.wid*sz;
    let height = g_canvas.hgt*sz;
    for ( var ix = 0; ix < width; ix += rminor )
    {
        let big_linep = (ix % rmajor == 0);
        let line_wgt = 1;
        if (big_linep) line_wgt = 2;
        strokeWeight( line_wgt );
        line( ix, 0, ix, height );
        strokeWeight( 1 );
        if ( ix % rmajor == 0 ) { text( ix, ix, 10 ); }
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        let big_linep = (iy % rmajor == 0);
        let line_wgt = 1;
        if (big_linep) line_wgt = 2;
        strokeWeight( line_wgt );
        line( 0, iy, width, iy );
        strokeWeight( 1 );
        if ( iy % rmajor == 0 ) { text( iy, 0, iy + 10 ); }
    }
}
