/* ============================
   CONFIGURATION GPT MINI
   ============================ */
// Configuration de l'API - utilise config.js si disponible
const GPT_CONFIG = window.API_CONFIG?.openai || {
    apiKey: '', // À configurer : ajoutez votre clé API ici
    model: 'gpt-3.5-turbo', // Modèle OpenAI
    baseUrl: 'https://api.openai.com/v1/chat/completions'
};

// Configuration sécurisée :
// 1. Pour le développement local : ajoutez votre clé API dans la ligne ci-dessus
// 2. Pour la production Netlify : utilisez une variable d'environnement
//    - Dans Netlify : Site settings → Environment variables
//    - Ajoutez : OPENAI_API_KEY = votre clé API
//    - Puis modifiez : apiKey: process.env.OPENAI_API_KEY || ''

/* ============================
   CONFIGURATION NETLIFY (Simulée)
   ============================ */
const ASSET_PATHS = ['./','/','cartes/','photos/','graphes/','images/','img/'];
function resolveFile(name){
  return new Promise((resolve)=>{
    let i = 0;
    function attempt(){
      if(i >= ASSET_PATHS.length){ resolve(null); return; }
      const url = ASSET_PATHS[i] + name;
      const img = new Image();
      img.onload = ()=> resolve(url);
      img.onerror = ()=> { i++; attempt(); };
      img.src = url;
    }
    attempt();
  });
}

/* ============================
   Build galleries per groups - UPDATED makeThumb
   ============================ */
const groups = {
  'group-1': {start:1,end:4, title:'Présentation de la zone d\'étude'},
  'group-2': {start:5,end:9, title:'Cirque d\'érosion'},
  'group-4': {start:11,end:12, title:'Dynamique de l\'érosion'},
  'group-6': {start:15,end:16, title:'Prédiction (2037)'}
};
const MAX_CARTES = 18;
const PHOTO_COUNT = 4;
const GRAPHE_COUNT = 3;

function makeThumb(url, label, mapId){
  const div = document.createElement('div'); 
  div.className = 'thumb';
  div.title = `Agrandir l'image : ${label}`; 
  
  const img = document.createElement('img'); 
  img.src = url; 
  img.alt = label;
  img.onerror = ()=> { img.src = placeholderSVG('Fichier introuvable'); };
  
  const lbl = document.createElement('div'); 
  lbl.className = 'label'; 
  lbl.textContent = label;
  
  // NEW: Toggle button for dynamic layer
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'btn ghost small-toggle-btn';
  toggleBtn.textContent = 'Activer la couche';
  toggleBtn.title = `Ajouter ${label} à la carte interactive`;
  
  // New wrapper div for better layout and click management
  const content = document.createElement('div');
  content.style.padding = '5px';
  
  // Arrange elements inside the content wrapper
  content.appendChild(img);
  content.appendChild(lbl);
  content.appendChild(toggleBtn);

  div.dataset.mapId = mapId; // Store map ID for layer logic
  div.style.cursor = 'default'; // Change cursor to indicate button is the main action for dynamic view

  // Event listener for lightbox (only if click is not on the button)
  div.addEventListener('click', (e) => {
      // e.currentTarget is the thumb div
      if (e.target !== toggleBtn) {
           openLightbox(url, label);
      }
  });

  // Event listener for dynamic layer toggle
  toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent opening lightbox
      toggleLayer(mapId, toggleBtn);
  });
  
  // Clear the div and append the new structured content
  div.innerHTML = '';
  div.appendChild(content); 
  
  return div;
}

function placeholderSVG(text){
  return 'data:image/svg+xml;utf8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700"><rect width="100%" height="100%" fill="#01282d"/><text x="50%" y="50%" fill="#9ec8d2" font-family="system-ui,Arial" font-size="36" text-anchor="middle" dominant-baseline="middle">${text}</text></svg>`);
}

