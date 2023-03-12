import * as cfg from "./config.js";
import * as utils from "./utilities.js";
import * as dbRtns from "./db_routines.js";

const dotEnvWrite = async () => {
    let results = "";
    try {
        const db = await dbRtns.getDBInstance();
        results = await dbRtns.deleteAll(db, cfg.coll);
        results = `Deleted ${results.deletedCount} documents from ${cfg.coll} collection. `;
        console.log(
        `Deleted ${results.deletedCount} documents from ${cfg.coll} collection.`
        );

        let alertJSON = await utils.getJsonFromWWWPromise(cfg.galerts);
        results += `Retrieved Alert JSON from remote website. `;
        console.log(results);

        let countryJSON = await utils.getJsonFromWWWPromise(cfg.icountries);
        results += `Retrieved Country JSON from remote GitHub. `;
        console.log(results);

        let alerts = [];
        for (let i=0; i<countryJSON.length; i++) {
            let countryCode = countryJSON[i]["alpha-2"];
            let alertDate = "";
            let alertText = "No travel alerts";
            let thisAlert = [];
            for (let k=0; k<Object.keys(alertJSON.data).length; k++) {
                if (Object.keys(alertJSON.data)[k] == countryCode) {
                    thisAlert = alertJSON.data[countryCode];
                    alertDate = alertJSON.data[countryCode]["date-published"].date;
                    alertText = alertJSON.data[countryCode].eng["advisory-text"];
                }
            }
            let alert = {};
            alert = {country: countryJSON[i]["alpha-2"], name: countryJSON[i].name,
                text: alertText, date: alertDate,
                 region: countryJSON[i].region, subregion: countryJSON[i]["sub-region"]};
            thisAlert = null;

            alerts.push(alert);
        }  

        let results2 = await dbRtns.addMany(db, cfg.coll, alerts);
        let allAlerts = await dbRtns.count(db, cfg.coll);
        results += `Added ${allAlerts} alerts to the ${cfg.coll} collection.`;
        console.log(
            `Added ${allAlerts} alerts to the ${cfg.coll} collection.`
        );


    } catch (err) {
        console.log(err.message);
    } finally {
        return { results : results };
    }
};

export { dotEnvWrite }