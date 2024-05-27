// app.js 

const express = require("express"); 
const bodyParser = require("body-parser"); 
const crypto = require("crypto");

const app = express(); 
const PORT = 3000; 

// Middleware pour parser les corps JSON 
app.use(bodyParser.json()); 

// Secret partagé (même que celui utilisé sur GitHub)
const secret = 'votre_secret_partage';

// Fonction pour vérifier la signature
function verifySignature(req, res, buf, encoding) {
  const signature = req.headers['x-hub-signature-256'];
  if (!signature) {
    throw new Error('No signature found on request');
  }
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(buf);
  const digest = 'sha256=' + hmac.digest('hex');
  if (signature !== digest) {
    throw new Error('Signatures do not match');
  }
}

// Middleware pour vérifier la signature
app.use(bodyParser.json({ verify: verifySignature }));

// Point de terminaison du webhook 
app.post("/webhook", (req, res) => { 
  const event = req.body; 
  
  // Traitement de l'événement 
  console.log("Received event:", event); 
  
  // Exemple : Gérer différents types d'événements 
  if (event.type === "push") { 
    console.log("Push event received:", event); 
    // Effectuer des actions pour l'événement push
    // Exemple : Pull du dépôt et build
  } 
  
  // Répondre pour accuser réception de l'événement 
  res.status(200).send("Event received"); 
}); 

// Démarrer le serveur 
app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`); 
});
