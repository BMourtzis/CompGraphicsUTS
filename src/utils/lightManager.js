
let lights = [];
let idCount = 1;

function initLightManager() {
  document.addEventListener("keydown", (event) => {
    if(event.keyCode > 47 && event.keyCode < 58) {
      for(let light of lights) {
        if(event.keyCode === light.key) {
          toggle(light.light);
        }
      }
    }
  }, false);
}

function addLightingHandler(key, light) {
  if(key < 48 || key > 57) {
    throw new Error("Incorrect KeyCode!. You have to use the numbers from 0 (48) to 9 (57)");
  }

  if(!light.isLight) {
    throw new Error("A Light needs to be supplied");
  }

  let id = idCount++;
  lights.push({id, key, light});
  console.log(id);
  
  return id;
}

function outsideToggle(id) {
  let light = getLight(id);
  if(light === null) {
    throw new Error("The ID doesn't much to any stored light");
  }

  toggle(light);
}

function getLight(id) {
  for(let light of lights) {
    if(light.id === id) {
      return light;
    }
  }

  return null;
}

function toggle(light) {
  if(light.intensity < 0.5) {
    light.intensity = 1;
  }
  else {
    light.intensity = 0;
  }
}

export {
  initLightManager,
  addLightingHandler,
  outsideToggle
};