(async function populateCards(){
  for(const gid in groups){
    const el = document.getElementById(gid);
    const cfg = groups[gid];
    for(let i=cfg.start;i<=cfg.end;i++){
      const mapId = `carte-${i}`; // Unique ID for the map
      const filename = `carte${i}.jpg`;
      const url = await resolveFile(filename);
      if(url) el.appendChild(makeThumb(url, `Carte ${i} - ${cfg.title}`, mapId)); // Pass mapId
      else {
        const ph = document.createElement('div'); ph.className='thumb';
        ph.title = `Fichier carte attendu : ${filename}`;
        ph.innerHTML = `<div class="placeholder small">Fichier attendu: <strong>${filename}</strong></div>`;
        el.appendChild(ph);
      }
    }
  }
  for(let i=17;i<=MAX_CARTES;i++){
    const filename = `carte${i}.jpg`;
    const url = await resolveFile(filename);
    if(url){
      const last = document.querySelector('#group-6');
      if(last) last.appendChild(makeThumb(url, `Carte ${i} - Prédiction`, `carte-${i}`));
    }
  }
  const photoGrid = document.getElementById('photos-grid');
  for(let i=1;i<=PHOTO_COUNT;i++){
    const filename = `photo${i}.jpg`;
    const url = await resolveFile(filename);
    if(url) photoGrid.appendChild(makeThumb(url, `Photo ${i} de terrain`, `photo-${i}`)); // Added placeholder mapId
    else { 
      const ph=document.createElement('div'); ph.className='thumb'; 
      ph.title = `Fichier photo attendu : ${filename}`; 
      ph.innerHTML=`<div class="placeholder small">Fichier attendu: ${filename}</div>`; photoGrid.appendChild(ph); 
    }
  }
  const gcont = document.getElementById('graphs');
  for(let i=1;i<=GRAPHE_COUNT;i++){
    const filename = `graphe${i}.png`;
    const url = await resolveFile(filename);
    if(url){
      const wrapper = document.createElement('div'); wrapper.className='card';
      const title = document.createElement('div'); title.className='small'; title.style.marginBottom='8px';
      let titleText;
      if(i===1) titleText = 'Graphe 1 — 1990–1997';
      if(i===2) titleText = 'Graphe 2 — 2000–2007';
      if(i===3) titleText = 'Graphe 3 — 2010–2017';
      title.textContent = titleText;
      const img = document.createElement('img'); img.src=url; img.alt=`Graphe ${i}`; img.style.width='100%'; img.style.borderRadius='8px';
      wrapper.title = titleText; 
      wrapper.appendChild(title); wrapper.appendChild(img); gcont.appendChild(wrapper);
    } else {
      const missing = document.createElement('div'); missing.className='card small'; missing.textContent = `Fichier attendu: ${filename}`; gcont.appendChild(missing);
    }
  }
})();

/* ============================
   Lightbox logic
   ============================ */
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lb-image');
const lbMeta = document.getElementById('lb-meta');
document.getElementById('lb-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e=> { if(e.target === lightbox) closeLightbox(); });
function openLightbox(src, meta){ lbImage.src = src; lbMeta.textContent = meta || ''; lightbox.classList.add('show'); lightbox.setAttribute('aria-hidden','false'); }
function closeLightbox(){ lightbox.classList.remove('show'); lightbox.setAttribute('aria-hidden','true'); lbImage.src=''; lbMeta.textContent=''; }

/* ============================
   Leaflet map (OpenStreetMap) - AMÉLIORÉ
   ============================ */
const map = L.map('map').setView([-4.78,11.86],13); // ZOOM PLUS PROCHE
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  maxZoom:19, 
  attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  className: 'osm-tiles' // Pour personnaliser le style si besoin
}).addTo(map);

/* polygon coordinates (lat,lng) for example zone */
const polygonCoords = [
  [-4.785,11.84],
  [-4.785,11.90],
  [-4.758,11.90],
  [-4.758,11.84]
];
const zone = L.polygon(polygonCoords, {
  color: '#00d9ff', 
  weight: 2, 
  fillOpacity: 0.12, 
  title: "Périmètre d'étude actuel (2024)"
}).addTo(map);

// Ajuster la vue pour bien voir toutes les couches prédictives
const bounds = L.latLngBounds([
  [-4.79, 11.84], // Sud-ouest
  [-4.75, 11.92]  // Nord-est
]);
map.fitBounds(bounds, {padding: [20,20]});

/* observation markers */
const observations = [
  {lat:-4.775, lng:11.865, title:'Station A — plage', img:'photo1.jpg'},
  {lat:-4.772, lng:11.87, title:'Station B — mangrove', img:'photo2.jpg'}
];
observations.forEach(async o=>{
  const url = await resolveFile(o.img);
  const marker = L.marker([o.lat,o.lng], {
    title: `Point d'observation : ${o.title}`,
    icon: L.divIcon({
      className: 'custom-marker',
      html: '📍',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    })
  }).addTo(map); 
  if(url) marker.bindPopup(`<strong>${o.title}</strong><br/><img src="${url}" alt="${o.title}" style="max-width:200px;border-radius:6px;margin-top:6px">`);
  else marker.bindPopup(`<strong>${o.title}</strong>`);
});

