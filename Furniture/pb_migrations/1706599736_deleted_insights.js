/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("yye3a4vl151q7t6");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "yye3a4vl151q7t6",
    "created": "2024-01-29 20:10:26.264Z",
    "updated": "2024-01-29 20:40:43.634Z",
    "name": "insights",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bg856w1g",
        "name": "paid",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT (ROW_NUMBER() OVER()) as id, COUNT(o.total) as paid from orders as o"
    }
  });

  return Dao(db).saveCollection(collection);
})
