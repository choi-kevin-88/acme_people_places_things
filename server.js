const express = require("express");
const override = require("method-override");
const app = express();
const {db, People, Places, Things, Souvenir} = require('./api/db');
const getHTMLPage = require("./views/getHTML");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(override("_method"));

app.get('/', async (req, res, next) => {
  try {
    const [peoples, place, thing, souvenirs] = await Promise.all([
      People.findAll(),
      Places.findAll(),
      Things.findAll(),
      Souvenir.findAll({
        include: [
          {
            model: People,
            attributes: ['name'],
          },
          {
            model: Places,
            attributes: ['name'],
          },
          {
            model: Things,
            attributes: ['name'],
          },
        ]
      })
    ])
    res.send(getHTMLPage(peoples, place, thing, souvenirs));
  } catch (error) {
    next(error);
  }
})

app.post("/", async (req, res) => {
  try {
    await Souvenir.create(req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.delete('/:id', async (req, res) => {
  try {
    const delSouvenir = await Souvenir.findByPk(req.params.id);
    await delSouvenir.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`);
});

module.exports = app;