/* map controls */
document.getElementById('fit-extent').addEventListener('click', ()=> map.fitBounds(bounds,{padding:[30,30]}));

/* Dynamic Trait de Côte logic */
let currentCoastline = '2024';
document.getElementById('toggle-coastline').addEventListener('click', ()=> {
  const btn = document.getElementById('toggle-coastline');
  if(currentCoastline === '2024'){
    zone.setStyle({color: '#ff9a3c', fillOpacity: 0.08, dashArray: '5, 5'});
    zone.options.title = "Simulation : Trait de Côte 2000 (recul visible)"; 
    map.removeLayer(zone); 
    map.addLayer(zone);
    btn.textContent = 'Afficher Vue Actuelle (2024)';
    currentCoastline = '2000';
  } else {
    zone.setStyle({color: '#00d9ff', fillOpacity: 0.12, dashArray: ''});
    zone.options.title = "Périmètre d'étude actuel (2024)"; 
    map.removeLayer(zone);
    map.addLayer(zone);
    btn.textContent = 'Voir Trait de Côte Historique (2000)';
    currentCoastline = '2024';
  }
});

document.getElementById('download-geojson').addEventListener('click', ()=> {
  const geo = { type:'FeatureCollection', features:[{type:'Feature', properties:{name:'Zone Côtiere de POINTE-Noire'}, geometry:{type:'Polygon', coordinates: [ polygonCoords.map(c => [c[1], c[0]]) ]}}]};
  const blob = new Blob([JSON.stringify(geo,null,2)], {type:'application/geo+json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'zone_cotiere_pointe_noire.geojson'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});

/* ============================
   COUCHES PRÉDICTIVES & INTERACTION SAP - AMÉLIORÉES
   ============================ */

const ZONES_DATA = {
    exposed: {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            properties: { 
                name: 'Zone Exposée/Alerte SAP', 
                type: 'Exposed',
                description: 'Zone critique actuelle - Activité érosive maximale - Alerte SAP active'
            },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [11.855, -4.780], [11.868, -4.778], [11.872, -4.774], 
                    [11.870, -4.770], [11.860, -4.772], [11.855, -4.780]
                ]]
            }
        }]
    },
    unconstructible: {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            properties: { 
                name: 'Zone Inconstructible (2037)', 
                type: 'Unconstructible',
                description: 'Aléa Fort / Recul littoral 2037 - Limite d\'urbanisation réglementaire'
            },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [11.852, -4.782], [11.875, -4.782], [11.878, -4.768], 
                    [11.872, -4.762], [11.850, -4.768], [11.852, -4.782]
                ]]
            }
        }]
    },
    reforest: {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            properties: { 
                name: 'Zone à Reboiser (Mangrove)', 
                type: 'Reforest',
                description: 'Priorité pour les solutions fondées sur la nature - Restauration écologique'
            },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [11.878, -4.772], [11.888, -4.772], [11.888, -4.762], 
                    [11.878, -4.762], [11.878, -4.772]
                ]]
            }
        }]
    }
};

let exposedLayer, unconstructibleLayer, reforestLayer;

