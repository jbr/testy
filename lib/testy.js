var util = require("util"),
    style = require("../colored.js/lib/colored.js"),
    testy = exports;
(testy)["tests"] = 0;
(testy)["passes"] = 0;
(testy)["failures"] = 0;
(testy)["description"] = [  ];
var testObject__QUERY = (function(obj) {
  // obj:required
  return typeof(obj.testy) !== 'undefined';
});

var matcherFor = (function(matcher) {
  // matcher:required
  return (function() {
    if (typeof(matcher) === "string") {
      return ((testy.should)[matcher] || matcher);
    } else {
      return matcher;
    };
  })();
});

testy.should = (function(obj, matcher, matcherArgs) {
  // obj:required matcher:required matcherArgs:rest
  var matcherArgs = Array.prototype.slice.call(arguments, 2);
  
  matcherArgs.unshift(obj);
  var matcher = matcherFor(matcher),
      result = (function() {
    try {
      return matcher.apply(undefined, matcherArgs);
    } catch (e) {
      return {
        description: (style.red("Error: ") + e.message),
        passed: false
      };
    }
  })();;
  console.log(("[" + (function() {
    if (result.passed) {
      return style.green("pass");
    } else {
      return style.red("fail");
    };
  })() + "]\t " + util.inspect(obj) + " should " + result.description));
  (function() {
    if (result.passed) {
      return ((testy.passes)++);
    } else {
      return ((testy.failures)++);
    };
  })();
  return result;
});

testy.should.match = (function(obj, regex) {
  // obj:required regex:required
  return {
    description: ("match " + regex),
    passed: regex.test(obj)
  };
});

testy.should.be = (function(obj, expected) {
  // obj:required expected:required
  return {
    description: ("be " + expected),
    passed: (obj === expected)
  };
});

testy.should.have = (function(obj, key, expectedValue) {
  // obj:required key:required expectedValue:required
  return {
    description: ("have " + key + " equal to " + expectedValue),
    passed: ((obj)[key] === expectedValue)
  };
});

testy.should.startWith = (function(obj, initial) {
  // obj:required initial:required
  return {
    description: ("start with " + initial),
    passed: (0 === obj.indexOf(initial))
  };
});

(testy.should)["start with"] = testy.should.startWith;
testy.should.not = (function(obj, matcher, matcherArgs) {
  // obj:required matcher:required matcherArgs:rest
  var matcherArgs = Array.prototype.slice.call(arguments, 2);
  
  matcherArgs.unshift(obj);
  var result = matcherFor(matcher).apply(undefined, matcherArgs);;
  return {
    description: ("not " + result.description),
    passed: (!result.passed)
  };
});

var makeTestObject = (function(obj) {
  // obj:required
  return (function() {
    if (testObject__QUERY(obj)) {
      return obj;
    } else {
      var testObject = {
        object: obj,
        testy: true
      };;
      testObject.should = (function(args) {
        // args:rest
        var args = Array.prototype.slice.call(arguments, 0);
        
        args.unshift(obj);
        return testy.should.apply(undefined, args);
      });
      ;
      return testObject;;
    };
  })();
});

testy.subject = (function(subj, to) {
  // subj:required to:required
  return to(makeTestObject(subj));
});

