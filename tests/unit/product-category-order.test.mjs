import test from 'node:test'
import assert from 'node:assert/strict'
import {compareProductCategoryOrder,sortProductCategories} from '../../utils/product-category-order.js'
const category=(slug,order)=>({slug,productCategoriesAfc:{order}})

test('shodné a chybějící pořadí je stabilní a nemění vstup z CMS',()=>{
 const original=Object.freeze([category('kovove',null),category('ostatni',null),category('gore',null)])
 assert.deepEqual(sortProductCategories(original),original)
 assert.deepEqual(sortProductCategories(sortProductCategories(original)),original)
 assert.notEqual(sortProductCategories(original),original)
})
test('vyplněné pořadí má přednost; shody zachovávají původní pořadí',()=>{
 const a=category('a',2),b=category('b',0),c=category('c',2),d=category('d',null),e=category('e',5000)
 assert.deepEqual(sortProductCategories([a,d,b,c,e]),[b,a,c,e,d])
})
test('komparátor je reflexivní, antisymetrický a tranzitivní i pro nevyplněné hodnoty',()=>{
 const values=[-1,0,1,1000,5000,null,undefined,NaN].map((n,i)=>category(String(i),n))
 for(const a of values){assert.equal(compareProductCategoryOrder(a,a),0);for(const b of values){assert.equal(compareProductCategoryOrder(a,b)+compareProductCategoryOrder(b,a),0);for(const c of values)if(compareProductCategoryOrder(a,b)<=0&&compareProductCategoryOrder(b,c)<=0)assert.ok(compareProductCategoryOrder(a,c)<=0)}}
})
