var testy = require("../lib/testy");
testy.subject("Hello", (function(hello) {
  // hello:required
  hello.should("be", "Hello");
  hello.should("not", "be", "World");
  hello.should("startWith", "He");
  hello.should("start with", "H");
  hello.should("not", "startWith", "Wo");
  hello.should("match", /ello/);
  return hello.should("not", "match", /squic/);
}));

testy.subject({ foo: "bar" }, (function(hash) {
  // hash:required
  hash.should("have", "foo", "bar");
  return hash.should("not", "have", "bib", 37);
}));

