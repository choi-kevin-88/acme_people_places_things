const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/acme_people_places_things', {
  logging: false,});

const {STRING} = Sequelize;

const People = db.define('person', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  }
});

const Places = db.define('place', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  }
});

const Things = db.define('thing', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  }
});

const Souvenir = db.define('souvenir', {
})

People.hasMany(Souvenir);
Places.hasMany(Souvenir);
Things.hasMany(Souvenir);
Souvenir.belongsTo(People);
Souvenir.belongsTo(Places);
Souvenir.belongsTo(Things);


const syncAndSeed = async () => {
  await db.sync({force: true});
  const [moe, larry, lucy, ethyl] = await Promise.all([
    People.create({name: 'moe'}),
    People.create({name: 'larry'}),
    People.create({name: 'lucy'}),
    People.create({name: 'ethly'}),
  ]);

  const [paris, nyc, chicago, london] = await Promise.all([
    Places.create({name: 'paris'}),
    Places.create({name: 'nyc'}),
    Places.create({name: 'chicago'}),
    Places.create({name: 'london'}),
  ]);

  const [hat, bag, shirt, cup] = await Promise.all([
    Things.create({name: 'hat'}),
    Things.create({name: 'bag'}),
    Things.create({name: 'shirt'}),
    Things.create({name: 'cup'}),
  ]);

  await Promise.all([
    Souvenir.create({
      personId: moe.id,
      placeId: london.id,
      thingId: hat.id,
   }),
   Souvenir.create({
    personId: moe.id,
    placeId: paris.id,
    thingId: bag.id,
  }),
  Souvenir.create({
    personId: ethyl.id,
    placeId: nyc.id,
    thingId: shirt.id,
  }),
  ])
}

const init = async () => {
  try {
    await db.authenticate();
    syncAndSeed();
  } catch (error) {
    console.log(error)

  }
}

init();

module.exports = {
  People,
  Places,
  Things,
  Souvenir,
  db
}