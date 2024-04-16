const path = require("path");
const fs = require("fs");
const db = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../config/", "db.json"))
);

game = (req, res) => {
  res.render("game");
};

getScore = (req, res) => {
  res.render("score", { score: db });
};

play = (req, res) => {
  const action = req.params.action;
  const choices = ["pierre", "feuille", "ciseaux"];
  let random = choices[Math.floor(Math.random() * choices.length)];
  if (action === random) {
    db.tie += 1;
    fs.writeFileSync(
      path.join(__dirname, "../config/", "db.json"),
      JSON.stringify(db)
    );
    res.send(`Vous avez joué ${action}, le bot a joué ${random}. Egalité !`);
  } else if (
    (action === "feuille" && random === "pierre") ||
    (action === "pierre" && random === "ciseaux") ||
    (action === "ciseaux" && random === "feuille")
  ) {
    db.win += 1;
    fs.writeFileSync(
      path.join(__dirname, "../config/", "db.json"),
      JSON.stringify(db)
    );
    res.send(`Vous avez joué ${action}, le bot a joué ${random}. Victoire !`);
  } else {
    db.lose += 1;
    fs.writeFileSync(
      path.join(__dirname, "../config/", "db.json"),
      JSON.stringify(db)
    );
    res.send(`Vous avez joué ${action}, le bot a joué ${random}. Défaite !`);
  }
};

edit = (req, res) => {
  db.win = req.params.win ?? db.win;
  db.lose = req.params.lose ?? db.lose;
  db.tie = req.params.tie ?? db.tie;
  fs.writeFileSync(
    path.join(__dirname, "../config/", "db.json"),
    JSON.stringify(db)
  );
  res.redirect("/game/score");
};

destroy = (req, res) => {
  db.win = 0;
  db.lose = 0;
  db.tie = 0;
  fs.writeFileSync(
    path.join(__dirname, "../config/", "db.json"),
    JSON.stringify(db)
  );
  res.send("Suppression effectué");
};

module.exports = { game, getScore, play, edit, destroy };
