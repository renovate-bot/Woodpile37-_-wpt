test(() => {
  assert_true(document.documentElement.matches(":dir(ltr)"));
}, "Root element has a direction");

test(() => {
  const ele = document.createElement("foobar");
  assert_true(ele.matches(":dir(ltr)"));
}, "Element outside the document tree has a direction");

test(() => {
  const ele = document.createElementNS("foobar", "foobar");
  assert_true(ele.matches(":dir(ltr)"));
}, "Non-HTML element outside the document tree has a direction");

test(() => {
  const ele = document.createElement("foobar");
  ele.dir = "rtl";
  const ele2 = document.createElement("foobar");
  ele.append(ele2);
  assert_true(ele2.matches(":dir(rtl)"));
  ele.dir = "ltr";
  assert_true(ele2.matches(":dir(ltr)"), "direction after dynamic change");
}, "Element without direction has parent element direction");

test(() => {
  const ele = document.createElement("foobar");
  ele.dir = "rtl";
  const ele2 = document.createElementNS("foobar", "foobar");
  ele.append(ele2);
  assert_true(ele2.matches(":dir(rtl)"));
  ele.dir = "ltr";
  assert_true(ele2.matches(":dir(ltr)"), "direction after dynamic change");
}, "Non-HTML element without direction has parent element direction");

test(() => {
  let container1 = document.createElement("div");
  document.body.appendChild(container1);
  let container2 = document.createElement("div");

  for (let container of [container1, container2]) {
    container.dir = "rtl";
    let e = document.createElement("div");
    assert_true(e.matches(":dir(ltr)"));
    container.appendChild(e);
    assert_false(e.matches(":dir(ltr)"));
    e.remove();
    assert_true(e.matches(":dir(ltr)"));
  }

  container1.remove();
}, "dir inheritance is correct after insertion and removal from document");

test(() => {
  const ele = document.createElement("foobar");
  ele.dir = "auto";
  const ele2 = document.createElementNS("foobar", "foobar");
  ele.append(ele2);
  const text = document.createTextNode("\u05D0\u05D1\u05D2");
  ele2.append(text);
  assert_true(ele.matches(":dir(rtl)"), "is RTL before change");
  assert_true(ele2.matches(":dir(rtl)"), "child is RTL before change");
  text.data = "ABC";
  assert_true(ele.matches(":dir(ltr)"), "is LTR after change");
  assert_true(ele2.matches(":dir(ltr)"), "child is LTR after change");
}, "Non-HTML element text contents influence dir=auto");
