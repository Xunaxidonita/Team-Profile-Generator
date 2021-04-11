const Manager = require("../lib/Manager");

test("creates an Manager object", () => {
  const manager = new Manager("Alfred", "N072", "someone@somewhere.com", "45");
  expect(manager.name).toEqual(expect.any(String));
  expect(manager.name).toEqual("Alfred");
  expect(manager.id).toEqual(expect.any(String));
  expect(manager.id).toEqual("N072");
  expect(manager.email).toEqual(expect.any(String));
  expect(manager.email).toEqual("someone@somewhere.com");
  expect(manager.office).toEqual(expect.any(String));
  expect(manager.office).toEqual("45");
  expect(manager.role).toEqual(expect.any(String));
  expect(manager.role).toEqual("Manager");
});