function loadPredictiveLayers() {
    // Zone à Reboiser (Mangrove) - VERT
    reforestLayer = L.geoJSON(ZONES_DATA.reforest, {
        style: { 
            color: '#6ef2c5', 
            weight: 3, 
            fillOpacity: 0.4, 
            fillColor: '#6ef2c5',
            opacity: 0.9
        },
        onEachFeature: (feature, layer) => {
            layer.bindPopup(`
                <div style="max-width:250px">
                    <strong style="color:#6ef2c5">${feature.properties.name}</strong><br/>
                    <small>${feature.properties.description}</small><br/><br/>
                    <em>Solution : Reboisement de mangroves</em>
                </div>
            `);
        }
    }).addTo(map);
    reforestLayer.getLayers().forEach(l => l.options.title = "Zone à Reboiser : Intervention Mangrove"); 

    // Zone Inconstructible (2037) - GRIS
    unconstructibleLayer = L.geoJSON(ZONES_DATA.unconstructible, {
        style: { 
            color: '#585858', 
            weight: 2, 
            fillOpacity: 0.3, 
            fillColor: '#585858', 
            dashArray: '6, 6',
            opacity: 0.8
        },
        onEachFeature: (feature, layer) => {
            layer.bindPopup(`
                <div style="max-width:250px">
                    <strong style="color:#585858">${feature.properties.name}</strong><br/>
                    <small>${feature.properties.description}</small><br/><br/>
                    <em>Prédiction 2037 - Limite réglementaire</em>
                </div>
            `);
        }
    }).addTo(map);
    unconstructibleLayer.getLayers().forEach(l => l.options.title = "Zone Inconstructible : Limite 2037"); 

    // Zone Exposée/Alerte SAP - ORANGE/ROUGE
    exposedLayer = L.geoJSON(ZONES_DATA.exposed, {
        style: { 
            color: '#ff9a3c', 
            weight: 3, 
            opacity: 0.9, 
            fillOpacity: 0.25, 
            fillColor: '#ff9a3c' 
        },
        onEachFeature: (feature, layer) => {
            layer.bindPopup(`
                <div style="max-width:250px">
                    <strong style="color:#ff9a3c">${feature.properties.name}</strong><br/>
                    <small>${feature.properties.description}</small><br/><br/>
                    <em>Système d'Alerte Précoce actif</em>
                </div>
            `);
        }
    }).addTo(map);
    exposedLayer.getLayers().forEach(l => l.options.title = "Zone Exposée : Alerte SAP actuelle"); 

    // Réorganiser l'ordre des couches pour une meilleure visibilité
    map.removeLayer(zone);
    map.addLayer(zone);
    
    // Mettre les couches prédictives au premier plan
    exposedLayer.bringToFront();
    unconstructibleLayer.bringToFront();
    reforestLayer.bringToFront();
}

loadPredictiveLayers();

function updateSAPAlert(){
    const centralPanel = document.getElementById('alertes-centrale');
    const centralStatus = document.getElementById('central-alert-status');
    const centralSMSInfo = document.getElementById('central-sms-info');
    const now = new Date();
    const hour = now.getHours();
    
    let tideHigh = false;
    // Simulation de marée haute entre 8h-10h et 20h-22h
    if((hour >= 8 && hour < 10) || (hour >= 20 && hour < 22)){
        tideHigh = true;
    }
    
    let alertStatusText, smsInfoText;

    if(tideHigh){
        centralPanel.classList.add('critical');
        centralStatus.innerHTML = '🚨 **ALERTE ROUGE : PLEINE MER CRITIQUE / INONDATION !**';
        centralStatus.style.color = 'var(--danger-red)';
        centralStatus.querySelector('.kicker-detail').textContent = '⚠️ ÉVACUATION IMMÉDIATE. La zone à risque est surlignée en ROUGE VIF sur la carte !';
        smsInfoText = '📢 **URGENT :** Alerte SMS envoyée aux abonnés Airtel et MTN Congo. Répondez "STOP" pour vous désabonner.';
        
        if(exposedLayer) {
            exposedLayer.setStyle({ 
                color: 'var(--danger-red)', 
                weight: 4, 
                opacity: 1, 
                fillOpacity: 0.6, 
                fillColor: 'var(--danger-red)'
            }).bringToFront();
        }
    } else {
        centralPanel.classList.remove('critical');
        centralStatus.innerHTML = '⚠️ **Niveau d\'Alerte : MODÉRÉ**<span class="kicker-detail">Érosion active sur le Cirque. Suivi des grandes marées en cours.</span>';
        centralStatus.style.color = '#ff9a3c';
        smsInfoText = '✅ Veille active. Notification SMS par Airtel/MTN Congo en cas d\'urgence ROUGE.';
        
        if(exposedLayer) {
             exposedLayer.setStyle({ 
                color: '#ff9a3c', 
                weight: 3, 
                opacity: 0.9, 
                fillOpacity: 0.25, 
                fillColor: '#ff9a3c' 
            });
        }
    }
    centralSMSInfo.innerHTML = smsInfoText;
}

updateSAPAlert();
setInterval(updateSAPAlert, 5000); 

/* ============================
   DYNAMIC LAYER TOGGLE LOGIC - NEW
   ============================ */

