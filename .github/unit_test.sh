#!/usr/bin/env sh

####################################################
# AppSrc内でビルドする処理を記述するためのシェル
# シェルの実行はレポジトリのルートディレクトリになるため、package.jsonが存在するディレクトリへ移動してからyarnコマンドを実行する
####################################################

cd ./sample_app
yarn lint
yarn test