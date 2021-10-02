module.exports = {
  "compilerOptions": {
    "rootDir": "src",
    "target": "ES6",
    "moduleResolution": "node",
    "jsx": "react",
    "allowJs": true,
    "declaration": false,
    "esModuleInterop": true,
    "downlevelIteration": true,
    "sourceMap": true,
    "baseUrl": "./",
    "typeRoots": ["./src/typings", "./node_modules/@types"],
    "lib": ["ES2015", "DOM"],
    "paths": {
      "antd-mobile": ["src/index.ts"],
      "antd-mobile/src/*": ["src/*"],
      "antd-mobile/es/*": ["src/*"],
      "demos": ["src/demos/index.ts"],
      "testing": ["src/tests/testing"]
    },
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "resolveJsonModule": true
  },
  "include": ["src", ".dumi/theme"],
  "exclude": ["node_modules", "lib", "es", "dist"],
  "ts-node": {
    "compilerOptions": {
      "module": "CommonJS",
      "resolveJsonModule": true,
      "noImplicitAny": false
    }
  }
}
