module.exports = (peoples, place, thing, souvenirs) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="/style.css" />
      <title>Acme People, Places and Things</title>
  </head>
  <body>
    <h1>Acme People, Places and Things</h1>
    <h2>People</h2>
    <ul>
      ${peoples.map(people => {
        return `<li> ${people.name} </li>`
      }).join('')}
    </ul>
    <h2>Places</h2>
    <ul>
      ${place.map(places => {
        return `<li> ${places.name} </li>`
      }).join('')}
    </ul>
    <h2>Things</h2>
    <ul>
      ${thing.map(things => {
        return `<li> ${things.name} </li>`
      }).join('')}
    </ul>
    <h2>Souvenir Purchases</h2>
    <p>Create a new Souvenir Purchase by selecting a Person, the Place they purchased the souvenir, and the Thing they bought.</p>
    <form method='POST'>
    <label for='personId'>Person</label>
    <select name='personId'>
      ${
        peoples.map( person => {
          return `
            <option value=${person.id}>
              ${ person.name }
            </option>
          `;
        }).join('')
      }
    </select>
    <label for='placeId'>Place</label>
    <select name='placeId'>
      ${
        place.map( places => {
          return `
            <option value=${places.id}>
              ${ places.name }
            </option>
          `;
        }).join('')
      }
    </select>
    <label for='thingId'>Thing</label>
    <select name='thingId'>
      ${
        thing.map( things => {
          return `
            <option value=${things.id}>
              ${ things.name }
            </option>
          `;
        }).join('')
      }
    </select>
    <button>Create</button>
  </form>
    <ul>
      ${souvenirs
        .map(({ id, person, place, thing }) => {
          return `
          <li>${person.name} purchased a ${thing.name} in ${place.name}</li>
          <form method='POST' action='/${id}?_method=DELETE'>
          <button>
          Delete
          </button>
          </form>
          `;
         })
        .join("")}
    </ul>
  </body>
  `;
};