const DYNAMIC_LAYERS_DATA = {
    'carte-15': {
        name: 'Carte 15 : Aléa Très Fort (2037)',
        type: 'geojson',
        data: ZONES_DATA.unconstructible.features[0],
        style: { color: '#e64e4e', weight: 3, fillOpacity: 0.4, fillColor: '#e64e4e', dashArray: '8, 4' },
    },
    'carte-11': {
        name: 'Carte 11 : Tendance d\'Érosion (2000-2024)',
        type: 'geojson',
        data: ZONES_DATA.exposed.features[0], 
        style: { color: '#ffb300', weight: 2, fillOpacity: 0.3, fillColor: '#ffb300' },
    },
    'carte-6': {
        name: 'Carte 6 : Solution Mangrove (Localisée)',
        type: 'geojson',
        data: ZONES_DATA.reforest.features[0], 
        style: { color: '#00cc66', weight: 3, fillOpacity: 0.5, fillColor: '#00cc66' },
    },
};

const activeDynamicLayers = {};

function toggleLayer(mapId, btn) {
    const data = DYNAMIC_LAYERS_DATA[mapId];

    if (activeDynamicLayers[mapId]) {
        // REMOVE Layer
        map.removeLayer(activeDynamicLayers[mapId]);
        delete activeDynamicLayers[mapId];
        btn.textContent = 'Activer la couche';
        btn.classList.remove('active');
    } else if (data) {
        // ADD GeoJSON Layer
        if (data.type === 'geojson') {
            const geoLayer = L.geoJSON(data.data, {
                style: data.style,
                onEachFeature: (feature, layer) => {
                    layer.bindPopup(`<strong>${data.name}</strong>`);
                }
            }).addTo(map);
            activeDynamicLayers[mapId] = geoLayer;
            
            btn.textContent = 'Désactiver la couche';
            btn.classList.add('active');
        }
        
        // Ensure the main predictive layers are always visible, so bring them to front
        if (exposedLayer) exposedLayer.bringToFront();
        if (unconstructibleLayer) unconstructibleLayer.bringToFront();
        if (reforestLayer) reforestLayer.bringToFront();

    } else {
        // Placeholder for other maps
        alert(`La couche dynamique de ${mapId} n'est pas encore implémentée pour la démo. (Veuillez essayer la Carte 6, 11 ou 15)`);
        return;
    }
    
    // Update the temporary dynamic legend
    updateDynamicLegend();
}

function updateDynamicLegend() {
    const legendContainer = document.querySelector('.map-legend');
    let tempLegend = document.getElementById('temp-dynamic-legend');
    
    // Remove existing temporary legend
    if (tempLegend) tempLegend.remove();
    
    const activeKeys = Object.keys(activeDynamicLayers);
    
    if (activeKeys.length > 0) {
        tempLegend = document.createElement('div');
        tempLegend.id = 'temp-dynamic-legend';
        tempLegend.style.marginTop = '10px';
        tempLegend.style.paddingTop = '10px';
        tempLegend.style.borderTop = '1px solid rgba(255,255,255,0.05)';
        
        activeKeys.forEach(id => {
            const layerData = DYNAMIC_LAYERS_DATA[id];
            if (layerData) {
                 const item = document.createElement('span');
                 item.className = 'legend-item';
                 item.textContent = layerData.name.split(': ')[1] || layerData.name;
                 item.style.marginRight = '12px';
                 
                 // Apply dynamic color using CSS class for the bullet point (::before)
                 const styleTag = document.createElement('style');
                 styleTag.innerHTML = `.legend-dynamic-${id}::before { background: ${layerData.style.color} !important; border-color: ${layerData.style.color} !important; }`;
                 document.head.appendChild(styleTag);
                 item.classList.add(`legend-dynamic-${id}`);
                 item.style.color = layerData.style.color; // Set text color to match
                 
                 tempLegend.appendChild(item);
            }
        });
        
        // Insert the new legend after the main map-legend block
        legendContainer.parentNode.insertBefore(tempLegend, legendContainer.nextSibling);
    }
}

/* ============================
   Simulation Tool Logic
   ============================ */
document.getElementById('mangrove-sim-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const surface = parseFloat(document.getElementById('sim-surface').value);
    const years = parseInt(document.getElementById('sim-years').value);
    const resultEl = document.getElementById('sim-result');

    const reductionCmPerYear = ((surface * 1.8) / Math.log(years + 1)).toFixed(2);
    const baselineErosion = 150; 
    let finalErosionRate = (baselineErosion - reductionCmPerYear).toFixed(1);
    if(finalErosionRate < 0) finalErosionRate = 0.0;
    const percentageReduction = ((reductionCmPerYear / baselineErosion) * 100).toFixed(1);

    resultEl.innerHTML = `
      **Résultat Modélisé (Mangroves)** :<br>
      <span style="font-size:1.5em; font-weight:900; color:var(--accent2)">${reductionCmPerYear} cm/an</span> 
      de recul évité !
      <br><span class="small-muted">
      Soit une réduction de <strong>${percentageReduction}%</strong> sur l'horizon ${years} ans.<br>
      Taux d'érosion ajusté : ${finalErosionRate} cm/an.
      </span>
    `;
    resultEl.style.display = 'block';
});

