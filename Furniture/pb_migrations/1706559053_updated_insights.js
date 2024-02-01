/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yye3a4vl151q7t6")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, COUNT(o.total) as paid from orders as o where o.status = 'paid'"
  }

  // remove
  collection.schema.removeField("brduq4kw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dfottbrd",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yye3a4vl151q7t6")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, COUNT(o.total) as paid from orders as o where o.status = \"paid\""
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "brduq4kw",
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
  }))

  // remove
  collection.schema.removeField("dfottbrd")

  return dao.saveCollection(collection)
})
