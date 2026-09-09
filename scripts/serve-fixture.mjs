import {createFixture} from '../tests/fixtures/server.mjs'
import {spawn} from 'node:child_process'
const fixture=await createFixture();fixture.state.mode='absent'
const server=spawn(process.execPath,['.output/server/index.mjs'],{env:{...process.env,PORT:'3105',HOST:'127.0.0.1',NUXT_PUBLIC_GRAPHQL_ENDPOINT:fixture.url},stdio:'inherit'})
process.on('SIGTERM',()=>server.kill());process.on('SIGINT',()=>server.kill())
server.on('exit',async code=>{await fixture.close();process.exit(code||0)})
