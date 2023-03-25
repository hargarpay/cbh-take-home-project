const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto"); 

const encryptData = (stringifyData) => {
  return crypto.createHash("sha3-512").update(stringifyData).digest("hex");
}

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the encryption of the value when given a string input", () => {
    const data = "event";
    const partitionKey = deterministicPartitionKey(data);
    expect(partitionKey).toBe(encryptData(JSON.stringify(data)))
  });

  it("Returns the partitionKey when given an object with partitionKey key", () => {
    const event = {partitionKey: "event"}
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(event.partitionKey)
  });

  it("Returns the encryption of the object value given an object without partitionKey key", () => {
    const event = {nonePartitionKey: "event"}
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(encryptData(JSON.stringify(event)))
  });


  it("Returns the encryption of the object value given an object without partitionKey key whose length is more than 256", () => {
    const event = {nonePartitionKey: "Duis lacinia tristique euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi laoreet eros non tincidunt imperdiet. Vivamus rutrum, massa nec condimentum sagittis, neque quam lacinia quam, sed viverra purus diam id urna. Praesent id dui varius, maximus felis vel, vulputate odio. Praesent semper consequat erat sed hendrerit. Vivamus consequat fermentum eros at finibus."}
    const stringifyEvent = JSON.stringify(event);
    const partitionKey = deterministicPartitionKey(event);
    expect(stringifyEvent.length).toBeGreaterThan(256)
    expect(partitionKey).toBe(encryptData(stringifyEvent))
  });

});
