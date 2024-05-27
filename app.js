// app.js 

const express = require("express"); 
const bodyParser = require("body-parser"); 

const app = express(); 
const PORT = 3000; 

// Middleware pour parser les corps JSON 
app.use(bodyParser.json()); 

// Point de terminaison du webhook 
app.post("/webhook", (req, res) => { 
  const event = req.body; 
  
  // Traitement de l'événement 
  console.log("Received event:", event); 
  
  // Exemple : Gérer différents types d'événements 
  if (event.type === "user.signup") { 
    console.log("New user signup:", event.data); 
    // Effectuer des actions pour une nouvelle inscription d'utilisateur 
  } else if (event.type === "order.placed") { 
    console.log("Order placed:", event.data); 
    // Effectuer des actions pour une commande passée 
  } 
  
  // Répondre pour accuser réception de l'événement 
  res.status(200).send("Event received"); 
}); 

// Démarrer le serveur 
app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`); 
}); 
