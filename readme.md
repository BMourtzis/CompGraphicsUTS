## Topic
A Museum that goes throw the history of video game characters. The idea is to create models through different eras of video game models, from low poly (like tomb raider) to high poly.

## Tasks
- [x] Move the code into node.js
- [x] Add Loader for models
- [ ] Create the museum walls including textures, should be kinda basic
- [ ] Create Models for the museum
  - [ ] Tomb Raider
- [ ] Create smooth camera mechanisms
- [ ] Add lights for the exhibits
- [ ] Add colliders for the walls and models
- [ ] Make the lights togglable from the menu
- [ ] Add descriptions for the Models, includes clicking on the models
- [ ] Add shaders

## Extra Tasks
- [ ] Add Model viewer to see every aspect of the models.
- [ ] Add secret room with extra models
- [ ] Add more rooms to the museum
- [ ] Add switches for the lights

## Getting Started
1. Install Node.js version 9.7.1 or above
2. Open a Console on the directory where you want to save the repository
3. Use the " git clone https://github.com/BMourtzis/CompGraphicsUTS.git " (you need to install git if you already haven't. If you find git difficult to use, the install github for Desktop)
4. Run "npm install" and wait to install all the dependencies
5. Run "npm start" and wait to compile, a browser tab will open

## How it works
When you run "npm start" you start a nodejs server using webpack. This server operates on localhost:8080 and that's where it exposes index.html. Webpack bundles index.js into bundles.js and saves it at the "dist" directory, however  webpack is clever enough to see that index.js requires other .js files and bundles them as well in bundle.js file.

In order to expose other types of files to the "web", for example character models, just add them under the "dist" directory (make sure that you create a folder, so that dist stays structured).

When you are trying to load a model, enter the path as if your current directory position is index.html.
