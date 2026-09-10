import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();

const mobile =
  '7a38b385-c817-4e66-8d96-8cad23a6b0d9.json';

const desktop =
  'a2be68de-75b9-45eb-b89f-cac9fd6cde5c.json';

const files = [
  mobile,
  desktop,
];

const v2Dir =
  path.join(root, 'public', 'v2', 'scene-state');

const rootDir =
  path.join(root, 'public', 'scene-state');

fs.mkdirSync(
  rootDir,
  {
    recursive: true,
  },
);

function sha(file) {
  return crypto
    .createHash('sha256')
    .update(fs.readFileSync(file))
    .digest('hex');
}

for (const name of files) {
  const src =
    path.join(v2Dir, name);

  const dst =
    path.join(rootDir, name);

  if (!fs.existsSync(src)) {
    throw new Error(
      `Missing V2 scene-state: ${src}`,
    );
  }

  fs.copyFileSync(
    src,
    dst,
  );

  const a = sha(src);
  const b = sha(dst);

  if (a !== b) {
    throw new Error(
      `Scene mismatch after sync: ${name}`,
    );
  }

  console.log(
    `[sync] ${name} OK`,
  );
}

const v2Ui =
  path.join(root, 'public', 'v2', 'ui-state.json');

const rootUi =
  path.join(root, 'public', 'ui-state.json');

if (fs.existsSync(v2Ui)) {
  fs.copyFileSync(
    v2Ui,
    rootUi,
  );

  console.log(
    '[sync] ui-state.json OK',
  );
}
