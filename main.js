let tools = {}, shapes = {}, machining = {}, paths = {};
let gcode = "";

window.addEventListener("load", () => {
  fetch("tools.json").then(res => res.json()).then(data => {
    tools = data;
    const toolSelect = document.getElementById("toolSelect");
    for (const key in tools) {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = tools[key].name;
      toolSelect.appendChild(opt);
    }
  });

  fetch("shapes.json").then(res => res.json()).then(data => {
    shapes = data;
    const shapeSelect = document.getElementById("shape");
    for (const key in shapes) {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = key;
      shapeSelect.appendChild(opt);
    }
    updateShapeUI();
  });

  fetch("machining.json").then(res => res.json()).then(data => {
    machining = data;
    fillSelect("shapeMode", data.shapeMode);
    fillSelect("profileMode", data.profileMode);
    fillSelect("millingDirection", data.millingDirection);
    document.getElementById("stepOver").value = data.stepOverDefault;
    document.getElementById("finishPass").checked = data.finishingPass;
    document.getElementById("rampIn").checked = data.rampIn;
    document.getElementById("leadInOut").checked = data.leadInOut;
  });

  fetch("paths.json").then(res => res.json()).then(data => {
    paths = data;
    document.getElementById("adaptiveClearing").checked = data.adaptiveClearing.enabled;
    document.getElementById("restMachining").checked = data.restMachining.enabled;
  });

  fetch("pp.txt").then(res => res.text()).then(text => {
    document.getElementById("ppEditor").value = text;
  });
});

function fillSelect(id, options) {
  const select = document.getElementById(id);
  options.forEach(opt => {
    const o = document.createElement("option");
    o.value = opt;
    o.textContent = opt;
    select.appendChild(o);
  });
}

function updateShapeUI() {
  const shapeKey = document.getElementById("shape").value;
  const shape = shapes[shapeKey];
  const container = document.getElementById("shapeInputs");
  container.innerHTML = "";
  for (const key in shape) {
    if (key !== "type") {
      const input = document.createElement("input");
      input.type = "number";
      input.id = key;
      input.placeholder = `${key} (${shape[key]})`;
      input.value = shape[key];
      container.appendChild(input);
    }
  }
  document.getElementById("shapePreview").src = `images/${shape.type}_preview.png`;
}

// generateGCode() and drawPreview() would go here...
