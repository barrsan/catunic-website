type Args = {
  root: string;
  path: string;
};

export function createPageUrl({ root, path }: Args) {
  if (path === '/') {
    return root;
  }

  return `${root}${path}`;
}
