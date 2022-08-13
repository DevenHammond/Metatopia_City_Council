const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

const addresses = [
  "0x3f39B2D5d896FB554DA3918940A8b65684D2c088",
  "0xCa87b367554B1A92b41923F789d1ffc9DC2CCA3d"
];

const leaves = addresses.map((x) => keccak256(x));
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
const buf2hex = (x) => "0x" + x.toString("hex");

const root = buf2hex(tree.getRoot());
console.log("This is the root: " + root);
const leaf = buf2hex(keccak256(addresses[0]));
const proof = tree.getProof(leaf).map(x => buf2hex(x.data));
console.log("This is the leaf: " + leaf);
console.log(proof);
console.log(tree.verify(proof, leaf, root));