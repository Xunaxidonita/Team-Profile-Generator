const Employee = require("../lib/Employee");

test("creates an employee object", () => {
  const manager = new Employee("Alfred", "N072", "someone@somewhere.com");
  expect(manager.name).toEqual(expect.any(String));
  expect(manager.name).toEqual("Alfred");
  expect(manager.id).toEqual(expect.any(String));
  expect(manager.id).toEqual("N072");
  expect(manager.email).toEqual(expect.any(String));
  expect(manager.email).toEqual("someone@somewhere.com");
});
