if (!cc) throw "Can't find CrossCode...";

class Qine {
  constructor() {
    document.body.addEventListener("modsLoaded", () => this._init());
  }

  _init() {
    this._addCombatAction();
    this._addCombatMessage();
    this._addPartyMember();
    this._addDatabaseEntries();
    this._loadHeads();
  }

  _addCombatAction() {
    ig.ACTION_STEP.SET_SCREEN_ENEMY_TARGET = ig.ActionStepBase.extend({
      target: 0,
      _wm: new ig.Config({
        attributes: {
          target: {
            _type: "Entity",
            _info: "Entity to target",
            _withNull: true
          }
        }
      }),
      init: function(a) {
        this.target = a.target
      },
      run: function(a) {
        var c = ig.Event.getEntity(this.target, undefined);
        sc.combat.setScreenEnemiesTarget(c);
      },
    });
  }

  _addCombatMessage() {
    sc.COMBAT_MSG_TYPE.GUARD_COUNTER = {
      icon: "",
      msg: "sc.gui.combat-msg.guard-counter",
      keepPos: true,
      duration: 1
    };
  }

  _addPartyMember() {
    /*
     * The idea here is to add a new entry to the list of party members,
     * and then call the functions that reference that list to reinit the
     * list of data. The way I've implemented this *should* allow for
     * multiple concurrent new party member mods to exist and work correctly
     * with each other.
     */
    sc.PARTY_OPTIONS.push("Qine");

    cc.sc.party.init();

    const origLoad = cc.ig.gameMain[cc.ig.varNames.gameMainLoadMap];
    cc.ig.gameMain[cc.ig.varNames.gameMainLoadMap] = data => {
      const callOrig = origLoad.call(cc.ig.gameMain, data);
      callOrig;

      if (
        cc.sc.party.contacts.Qine.status != undefined &&
        cc.sc.party.contacts.Qine.status == 0
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

        sc.commonEvents.eventsByType = {};
        sc.commonEvents.init();
      })
      .catch(err => {
        throw err;
      });
  }

  _loadHeads() {
    this._tmpHeadsImage = new ig.Image("assets/media/gui/severed-heads.png");
    setTimeout( () => this._updateHeads(), 100 );
  }

  _updateHeads() {
    if (this._tmpHeadsImage.loaded) {
      const tmpSaveGui = new sc.SaveSlotParty;
      Object.assign(tmpSaveGui.headsGfx, this._tmpHeadsImage);
    } else {
      setTimeout( () => this._updateHeads(), 100 );
    }
  };
}

new Qine();
