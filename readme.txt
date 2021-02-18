Readme for Project 1: Cella Larks Ant
------------------------------------------------------------
Class Number: 
  335-02 Algorithm Engineering 13611

Project Number and Name: 
  #1 - Cella Larks Ant 34

Team Name: 
  PandaGang

Members: 
  Stephen Lee, Anthony Ngon, Kris Calma, Nicolas Vasquez

Intro (including the algorithm used): 
  This project draws a grid and runs an invisible bot from cell to cell
  on the grid changing its colors.  You can stop/restart the bot with
  any keypress.  You can move the bot to any cell with a mouse-click.

  This is an example project using HTML, Javascript (JS), and P5.js
  which is a JS-adapted version of the Processing Language.  CF HTML and
  JS on the web (eg, Wikipedia).  More on P5 is at
  p5js.org/reference.and at github.com/processing/p5.js/wiki.

  P5 provides sutomated animation (via a user-built "draw" function),
  and GUI manipulation functions that are simpler than JS.

Contents:
  File README.txt.  This file.
  
  File p5.js. This is the P5 package.  It is loaded inside the html.
  
  File cs-sketch.js. This contains several P5 user-defined linkage functions
   (setup, draw, keyPressed, and mousePressed), as well as example
    support functions like arrayEquals().  P5's setup() is run once before page display.
    P5's draw() is run once per display frame, so you can do animation.
  
  File index-js-p5-example.html. Drag and drop this into a browser to
    run the example.
    Click to set new loc for bot (via mousePressed).
    Hit (almost) any key to toggle bot on or off (via keyPressed).

  File assets/styles.css. This controls the webpage styling. // Loaded inside the html.

  File assets/draw-stuff.js. This is an example to show loading a JS
    script file from a folder other than the index HTML file's
    folder location.  It also includes the utility draw_grid function
    written in P5+JS. // Loaded inside the html.

External Requirements (None?): 
  None

Setup and Installation (if any): . 
  1. Extract the .zip file into a folder. 
  2. Drag the index-js-p5-example.html into a web browser. 

Sample Invocation: 
  Drag and drop this into a browser to run the example.

Features (both included and missing):
  + Project creates a grid 60x40 cells size with each cell being 10x10 pixels.
  + Bot will start at position (30,20) facing up. 
  + All cells start black.
  + Color grid changes based off four colors: Black, Blue, Red, Yellow (Colors will rotate in order so Black -> Blue and so on)
  + Behavioral direction change based on current tile color. Black - Left; Blue - Left; Red - Right ; Yellow - Straight
  + Different modes: Set-Count, Left-Right , Countdown
  + Set-Count will make a counter based on the next tile color.
  + Countdown will make the bot go straight and decrement the counter until it hits 0.
  + Pauses the process by pressing almost any key such as "N" on the keyboard.

  - Missing the panda :(

Bugs (if any):
  None

Credits:

  Some code was borrowed and modified from Stuart's book.  
    Introducing JavaScript Game Development: Build a 2D Game from the
    Ground Up, by Graeme Stuart, 2018, 209 pages.

  The arrayEquals() is copied from MasteringJS website.
  https://masteringjs.io/tutorials/fundamentals/compare-arrays

  And, of course, thanks to the HTML and P5.js developers.