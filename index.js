import webpack from "webpack";
import { fileURLToPath } from 'url';
import path, {join} from "path";
import fs from "fs";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {glob} from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async() => {

const files = (await glob("src/**/*")).map((file) => "./" + file);

const config = {
    context: __dirname,
    mode: "development",
    entry: files,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx|js$/,
                include: [/node_modules/, path.resolve(__dirname, 'src')],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-react", "@babel/preset-env"],
                    }
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        })
    ]
}

const compiler = webpack(config);
compiler.inputFileSystem = fs;
compiler.outputFileSystem = fs;
compiler.run((err, stats) => {
    if (err) console.log(err);
    // console.log(stats);
});

})()