/* ============================
   GPT MINI INTEGRATION - Chatbot
   ============================ */
const chatLog = document.getElementById('chat-log');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatVoice = document.getElementById('chat-voice'); 
const roleSelect = document.getElementById('role-select');

let memory = { general:[], jury:[], experts:[], communes:[], populations:[] };

function appendMsg(who, text){
  const el = document.createElement('div'); 
  el.className = 'chat-msg ' + (who==='user'?'user':'bot'); 
  el.textContent = text;
  chatLog.appendChild(el); 
  chatLog.scrollTop = chatLog.scrollHeight;
}

function appendTyping(){
  const el = document.createElement('div'); 
  el.className = 'chat-msg bot'; 
  el.dataset.typing = '1';
  el.innerHTML = '<span class="small-muted">Notre assistant réfléchit...</span>';
  chatLog.appendChild(el); 
  chatLog.scrollTop = chatLog.scrollHeight;
  return el;
}

function replaceTyping(el, text){
  if(!el) return appendMsg('bot', text);
  el.removeAttribute('data-typing'); 
  el.innerHTML = text;
  chatLog.scrollTop = chatLog.scrollHeight;
}

function pushMemory(role, text){
  const mem = memory[role] || [];
  mem.push({text, at: new Date().toISOString()});
  if(mem.length > 3) mem.shift();
  memory[role] = mem;
}

