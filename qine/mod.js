if (!cc)
    throw "Can't find CrossCode...";

document.body.addEventListener('modsLoaded', () => {
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
    ig.Ja.W9a("party", function(a) {
        return a.indexOf("Member") == 0 ? sc.sa.Kl(a.substr(6, 1) * 1 - 2) : sc.sa.LBb(a)
    }, {
        b: "String",
        U: d
    });

    sc.sa.f();
});
