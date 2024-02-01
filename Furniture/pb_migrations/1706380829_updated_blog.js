/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qi5sly9u705xmrt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gxsgrsa2",
    "name": "cover",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qi5sly9u705xmrt")

  // remove
  collection.schema.removeField("gxsgrsa2")

  return dao.saveCollection(collection)
})
