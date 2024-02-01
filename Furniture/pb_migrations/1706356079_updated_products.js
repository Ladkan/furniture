/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tzhdd90cmxm5hfx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5cltje1u",
    "name": "promote",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tzhdd90cmxm5hfx")

  // remove
  collection.schema.removeField("5cltje1u")

  return dao.saveCollection(collection)
})
