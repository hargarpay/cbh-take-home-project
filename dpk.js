const crypto = require("crypto");

getEncryptData = (data) => crypto.createHash("sha3-512").update(data).digest("hex")
getStringifyData = (data) => JSON.stringify(data)

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = event?.partitionKey;

  const hasNonEmptyInputAndNonPartitionKey = event && !candidate;

  if (hasNonEmptyInputAndNonPartitionKey) {
      const data = getStringifyData(event);
      candidate = getEncryptData(data);
  }

  if (typeof candidate !== "string") {
      candidate = getStringifyData(candidate);
  }

  if (candidate?.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = getEncryptData(candidate);
  }
  return candidate || TRIVIAL_PARTITION_KEY;
};

exports.getEncryptData = getEncryptData
exports.getStringifyData = getStringifyData