const Engineer = require("../lib/Engineer");

test("creates an Engineer object", () => {
  const manager = new Engineer(
    "Alfred",
    "N072",
    "someone@somewhere.com",
    "Freddy"
  );
  expect(manager.name).toEqual(expect.any(String));
  expect(manager.name).toEqual("Alfred");
  expect(manager.id).toEqual(expect.any(String));
  expect(manager.id).toEqual("N072");
  expect(manager.email).toEqual(expect.any(String));
  expect(manager.email).toEqual("someone@somewhere.com");
  expect(manager.github).toEqual(expect.any(String));
  expect(manager.github).toEqual("Freddy");
  expect(manager.role).toEqual(expect.any(String));
  expect(manager.role).toEqual("Engineer");
});
