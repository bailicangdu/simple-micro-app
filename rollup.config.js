import * as path from 'path'
import fse from 'fs-extra'

// 清空目标目录
fse.emptyDirSync(path.join(process.cwd(), 'lib'))

export default {
  input: path.join(__dirname, 'src/index.js'),
  output: [
    {
      file: path.join(__dirname, 'lib/index.js'),
      format: 'es',
      sourcemap: true
    }
  ],
}