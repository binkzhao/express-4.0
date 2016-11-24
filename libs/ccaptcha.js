'use strict'

const Canvas = require('canvas')

module.exports = {
  getTextAndAnswer: ([type, chars, size]) => {
    if (type === 'text') {
      let text = ''
      for (let i = 0; i < size; i++) {
        text += chars[Math.round(Math.random() * (chars.length - 1))]
      }
      return [text, text]
    } else {
      return ['1234', '1234']
    }
  },

  data: ({
    type = 'text',
    size = 4,
    height = 40,
    width = 120,
    color = 'rgb(0,0,0)',
    background = 'rgb(255,255,255)',
    lineWidth = 1,
    chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    noise = true,
    noiseColor = 'green',
    complexity = 3
  } = {}, callback) => {
    let fontSize = Math.round(height * 0.5 + (15 - complexity * 3))
    let canvas = new Canvas(width, height)
    let ctx = canvas.getContext('2d')

    ctx.fillStyle = background
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = color
    ctx.lineWidth = lineWidth
    ctx.font = fontSize + 'px sans'

    if (noise) {
      ctx.strokeStyle = noiseColor
      let noiseHeight = height
      for (let i = 0; i < 5; i++) {
        ctx.moveTo(20, Math.random() * noiseHeight)
        ctx.bezierCurveTo(
          80, Math.random() * noiseHeight,
          160, Math.random() * noiseHeight,
          230, Math.random() * noiseHeight
        )
        ctx.stroke()
      }
    }

    let modifier = complexity / 5
    ctx.strokeStyle = color
    // let [text, answer] = getTextAndAnswer(type, chars, size)
    let [text, answer] = ['1234', '1234']

    for (let i = 0; i < text.length; i++) {
      ctx.setTransform(
        Math.random() * modifier + 1 + modifier / 3,
        Math.random() * modifier + modifier / 3,
        Math.random() * modifier + modifier / 3,
        Math.random() * modifier + 1 + modifier / 3,
        (height * i) / 3 + (height - fontSize) / 3,
        height - (height - fontSize) / 2
      )
      ctx.fillText(text.charAt(i), i * 6, -8)
    }

    canvas.toDataURL('image/png', (err, data) => {
      if (err) {
        throw err
      }

      callback(answer, data)
    })
  }
}
