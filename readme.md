# Computer Graphics UTS
[![CodeFactor](https://www.codefactor.io/repository/github/bmourtzis/compgraphicsuts/badge)](https://www.codefactor.io/repository/github/bmourtzis/compgraphicsuts)

## Topic
A Museum that goes throw the history of video game characters. The idea is to create models through different eras of video game models, from low poly (like tomb raider) to high poly.

## Tasks
### Basic
- [x] Move the code into node.js and configure webpack
- [x] Add Loader for models
- [x] Configure Engine Mechanisms
- [ ] Add shaders

### Models
- [ ] Create the museum walls including textures (should be kinda basic)
- [ ] Add Models for the museum
  - [ ] Tomb Raider
- [x] Add lights for the exhibits
- [ ] (Extra) Add Model viewer to see every aspect of the models.
- [ ] (Extra) Add secret room with extra models
- [ ] (Extra) Add more rooms to the museum

### Mechanisms
- [ ] Create smooth camera mechanisms (To Be discussed)
- [x] Add colliders for the walls and models
  - [x] Add custom colliders
  - [ ] (Extra) Add the ability to use a ramp
- [x] Add triggers
- [x] Add pointer trigger functionality
  - [x] Add descriptions for the Models, includes clicking on the models
  - [ ] (Extra) Add outline for pointed items
- [ ] Make the lights togglable from the menu
- [ ] (Extra) Add switches for the lights

## Getting Started
1. Install Node.js version 9.7.1 or above
2. Open a Console on the directory where you want to save the repository
3. Use the " git clone https://github.com/BMourtzis/CompGraphicsUTS.git " (you need to install git if you already haven't. If you find git difficult to use, the install github for Desktop)
4. Run "npm install" and wait to install all the dependencies
5. Run "npm start" and wait to compile, a browser tab will open

## How it works

### Server
When you run "npm start" you start a nodejs server using webpack. This server operates on localhost:8080 and that's where it exposes index.html. Webpack bundles index.js into bundles.js and saves it at the "dist" directory, however  webpack is clever enough to see that index.js requires other .js files and bundles them as well in bundle.js file.

In order to expose other types of files to the "web", for example character models, just add them under the "dist" directory (make sure that you create a folder, so that dist stays structured).

When you are trying to load a model, enter the path as if your current directory position is index.html.

### Scripts
Index.js initializes a script called engine, which creates the 3 most important components: camera, scene and the WebGL Renderer. It also adds some additional configurations like fog, and a window resize event. The engine script exposes 4 objects: scene, camera, renderer and engine. The engine object has 2 functions: the init, which initialises the objects and crates the update loop and the addUpdate, which adds functions to the update loop.

There is an example file under the src directory that explains how to create a new component
