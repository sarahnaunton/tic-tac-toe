const { fn, col, where } = require('sequelize')
const { models } = require('../db')

async function getPlayers(req, res) {
  try {
    const whereClause = {}
    if (req.query.username) {
      const normalisedUsername = req.query.username.trim().toLowerCase()
      whereClause.username = where(fn('LOWER', col('username')), normalisedUsername)
    }
    const response = await models.player.findAll({ where: whereClause })
    return res.status(200).json(response)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

async function createPlayer(req, res) {
  try {
    const { username } = req.body || {}

    if (!username || (typeof username === 'string' && !username.trim())) {
      return res.status(400).json({ error: 'Username is missing' })
    }

    const trimmedUsername = username.trim()
    const normalisedUsername = trimmedUsername.toLowerCase()

    const existing = await models.player.findOne({  where: where(fn('LOWER', col('username')), normalisedUsername) })
    if (existing) {
      return res.status(409).json({ error: 'Username already exists' })
    }

    const player = await models.player.create({ username: trimmedUsername })
    return res.status(201).json(player)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  getPlayers,
  createPlayer
}