const express = require('express');
const Item = require('../models/item');
const auth = require('../middleware/auth');
const router = new express.Router();

// Create item
router.post('/items', auth, async (req, res) => {
  const item = new Item(req.body);
  try {
    await item.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all items
router.get('/items', auth, async (req, res) => {
  try {
    const items = await Item.find({});
    res.send(items);
  } catch (error) {
    res.status(500).send();
  }
});

// Read single item
router.get('/items/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const item = await Item.findById(_id);
    if (!item) {
      return res.status(404).send();
    }
    res.send(item);
  } catch (error) {
    res.status(500).send();
  }
});

// Update item
router.patch('/items/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'description'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).send();
    }

    updates.forEach((update) => (item[update] = req.body[update]));
    await item.save();
    res.send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete item
router.delete('/items/:id', auth, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).send();
    }

    res.send(item);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
