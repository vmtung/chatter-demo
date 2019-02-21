require('dotenv').config()
const app = require('./server/config/express')()

require('./server/config/database')

const server = app.listen(app.get('port'), () => {
  console.log(`server listening on port ${app.get('port')}`)
})

require('./server/config/socket')(server)
