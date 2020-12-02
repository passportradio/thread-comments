export const makeNestedStructure = (flat) => {
  const roots = [];
  const all = {};

  flat.forEach((item) => {
    all[item.id] = { ...item };
  });

  Object.keys(all).forEach((id) => {
    const item = all[id];
    if (item.parent === null) {
      roots.push(item);
    } else if (item.parent in all) {
      const p = all[item.parent];
      if (!("children" in p)) {
        p.children = [];
      }
      p.children.push(item);
    }
  });

  return roots;
};

export const makeFlatStructure = (nested) => {
  var result = [];

  const flattenArray = (a, r) => {
    a.forEach(({children, ...rest}) => {
      r.push(rest);
      if(children) flattenArray(children, r)
    });
  }

  flattenArray(nested, result)

  return result;
}