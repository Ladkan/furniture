/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("l17ughzmc5die0o");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "l17ughzmc5die0o",
    "created": "2024-01-27 18:34:46.443Z",
    "updated": "2024-01-27 18:35:25.197Z",
    "name": "view_products",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vetauvag",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "n9tdbr5p",
        "name": "image",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ya6u4ifs",
        "name": "price",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "d4jcltzj",
        "name": "promote",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id, name, image, price, promote From products"
    }
  });

  return Dao(db).saveCollection(collection);
})
