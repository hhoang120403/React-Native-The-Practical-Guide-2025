import * as SQLite from "expo-sqlite";

import { Place } from "../models/place";

const database = SQLite.openDatabaseSync("places.db");

export function init() {
  return database.runAsync(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        )
    `);
}

export function insertPlace(place) {
  return database.runAsync(
    `
            INSERT INTO places (title, imageUri, address, lat, lng)
            VALUES (?, ?, ?, ?, ?)
        `,
    [
      place.title,
      place.imageUri,
      place.address[0].formattedAddress,
      place.location.lat,
      place.location.lng,
    ]
  );
}

export async function fetchPlaces() {
  const result = await database.getAllAsync("SELECT * FROM places");

  const places = [];

  for (const dp of result) {
    places.push(
      new Place(
        dp.title,
        dp.imageUri,
        {
          address: dp.address,
          lat: dp.lat,
          lng: dp.lng,
        },
        dp.id
      )
    );
  }

  return places;
}

export async function fetchPlaceDetails(id) {
  const dbPlace = await database.getFirstAsync(
    "SELECT * FROM places WHERE id = ?",
    [id]
  );
  const place = new Place(
    dbPlace.title,
    dbPlace.imageUri,
    { lat: dbPlace.lat, lng: dbPlace.lng, address: dbPlace.address },
    dbPlace.id
  );

  return place;
}
