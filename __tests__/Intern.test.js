const Intern = require("../lib/Intern");

test("creates an Intern object", () => {
  const manager = new Intern(
    "Alfred",
    "N072",
    "someone@somewhere.com",
    "Monsters University"
  );
  expect(manager.name).toEqual(expect.any(String));
  expect(manager.name).toEqual("Alfred");
  expect(manager.id).toEqual(expect.any(String));
  expect(manager.id).toEqual("N072");
  expect(manager.email).toEqual(expect.any(String));
  expect(manager.email).toEqual("someone@somewhere.com");
  expect(manager.school).toEqual(expect.any(String));
  expect(manager.school).toEqual("Monsters University");
  expect(manager.role).toEqual(expect.any(String));
  expect(manager.role).toEqual("Intern");
});
