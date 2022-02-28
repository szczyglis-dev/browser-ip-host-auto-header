let page = document.getElementById("container");
let addBtn = document.getElementById("add");
let saveBtn = document.getElementById("save");
let importBtn = document.getElementById("import");
let exportTextarea = document.getElementById("export-textarea");
let importTextarea = document.getElementById("import-textarea");

function handleOpen(event) {
  let url = event.target.getAttribute('url');
  let t = browser.tabs.create({ url: url });
}

function handleDelete(event) {
  if (!confirm('Delete item?')) {
    return;
  }
  let x = parseInt(event.target.getAttribute('i'));

  browser.storage.sync.get('json', function(items) {
    let list;
    if (typeof items.json === "undefined" || items.json == null) {
      return;
    }
    let c = JSON.parse(items.json).length;
    let ip, host, enabled;
    let newList = [];
    for (let i = 0; i < c; i++) {
      if (x != i) {
        ip = document.getElementById('ip_' + i).value;
        host = document.getElementById('host_' + i).value;
        enabled = document.getElementById('enabled_' + i).checked;
        newList.push({
            ip: ip, 
            host: host, 
            enabled: enabled
        });
      }      
    }
    
    let json = JSON.stringify(newList);
    browser.storage.sync.set({ json });
    buildItems(); // refresh
  });
}

function init() {
  addBtn.addEventListener("click", createItem);
  saveBtn.addEventListener("click", save);
  importBtn.addEventListener("click", importJson);

  browser.storage.sync.get('isInitialized', function(items) {
    if (typeof items.isInitialized === "undefined" || items.isInitialized == null || items.isInitialized === false) {
      let json = JSON.stringify([
        {ip: 'http://40.114.177.156', host: 'duckduckgo.com', enabled: true}
      ]);
      let isInitialized = true;
      browser.storage.sync.set({ json });
      browser.storage.sync.set({ isInitialized });
    }
  });
}

function importJson() {
  if (!confirm('Import data?')) {
    return;
  }
  let json = importTextarea.value;
  try {
    let list = JSON.parse(json);
    json = JSON.stringify(list);
    browser.storage.sync.set({ json });
    buildItems(); // refresh
    alert('[OK] Imported.');
  } catch (e) {
    alert('[ERROR] Invalid data!')
  }
}

function updateExport() {
  browser.storage.sync.get('json', function(items) {
    if (typeof items.json === "undefined" || items.json == null) {
      return;
    }
    exportTextarea.value = items.json;
  });
}

function update() {
  save(false);
}

function save(monit = true) {
  browser.storage.sync.get('json', function(items) {
    let list;
    if (typeof items.json === "undefined" || items.json == null) {
      return;
    }
    let c = JSON.parse(items.json).length;
    let ip, host, enabled;
    let newList = [];
    for (let i = 0; i < c; i++) {
      ip = document.getElementById('ip_' + i).value;
      host = document.getElementById('host_' + i).value;
      enabled = document.getElementById('enabled_' + i).checked;
      newList.push({
          ip: ip, 
          host: host, 
          enabled: enabled
      });
    }
    
    let json = JSON.stringify(newList);
    browser.storage.sync.set({ json });
    buildItems(); // refresh
    if (monit) {
      alert('[OK] Saved.');
    }    
  });
}

function createItem() {
  browser.storage.sync.get('json', function(items) {
    let list;
    if (typeof items.json === "undefined" || items.json == null) {
      list = [{
        ip: '', 
        host: '', 
        enabled: false
      }];
    } else {
      list = JSON.parse(items.json);
      list.push({
          ip: '', 
          host: '', 
          enabled: false
      });
    }    
    
    let json = JSON.stringify(list);
    browser.storage.sync.set({ json });
    buildItems(); // refresh
  });
}

function buildItems() {
  browser.storage.sync.get('json', function(items) {
      page.innerHTML = ''; // reset

      if (typeof items.json === "undefined" || items.json == null) {
        return;
      }

      let input, div, btnOpen, btnDelete;
      let list = JSON.parse(items.json);

      for (let i = 0; i < list.length; i++) {
        div = document.createElement("div");
        div.id = 'item_' + i;

        input = document.createElement("input");
        input.type = 'text';
        input.placeholder = 'IP';
        input.name = 'ip';
        input.value = list[i].ip;
        input.id = 'ip_' + i;
        input.addEventListener("change", update);
        div.appendChild(input);

        input = document.createElement("input");
        input.type = 'text';
        input.placeholder = 'Host';
        input.name = 'host';
        input.value = list[i].host;
        input.id = 'host_' + i;
        input.addEventListener("change", update);
        div.appendChild(input);

        input = document.createElement("input");
        input.type = 'checkbox';
        input.name = 'enabled';
        input.value = list[i].host;
        input.id = 'enabled_' + i;
        input.addEventListener("change", update);
        if (list[i].enabled) {
          input.checked = true;
        } else {
          input.checked = false;
        }        
        div.appendChild(input);

        btnOpen = document.createElement("button");
        btnOpen.innerHTML = 'OPEN IN NEW TAB';
        btnOpen.setAttribute('url', list[i].ip);
        btnOpen.addEventListener("click", handleOpen);
        div.appendChild(btnOpen);

        btnDelete = document.createElement("button");
        btnDelete.innerHTML = 'X';
        btnDelete.setAttribute('i', i);
        btnDelete.addEventListener("click", handleDelete);
        btnDelete.classList.add("btn-delete");
        div.appendChild(btnDelete);

        page.appendChild(div);
      }

      updateExport();
  });
}

function load() {
  init();
  buildItems();
};

document.addEventListener("DOMContentLoaded", load);