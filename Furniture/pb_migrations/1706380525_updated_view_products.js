/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l17ughzmc5die0o")

  collection.options = {
    "query": "SELECT id, name, image, price, promote From products"
  }

  // remove
  collection.schema.removeField("vr50pvps")

  // remove
  collection.schema.removeField("2qfe5ilk")

  // remove
  collection.schema.removeField("bvg61x3n")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d4jcltzj",
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
  const collection = dao.findCollectionByNameOrId("l17ughzmc5die0o")

  collection.options = {
    "query": "SELECT id, name, image, price From products"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vr50pvps",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2qfe5ilk",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bvg61x3n",
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
  }))

  // remove
  collection.schema.removeField("vetauvag")

  // remove
  collection.schema.removeField("n9tdbr5p")

  // remove
  collection.schema.removeField("ya6u4ifs")

  // remove
  collection.schema.removeField("d4jcltzj")

  return dao.saveCollection(collection)
})
