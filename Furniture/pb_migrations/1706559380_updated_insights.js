/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yye3a4vl151q7t6")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, COUNT(o.total) as paid, COUNT(c.firstname) as messages, COUNT(o.total) as total from orders as o INNER JOIN contact as c"
  }

  // remove
  collection.schema.removeField("rvlhc8qv")

  // remove
  collection.schema.removeField("yfcfwieq")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yye3a4vl151q7t6")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, COUNT(o.total) as paid, COUNT(c.firstname) as messages from orders as o INNER JOIN contact as c"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rvlhc8qv",
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
    "id": "yfcfwieq",
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

  // remove
  collection.schema.removeField("inmrm79d")

  // remove
  collection.schema.removeField("oxxqfbwq")

  // remove
  collection.schema.removeField("ybxj1gq5")

  return dao.saveCollection(collection)
})
