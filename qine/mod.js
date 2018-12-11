if (!cc) throw "Can't find CrossCode...";

class Qine {
  constructor() {
    document.body.addEventListener("modsLoaded", () => this._init());
  }

  _init() {
    this._addPartyMember();
    this._addDatabaseEntries();
  }

  _addPartyMember() {
    /*
     * The idea here is to add a new entry to the list of party members,
     * and then call the functions that reference that list to reinit the
     * list of data. The way I've implemented this *should* allow for
     * multiple concurrent new party member mods to exist and work correctly
     * with each other.
     *
     * If the obfuscation changes, it will probably break this...
     */
    sc.bu.push("Qine");
    var d = ig.copy(sc.bu);
    d.unshift("Member3");
    d.unshift("Member2");
    ig.Ja.W9a(
      "party",
      function(a) {
        return a.indexOf("Member") == 0
          ? sc.sa.Kl(a.substr(6, 1) * 1 - 2)
          : sc.sa.LBb(a);
      },
      {
        b: "String",
        U: d
      }
    );

    sc.sa.f();

    const origLoad = cc.ig.gameMain[cc.ig.varNames.gameMainLoadMap];
    cc.ig.gameMain[cc.ig.varNames.gameMainLoadMap] = data => {
      const callOrig = origLoad.call(cc.ig.gameMain, data);
      callOrig;

      if (
        cc.sc.party.Kn.Qine.status != undefined &&
        cc.sc.party.Kn.Qine.status == 0
      ) {
        new cc.ig.events.SET_PARTY_MEMBER_SP_LEVEL({
          member: "Qine",
          level: "3"
        }).start();
        new cc.ig.events.SET_PARTY_MEMBER_LEVEL({
          member: "Qine",
          level: 60,
          exp: 183,
          updateEquipment: true
        }).start();
        new cc.ig.events.SET_PARTY_MEMBER_ALL_ELEMENTS({
          member: "Qine",
          allElements: true
        }).start();
        new cc.ig.events.SET_CONTACT_TYPE({
          member: "Qine",
          status: "FRIEND"
        }).start();
      }
    };
  }

  _addDatabaseEntries() {
    simplify.resources
      .loadJSONPatched("data/qine-events.json")
      .then(newDbEntries => {
        cc.ig.Database.data.commonEvents["cooldown-S"].condition =
          "party.alive.Emile || party.alive.Glasses || party.alive.Apollo || party.alive.Joern";
        cc.ig.Database.data.commonEvents["cooldown-A"].condition =
          "party.alive.Emile || party.alive.Glasses || party.alive.Apollo || party.alive.Joern";
        cc.ig.Database.data.commonEvents["cooldown-B"].condition =
          "party.alive.Emile || party.alive.Glasses || party.alive.Apollo || party.alive.Joern";

        for (var key in newDbEntries) {
          cc.ig.Database.data.commonEvents[key] = newDbEntries[key];
        }

        const nobody = cc.ig.Database.data.commonEvents["nobody-contact"];
        delete cc.ig.Database.data.commonEvents["nobody-contact"];
        cc.ig.Database.data.commonEvents["nobody-contact"] = nobody;

        sc.Ip.Poa = {};
        sc.Ip.f();
      })
      .catch(err => {
        throw err;
      });
  }
}

new Qine();
