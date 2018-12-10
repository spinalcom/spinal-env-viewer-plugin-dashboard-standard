let find = async function(argNode, relationNames, predicate) {
  if (typeof predicate !== "function") {
    throw new Error("predicate must be a function");
  }

  let seen = new Set([argNode]);
  let promises = [];
  let nextGen = [argNode];
  let currentGen = [];
  let found = [];

  while (nextGen.length) {
    currentGen = nextGen;
    promises = [];
    nextGen = [];

    for (let node of currentGen) {
      promises.push(node.getChildren(relationNames));

      if (predicate(node)) {
        found.push(node);
      }
    }

    let childrenArrays = await Promise.all(promises);

    for (let children of childrenArrays) {
      for (let child of children) {
        if (!seen.has(child)) {
          nextGen.push(child);
          seen.add(child);
        }
      }
    }
  }

  return found;
}

export {
  find
}