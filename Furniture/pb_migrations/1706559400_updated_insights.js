/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yye3a4vl151q7t6")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, COUNT(o.total) as paid, COUNT(c.firstname) as messages, MAX(o.total) as total from orders as o INNER JOIN contact as c"
  }

  // remove
  collection.schema.removeField("inmrm79d")

  // remove
  collection.schema.removeField("oxxqfbwq")

  // remove
  collection.schema.removeField("ybxj1gq5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p6kqlnvk",
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
    "id": "bygahwlb",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8g2r2ys5",
    "name": "total",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yye3a4vl151q7t6")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, COUNT(o.total) as paid, COUNT(c.firstname) as messages, COUNT(o.total) as total from orders as o INNER JOIN contact as c"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "inmrm79d",
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
    "id": "oxxqfbwq",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ybxj1gq5",
    "name": "total",
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
  collection.schema.removeField("p6kqlnvk")

  // remove
  collection.schema.removeField("bygahwlb")

  // remove
  collection.schema.removeField("8g2r2ys5")

  return dao.saveCollection(collection)
})
