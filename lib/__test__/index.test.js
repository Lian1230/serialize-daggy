import test from "ava";
import { taggedSum } from "daggy";
import { stringify, parse } from "../index";
var DaggyType = taggedSum("DaggyType", {
  Yes: ["value"],
  No: []
});
var obj = {
  str: "string",
  num: 0,
  obj: {
    foo: "foo"
  },
  daggy_Yes: DaggyType.Yes("lol"),
  daggy_No: DaggyType.No,
  date: new Date("Thu, 28 Apr 2016 22:02:17 GMT")
};
test("test stringify and parse a daggy type", function (t) {
  t.is(DaggyType.Yes.is(parse(stringify(DaggyType.Yes("lol")))), true);
  t.is(DaggyType.No.is(parse(stringify(DaggyType.No))), true);
});
test("test stringify and parse an obj with daggy type", function (t) {
  var serialized = '{"str":"string","num":0,"obj":{"foo":"foo"},"daggy_Yes":"DAGGY_{\\"fields\\":[\\"value\\"],\\"typeName\\":\\"DaggyType\\",\\"tag\\":\\"Yes\\",\\"values\\":[\\"lol\\"]}","daggy_No":"DAGGY_{\\"fields\\":[],\\"typeName\\":\\"DaggyType\\",\\"tag\\":\\"No\\",\\"values\\":null}","date":"2016-04-28T22:02:17.000Z"}';
  t.is(stringify(obj), serialized);
  var parsedDaggy_Yes = parse(serialized).daggy_Yes;
  var parsedDaggy_No = parse(serialized).daggy_No;
  t.is(DaggyType.Yes.is(parsedDaggy_Yes), true);
  t.is(parsedDaggy_Yes.cata({
    Yes: function Yes() {
      return "Yes";
    },
    No: function No() {
      return "No";
    }
  }), "Yes");
  t.is(DaggyType.No.is(parsedDaggy_No), true);
  t.is(parsedDaggy_No.cata({
    Yes: function Yes() {
      return "Yes";
    },
    No: function No() {
      return "No";
    }
  }), "No");
});