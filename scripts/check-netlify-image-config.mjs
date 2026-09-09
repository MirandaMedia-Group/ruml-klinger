import assert from 'node:assert/strict'
import {readFile,readdir} from 'node:fs/promises'
const config=JSON.parse(await readFile('.netlify/deploy/v1/config.json','utf8'))
const serialized=JSON.stringify(config);const remote=config.images?.remote_images
assert.ok(Array.isArray(remote)&&remote.length===1,serialized)
const pattern=new RegExp(remote[0]);const origin=new URL(process.env.NUXT_PUBLIC_API_BASE_URL||'https://ruml-api.mirandamedia.cz').origin
assert.ok(pattern.test(origin+'/wp-content/uploads/2023/01/photo.jpg'))
for(const url of [origin+'/graphql',origin+'/wp-admin/a.jpg','https://evil.test/wp-content/uploads/a.jpg',origin+'.evil.test/wp-content/uploads/a.jpg','http://localhost/wp-content/uploads/a.jpg'])assert.equal(pattern.test(url),false,url)
const files=[];async function walk(dir){for(const f of await readdir(dir,{withFileTypes:true})){const path=dir+'/'+f.name;if(f.isDirectory())await walk(path);else files.push(path)}}await walk('.netlify/functions-internal/server')
assert.ok(files.every(path=>!/(?:^|\/)(?:sharp|ipx|@img)(?:\/|\.)/.test(path)),'Server must not bundle sharp/IPX')
console.log('PASS scoped image allowlist and no server IPX/sharp',remote)
