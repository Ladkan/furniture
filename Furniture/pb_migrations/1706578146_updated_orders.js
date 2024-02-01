/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iy03oht7ea0i8rd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "otawwku5",
    "name": "shipping_status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "shipping",
        "deliverd",
        "processing",
        "canceled"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iy03oht7ea0i8rd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "otawwku5",
    "name": "shipping_status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "shipping",
        "deliverd",
        "processing"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