// Fonction pour appeler l'API GPT Mini
async function callGPTMini(userMessage, role) {
    if (!GPT_CONFIG.apiKey) {
        return "⚠️ Clé API GPT Mini non configurée. Veuillez ajouter votre clé API dans le fichier script.js à la ligne GPT_CONFIG.apiKey.";
    }

    const systemPrompt = getSystemPrompt(role);
    const conversationHistory = memory[role] || [];
    
    const messages = [
        { role: "system", content: systemPrompt },
        ...conversationHistory.slice(-3).map(msg => ({ 
            role: msg.text.includes('USER') ? 'user' : 'assistant', 
            content: msg.text 
        })),
        { role: "user", content: userMessage }
    ];

    try {
        const response = await fetch(GPT_CONFIG.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GPT_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: GPT_CONFIG.model,
                messages: messages,
                max_tokens: 500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Erreur GPT Mini:', error);
        return `❌ Erreur de connexion à notre assistant: ${error.message}`;
    }
}

function getSystemPrompt(role) {
    const basePrompt = `Tu es l'assistant Real Viz pour la Zone Côtière de POINTE-Noire. Tu aides avec:
- Système d'Alerte Précoce (SAP) pour l'érosion et les inondations
- Zones prédictives 2037 (Zone Inconstructible)
- Solutions fondées sur la nature (reboisement mangroves)
- Outil de simulation d'atténuation`;

    switch(role) {
        case 'jury':
            return basePrompt + " Réponds comme pour une évaluation académique, en mettant l'accent sur la rigueur scientifique et la méthodologie.";
        case 'experts':
            return basePrompt + " Réponds avec des détails techniques sur la modélisation, les données satellitaires et les méthodes scientifiques.";
        case 'communes':
            return basePrompt + " Réponds en termes de gouvernance, planification urbaine et gestion des risques pour les collectivités.";
        case 'populations':
            return basePrompt + " Réponds simplement pour expliquer les risques et les solutions aux populations locales.";
        default:
            return basePrompt + " Réponds de manière générale et accessible.";
    }
}

async function sendChat(){
  const text = (chatInput.value||'').trim();
  if(!text) return;
  
  const role = roleSelect.value || 'general';
  appendMsg('user', text);
  pushMemory(role, text);
  chatInput.value = '';
  
  const typingEl = appendTyping();
  chatSend.disabled = true;

  try {
    const reply = await callGPTMini(text, role);
    replaceTyping(typingEl, reply);
    pushMemory(role, reply);
  } catch (error) {
    replaceTyping(typingEl, `❌ Erreur: ${error.message}`);
  } finally {
    chatSend.disabled = false;
  }
}

chatSend.addEventListener('click', sendChat);
chatInput.addEventListener('keydown', e=> { if(e.key === 'Enter') sendChat(); });

document.getElementById('chat-voice').addEventListener('click', () => {
    const micBtn = document.getElementById('chat-voice');
    const inputEl = document.getElementById('chat-input');
    
    if(micBtn.classList.contains('recording')){
        micBtn.textContent = '🎤';
        micBtn.style.background = 'transparent';
        micBtn.classList.remove('recording');
        
        const simulatedText = "Corrélation entre pluies et érosion?";
        inputEl.value = simulatedText;
        appendMsg('bot', `Transcription vocale simulée : "${simulatedText}"`);
        inputEl.focus();
    } else {
        micBtn.textContent = '🔴';
        micBtn.style.background = 'var(--danger-red)';
        micBtn.classList.add('recording');
        
        appendMsg('bot', "Je vous écoute... (Simulation de la capture vocale. Cliquez à nouveau pour arrêter et transcrire.)");
    }
});

document.getElementById('chat-export').addEventListener('click', ()=> {
  const nodes = chatLog.querySelectorAll('.chat-msg');
  const lines = [];
  nodes.forEach(n => {
    const who = n.classList.contains('user') ? 'USER' : 'BOT';
    const t = n.textContent.trim();
    if(t && n.dataset.typing !== '1') lines.push(`[${who}] ${t}`);
  });
  if(lines.length === 0) return alert('Aucun message à exporter.');
  const blob = new Blob([lines.join('\n\n')], {type:'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'chat_realviz_'+new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')+'.txt'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});

document.getElementById('download-climat').addEventListener('click', ()=> {
  const data = "Analyse Climat Pointe-Noire (Données Simulées / Basées sur Graphes Ombrothermiques)\n\n" +
               "Période,Précipitations Moyennes (mm/an),Températures Moyennes (°C),Tendance Érosion (Qualitatif)\n" +
               "1990-1997,1250,25.5,Faible à Modérée\n" +
               "2000-2007,1380,26.1,Modérée\n" +
               "2010-2017,1450,26.8,Forte\n\n" +
               "Corrélation : Tendance positive entre l'augmentation des précipitations et l'accélération de l'érosion et du risque d'inondation.";
  const blob = new Blob([data], {type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'climat_erosion_simulee.csv'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});

document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const phone = document.getElementById('reg-phone').value;
    const operator = document.getElementById('reg-operator').value;
    const prenom = document.getElementById('reg-nom').value;
    const messageEl = document.getElementById('reg-message');
    
    if(phone && operator !== "" && phone.match(/^[0-9]{8,10}$/)){
        messageEl.textContent = `Merci ${prenom.split(' ')[0] || ''}! Votre N° (${operator.toUpperCase()}) est enregistré pour les alertes SMS critiques. Vous recevrez une alerte en cas de risque d'érosion ou d'inondation.`;
        messageEl.style.display = 'block';
        messageEl.style.background = '#007a98'; messageEl.style.color = '#eaffff';
        setTimeout(() => { messageEl.style.display = 'none'; e.target.reset(); }, 5000);
    } else {
        messageEl.textContent = `Veuillez vérifier votre numéro et sélectionner un opérateur.`;
        messageEl.style.display = 'block';
        messageEl.style.background = '#f06a6a';
        messageEl.style.color = '#1a0303';
        setTimeout(() => { messageEl.style.display = 'none'; }, 3000);
    }
});

document.getElementById('import-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('doc-file');
    const messageEl = document.getElementById('import-message');
    if(fileInput.files.length > 0){
        const fileName = fileInput.files[0].name;
        messageEl.textContent = `Fichier "${fileName}" envoyé pour modération. Merci de votre contribution !`;
        messageEl.style.display = 'block';
        e.target.reset();
        setTimeout(() => { messageEl.style.display = 'none'; }, 5000);
    } else {
        messageEl.textContent = `Veuillez sélectionner un fichier à importer.`;
        messageEl.style.display = 'block';
        messageEl.style.background = '#f06a6a';
        messageEl.style.color = '#1a0303';
        setTimeout(() => { messageEl.style.display = 'none'; messageEl.style.background = '#007a98'; messageEl.style.color = '#eaffff'; }, 3000);
    }
});

/* ============================
   EFFET VAGUES OCÉAN PROFESSIONNEL
   ============================ */

// Créer les vagues océaniques
function createOceanWaves() {
    const body = document.body;
    
    // Container pour les vagues
    const wavesContainer = document.createElement('div');
    wavesContainer.className = 'ocean-waves';
    
    // Créer 3 couches de vagues
    for (let i = 0; i < 3; i++) {
        const wave = document.createElement('div');
        wave.className = 'wave';
        wavesContainer.appendChild(wave);
    }
    
    // Container pour les particules
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'ocean-particles';
    
    // Créer les particules flottantes
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Position aléatoire
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Taille aléatoire
        const size = Math.random() * 8 + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Délai d'animation aléatoire
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        particlesContainer.appendChild(particle);
    }
    
    // Effet de brillance
    const shimmer = document.createElement('div');
    shimmer.className = 'ocean-shimmer';
    
    // Ajouter tous les éléments au body
    body.appendChild(wavesContainer);
    body.appendChild(particlesContainer);
    body.appendChild(shimmer);
}

