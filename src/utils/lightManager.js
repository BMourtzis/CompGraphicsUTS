
let lights = [];
let idCount = 1;


/**
 * initLightManager - Initialises the light manager
 *
 * @return {Null}  null
 */
function initLightManager() {
  document.addEventListener("keydown", (event) => {
    if(event.keyCode > 47 && event.keyCode < 58) {
      for(let light of lights) {
        if(event.keyCode === light.key) {
          toggle(light.light, light.intensity);
        }
      }
    }
  }, false);
}

/**
 * addLightingHandler - Registers an event handler for the light specified
 *
 * @param  {Number} key   The key code of the key. Need to be a number 0 - 9 on the keyboard. The keycodes are between (48-57)
 * @param  {Light} light  The light that is registered
 * @param {Number} intensity The maximum intensity of the light
 * @return {Number}       The ID of the light registered. Used to call outside toggles.
 */
function addLightingHandler(key, light, intensity = 1) {
  if(key < 48 || key > 57) {
    throw new Error("Incorrect KeyCode!. You have to use the numbers from 0 (48) to 9 (57)");
  }

  if(!light.isLight) {
    throw new Error("A Light needs to be supplied");
  }

  let id = idCount++;
  lights.push({id, key, light, intensity});

  return id;
}

/**
 * outsideToggle - A function to allow toggles to be done from an outside scope
 *
 * @param  {Number} id The ID of the light
 * @return {Null}      null
 */
function outsideToggle(id) {
  let light = getLight(id);
  if(light === null) {
    throw new Error("The ID doesn't much to any stored light");
  }

  toggle(light.light, light.intensity);
}

function toggleKey(key) {
  let keyLights = getLightFromKey(key);

  for(let light of keyLights) {
    toggle(light.light, light.intensity);
  }
}


/**
 * getLight - Gets a ligth with its ID
 *
 * @param  {Number} id The ID of the registered light
 * @return {Object}    The light object
 */
function getLight(id) {
  for(let light of lights) {
    if(light.id === id) {
      return light;
    }
  }

  return null;
}

function getLightFromKey(key) {
  let keyLights = [];
  for(let light of lights) {
    if(light.key === key) {
      keyLights.push(light);
    }
  }

  return keyLights;
}


/**
 * toggle - Toggles the light on and off
 *
 * @param  {Object} light The Light object that will be toggled
 * @param {Number} intensity The intensity of the light when turned on
 * @return {Null}         null
 */
function toggle(light, intensity) {
  if(light.intensity < intensity) {
    light.intensity = intensity;
  }
  else {
    light.intensity = 0;
  }
}

export {
  initLightManager,
  addLightingHandler,
  outsideToggle,
  toggleKey
};
