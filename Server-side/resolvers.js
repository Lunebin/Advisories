import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
import * as pro from "./project1_setup.js";
const resolvers = {
    project1_setup: async () => {
        return await pro.dotEnvWrite();
        },
    alerts: async () => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findAll(db, cfg.coll, {}, {});
        },        
    alertsforregion: async (args) => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findAll(db, cfg.coll, { region: args.region }, {});
        }, 
    alertsforsubregion: async args => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findAll(db, cfg.coll, { subregion: args.subregion }, {});
        },
    alertsforname: async args => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findAll(db, cfg.coll, { name: args.name }, {});
        },
    names: async () => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findUniqueValues(db, cfg.coll, "name");
        },
    regions: async () => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findUniqueValues(db, cfg.coll, "region");
        },
    subregions: async () => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findUniqueValues(db, cfg.coll, "subregion");
        },  
    addalert: async args => {
        let db = await dbRtns.getDBInstance();
        let alert = {country: args.country, name: args.name, text: args.text, date: args.date, region: args.region, subregion: args.subregion};
        let results = await dbRtns.addOne(db,cfg.coll,alert);
        return results.insertedCount === 1 ? alert : null;
        },   
};
export { resolvers };