// Effet de parallaxe pour les vagues
function initParallaxEffect() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const waves = document.querySelectorAll('.wave');
        
        waves.forEach((wave, index) => {
            const speed = (index + 1) * 0.5;
            const yPos = -(scrolled * speed);
            wave.style.transform = `translateX(0) translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Effet de bulles océaniques interactives
function createInteractiveBubbles() {
    const bubblesContainer = document.createElement('div');
    bubblesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(bubblesContainer);
    
    // Créer des bulles au clic
    document.addEventListener('click', (e) => {
        if (Math.random() > 0.7) { // 30% de chance
            createBubble(e.clientX, e.clientY, bubblesContainer);
        }
    });
    
    // Créer des bulles automatiques
    setInterval(() => {
        if (Math.random() > 0.8) { // 20% de chance
            const x = Math.random() * window.innerWidth;
            const y = window.innerHeight + 50;
            createBubble(x, y, bubblesContainer);
        }
    }, 2000);
}

function createBubble(x, y, container) {
    const bubble = document.createElement('div');
    bubble.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${Math.random() * 20 + 10}px;
        height: ${Math.random() * 20 + 10}px;
        background: radial-gradient(circle, rgba(0,217,255,0.4) 0%, rgba(0,217,255,0.1) 70%, transparent 100%);
        border-radius: 50%;
        pointer-events: none;
        animation: bubble-rise 4s ease-out forwards;
    `;
    
    // Ajouter l'animation CSS
    if (!document.querySelector('#bubble-animation')) {
        const style = document.createElement('style');
        style.id = 'bubble-animation';
        style.textContent = `
            @keyframes bubble-rise {
                0% {
                    transform: translateY(0) scale(0);
                    opacity: 0.8;
                }
                50% {
                    transform: translateY(-100px) scale(1);
                    opacity: 0.6;
                }
                100% {
                    transform: translateY(-300px) scale(0.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    container.appendChild(bubble);
    
    // Supprimer la bulle après l'animation
    setTimeout(() => {
        if (bubble.parentNode) {
            bubble.parentNode.removeChild(bubble);
        }
    }, 4000);
}

// Effet de reflet océanique sur les cartes
function addOceanReflection() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        
        // Créer un reflet
        const reflection = document.createElement('div');
        reflection.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
                45deg,
                transparent 0%,
                rgba(0,217,255,0.05) 25%,
                transparent 50%,
                rgba(0,217,255,0.03) 75%,
                transparent 100%
            );
            pointer-events: none;
            animation: ocean-reflection 8s ease-in-out infinite;
        `;
        
        card.appendChild(reflection);
    });
    
    // Ajouter l'animation CSS
    if (!document.querySelector('#reflection-animation')) {
        const style = document.createElement('style');
        style.id = 'reflection-animation';
        style.textContent = `
            @keyframes ocean-reflection {
                0%, 100% {
                    opacity: 0;
                    transform: translateX(-100%);
                }
                50% {
                    opacity: 1;
                    transform: translateX(100%);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialiser tous les effets océaniques
function initOceanEffects() {
    createOceanWaves();
    initParallaxEffect();
    createInteractiveBubbles();
    
    // Attendre que le DOM soit chargé pour les reflets
    setTimeout(() => {
        addOceanReflection();
    }, 1000);
}

// Message d'accueil au chargement
setTimeout(()=> appendMsg('bot', "Bonjour — je suis l'assistant Real Viz. Choisis un rôle pour une réponse adaptée et pose ta question. Essaie la nouvelle fonction vocale !"), 300);

// Initialiser les effets océaniques au chargement
document.addEventListener('DOMContentLoaded', initOceanEffects);
