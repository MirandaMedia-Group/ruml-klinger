import test from 'node:test'
import assert from 'node:assert/strict'
import {alternateLocalePath} from '../../utils/alternate-locale-path.js'
const translated = (slug, english) => ({slug,translations:english?[{slug:english,language:{code:'EN'}}]:[]})
test('nepřeložený produkt přepne do EN katalogu, přeložený na svůj detail',()=>{
 assert.equal(alternateLocalePath('/katalog-produktu/product/folie','en',{currentProduct:{nodes:[translated('folie',null)]}},''),'/en/katalog-produktu')
 assert.equal(alternateLocalePath('/katalog-produktu/product/folie','en',{currentProduct:{nodes:[translated('folie','foil')]}},''),'/en/katalog-produktu/product/foil')
})
test('kategorie zachová celou přeloženou hierarchii',()=>{
 const data={productCategories:{nodes:[translated('tesneni','sealants'),translated('desky','sheets')]}}
 assert.equal(alternateLocalePath('/katalog-produktu/tesneni/desky','en',data,''),'/en/katalog-produktu/sealants/sheets')
})
test('statické stránky dál používají standardní localePath',()=>assert.equal(alternateLocalePath('/o-nas','en',{},'/en/o-nas'),'/en/o-nas'))
