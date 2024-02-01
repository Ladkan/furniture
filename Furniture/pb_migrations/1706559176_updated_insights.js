/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yye3a4vl151q7t6")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, COUNT(o.total) as paid, COUNT(c.id) as messages from orders as o INNER JOIN contact as c"
  }

  // remove
  collection.schema.removeField("dfottbrd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dpqicb29",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "meaqfnlh",
    "name": "messages",
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
    "query": "SELECT (ROW_NUMBER() OVER()) as id, COUNT(o.total) as paid from orders as o where o.status = 'paid'"
  }

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

  // remove
  collection.schema.removeField("dpqicb29")

  // remove
  collection.schema.removeField("meaqfnlh")

  return dao.saveCollection(collection)
})
