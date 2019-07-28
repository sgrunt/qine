sc.CommonEvents.inject({
	_loadCommonEvents: function() {
		// let it do it's thing
		this.parent();
		console.log('I successfully injected into it');
		// going to find the indexOf no-contact
		const socialActions = this.eventsByType["SOCIAL_ACTION"];
		let i = 0;
		for (i = 0; i < socialActions.length; i++) {
			if (socialActions[i].name === "nobody-contact") {
				break;
			}
		}
		let noContactIndex = i;
		// we have the index now find all the -contact and splice it
		++i;
		for (; i < socialActions.length;i++) {
			if (socialActions[i].name.endsWith("-contact")) {
				socialActions.splice(noContactIndex, 0, socialActions.splice(i, 1).pop());
			}
		}
	}
});

class Qine {
  constructor() {
	  this._init();
  }

  _init() {
    this._addCombatAction();
    this._addCombatMessage();
    this._addPartyMember();
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
  }

  _addDatabaseEntries() {
      /*  const nobody = cc.ig.Database.data.commonEvents["nobody-contact"];
        delete cc.ig.Database.data.commonEvents["nobody-contact"];
        cc.ig.Database.data.commonEvents["nobody-contact"] = nobody;

        sc.commonEvents.eventsByType = {};
        sc.commonEvents.init();
      })*/
  }

}

new Qine();
