(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['watercourse.html'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(data && lookupProperty(data,"first")),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":31,"column":6},"end":{"line":35,"column":13}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    return "      <th class=\"id\">#</th>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "      <th>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</th>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <tr data-id=\""
    + alias2(alias1(depth0, depth0))
    + "\">\n      <td class=\"id\">"
    + alias2(alias1(depth0, depth0))
    + "</td>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (data && lookupProperty(data,"root"))) && lookupProperty(stack1,"columns")),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":50,"column":6},"end":{"line":54,"column":15}}})) != null ? stack1 : "")
    + "    </tr>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(data && lookupProperty(data,"first")),{"name":"unless","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":51,"column":6},"end":{"line":53,"column":17}}})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    return "      <td data-key=\""
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\" class=\"loading\"></td>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "    <tr data-id=\""
    + alias2(alias1(depth0, depth0))
    + "\">\n      <td class=\"id\">"
    + alias2(alias1(depth0, depth0))
    + "</td>\n      <td data-key=\"wkt\" class=\"loading\"></td>\n      <td data-key=\"geo_json\" class=\"loading\"></td>\n      <td data-key=\"distance\" class=\"loading\"></td>\n      <td data-key=\"length\" class=\"loading\"></td>\n    </tr>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<h1 class=\"title\">\n  <em class=\"category\">Vodotok</em><br>\n  <span class=\"name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":21},"end":{"line":3,"column":30}}}) : helper)))
    + "</span>\n</h1>\n\n<section class=\"source\">\n  <div class=\"card horizontal\">\n  <div class=\"card-content white-text\">\n    <span class=\"card-title\">Izvorni materijal</span>\n    <p>\n    <strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":11,"column":12},"end":{"line":11,"column":21}}}) : helper)))
    + "</strong>\n    možemo naći na <a href=\"https://geosrbija.rs\">Geosrbija</a>\n    portalu <a href=\"https://rgz.gov.rs\">Republičkog geodetskog zavoda</a>\n    pod slojem\n      <strong>Hidrografija</strong> »\n      <strong>Slivovi i vodotokovi</strong> »\n      <strong>Vodotokovi (linija)</strong>,\n    broj sloja 129, pod rednim brojevima "
    + alias4(((helper = (helper = lookupProperty(helpers,"rgz_ids_text") || (depth0 != null ? lookupProperty(depth0,"rgz_ids_text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rgz_ids_text","hash":{},"data":data,"loc":{"start":{"line":18,"column":41},"end":{"line":18,"column":57}}}) : helper)))
    + ".\n    </p>\n  </div>\n  <div class=\"card-image valign-wrapper\">\n    <img src=\"https://geosrbija.rs/wp-content/uploads/img/geosrbija-logo.svg\">\n  </div>\n  </div>\n\n  <h3 class=\"table\">Tabela izvornih podataka</h3>\n  <table id=\"data-rgz\" class=\"header-caps responsive-table\">\n  <thead>\n    <tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"columns") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":30,"column":6},"end":{"line":36,"column":15}}})) != null ? stack1 : "")
    + "    </tr>\n    <tr class=\"progress-row\">\n    <td>\n      <div class=\"progress\">\n      <div class=\"indeterminate\"></div>\n      </div>\n    </td>\n    </tr>\n  </thead>\n  <tbody>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"rgz_ids") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":47,"column":4},"end":{"line":56,"column":13}}})) != null ? stack1 : "")
    + "  </tbody>\n  </table>\n</section>\n\n<section class=\"geo\">\n  <div id=\"map\" class=\"z-depth-1\"></div>\n\n  <h2>Geografski podaci</h2>\n  <p>\n  WKT podaci iz prethodne tabele su u SRB_ETRS89 prostornom referentnom sistemu\n  (<a href=\"https://epsg.io/8682\">EPSG:8682</a>, UTM zona 34N),\n  u skladu sa sledećim propisima:\n  </p>\n  <ol>\n  <li>\n    Pravilnik za osnovne geodetske radove\n    (<a href=\"https://www.pravno-informacioni-sistem.rs/SlGlasnikPortal/eli/rep/sgrs/drugidrzavniorganiorganizacije/pravilnik/2012/19/1/reg\">19/2012-29, 80/2018-64</a>)\n  </li>\n  <li>\n    Pravilnik o primeni tehnologije globalnog navigacionog sistema u oblastima državnog premera i katastra\n    (<a href=\"https://www.pravno-informacioni-sistem.rs/SlGlasnikPortal/eli/rep/sgrs/drugidrzavniorganiorganizacije/pravilnik/2017/72/2/reg\">72/2017-51</a>)\n  </li>\n  </ol>\n  <p>\n  Ta polja ovde pretvaramo prvo u\n  <a href=\"https://geojson.org\">GeoJSON format</a>\n  (<a href=\"https://tools.ietf.org/html/rfc7946\">RFC 7946</a>) za lakšu obradu, a potom u\n  <a href=\"https://en.wikipedia.org/wiki/World_Geodetic_System\">WGS84</a>\n  referentni sistem za bolju kompatibilnost i prikaz na mapi.\n  </p>\n\n  <h3>Povezanost</h3>\n  <p>\n  Redni brojevi pojedinih delova vodotoka su povezani u sledećem redosledu:\n  </p>\n  <ul id=\"ordering\"><li>&hellip;</li></ul>\n\n  <p>\n  Ukupna dužina vodotoka na teritoriji Republike Srbije je\n  <span id=\"length\">? km</span>, a udaljenost između početka i kraja\n  vodotoka (na teritoriji RS) je <span id=\"distance\">? km</span>.\n  </p>\n\n  <p>\n  Spojena GeoJSON datoteka koja sadrži <code>FeatureCollection</code>\n  objekat sa pojedinim delovima vodotoka u <code>LineSegment</code>\n  obliku, u gore navedenom redosledu:\n\n  <span id=\"geojson\">&hellip;</span>\n  </p>\n\n  <p>\n  Spojena GeoJSON datoteka koja sadrži sve delove vodotoka u jednom\n  <code>LineSegment</code> objektu:\n\n  <span id=\"geojson-merged\">&hellip;</span>\n  </p>\n\n  <h3 class=\"table\">Tabela geografskih podataka</h3>\n  <table id=\"data-geo\" class=\"header-caps responsive-table\">\n  <thead>\n    <tr>\n      <th class=\"id\">#</th>\n      <th>WKT (SRB_ETRS89)</th>\n      <th>GeoJSON (WGS84)</th>\n      <th>Udaljenost</th>\n      <th>Dužina</th>\n    </tr>\n    <tr class=\"progress-row\">\n    <td>\n      <div class=\"progress\">\n      <div class=\"indeterminate\"></div>\n      </div>\n    </td>\n    </tr>\n  </thead>\n  <tbody>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"rgz_ids") : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":134,"column":4},"end":{"line":142,"column":13}}})) != null ? stack1 : "")
    + "  </tbody>\n  </table>\n</section>\n";
},"useData":true});
})();