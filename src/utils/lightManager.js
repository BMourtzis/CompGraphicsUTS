
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
          toggle(light.light);
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
 * @return {Number}       The ID of the light registered. Used to call outside toggles.
 */
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

  toggle(light);
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


/**
 * toggle - Toggles the light on and off
 *
 * @param  {Object} light The Light object that will be toggled
 * @return {Null}         null
 */
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
