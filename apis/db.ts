import { JsonDB, Config } from 'node-json-db';
var db = new JsonDB(new Config("db.json", true, false, '/'));

export const push = async (url: string, data: any) => {
  await db.push(url, data)
  await db.save()
}

export const load = async (url: string) => await db.getData(url)