# [3D ENGINE](https://antosser.github.io/3d-engine/)
Very easy to use simple 3d javascript engine.

## Usage
1. Clone the repository into a folder
1. Open "index.min.js" in a code editor
1. `var loop = () => {` is the beginning of the programm
1. You can do anything you want there
1. Use the functions listed below to draw something on the screen

## Functions
### line(x1, y1, x2, y2)
Make a 2d line
Parameters: x1, y1, x2, y2

### circle(x, y, r, b, e)
Make a 2d circle  
Parameters: x, y, radius, beginning, end
Example: `circle(500, 500, 100, 0, 2*Math.PI)`

### getPoint2d(x, y, z)
Returns a transformation of a 3d point onto a 2d plane
Parameters: x, y, z
Example: `[out_x, out_y] = getPoint2d(in_x, in_y, in_z)`

### drawPoint3d(x, y, z)
Draws a 3d point on the screen
Parameters: x, y, z
Example: `drawPoint3d(0, 0, 0)`

### drawLine3d(x1, y1, z1, x2, y2, z2)
Draws a 3d line on the screen
Parameters: x1, y1, z1, x2, y2, z2
Example: `drawLine3d(-100, 0, 0, 100, 0, 0)`

## Variables
fps: 30  
player:  
-fov: 100  
-pos:  
--x: 0, y: 0, z: -5  
-ang:  
--x: 0, y: 0, z: 0  